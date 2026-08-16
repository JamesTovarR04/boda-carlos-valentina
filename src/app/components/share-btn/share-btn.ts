import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share-btn',
  imports: [],
  templateUrl: './share-btn.html',
  styleUrl: './share-btn.scss',
})
export class ShareBtn {
  /** URL a compartir. Por defecto usa la URL actual. */
  @Input() url: string = window.location.href;
  /** Texto que acompaña al compartir */
  @Input() title: string = 'Carlos & Valentina · 10.10.2026';

  copied = false;

  async share(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({ title: this.title, url: this.url });
      } catch {
        // usuario canceló
      }
    } else {
      await navigator.clipboard.writeText(this.url);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    }
  }
}
