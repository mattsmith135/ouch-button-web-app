const router = require('express').Router(); 
let Client = require('../models/client.model'); 

router.route('/').get((req, res) => {
    Client.find()
        .then(clients => res.json(clients))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newClient = new User({}); 

    newClient.save()
        .then(() => res.json('Client added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

module.exports = router; 