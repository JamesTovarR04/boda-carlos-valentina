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
  mensaje =
    'Hola, confirmo mi asistencia a la boda. ¡Gracias por la invitación!';
  urlCarlos = `https://wa.me/573223400203?text=${encodeURIComponent(this.mensaje)}`;
  urlValentina = `https://wa.me/573224015907?text=${encodeURIComponent(this.mensaje)}`;

  ngOnChanges(): void {
    this.urlCarlos = `https://wa.me/573223400203?text=${encodeURIComponent(this.mensaje)}`;
    this.urlValentina = `https://wa.me/573224015907?text=${encodeURIComponent(this.mensaje)}`;
  }

  ngDoCheck(): void {
    this.urlCarlos = `https://wa.me/573223400203?text=${encodeURIComponent(this.mensaje)}`;
    this.urlValentina = `https://wa.me/573224015907?text=${encodeURIComponent(this.mensaje)}`;
  }

  constructor(
    private supabase: SupabaseService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const guid = this.route.snapshot.paramMap.get('guid');

    if (guid) {
      this.consultarInvitado(guid)
        .then((data) => {
          if (data && data.length > 0) {
            const guest = data[0];

            this.mensaje = `Hola de parte de ${guest.nombre}, confirmo mi asistencia a la boda. ¡Gracias por la invitación! reservamos ${guest.cupos} ${guest.cupos === 1 ? 'cupo' : 'cupos'}.`;
          }
        })
        .catch((error) => {
          console.error('Error al consultar invitado:', error);
        });
    }
  }

  async consultarInvitado(guid: string) {
    const { data, error } = await this.supabase.client
      .from('invitados')
      .select('*')
      .eq('id', guid);

    if (error) {
      throw error;
    }

    return data;
  }
}
