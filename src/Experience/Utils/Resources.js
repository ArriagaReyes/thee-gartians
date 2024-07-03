import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader';
import EventEmitter from './EventEmitter';
import { gsap } from 'gsap';

export default class Resources extends EventEmitter {
    constructor(sources) {
        super();

        this.sources = sources;
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = [];

        const logoElement = document.getElementById("logo");
        this.loadingManager = new THREE.LoadingManager(
            () => {
                gsap.to(logoElement, { delay: 1, duration: 3, scale: 1, opacity: 1 });
            },
            (itemUrl, itemsLoaded, itemsTotal) => {
            }
        );

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.objLoader = new OBJLoader(this.loadingManager);
    }

    startLoading() {
        for(const source of this.sources) {
            if(source.type === 'objModel') {
                this.loaders.objLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                });
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;
        this.loaded++;

        console.log(file);

        if(this.loaded === this.toLoad) {
            this.trigger('ready');
        }
    }
}
