import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Iglesia } from '../animaciones/iglesia';
import { ScrollAnimate } from '../../shared/scroll-animate';

@Component({
  selector: 'app-ceremony',
  templateUrl: './ceremony.html',
  styleUrl: './ceremony.scss',
  imports: [Card, Iglesia, ScrollAnimate],
})
export class Ceremony {}
