import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Camara } from '../animaciones/camara';
import { ActivatedRoute } from '@angular/router';
import QRCode from 'qrcode';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.html',
  styleUrl: './memories.scss',
  imports: [Card, Camara],
})
export class Memories implements OnInit {
  @ViewChild('qrCanvas', { static: true })
  qrCanvas!: ElementRef<HTMLCanvasElement>;

  urlAlbum = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const guid = this.route.snapshot.paramMap.get('guid');
    this.urlAlbum = `${window.location.origin}/album/${guid}`;

    QRCode.toCanvas(this.qrCanvas.nativeElement, this.urlAlbum, {
      width: 135,
      margin: 1,
      color: { dark: '#1a243f', light: '#ffffff' },
    });
  }
}
