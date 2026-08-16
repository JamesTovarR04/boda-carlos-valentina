import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Celebracion } from '../animaciones/celebracion';
import { ScrollAnimate } from '../../shared/scroll-animate';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.html',
  styleUrl: './reception.scss',
  imports: [Card, Celebracion, ScrollAnimate],
})
export class Reception {}
