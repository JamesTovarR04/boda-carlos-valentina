import { Component, OnInit, OnDestroy, signal } from '@angular/core';

interface TimeLeft {
  dias: number;
  hrs: number;
  mins: number;
  segs: number;
}

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
})
export class Countdown implements OnInit, OnDestroy {
  private readonly weddingDate = new Date(
    '2026-10-10T18:00:00-05:00',
  ).getTime();
  timeLeft = signal<TimeLeft>({ dias: 0, hrs: 0, mins: 0, segs: 0 });
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private tick(): void {
    const diff = Math.max(0, this.weddingDate - Date.now());
    this.timeLeft.set({
      dias: Math.floor(diff / 86_400_000),
      hrs: Math.floor((diff % 86_400_000) / 3_600_000),
      mins: Math.floor((diff % 3_600_000) / 60_000),
      segs: Math.floor((diff % 60_000) / 1_000),
    });
  }
}
