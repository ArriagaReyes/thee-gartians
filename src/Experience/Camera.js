import * as THREE from 'three';
import Experience from './index.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;
        this.time = this.experience.time;

        if(this.sizes.width > 720) {
            console.log("On desktop");
            this.mobile = false;
            this.mouseX = 0;
            this.mouseY = 0;

            this.setDesktopControls();
        } else {
            this.direction = 1;
        }

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
        this.instance.position.set(0, 0, 12);
        this.scene.add(this.instance);
    }

    setDesktopControls() {
        window.addEventListener('pointermove', (event) => {
            if(event.isPrimary === false) return;

            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        if(this.mobile == false) {
            this.instance.position.x = (2 * ((this.mouseX / this.sizes.width) - 0.5)) * 2; 
            this.instance.position.y = (((this.mouseY / this.sizes.height ) - 0.5) * -2) * 2;
        } else {
            if(this.instance.position.x > 3)
                this.direction = -1;
            if(this.instance.position.x < -3)
                this.direction = 1;

            this.instance.position.x += this.time.delta / 1000 * this.direction;
        }
    }
}
