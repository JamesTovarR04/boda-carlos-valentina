import { Component, Input } from '@angular/core';
import { MountainDivider } from '../mountain-divider/mountain-divider';
import { MountainDividerDown } from '../mountain-divider/mountain-divider-down';

@Component({
  selector: 'app-photo-section',
  template: `
    <section class="sec-photo" [class.bg-dark]="darkBg">
      @if (showFlor) {
        <div class="flor-wrap">
          <img src="assets/images/flor-2.png" alt="" class="flor-left" />
          <img src="assets/images/flor-1.png" alt="" class="flor-right" />
        </div>
      }
      <app-mountain-divider class="mountain-top" />
      <img [src]="src" [alt]="alt" class="full-photo" loading="lazy" />
      @if (!hideBottomDivider) {
        <app-mountain-divider-down class="mountain-buttom" />
      }
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
      }
    `,
  ],
  imports: [MountainDivider, MountainDividerDown],
})
export class PhotoSection {
  @Input() src = '';
  @Input() alt = '';
  @Input() darkBg = true;
  @Input() hideBottomDivider = false;
  @Input() showFlor = false;
}
