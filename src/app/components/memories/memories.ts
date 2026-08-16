import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Camara } from '../animaciones/camara';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.html',
  styleUrl: './memories.scss',
  imports: [Card, Camara],
})
export class Memories {}
