import * as THREE from 'three';

import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';

import sources from './sources';
let instance = null;

export default class Experience {
    constructor(_canvas) {
        if(instance) {
            return instance;
        }

        instance = this;

        window.experience = this;

        this.canvas = _canvas;

        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();

        this.sizes.on('resize', () => {
            this.resize();
        });

        this.time.on('tick', () => {
            this.update();
        });

    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
        //console.log("Resizing!");
    }

    update() {
        this.camera.update();
        this.world.update();
        this.renderer.update();
        //console.log("Ticking!");
    }

    destroy() {
        this.sizes.off('resize');
        this.time.off('tick');
    }
}
