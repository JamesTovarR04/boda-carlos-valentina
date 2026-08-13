import { Component, Input } from '@angular/core';
import { MountainDivider } from '../mountain-divider/mountain-divider';

@Component({
  selector: 'app-photo-section',
  template: `
    <section class="sec-photo" [class.bg-dark]="darkBg">
      <app-mountain-divider class="mountain-top" />
      <img [src]="src" [alt]="alt" class="full-photo" loading="lazy" />
      <app-mountain-divider class="mountain-buttom" />
    </section>
  `,
  styles: [
    `
      .sec-photo {
        padding: 0;
        &.bg-dark {
          background: var(--azul-oscuro);
        }
        .full-photo {
          width: 100%;
          display: block;
          object-fit: cover;
        }
      }

      .mountain-top {
        position: absolute;
      }

      .mountain-buttom {
        position: absolute;
        bottom: 0;
        left: 0;
        transform: rotate(180deg);
      }
    `,
  ],
  imports: [MountainDivider],
})
export class PhotoSection {
  @Input() src = '';
  @Input() alt = '';
  @Input() darkBg = true;
}
