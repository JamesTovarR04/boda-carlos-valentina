import { Component } from '@angular/core';
import { Novios } from '../animaciones/novios';
import { ScrollAnimate } from '../../shared/scroll-animate';

@Component({
  selector: 'app-dresscode',
  templateUrl: './dresscode.html',
  styleUrl: './dresscode.scss',
  imports: [Novios, ScrollAnimate],
})
export class Dresscode {}
