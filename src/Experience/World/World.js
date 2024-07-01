import Experience from '../index.js';
import Cube from './Cube';
import Rocket from './Rocket';
import { gsap } from 'gsap';

import * as THREE from 'three';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.resources.on('ready', () => {
            this.rocket = new Rocket();

            //this.cube = new Cube();

            const light = new THREE.DirectionalLight( 0xffffff, 0.75 );
            const target = new THREE.Object3D();
            target.position.set(-10, 0, -4);
            light.target = target;

            this.scene.add(target);
            this.scene.add(light);

            gsap.to(document.getElementById("title"), { duration: 2, fontSize: 60 });
        });
    }

    update() {
        if(this.rocket)
            this.rocket.update();
        console.log("Updating world!");
    }
}
