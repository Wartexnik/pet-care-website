const Stripe = require('stripe');
require('dotenv').config();

const Order = require('../models/order');
const Pet = require('../models/pet');
const PetType = require('../models/pet_type');
const Service = require('../models/service');
const User = require('../models/user');

const stripe = Stripe(process.env.STRIPE_API_KEY);

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const createOrder = async (req, res) => {
    try {
        const { pet_type_id, service_id, pet_name, phone, comments } = req.body
        let petType = await PetType.findByPk(pet_type_id)
        petType = petType.get({ plain: true })
        let service = await Service.findByPk(service_id)
        service = service.get({ plain: true })
        const product = await stripe.products.create({
            name: `${service.name} for ${pet_name} the ${petType.name}`,
            metadata: {
                'user_id': req.session.user_id,
                'pet_name': pet_name,
                'pet_type_id': pet_type_id,
                'service_id': service_id,
                'phone': phone,
                'comments': comments,
            }
        })
        const price = await stripe.prices.create({
            currency: 'uah',
            unit_amount: petType.price_mod + service.base_price,
            product: product['id']
        });
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.DOMAIN}/my-orders`,
            cancel_url: `${process.env.DOMAIN}/order`,
            line_items: [
                { price: price['id'], quantity: 1 },
            ],
            mode: 'payment',
        });
        res.json({ url: session.url })
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const confirmOrder = async (req, res) => {
    try {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_KEY);
        } catch (err) {
            res.status(401).json({ msg: 'This request didn\'t come from Stripe' });
        }
        if (event.type === 'checkout.session.completed') {
            const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
                expand: ['line_items.data'],
            });
                
            session.line_items.data.forEach(async (item) => {
                const product = await stripe.products.retrieve(
                    item['price']['product']
                )
                const metadata = product['metadata']

                const user = await User.findByPk(metadata['user_id']);

                if (user) {
                    User.update(
                        { phone: metadata['phone'] },
                        { where: { id: metadata['user_id'] } }
                    )
                }

                const pet = await Pet.create({
                    name: metadata['pet_name'],
                    pet_type_id: metadata['pet_type_id'],
                    owner_id: metadata['user_id']
                })
                const order = await Order.create({
                    service_id: metadata['service_id'],
                    pet_id: pet.id,
                    comments: metadata['comments']
                })
            })
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    confirmOrder
};