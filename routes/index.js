const express = require('express');
const router = express.Router();


let registrations = [];


router.get('/', (req, res) => {
    res.render('home');
});


router.get('/register-in', (req, res) => {
    res.render('register-in');
});


router.post('/register-in', (req, res) => {
    const { id, name } = req.body;
    const timeIn = new Date().toLocaleString();
    if (id && name) {
        registrations.push({ id, name, timeIn, timeOut: null });
    }
    res.redirect('/view-registrations');
});


router.get('/register-out', (req, res) => {
    res.render('register-out');
});


router.post('/register-out', (req, res) => {
    const { id } = req.body;
    const timeOut = new Date().toLocaleString();
    const registration = registrations.find(r => r.id === id && r.timeOut === null);
    if (registration) {
        registration.timeOut = timeOut;
    }
    res.redirect('/view-registrations');
});


router.get('/view-registrations', (req, res) => {
    res.render('view-registrations', { registrations });
});

module.exports = router;
