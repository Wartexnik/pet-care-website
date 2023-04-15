const Service = require('../models/service');
const PetType = require('../models/pet_type');
const Pet = require('../models/pet');
const Order = require('../models/order');
const { getRandomAnimals } = require('./utils');

const getIndex = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.render('index', { 
            'services': services,
            'session': req.session
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getAbout = async (req, res) => {
    try {
        const services = await Service.findAll();
        const randomAnimals = await getRandomAnimals()
        res.render('about', {
            'services': services,
            'session': req.session,
            'randomAnimals': randomAnimals
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getOrderForm = async (req, res) => {
    try {
        const services = await Service.findAll();
        const petTypes = await PetType.findAll();
        res.render('order', {
            'session': req.session,
            'services': services,
            'petTypes': petTypes
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getMyOrders = async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/');
            return;
        }
        let orders = await Order.findAll({
            include: [
                {
                    model: Pet,
                    where: { owner_id: req.session.user_id },
                    include: [
                        {
                            model: PetType
                        }
                    ]
                },
                {
                    model: Service
                }
            ]
        })
        
        orders = orders.map((order) => {
            return {
                id: order.id,
                service_name: order.Service.name,
                pet: `${order.Pet.name} the ${order.Pet.PetType.name}`,
                comments: order.comments
            }
        })

        const services = await Service.findAll();

        res.render('my-orders', {
            'session': req.session,
            'orders': orders,
            'services': services
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getProfile = async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/');
            return;
        }
        const services = await Service.findAll();
        const pets = await Pet.findAll({
            where: {
                owner_id: req.session.user_id
            },
            include: [
            {
                model: PetType
            }
        ]
        })
        res.render('profile', {
            'session': req.session,
            'services': services,
            'pets': pets
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getService = async (req, res) => {
    try {
        Service.findOne({ where: { slug: req.params.slug } })
        .then(async (service) => {
            if (!service) {
                res.redirect('/');
            } else {
                const randomAnimals = await getRandomAnimals()
                Service.findAll()
                .then((services) => {
                    res.render('service', {
                        'service': service.get({ plain: true }),
                        'session': req.session,
                        'randomAnimals': randomAnimals,
                        'services': services
                    });
                })
                
            }
        })
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getIndex,
    getAbout,
    getOrderForm,
    getMyOrders,
    getProfile,
    getService
};