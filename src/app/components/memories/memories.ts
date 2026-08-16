import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.html',
  styleUrl: './memories.scss',
  imports: [Card],
})
export class Memories {}
