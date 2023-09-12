const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const { handleImage, handleApiCall } = require('./controllers/image');
const { handleProfile } = require('./controllers/profile');

const db = knex({

    client: 'pg',
    connection: {
        host: 'dpg-cjvkblnhdsdc73fjtdug-a.oregon-postgres.render.com',
        port: 5432,
        user: 'smart_brain_w2i2_user',
        password: 'XPuY5hCaH9ynBNdHSxkxJjtlAFnC301v',
        database: 'smart_brain_w2i2',
        ssl: "true"
    }

});

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    db.select('*').from('users')
    .then(data => res("working"))
    .catch(err => res.status(404).json("can't fetch"))
});

// app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)});

app.put('/image', (req, res) => {handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {handleApiCall(req, res)});

app.post('/signin', (req, res) => {handleSignin(req, res, bcrypt, db)});

app.post('/register', (req, res) => {handleRegister(req, res, bcrypt, db)});


app.listen(process.env.PORT || 3001, () => {
    console.log(`app is working on ${process.env.PORT}`);
});
