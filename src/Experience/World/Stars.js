import Experience from '../index.js';
import * as THREE from 'three';

export default class Stars {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;

        this.setStars();
    }

    setStars() {
        const geometry = new THREE.BufferGeometry();
        const count = 9000;
        const positions = new Float32Array(count * 3);

        for(let i = 0; i < count; i++) {
            positions[i] = (Math.random() - 0.5) * 25;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial();
        material.color = new THREE.Color('#fff0f0');
        material.size = 0.05;
        material.sizeAttenuation = true;
        this.mesh = new THREE.Points(geometry, material);

        this.scene.add(this.mesh);
    }

    update() {
        this.mesh.rotation.x += this.time.delta / 10000;
    }
}
