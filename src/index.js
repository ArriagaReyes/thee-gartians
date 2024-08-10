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

    const quantity = document.getElementById('quantity');


    const checkout = document.getElementById('checkout-button');
    checkout.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Checking out');

        fetch('http://192.168.42.11:1234/create-checkout-session', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    { id: 1, quantity: Number(quantity.value) }
                ]
            }),
        }).then(res => {
            if(res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        }).then(({ url }) => {
            window.location = url;
        }).catch(e => {
            console.error(e.error);
        });
    });
}
