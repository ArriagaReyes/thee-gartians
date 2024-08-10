require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const DOMAIN = 'http://192.168.42.11:5173';

const storeItems = new Map([
    [1, { priceInCents: 1000, name: 'Ticket(s)' }]
]);

app.post('/create-checkout-session', async(req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: `${process.env.CLIENT_URL}/`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id);

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                };
            }) 
        });

        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json();
    }

});

app.listen(1234);
