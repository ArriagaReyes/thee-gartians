import * as THREE from 'three';
import Experience from '../index';
import { gsap } from 'gsap';

export default class Text {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setModel();
    }

    setModel() {
    }
}
