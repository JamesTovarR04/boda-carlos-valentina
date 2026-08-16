import { Component } from '@angular/core';
import { Whatsapp } from '../animaciones/whatsapp';
import { ScrollAnimate } from '../../shared/scroll-animate';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.html',
  styleUrl: './confirm.scss',
  imports: [Whatsapp, ScrollAnimate],
})
export class Confirm {}
