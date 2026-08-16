import { Component } from '@angular/core';
import { ScrollAnimate } from '../../shared/scroll-animate';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
  imports: [ScrollAnimate],
})
export class Notes {}
