import "./style.css";
import Experience from './Experience/index.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import Animations from './animations/index.js';

window.onload = (event) => {
    if( WebGL.isWebGL2Available() ) {
        const experience = new Experience(document.getElementById('root'));
    } else {
        const warning = WebGL.getWebGL2ErrorMessage();
        document.getElementById('error').appendChild(warning);
    }

    const animations = new Animations();
}
