const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'fbb6a809a1ec4a249d33f5a57055c7e6'
  });

const handleApiCall = (req, res) => {
    app.models.predict({
        // id: "a403429f2ddf4b49b307e318f00e528b",
        id: "6dc7e46bc9124c5c8824be4822abe105",
        version: "34ce21a40cc24b6b96ffee54aabff139",
      }, req.body.input)

    .then(data => res.json(data))
    .catch(err => res.status(400).json(err))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where({ id: id })
        .increment('entries', 1)

        .then(() => {
            db('users').where({ id: id }).select('entries').then(ent => res.json(ent[0].entries))
        })

        .catch(err => res.status(404).json(err));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};