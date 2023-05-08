const router = require('express').Router(); 
let Therapist = require('../models/therapist.model'); 

router.route('/').get((req, res) => {
    Therapist.find()
        .then(therapists => res.json(therapists))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newTherapist = new Therapist({username}); 

    newTherapist.save()
        .then(() => res.json('Therapist added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

module.exports = router; 