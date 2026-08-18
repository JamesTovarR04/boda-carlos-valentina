import { Component, OnInit } from '@angular/core';
import { Whatsapp } from '../animaciones/whatsapp';
import { ScrollAnimate } from '../../shared/scroll-animate';
import { SupabaseService } from '../../services/supabase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.html',
  styleUrl: './confirm.scss',
  imports: [Whatsapp, ScrollAnimate],
})
export class Confirm implements OnInit {
  private invitadoId: number | null = null;

  mensaje =
    'Hola, confirmo mi asistencia a la boda. ¡Gracias por la invitación!';
  urlCarlos = '';
  urlValentina = '';

  constructor(
    private supabase: SupabaseService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    const guid = this.route.snapshot.paramMap.get('guid');
    if (!guid) return;

    const { data } = await this.supabase.client
      .from('invitados')
      .select('id, nombre, cupos')
      .eq('guid', guid)
      .single();

    if (data) {
      this.invitadoId = data.id;
      this.mensaje = `Hola de parte de ${data.nombre}, confirmo mi asistencia a la boda. ¡Gracias por la invitación! Reservamos ${data.cupos} ${data.cupos === 1 ? 'cupo' : 'cupos'}.`;
    }

    this.urlCarlos = `https://wa.me/573223400203?text=${encodeURIComponent(this.mensaje)}`;
    this.urlValentina = `https://wa.me/573224015907?text=${encodeURIComponent(this.mensaje)}`;
  }

  async confirmarNovia(): Promise<void> {
    await this.marcarConfirmacion('confirma_asistencia_novia');
    window.open(this.urlValentina, '_blank', 'noopener');
  }

  async confirmarNovio(): Promise<void> {
    await this.marcarConfirmacion('confirma_asistencia_novio');
    window.open(this.urlCarlos, '_blank', 'noopener');
  }

  private async marcarConfirmacion(
    campo: 'confirma_asistencia_novia' | 'confirma_asistencia_novio',
  ): Promise<void> {
    const guid = this.route.snapshot.paramMap.get('guid');
    if (!guid) return;
    await this.supabase.client
      .from('invitados')
      .update({ [campo]: true })
      .eq('id', guid);
  }
}
