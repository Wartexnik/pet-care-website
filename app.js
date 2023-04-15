const express = require('express');
const session = require('express-session');
const path = require('path');
require('mysql2');
require('dotenv').config();

const sequelize = require('./config/database');
const viewRouter = require('./routes/view');
const userRouter = require('./routes/user');
const petRouter = require('./routes/pet');
const petTypeRouter = require('./routes/pet_type');
const serviceRouter = require('./routes/service');
const orderRouter = require('./routes/order');


const app = express()

app.use(express.static(path.join(__dirname, 'static')));
app.use((req, res, next) => {
    if (req.originalUrl === "/payment-completed") {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use(session({
    secret: "j3C^^wTF2op722iP",
    saveUninitialized: true,
    resave: false
}));
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'static', 'templates'))

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });



app.use('/', viewRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/pets', petRouter);
app.use('/api/pet-types', petTypeRouter);
app.use('/api/services', serviceRouter);
app.use((_, res) => {
    res.redirect('/');
});

process
.on('unhandledRejection', (err, origin) => {
    console.error(`Unhandled Rejection at ${origin}: ${err}`);
})
.on('uncaughtException', (err, origin) => {
    console.error(`Uncaught Exception at ${origin}: ${err}`);
    process.exit(1);
});

app.listen(process.env.SERVER_PORT)