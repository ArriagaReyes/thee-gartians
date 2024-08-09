import * as THREE from 'three';
import Experience from '../index';
import { gsap } from 'gsap';

export default class Rocket {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.model = this.resources.items.rocketModel;
        this.material = this.resources.items.rocketMaterial;

        this.setModel();
    }

    setModel() {
        this.model.rotation.x = Math.PI;
        //this.model.rotation.z = Math.PI / 5;
        this.model.scale.set(0.5, 0.5, 0.5);
        this.model.position.y = -2.5;
        //this.model.position.x = -1;

        this.scene.add(this.model);

        gsap.fromTo(this.model.position, { z: 0.11 }, { z: -0.11, yoyo: true, repeat: -1, ease: 'back.inOut(1.7)', duration: 2.5 });
        //gsap.fromTo(this.model.position, { x: -0.11 }, { x: 0.11, yoyo: true, repeat: -1, ease: 'expo.inOut' });
    }

    update() {
    }
}
