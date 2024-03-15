import { 
    animate,
    group,
    query,
    style,
    transition,
    trigger
} from '@angular/animations';

const optional = {optional: true};

export const slider = trigger('routeAnimations', [
    transition('home => *', slideTo('right')),
    transition('portfolio => home', slideTo('left')),
    transition('portfolio => *', slideTo('right')),
    transition('contacts => about', slideTo('right')),
    transition('contacts => *', slideTo('left')),
    transition('about => *', slideTo('left'))
]);

function slideTo(direction: string){
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%',
                height: '100%'
            })
        ], optional),
        query(':enter', [
            style({
                [direction]: '-100%'
            })
        ], optional),
        group([
            query(':leave', [
                animate(
                    '600ms ease',
                    style({
                        [direction]: '100%'
                    })
                )
            ], optional),
            query(':enter', [
                animate(
                    '600ms ease',
                    style({
                        [direction]: '0%'
                    })
                )
            ], optional)
        ])
    ];
}