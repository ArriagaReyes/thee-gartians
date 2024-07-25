import Experience from '../index.js';
import * as THREE from 'three';

export default class Scene1 {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
    }

    setLights() {
        const directional = new THREE.DirectionalLight( 0xA855F7, 3 );
        const target = new THREE.Object3D();
        target.position.set(-10, 0, -4);
        directional.target = target;

        const point = new THREE.PointLight( 0xEC4899, 15, 100 );

        point.position.set(-3, 0, -2);

        const ambient = new THREE.AmbientLight( 0xA8E7FF, 0.5 );

        this.scene.add(target);
        this.scene.add(directional);
        this.scene.add(point);
        this.scene.add(ambient);
    }
}
