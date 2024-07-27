import Experience from '../index.js';
import Rocket from './Rocket';
import Stars from './Stars';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import { gsap } from 'gsap';

import * as THREE from 'three';

/*
 *  Create a couple more scenes and make a system wherein
 *  a scene gets choosen at random on load
 */

export default class World {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        // Fade away overlay
        const overlayGeometry = new THREE.PlaneGeometry(2, 2);
        const overlayMaterial = new THREE.ShaderMaterial({
            transparent: true,
            wireframe: false,
            uniforms: {
                uAlpha: { value: 1.0 }
            },
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uAlpha;

                void main() {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `
        });
        const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
        this.scene.add(overlay);

        // Loading assets
        this.resources.on('ready', () => {
            this.stars = new Stars();
            this.rocket = new Rocket();

            /*this.scene1 = new Scene1();
            this.scene1.setScene();*/
            this.Scene2 = new Scene2();
            this.Scene2.setScene();

            gsap.to(this.rocket.model.scale, { duration: 6, x: 0.5, y: 0.5, z: 0.5 });
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 6, value: 0 });
        });
    }

    update() {
        if(this.rocket)
            this.camera.instance.lookAt(this.rocket.scene.position);
        if(this.stars)
            this.stars.update();
        if(this.Scene2)
            this.Scene2.update();
    }
}
