import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Invitado {
  id?: number;
  created_at?: string;
  nombre: string;
  cupos: number;
  confirma_asistencia: boolean;
  guid?: string;
}

export interface Visualizacion {
  id: number;
  created_at: string;
  invitado: number;
  ip: string;
  abrio_sobre: boolean;
}

export interface ResumenViz {
  vistas: number;
  abrioSobre: boolean;
}

export interface AlbumFile {
  name: string;
  url: string;
  invitadoId: string;   // carpeta = id del invitado
  isVideo: boolean;
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.supabase.url,
      environment.supabase.key,
    );
  }

  getInvitados() {
    return this.client
      .from('invitados')
      .select('*')
      .order('created_at', { ascending: false });
  }

  createInvitado(invitado: Omit<Invitado, 'id' | 'created_at'>) {
    return this.client.from('invitados').insert(invitado).select().single();
  }

  updateInvitado(id: number, changes: Partial<Invitado>) {
    return this.client.from('invitados').update(changes).eq('id', id).select().single();
  }

  deleteInvitado(id: number) {
    return this.client.from('invitados').delete().eq('id', id);
  }

  getVisualizacionesByInvitado(invitadoId: number) {
    return this.client
      .from('visualizaciones')
      .select('*')
      .eq('invitado', invitadoId)
      .order('created_at', { ascending: false });
  }

  getResumenVisualizaciones() {
    return this.client
      .from('visualizaciones')
      .select('invitado, abrio_sobre');
  }

  // ── Album / Storage ───────────────────────────────────

  private readonly BUCKET = 'album';

  /** Lista todos los archivos del album (todas las carpetas) */
  async getAlbumFiles(): Promise<AlbumFile[]> {
    // Listar carpetas (una por invitadoId)
    const { data: folders } = await this.client.storage.from(this.BUCKET).list('', { limit: 200 });
    if (!folders) return [];

    const all: AlbumFile[] = [];
    for (const folder of folders) {
      const { data: files } = await this.client.storage
        .from(this.BUCKET)
        .list(folder.name, { limit: 500, sortBy: { column: 'created_at', order: 'desc' } });

      if (!files) continue;
      for (const file of files) {
        if (file.name === '.emptyFolderPlaceholder') continue;
        const path = `${folder.name}/${file.name}`;
        const { data } = this.client.storage.from(this.BUCKET).getPublicUrl(path);
        all.push({
          name: file.name,
          url: data.publicUrl,
          invitadoId: folder.name,
          isVideo: /\.(mp4|mov|webm|avi|mkv)$/i.test(file.name),
          created_at: file.created_at ?? undefined,
        });
      }
    }
    return all;
  }

  /** Sube un archivo al album bajo la carpeta del invitado */
  uploadAlbumFile(invitadoId: string, file: File) {
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `${invitadoId}/${filename}`;
    return this.client.storage.from(this.BUCKET).upload(path, file, { upsert: false });
  }

  /** Elimina un archivo del album (solo si pertenece al invitado) */
  deleteAlbumFile(invitadoId: string, filename: string) {
    const path = `${invitadoId}/${filename}`;
    return this.client.storage.from(this.BUCKET).remove([path]);
  }
}
