import Experience from '../index.js';
import * as THREE from 'three';

const vertex = `
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
    //vec4 modelPosition = modelMatrix * vec4(position, 1.0)
    //vec4 viewPosition = viewMatrix * modelPosition;
    //vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vUv = uv;
}
`;

const fragment = `
precision mediump float;

varying vec2 vUv;

void main() {
    float left = vUv.x;
    float right = 1.0 - vUv.x;

    float gradient = left * right * 2.7;

    gl_FragColor = vec4(gradient, gradient - 0.25, 0.0, 1.0);
}

`;

export default class Scene2 {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
    }

    setScene() {
        this.group = new THREE.Group();

        const geometry = new THREE.CylinderGeometry(10, 10, 20, 16);
        const material = new THREE.RawShaderMaterial({
            side: THREE.DoubleSide,
            vertexShader: vertex,
            fragmentShader: fragment,
        });

        const mesh = new THREE.Mesh(geometry, material);

        const mainLight = new THREE.PointLight( 0xFFAA00, 40, 100 );
        mainLight.position.set(0, 0, -5);

        const fillLight = new THREE.PointLight( 0XFFAA00, 3, 100 );
        fillLight.position.set(0, 0, 5);

        this.group.add(mesh, mainLight, fillLight);

        this.scene.add(this.group);
    }

    update() { 
        this.group.rotation.y += 0.001;
    }
}
