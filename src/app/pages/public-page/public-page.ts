import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IntroOverlay } from '../../components/intro-overlay/intro-overlay';
import { MusicBtn } from '../../components/music-btn/music-btn';
import { Hero } from '../../components/hero/hero';
import { ContainerBg } from '../../shared/container-bg/container-bg';
import { Names } from '../../components/names/names';
import { Parents } from '../../components/parents/parents';
import { Corazon } from '../../components/animaciones/corazon';
import { Countdown } from '../../components/countdown/countdown';
import { PhotoSection } from '../../shared/photo-section/photo-section';
import { Video } from '../../components/video/video';
import { ShareBtn } from '../../components/share-btn/share-btn';

@Component({
  selector: 'app-public-page',
  imports: [
    IntroOverlay,
    MusicBtn,
    Hero,
    ContainerBg,
    Names,
    Parents,
    Corazon,
    Countdown,
    PhotoSection,
    Video,
    ShareBtn,
  ],
  templateUrl: './public-page.html',
  styleUrl: './public-page.scss',
})
export class PublicPage implements OnInit, OnDestroy {
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
