import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Camara } from '../animaciones/camara';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.html',
  styleUrl: './memories.scss',
  imports: [Card, Camara],
})
export class Memories {
  urlAlbum = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const guid = this.route.snapshot.paramMap.get('guid');
    this.urlAlbum = `../album/${guid}`;
  }
}
