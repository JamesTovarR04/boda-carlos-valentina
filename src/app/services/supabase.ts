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
}
