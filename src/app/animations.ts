import {
    trigger,
    animate,
    transition,
    style,
    state, query
} from '@angular/animations';

export const fadeingInOutAnimation = trigger('fadeInOut',
    [
        state('void', style({ opacity: 0 })),
        state('*', style({ opacity: 1 })),
        transition(':enter', animate('200ms  cubic-bezier(.45,.01,0,.99)')),
        transition(':leave', animate('187ms 120ms cubic-bezier(.33,.33,.36,.91)')),
    ]
);
