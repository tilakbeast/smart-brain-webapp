const handleSignin = (req, res, bcrypt, db) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json("incorrect credentials");
    }

    db.select('email', 'hash').from('login').where('email', '=', email)
    .then(data => data[0])
    .then((data) => {
        if(bcrypt.compareSync(password, data.hash)) {
            return db.select('*').from('users').where({email: data.email})
            .then(users => res.json(users[0]))
            .catch(err => res.status(400).json('unable to fetch'))
        }
        else {
            return res.status(404).json('wrong credentials');
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}



module.exports = {
    handleSignin: handleSignin
};