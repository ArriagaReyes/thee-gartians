import * as THREE from 'three';
import Experience from '../index';

export default class Rocket {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.model = this.resources.items.rocketModel;
        this.material = this.resources.items.rocketMaterial;

        this.setModel();
    }

    setModel() {
        this.model.rotation.x = Math.PI;
        this.model.rotation.z = Math.PI / 5;
        this.model.scale.set(0.0, 0.0, 0.0);
        this.model.position.y = -1.8;
        this.model.position.x = -1;

        this.scene.add(this.model);
    }

    update() {
        this.model.rotation.y -= 0.005;
    }
}
