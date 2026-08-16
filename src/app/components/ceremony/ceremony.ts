import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Iglesia } from '../animaciones/iglesia';

@Component({
  selector: 'app-ceremony',
  templateUrl: './ceremony.html',
  styleUrl: './ceremony.scss',
  imports: [Card, Iglesia],
})
export class Ceremony {}
