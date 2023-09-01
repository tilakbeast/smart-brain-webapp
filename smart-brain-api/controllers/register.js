const handleRegister = (req, res, bcrypt, db) => {

    const { name, email, password } = req.body;
    
    if(!name || !email || !password) {
        return res.status(400).json("incorrect credentials")
    }

    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .then(() => { return trx('login').select('email').where('email', email).then(loginEmail => loginEmail[0].email) })
            .then(loginEmail => {
                return trx('users')
                    .insert({
                        email: loginEmail,
                        name: name,
                        joined: new Date()
                    })
            })
            .then(() => { return trx('users').select('*').where('email', email).then(data => res.json(data[0])) })

            .then(trx.commit)
            .catch(trx.rollback)

    })
        .catch(err => res.status(404).json(err));

}

module.exports = {
    handleRegister: handleRegister
};