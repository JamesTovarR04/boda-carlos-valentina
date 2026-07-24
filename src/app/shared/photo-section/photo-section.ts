import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-section',
  template: `
    <section class="sec-photo" [class.bg-dark]="darkBg">
      <img [src]="src" [alt]="alt" class="full-photo" loading="lazy">
    </section>
  `,
  styles: [`
    .sec-photo {
      padding: 0;
      &.bg-dark { background: var(--azul-oscuro); }
      .full-photo { width: 100%; display: block; object-fit: cover; }
    }
  `],
})
export class PhotoSection {
  @Input() src = '';
  @Input() alt = '';
  @Input() darkBg = true;
}
