import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.html',
  styleUrl: './gifts.scss',
  imports: [Card],
})
export class Gifts {}
