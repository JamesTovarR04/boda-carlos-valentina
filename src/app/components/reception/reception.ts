import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Celebracion } from '../animaciones/celebracion';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.html',
  styleUrl: './reception.scss',
  imports: [Card, Celebracion],
})
export class Reception {}
