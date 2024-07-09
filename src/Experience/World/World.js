import Experience from '../index.js';
import Rocket from './Rocket';
import { gsap } from 'gsap';

import * as THREE from 'three';

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

        // Particles
        const particleGeometry = new THREE.BufferGeometry();
        const count = 5000;
        const positions = new Float32Array(count * 3);

        for(let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial();
        particleMaterial.color = new THREE.Color('#fff0f0');
        particleMaterial.size = 0.05;
        particleMaterial.sizeAttenuation = true;
        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);

        // Loading assets
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

            console.log(this.rocket);
            gsap.to(this.rocket.model.scale, { duration: 6, x: 0.5, y: 0.5, z: 0.5 });
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 6, value: 0 });
        });
    }

    update() {
        if(this.rocket && this.particles) {
            this.camera.instance.lookAt(this.rocket.scene.position);
            this.particles.rotation.x += this.time.delta / 10000;
        }
    }
}
