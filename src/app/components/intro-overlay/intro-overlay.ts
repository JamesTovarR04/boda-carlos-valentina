import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-intro-overlay',
  templateUrl: './intro-overlay.html',
  styleUrl: './intro-overlay.scss',
})
export class IntroOverlay {
  @Input() isOpen = false;
  @Input() isHidden = false;
  @Output() opened = new EventEmitter<void>();

  abrir() {
    this.isOpen = false;
    this.opened.emit();
  }
}
