import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.html',
  styleUrl: './guest-card.scss',
})
export class GuestCard implements OnInit {
  @Input() guestName = '';
  @Input() spots = 0;

  constructor(
    private supabase: SupabaseService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const guid = this.route.snapshot.paramMap.get('guid');

    if (guid) {
      this.consultarInvitado(guid)
        .then((data) => {
          if (data && data.length > 0) {
            const guest = data[0];
            this.guestName = guest.nombre;
            this.spots = guest.cupos;
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
      this.router.navigate(['/']);
      throw error;
    }

    if (!data || data.length === 0) {
      this.router.navigate(['/']);
      throw new Error('Invitado no encontrado');
    }

    return data;
  }
}
