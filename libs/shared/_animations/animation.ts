import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('0', style({ 'max-height': '*', opacity: 1, 'display': 'contents' })),
    state('1', style({ 'max-height': '0px', opacity: 0, 'display': 'none' })),
    transition(':enter',
      animate('400ms ease-in-out')
    ),
    transition('* => *',
      animate('400ms ease-in-out')
    ),
  ])
]

export const FlyInOutAnimation = [
  trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(200)
    ]),
    transition('* => void', [
      animate(200, style({ transform: 'translateX(100%)' }))
    ])
  ])
]

export const ContinuesAnimation = [
  trigger('continuesAnimation', [
    state('start', style({
      fontSize: '17px',
      opacity: 1,
      color: '#ffffff'
    })),
    state('stop', style({
      fontSize: '10px',
      opacity: 0.5,
      color: '#333'
    })),
    transition('* <=> *', [
      animate(1000)
    ])
  ])

]

