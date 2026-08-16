import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';

export type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'fade';

@Directive({
  selector: '[scrollAnimate]',
})
export class ScrollAnimate implements OnInit, OnDestroy {
  /** Tipo de animación */
  @Input('scrollAnimate') animation: AnimationType = 'fade-up';
  /** Retardo en ms */
  @Input() animDelay: number = 0;
  /** Qué porcentaje del elemento debe ser visible para disparar */
  @Input() animThreshold: number = 0.15;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const el = this.el.nativeElement;
    el.classList.add('sa', `sa--${this.animation}`);
    if (this.animDelay) {
      el.style.transitionDelay = `${this.animDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sa--visible');
          this.observer.unobserve(el);
        }
      },
      { threshold: this.animThreshold }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
