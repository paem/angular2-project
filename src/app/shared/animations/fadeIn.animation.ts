import { animate, AnimationEntryMetadata, style, transition, trigger } from '@angular/core';

// Component transition animations
export const fadeInAnimation: AnimationEntryMetadata = trigger(
  'fadeIn',
  [
    transition(":enter", [
      style({ opacity: 0 }),
      animate('1000ms', style({ opacity: 1 }))
    ]),
    transition(":leave", [
      animate('1000ms', style({ opacity: 0 }))
    ])
  ]);
