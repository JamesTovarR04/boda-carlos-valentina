import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-music-btn',
  templateUrl: './music-btn.html',
  styleUrl: './music-btn.scss',
})
export class MusicBtn {
  @Input() active  = false;
  @Input() visible = false;
  @Output() toggled = new EventEmitter<void>();
}
