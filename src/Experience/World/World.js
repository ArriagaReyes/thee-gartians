import Experience from '../index.js';
import Rocket from './Rocket';
import { gsap } from 'gsap';
import { DragControls } from 'three/addons/controls/DragControls.js';

import * as THREE from 'three';

const vertex = `
    void main() {
        gl_Position = vec4(position, 1.0);
    }`;

const fragment = `
    uniform float uAlpha;

    void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }`;

class Overlay {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            wireframe: false,
            uniforms: {
                uAlpha: { value: 1.0 }
            },
            vertexShader: vertex,
            fragmentShader: fragment
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    animate() {
        gsap.to(this.material.uniforms.uAlpha, { duration: 6, value: 0 });
    }
}

export default class World {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        const overlay = new Overlay();
        this.scene.add(overlay.mesh);

        this.resources.on('ready', () => {
            const planeGeometry = new THREE.PlaneGeometry(5, 5, 16);
            const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x404040 });
            this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
            this.plane.rotation.x = Math.PI*3 / 2;
            this.plane.position.y = -5;
            //this.scene.add(this.plane);

            this.rocket = new Rocket();
            this.ambientLight = new THREE.AmbientLight( 0x333333 );
            this.scene.add(this.ambientLight);

            /*this.light = new THREE.PointLight( 0xFFFFFF, 10);
            this.light.position.set(0.5, 0, 0.5);
            this.scene.add(this.light);
            gsap.fromTo(this.light.position, { y: 25 }, { y: -30, delay: 4, duration: 0.5, repeat: -1, repeatDelay: 1.5 });*/

            this.createSphere();
            this.createLights();
            this.createDebris();
            overlay.animate();
        });
    }

    createSphere() {
        const geometry = new THREE.CylinderGeometry(20, 20, 150, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x010101, side: THREE.DoubleSide, wireframe: false });
        const mesh = new THREE.Mesh(geometry, material);
        console.log(mesh);
        this.scene.add(mesh);
    }

    createDebris() {
        const count = 2000;
        const area = 50;
        const depth = -200;

        for(let i = 0; i < count; i++) {
            const size = Math.random() * 0.20;
            const geometry = new THREE.BoxGeometry(size, size, size);
            const material = new THREE.MeshBasicMaterial({ color: 0x999999 });
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(((Math.random() * 2) - 1) * area, 0, ((Math.random() * 2) - 1) * area);

            gsap.fromTo(mesh.position, { y: 25 }, { y: depth, delay: (Math.random() * 6), duration: (Math.random() * 2) + 4, repeat: -1, repeatDelay: (Math.random() * 2) });

            this.scene.add(mesh);
        }
    }

    createLights() {
        const count = 15;

        for(let i = 0; i < count; i++) {
            const color = 0xDDDBBA;//Math.random() > 0.5 ? 0xAAA090 : 0xAAA0DD;
            let position = new THREE.Vector2(((Math.random() * 2) - 1) * 5, ((Math.random() * 2) - 1) * 5);
            let light = new THREE.PointLight(color, 9);
            light.position.set(position.x, 0, position.y);
            gsap.fromTo(light.position, { y: 25 }, { y: -50, delay: (Math.random() * 6), duration: (Math.random() * 2) + 2, repeat: -1, repeatDelay: (Math.random() * 2) });
            this.scene.add(light);
        }
    }

    update() {
        if(this.rocket) {
            this.rocket.update(this.time.delta);
            //this.camera.instance.lookAt(this.rocket.model.position);
        }
    }
}
