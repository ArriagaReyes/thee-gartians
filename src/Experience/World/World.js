import Experience from '../index.js';
import Rocket from './Rocket';
import { gsap } from 'gsap';

import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.controls;

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

        this.resources.on('ready', () => {
            this.rocket = new Rocket();

            // Lights
            const directionalLight = new THREE.DirectionalLight( 0xA855F7, 3 );
            const target = new THREE.Object3D();
            target.position.set(-10, 0, -4);
            directionalLight.target = target;

            const pointLight = new THREE.PointLight( 0xEC4899, 15, 100 );
            pointLight.position.set(-3, 0, -2);

            const ambientLight = new THREE.AmbientLight( 0xA8E7FF, 0.5 );

            this.scene.add(target);
            this.scene.add(directionalLight);
            this.scene.add(pointLight);
            this.scene.add(ambientLight);

            this.setDragControls();

            console.log(this.controls);

            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 6, value: 0 });
        });
    }

    setDragControls() {
        this.controls = new DragControls( this.rocket.scene, this.camera.instance, this.experience.canvas );
    }

    update() {
        if(this.rocket) {
            this.camera.instance.lookAt(this.rocket.scene.position);
        }
    }
}
