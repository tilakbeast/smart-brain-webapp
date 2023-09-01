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

    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Tilak884%',
        database: 'smart_brain'
    }
});

app.use(express.json());
app.use(cors());



// app.get('/', (req, res) => {
//     res.send(database.users)
// });

// app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)});

app.put('/image', (req, res) => {handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {handleApiCall(req, res)});


app.post('/signin', (req, res) => {handleSignin(req, res, bcrypt, db)});

app.post('/register', (req, res) => {handleRegister(req, res, bcrypt, db)});


app.listen(3001, () => {
    console.log('app is working');
});
