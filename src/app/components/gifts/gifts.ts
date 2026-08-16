import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Regalo } from '../animaciones/regalo';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.html',
  styleUrl: './gifts.scss',
  imports: [Card, Regalo],
})
export class Gifts {}
