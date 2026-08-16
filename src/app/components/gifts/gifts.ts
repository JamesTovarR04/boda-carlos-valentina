import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Regalo } from '../animaciones/regalo';
import { ScrollAnimate } from '../../shared/scroll-animate';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.html',
  styleUrl: './gifts.scss',
  imports: [Card, Regalo, ScrollAnimate],
})
export class Gifts {}
