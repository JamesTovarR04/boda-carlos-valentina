import { Component } from '@angular/core';
import { MountainDivider } from '../../shared/mountain-divider/mountain-divider';
import { MountainDividerDown } from '../../shared/mountain-divider/mountain-divider-down';
import { Card } from '../../shared/card/card';

@Component({
  selector: 'app-video',
  templateUrl: './video.html',
  styleUrls: ['./video.scss'],
  imports: [MountainDivider, MountainDividerDown, Card],
})
export class Video {}
