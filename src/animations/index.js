import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class Animations {
    constructor() {
        const body = document.getElementById('body');
        gsap.to(body, { opacity: 1, duration: 6 });

        const elements = gsap.utils.toArray('#animate');
        const frames = [{ fontSize: '34px', duration: 1 }, { fontSize: '24px', duration: 1 }];

        elements.forEach((element, i) => {
            gsap.to(element, {
                keyframes: frames,
                scrollTrigger: {
                    trigger: element,
                    start: '-200px center',
                    end: '+=300',
                    scrub: 0.5,
                    //markers: true
                }
            });
        });


    }
}

