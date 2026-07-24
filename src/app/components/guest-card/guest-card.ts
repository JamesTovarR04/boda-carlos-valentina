import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.html',
  styleUrl: './guest-card.scss',
})
export class GuestCard {
  @Input() guestName = 'Flia. Rodríguez Méndez';
  @Input() spots     = 4;
}
