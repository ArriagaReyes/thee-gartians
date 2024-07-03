import Experience from '../index.js';
import Cube from './Cube';
import Rocket from './Rocket';
import { gsap } from 'gsap';

import * as THREE from 'three';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.resources.on('ready', () => {
            this.rocket = new Rocket();

            //this.cube = new Cube();

            // Lights
            const directionalLight = new THREE.DirectionalLight( 0xA855F7, 3 );
            const target = new THREE.Object3D();
            target.position.set(-10, 0, -4);
            directionalLight.target = target;

            const pointLight = new THREE.PointLight( 0xEC4899, 15, 100 );
            pointLight.position.set(-3, 0, -2);

            const ambientLight = new THREE.AmbientLight( 0xA8E7FF, 0.5 );


            // Shaders
            const geometry = new THREE.PlaneGeometry(1, 1 );

            const material = new THREE.RawShaderMaterial({
                vertexShader: `
                    uniform mat4 projectionMatrix;
                    uniform mat4 viewMatrix;
                    uniform mat4 modelMatrix;

                    attribute vec3 position;

                    void main() {
                        gl_position = projectionMatrix * viewMatrix * modelMatrix vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    precision mediump float;

                    void main() {
                        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                `,
            });

            const mesh = new THREE.Mesh(geometry, material);

            this.scene.add(target);
            this.scene.add(directionalLight);
            this.scene.add(pointLight);
            this.scene.add(ambientLight);
            //this.scene.add(mesh);

            gsap.to(document.getElementById("title"), { duration: 2, fontSize: 70 });
        });
    }

    update() {
        if(this.rocket)
            this.rocket.update();
        console.log("Updating world!");
    }
}
