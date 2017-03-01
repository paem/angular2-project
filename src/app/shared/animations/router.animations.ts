import {trigger, state, animate, style, transition, AnimationEntryMetadata} from '@angular/core';

export const slideToLeft: AnimationEntryMetadata = trigger(
  'slideToLeft',
    [
      state('void', style({position:'relative', width:'100%'}) ),
      state('*', style({position:'relative', width:'100%'}) ),
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ]);




