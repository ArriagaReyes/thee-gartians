import * as THREE from 'three';
import { MTLLoader } from 'three/addons/loaders/MTLLoader';
import { OBJLoader } from 'three/addons/loaders/OBJLoader';
import EventEmitter from './EventEmitter';
import { gsap } from 'gsap';

export default class Resources extends EventEmitter {
    constructor(sources) {
        super();

        this.sources = sources;
        this.items = {};
        this.toLoad = this.sources.length + 1;
        this.loaded = [];

        const heroElement = document.getElementById("hero");
        this.loadingManager = new THREE.LoadingManager(
            () => {
                gsap.to(heroElement, { delay: 1, duration: 3, scale: 1, opacity: 1 });
            },
            (itemUrl, itemsLoaded, itemsTotal) => {
            }
        );

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.mtlLoader = new MTLLoader(this.loadingManager);
        this.loaders.objLoader = new OBJLoader(this.loadingManager);
    }

    startLoading() {
        for(const source of this.sources) {
            if(source.type === 'material') {
                this.loaders.mtlLoader.load(source.path, (file) => {
                    console.log(file);
                    file.preload();
                    console.log(source);
                    if(source.obj) {
                        this.loaders.objLoader.setMaterials(file);
                        this.loaders.objLoader.load(source.obj.path, (file) => {
                            this.sourceLoaded(source.obj, file);
                        });
                    }
                    this.sourceLoaded(source, file);
                });
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;
        this.loaded++;

        if(this.loaded === this.toLoad) {
            this.trigger('ready');
        }
    }
}
