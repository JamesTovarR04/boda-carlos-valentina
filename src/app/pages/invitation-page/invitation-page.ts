import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

// ── Shared ────────────────────────────────────────────
import { MountainDivider } from '../../shared/mountain-divider/mountain-divider';
import { PhotoSection } from '../../shared/photo-section/photo-section';

// ── UI ────────────────────────────────────────────────
import { IntroOverlay } from '../../components/intro-overlay/intro-overlay';
import { MusicBtn } from '../../components/music-btn/music-btn';

// ── Secciones ─────────────────────────────────────────
import { Hero } from '../../components/hero/hero';
import { Names } from '../../components/names/names';
import { Parents } from '../../components/parents/parents';
import { GuestCard } from '../../components/guest-card/guest-card';
import { Countdown } from '../../components/countdown/countdown';
import { Ceremony } from '../../components/ceremony/ceremony';
import { Reception } from '../../components/reception/reception';
import { Dresscode } from '../../components/dresscode/dresscode';
import { Itinerary } from '../../components/itinerary/itinerary';
import { Notes } from '../../components/notes/notes';
import { Gifts } from '../../components/gifts/gifts';
import { Memories } from '../../components/memories/memories';
import { Calendar } from '../../components/calendar/calendar';
import { Confirm } from '../../components/confirm/confirm';
import { Video } from '../../components/video/video';
import { Corazon } from '../../components/animaciones/corazon';
import { ContainerBg } from '../../shared/container-bg/container-bg';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-invitation-page',
  imports: [
    // shared
    PhotoSection,
    // ui
    IntroOverlay,
    MusicBtn,
    // secciones
    Hero,
    Names,
    Parents,
    GuestCard,
    Countdown,
    Ceremony,
    Reception,
    Dresscode,
    Itinerary,
    Notes,
    Gifts,
    Memories,
    Calendar,
    Confirm,
    Video,
    Corazon,
    ContainerBg,
  ],
  templateUrl: './invitation-page.html',
  styleUrl: './invitation-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationPage implements OnInit, OnDestroy {
  overlayOpen = signal(false);
  overlayHidden = signal(false);
  musicActive = signal(false);
  showMusicBtn = signal(false);

  private audio: HTMLAudioElement | null = null;

  canciones = ['amor_bueno', 'hasta_viejitos', 'tienes_magia'];

  ngOnInit(): void {
    // Volver al inicio al recargar la página
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const randomIndex = Math.floor(Math.random() * this.canciones.length);
    const selectedSong = this.canciones[randomIndex];
    this.audio = new Audio(`assets/musica/${selectedSong}.mp3`);
    this.audio.loop = true;
    // Bloquear scroll hasta que se abra el overlay
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    this.audio?.pause();
  }

  openDoors(): void {
    this.overlayOpen.set(true);
    this.audio?.play().catch(() => {});
    this.musicActive.set(true);
    setTimeout(() => {
      this.overlayHidden.set(true);
      this.showMusicBtn.set(true);
      // Restaurar scroll al terminar la animación
      document.body.style.overflow = '';
    }, 1500);
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
