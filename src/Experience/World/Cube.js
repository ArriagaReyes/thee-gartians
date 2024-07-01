import * as THREE from 'three';
import Experience from '../index';
import { gsap } from 'gsap';

export default class Cube {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setModel();
    }

    setModel() {
        this.geometry = new THREE.BoxGeometry(3, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0xc78253 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.scale.set(0, 0, 0);

        this.scene.add(this.mesh);

        gsap.to(this.mesh.scale, { delay: 2, duration: 2, x: 2, y: 2, z: 2 });
        gsap.to(this.mesh.scale, { delay: 5, duration: 2, x: 0, y: 0, z: 0 });
    }
}
