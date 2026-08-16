import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { Agenda } from '../animaciones/agenda';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  imports: [Card, Agenda],
})
export class Calendar {}
