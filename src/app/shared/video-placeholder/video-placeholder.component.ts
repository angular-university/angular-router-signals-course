import {Component} from '@angular/core';

@Component({
    selector: 'video-placeholder',
    template: `
        <svg class="video-placeholder" viewBox="0 0 800 450"
             xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
                <linearGradient id="vp-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#0d0d14"/>
                    <stop offset="100%" stop-color="#12101e"/>
                </linearGradient>
                <linearGradient id="vp-accent" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#E40035"/>
                    <stop offset="100%" stop-color="#9717E7"/>
                </linearGradient>
            </defs>
            <rect width="800" height="450" fill="url(#vp-bg)"/>
            <rect x="0" y="446" width="800" height="4" fill="url(#vp-accent)"/>
            <line x1="0" y1="150" x2="800" y2="150" stroke="white" stroke-opacity="0.03" stroke-width="1"/>
            <line x1="0" y1="300" x2="800" y2="300" stroke="white" stroke-opacity="0.03" stroke-width="1"/>
            <circle cx="400" cy="210" r="52" fill="white" fill-opacity="0.06" stroke="white" stroke-opacity="0.18" stroke-width="1.5"/>
            <polygon points="390,188 390,232 434,210" fill="white" fill-opacity="0.55"/>
        </svg>
    `,
    styles: [`
        :host { display: contents; }
    `],
})
export class VideoPlaceholderComponent {}
