import * as THREE from 'three';
import Experience from '../index';

export default class Rocket {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        console.log(this.resources.items.rocketModel);

        this.model = this.resources.items.rocketModel;

        this.setModel();
    }

    setModel() {
        this.model.position.y = 1.2;
        this.model.scale.set(0.5, 0.5, 0.5);

        this.scene.add(this.model);
    }

    update() {
        this.model.rotation.y -= 0.005;
    }
}
