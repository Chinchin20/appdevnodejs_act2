
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

let registrations = [
    { id: '1', name: 'John Doe', timeIn: '2024-09-06 08:00', timeOut: '' },
    
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/register-in', (req, res) => {
    res.render('register-in');
});

app.get('/register-out', (req, res) => {
    res.render('register-out');
});

app.get('/view-registrations', (req, res) => {
    res.render('view-registrations', { registrations });
});

app.post('/register-in', (req, res) => {
    const { id, name } = req.body;
    const timeIn = new Date().toISOString();  
    registrations.push({ id, name, timeIn, timeOut: '' });
    res.redirect('/view-registrations');
});

app.post('/register-out', (req, res) => {
    const { id } = req.body;
    const registration = registrations.find(r => r.id === id);
    if (registration) {
        registration.timeOut = new Date().toISOString();  // Current time
    }
    res.redirect('/view-registrations');
});


app.post('/delete-registration', (req, res) => {
    const { id } = req.body;
    registrations = registrations.filter(registration => registration.id !== id);
    res.redirect('/view-registrations');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
