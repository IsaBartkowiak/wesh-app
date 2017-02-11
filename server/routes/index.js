var express = require('express');
var models = require('../models/index');


var router = express.Router();


/************
* USERS
************/

//POST
router.post('/api/users/', function(req, res) {
  models.User.create({
    login : req.body.login,
    name: req.body.name,
    lastname:  req.body.lastname,
    biography: req.body.biography
  }).then(function(user) {
    res.status(200).send({"status": "success"});
  })
  .catch(function (err) {
      console.log(err);
    res.status(500).send({"status": "error"});
  });
});


console.log('ggg');
//GET
router.get('/api/users/:id',  function(req, res) {
 models.User.find({
    //inclusion des évènements gérés
    include: [{
        model: models.Event,
        as: 'managed_events'
    },
    //inclusion des évènements auquels l'util a répondu
    {
        model: models.Event,
        through: {attributes: []},
        as: 'participated_events'
    }],
    where: {
      id: req.params.id,
    }
  }).then(function(user) {
    res.json(user);
  })
  .catch(function (err) {
    res.status(500).send({"status": "error"});
  });
});



/************
* EVENTS
************/

//POST
router.post('/api/events/', function(req, res) {
  models.Event.create({
    name: req.body.name,
    description:  req.body.description,
    place: req.body.place,
    UserId : req.body.userId
  }).then(function(event) {
    res.status(200).send({"status": "success"});
  })
  .catch(function (err) {
      console.log(err);
    res.status(500).send({"status": "error"});
  });
});

//GET
router.get('/api/events/:id',  function(req, res) {
 models.Event.find({
    include: [{
      model: models.User,
      as: 'owner'
    },{
      model: models.Slot,
      as : 'slots',
      through: {attributes: []},
      include: [{
        model: models.User,
        through: {attributes: []},
        as : 'users'
      }]
    }
    ],
    attributes: { exclude: ['UserId'] },
    where: {
      id: req.params.id,
    }
  }).then(function(event) {
    res.json(event);
  })
  .catch(function (err) {
    console.log(err);
    res.status(500).send({"status": "error", "description": err});
  });
});


/************
* CRENEAU
************/

//POST
router.post('/api/events/:id/slots/', function(req, res) {
  models.Slot.create({
    date : req.body.date,
    hour: req.body.hour,
    choosen:  false
  }).then(function(slot) {
    models.Occur.create({
      EventId : parseInt(req.params.id),
      SlotId : slot.id
    })
    .then(function(event){
      res.status(200).send({"status": "success"});
    })
    .catch(function (err) {
      res.status(500).send({"status": "error"});
    });
  })
  .catch(function (err) {
    console.log(err);
    res.status(500).send({"status": "error"});
  });
});


/**
* COMPTE
*/

//create
router.post('/compte/create', function(req, res) {
  var status = banque.creerCompte(req.body.id, req.body.somme)
  if(status){ 
    res.status(200).send({"status": "success"});
  }else{
    res.send({"status": "error", "description": "Erreur de création du compte"});
  }
});

//getPosition
router.get('/compte/position/:id',  function(req, res) {
  //res.send('hhhh')
  var compte = banque.positionDuCompte(req.params.id);
  if(compte){
    res.json(compte);
  }else{
    res.send({"status": "error", "description": "Account does not exist"});
  }
});

//add to account
router.post('/compte/add', function(req, res) {
  var status = banque.ajouterAuCompte(req.body.id, req.body.somme);
  if(status){ 
    res.status(200).send({"status": "success"});
  }else{
    res.send({"status": "error", "description": "Erreur d'ajout sur le compte'"});
  }
});

//add to account
router.post('/compte/remove', function(req, res) {
  var status = banque.retirerDuCompte(req.body.id, req.body.somme);
  if(status){ 
    res.status(200).send({"status": "success"});
  }else{
    res.send({"status": "error", "description": "Erreur de retrait sur le compte'"});
  }
});

router.get('/*', function(req, res, next) {
   res.send('API banque');
});




module.exports = router;
