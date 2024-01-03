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
        // host: 'dpg-cjvkblnhdsdc73fjtdug-a.oregon-postgres.render.com',
        host: 'dpg-cmappaq1hbls73cn1sgg-a.oregon-postgres.render.com',
        // 0UxogwpnAeITgx2z4kWdOHWmGcbHXDxL@dpg-cmappaq1hbls73cn1sgg-a.oregon-postgres.render.com/smart_brain_v7ry
        port: 5432,
        user: 'smart_brain_v7ry_user',
        password: '0UxogwpnAeITgx2z4kWdOHWmGcbHXDxL',
        database: 'smart_brain_v7ry',
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
