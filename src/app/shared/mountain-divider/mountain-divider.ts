import { Component } from '@angular/core';

@Component({
  selector: 'app-mountain-divider',
  template: `
    <div class="mountain-divider">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
      >
        <path
          fill="#FFFFFF"
          opacity=".15"
          d="M473,40C269,128,209,6,153,40,66,72,0,36,0,36V0h1000v36s-62,16-95,18c-33,2-63-7-76-13C806,30,745,5,695,3S492,35,473,40z"
        />
        <path
          fill="#FFFFFF"
          opacity=".35"
          d="M734,40c-45,0-77-14-129-24-29-5-150-6-254,24S259,19,201,40C116,71,0,24,0,24V0h1000V22s-28-11-92-11C810,11,776,40,734,40z"
        />
        <path
          fill="#FFFFFF"
          d="M766,17C566,-18,500,39,371,12,242,1,242,3,185,12,128,22,132,27,90,32,29,38,0,0,0,0h1000s-10,24-84,29S830,34,766,17z"
        />
      </svg>
    </div>
  `,
  styles: [
    `
      .mountain-divider {
        overflow: hidden;
        line-height: 0;
        margin: -1px 0;
        svg {
          width: calc(300vw + 1.3px);
          height: 3.5rem;
          display: block;
          left: 50%;
          position: relative;
          transform: translateX(-50%);
        }
      }
    `,
  ],
})
export class MountainDivider {}
