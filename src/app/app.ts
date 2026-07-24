import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';

// ── Shared ────────────────────────────────────────────
import { MountainDivider } from './shared/mountain-divider/mountain-divider';
import { PhotoSection }    from './shared/photo-section/photo-section';

// ── UI ────────────────────────────────────────────────
import { IntroOverlay } from './components/intro-overlay/intro-overlay';
import { MusicBtn }     from './components/music-btn/music-btn';

// ── Secciones ─────────────────────────────────────────
import { Hero }      from './components/hero/hero';
import { Names }     from './components/names/names';
import { Parents }   from './components/parents/parents';
import { GuestCard } from './components/guest-card/guest-card';
import { Countdown } from './components/countdown/countdown';
import { Ceremony }  from './components/ceremony/ceremony';
import { Reception } from './components/reception/reception';
import { Dresscode } from './components/dresscode/dresscode';
import { Itinerary } from './components/itinerary/itinerary';
import { Notes }     from './components/notes/notes';
import { Gifts }     from './components/gifts/gifts';
import { Memories }  from './components/memories/memories';
import { Calendar }  from './components/calendar/calendar';
import { Confirm }   from './components/confirm/confirm';

@Component({
  selector: 'app-root',
  imports: [
    // shared
    MountainDivider, PhotoSection,
    // ui
    IntroOverlay, MusicBtn,
    // secciones
    Hero, Names, Parents, GuestCard, Countdown,
    Ceremony, Reception, Dresscode, Itinerary,
    Notes, Gifts, Memories, Calendar, Confirm,
  ],
  templateUrl: './app.html',
  styleUrl:    './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {

  overlayOpen   = signal(false);
  overlayHidden = signal(false);
  musicActive   = signal(false);
  showMusicBtn  = signal(false);

  private audio: HTMLAudioElement | null = null;

  ngOnInit(): void {
    this.audio = new Audio(
      'https://boreh.pro/wp-content/uploads/2025/06/Fonseca-Que-Suerte-Tenerte-Audio.mp3'
    );
    this.audio.loop = true;
  }

  ngOnDestroy(): void {
    this.audio?.pause();
  }

  openDoors(): void {
    this.overlayOpen.set(true);
    this.audio?.play().catch(() => {});
    this.musicActive.set(true);
    // El overlay hace fade-out con transition: opacity .5s delay .9s
    // Esperamos 1.5s para eliminar el DOM una vez la animación terminó
    // overlay: fade delay 1.6s + duración 0.6s = 2.2s total
    setTimeout(() => {
      this.overlayHidden.set(true);
      this.showMusicBtn.set(true);
    }, 2300);
  }

  toggleMusic(): void {
    if (!this.audio) return;
    if (this.audio.paused) {
      this.audio.play();
      this.musicActive.set(true);
    } else {
      this.audio.pause();
      this.musicActive.set(false);
    }
  }
}
