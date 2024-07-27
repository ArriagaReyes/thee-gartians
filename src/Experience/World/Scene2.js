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
    vec2 uvNormal = vec2(vUv.x - 0.5, vUv.y - 0.5) * 7.0;

    float strength = 1.15;
    float circle = smoothstep(1.0, 0.0, dot(uvNormal, uvNormal)) * strength;

    gl_FragColor = vec4(circle, circle- 0.25, 0.0, 1.0);
}

`;

export default class Scene2 {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
    }

    setScene() {
        this.group = new THREE.Group();

        const geometry = new THREE.CylinderGeometry(15, 15, 100, 16);
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
        this.group.rotation.y = (5.0 * Math.PI)/4.0;

        this.scene.add(this.group);
    }

    update() { 
        this.group.rotation.y += 0.001;
    }
}
