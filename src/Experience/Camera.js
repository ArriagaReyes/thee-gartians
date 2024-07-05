import * as THREE from 'three';
import Experience from './index.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;

        this.mouseX = 0;
        this.mouseY = 0;

        this.setInstance();
        this.setControls();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
        this.instance.position.set(0, 0, 8);
        this.scene.add(this.instance);
    }

    setControls() {
        window.addEventListener('pointermove', (event) => {
            if(event.isPrimary === false) return;

            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });

        window.addEventListener('deviceorientation', (event) => {
            this.deviceX = event.beta * 3;
            this.deviceY = event.gamma * 3;
            console.log(event);
        });
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        this.instance.position.x = (2 * ((this.mouseX / this.sizes.width) - 0.5)) * 2; 
        this.instance.position.y = (((this.mouseY / this.sizes.height ) - 0.5) * -2) * 2;


        this.instance.position.x = (2 * ((this.deviceX / 360) - 0.5)) * 2;
        this.instance.position.y = (((this.deviceY / 180) - 0.5) * -2) * 2;
    }
}
