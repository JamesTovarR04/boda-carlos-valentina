import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService, AlbumFile, Invitado } from '../../services/supabase';

@Component({
  selector: 'app-album-page',
  imports: [],
  templateUrl: './album-page.html',
  styleUrl: './album-page.scss',
})
export class AlbumPage implements OnInit {
  invitado = signal<Invitado | null>(null);
  files = signal<AlbumFile[]>([]);
  loading = signal(true);
  uploading = signal(false);
  error = signal('');

  lightboxFile: AlbumFile | null = null;

  private guid = '';

  constructor(
    private route: ActivatedRoute,
    private supabase: SupabaseService,
  ) {}

  async ngOnInit() {
    this.guid = this.route.snapshot.paramMap.get('guid') ?? '';
    if (this.guid) await this.loadInvitado();
    await this.loadFiles();
  }

  private async loadInvitado() {
    const { data } = await this.supabase.client
      .from('invitados')
      .select('*')
      .eq('id', this.guid)
      .single();
    this.invitado.set(data ?? null);
  }

  async loadFiles() {
    this.loading.set(true);
    try {
      const files = await this.supabase.getAlbumFiles();
      files.sort((a, b) =>
        (b.created_at ?? '') > (a.created_at ?? '') ? 1 : -1,
      );
      this.files.set(files);
    } catch (e: any) {
      this.error.set(e.message ?? 'Error cargando el álbum');
    }
    this.loading.set(false);
  }

  get isAdmin(): boolean {
    return !this.guid;
  }

  canUpload(): boolean {
    return this.isAdmin || this.invitado() != null;
  }

  isOwner(file: AlbumFile): boolean {
    if (this.isAdmin) return true;
    const inv = this.invitado();
    return inv != null && file.invitadoId === String(inv.id);
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.canUpload()) return;

    const folderId = this.isAdmin ? 'admin' : String(this.invitado()!.id);
    this.uploading.set(true);
    this.error.set('');

    const results = await Promise.all(
      Array.from(input.files).map((f) =>
        this.supabase.uploadAlbumFile(folderId, f),
      ),
    );
    if (results.some((r) => r.error))
      this.error.set('Algunos archivos no se pudieron subir.');

    input.value = '';
    this.uploading.set(false);
    await this.loadFiles();
  }

  async deleteFile(file: AlbumFile) {
    if (!confirm('¿Eliminar este archivo?')) return;
    const { error } = await this.supabase.deleteAlbumFile(
      file.invitadoId,
      file.name,
    );
    if (error) this.error.set(error.message);
    else await this.loadFiles();
  }

  openLightbox(file: AlbumFile) {
    this.lightboxFile = file;
  }
  closeLightbox() {
    this.lightboxFile = null;
  }

  triggerUpload() {
    document.getElementById('file-input')?.click();
  }
}
