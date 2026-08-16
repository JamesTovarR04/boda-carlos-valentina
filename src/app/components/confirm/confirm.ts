import { Component } from '@angular/core';
import { Whatsapp } from '../animaciones/whatsapp';
import { ScrollAnimate } from '../../shared/scroll-animate';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.html',
  styleUrl: './confirm.scss',
  imports: [Whatsapp, ScrollAnimate],
})
export class Confirm {
  mensaje =
    'Hola, confirmo mi asistencia a la boda. ¡Gracias por la invitación!';
  urlCarlos = `https://wa.me/573223400203?text=${encodeURIComponent(this.mensaje)}`;
  urlValentina = `https://wa.me/573224015907?text=${encodeURIComponent(this.mensaje)}`;
}
