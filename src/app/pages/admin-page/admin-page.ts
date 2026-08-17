import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SupabaseService,
  Invitado,
  Visualizacion,
  ResumenViz,
} from '../../services/supabase';

@Component({
  selector: 'app-admin-page',
  imports: [FormsModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
})
export class AdminPage implements OnInit {
  invitados = signal<Invitado[]>([]);
  loading = signal(true);
  saving = signal(false);
  error = signal('');

  // Mapa invitadoId → resumen de visualizaciones
  resumen = signal<Map<number, ResumenViz>>(new Map());

  // Modal editar / crear
  modalOpen = signal(false);
  editingId: number | null = null;
  form: Omit<Invitado, 'id' | 'created_at'> = this.emptyForm();

  // Modal detalles
  detalleOpen = signal(false);
  detalleInvitado: Invitado | null = null;
  detalleViz = signal<Visualizacion[]>([]);
  detalleLoading = signal(false);

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadAll();
  }

  async loadAll() {
    this.loading.set(true);
    const [{ data: invData, error: invErr }, { data: vizData, error: vizErr }] =
      await Promise.all([
        this.supabase.getInvitados(),
        this.supabase.getResumenVisualizaciones(),
      ]);

    if (invErr) this.error.set(invErr.message);
    else this.invitados.set(invData ?? []);

    if (!vizErr && vizData) {
      const map = new Map<number, ResumenViz>();
      for (const v of vizData) {
        const current = map.get(v.invitado) ?? { vistas: 0, abrioSobre: false };
        map.set(v.invitado, {
          vistas: current.vistas + 1,
          abrioSobre: current.abrioSobre || v.abrio_sobre,
        });
      }
      this.resumen.set(map);
    }

    this.loading.set(false);
  }

  getResumen(id: number): ResumenViz {
    return this.resumen().get(id) ?? { vistas: 0, abrioSobre: false };
  }

  // ── Modal crear/editar ────────────────────────────────

  openCreate() {
    this.editingId = null;
    this.form = this.emptyForm();
    this.modalOpen.set(true);
  }

  openEdit(inv: Invitado) {
    this.editingId = inv.id!;
    this.form = {
      nombre: inv.nombre,
      cupos: inv.cupos,
      confirma_asistencia: inv.confirma_asistencia,
      guid: inv.guid,
    };
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }

  async save() {
    this.saving.set(true);
    if (this.editingId) {
      const { error } = await this.supabase.updateInvitado(
        this.editingId,
        this.form,
      );
      if (error) this.error.set(error.message);
    } else {
      const { error } = await this.supabase.createInvitado(this.form);
      if (error) this.error.set(error.message);
    }
    this.saving.set(false);
    this.modalOpen.set(false);
    await this.loadAll();
  }

  async delete(inv: Invitado) {
    if (!confirm(`¿Eliminar a ${inv.nombre}?`)) return;
    const { error } = await this.supabase.deleteInvitado(inv.id!);
    if (error) this.error.set(error.message);
    else await this.loadAll();
  }

  copyLink(inv: Invitado) {
    const url = `${window.location.origin}/${inv.id}`;
    navigator.clipboard.writeText(url);
  }

  // ── Modal detalles ────────────────────────────────────

  async openDetalle(inv: Invitado) {
    this.detalleInvitado = inv;
    this.detalleOpen.set(true);
    this.detalleLoading.set(true);
    const { data, error } = await this.supabase.getVisualizacionesByInvitado(
      inv.id!,
    );
    if (error) this.error.set(error.message);
    else this.detalleViz.set(data ?? []);
    this.detalleLoading.set(false);
  }

  closeDetalle() {
    this.detalleOpen.set(false);
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  // ── Stats ─────────────────────────────────────────────

  totalCupos() {
    return this.invitados().reduce((sum, i) => sum + i.cupos, 0);
  }

  totalConfirmados() {
    return this.invitados().filter((i) => i.confirma_asistencia).length;
  }

  totalVistos() {
    return this.invitados().filter((i) => this.getResumen(i.id!).vistas > 0)
      .length;
  }

  private emptyForm(): Omit<Invitado, 'id' | 'created_at'> {
    return {
      nombre: '',
      cupos: 1,
      confirma_asistencia: false,
      guid: crypto.randomUUID(),
    };
  }
}
