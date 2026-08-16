import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MountainDivider } from '../../shared/mountain-divider/mountain-divider';
import { MountainDividerDown } from '../../shared/mountain-divider/mountain-divider-down';
import { Card } from '../../shared/card/card';

@Component({
  selector: 'app-video',
  templateUrl: './video.html',
  styleUrls: ['./video.scss'],
  imports: [MountainDivider, MountainDividerDown, Card],
})
export class Video implements AfterViewInit, OnDestroy {
  @ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;

  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    const video = this.videoEl.nativeElement;

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    this.observer.observe(video);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
