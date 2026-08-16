import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-camara',
  template: `
    <div class="animation-container">
      <ng-lottie
        [options]="options"
        (animationCreated)="animationCreated($event)"
        width="100px"
        height="100px"
      />
    </div>
  `,
  standalone: true,
  imports: [LottieComponent],
})
export class Camara {
  animation?: AnimationItem;

  options: AnimationOptions = {
    path: '/assets/animaciones/camara.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animation = animationItem;
    this.animation.setSpeed(0.3);
  }
}
