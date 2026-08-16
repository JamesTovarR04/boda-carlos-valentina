import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  imports: [Card],
})
export class Calendar {}
