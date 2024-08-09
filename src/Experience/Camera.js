import * as THREE from 'three';
import Experience from './index.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import GUI from 'lil-gui';

let gui //= new GUI();

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;
        this.time = this.experience.time;

        this.setInstance();
        if(gui)
            this.setDev();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(40, this.sizes.width / this.sizes.height, 0.1, 100);
        this.instance.position.set(0.2, 8, 4.6);
        this.instance.rotation.set(5.202, 0, 0.877);
        this.scene.add(this.instance);

        //this.controls = new FlyControls(this.instance, this.canvas);
        //this.controls.dragToLook = true;
    }

    setDev() {
        console.log(gui);
        const posFolder = gui.addFolder('position');
        posFolder.add(this.instance.position, 'x').min(-10).max(10).step(0.1);
        posFolder.add(this.instance.position, 'y').min(-10).max(10).step(0.1);
        posFolder.add(this.instance.position, 'z').min(-10).max(10).step(0.1);

        const rotFolder = gui.addFolder('rotation');
        rotFolder.add(this.instance.rotation, 'x').min(0).max(2*Math.PI).step(0.001);
        rotFolder.add(this.instance.rotation, 'y').min(0).max(2*Math.PI).step(0.001);
        rotFolder.add(this.instance.rotation, 'z').min(0).max(2*Math.PI).step(0.001);
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
        //this.controls.update(this.time.delta);
    }
}
