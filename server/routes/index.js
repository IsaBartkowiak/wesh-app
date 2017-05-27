var express = require('express');
var models = require('../models/index');
var passport = require('passport');


var router = express.Router();

/*****************************************************************************
* AUTHENTIFICATION
/*****************************************************************************/

//login
router.post('/api/users/login/', function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if(err || !user){
      res.status(401).json(info);
    }
    if (user) {
      req.logIn(user, function (err) {
        if(err){
          res.status(401).json(info);
        }
      });
    }
    res.json({ status: req.isAuthenticated() });
  })(req, res, next);
});

//l'utilisateur est connecté ?
router.get('/api/users/loggedin/', function(req, res) { 
  if(req.isAuthenticated()){
    console.log(req.user);
    res.json({"user": req.user});
  }else{
    res.json({"status": "not authenticated"});
  }
}); 

//logout
router.get('/api/users/logout/', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});


/*****************************************************************************
* USERS
/*****************************************************************************/

//Création
router.post('/api/users/', function(req, res) {
  models.User.create({
    email : req.body.email,
    password : req.body.password,
    name: req.body.name,
    lastname:  req.body.lastname,
    biography: req.body.biography
  }).then(function(user) {
   passport.authenticate('local', function(err, user, info) {
    if(err || !user){
      res.status(401).json(info);
    }
    if (user) {
      req.logIn(user, function (err) {
        if(err){
          res.status(401).json(info);
        }else{
          res.json({ status: req.isAuthenticated() });
        }
      });
    }
  })(req, res);
})
  .catch(function (err) {
    res.status(500).send({"status": "error"});
  });
});

//GET
router.get('/api/users/:id',  function(req, res) {
 models.User.find({
    //inclusion des évènements gérés par l'util
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


//Modification
router.put('/api/users/:id',function (req,res) {
  models.User.find({
    where:{
      id: req.params.id,
    }
  }).then(function (user) {
    if (user){
      user.updateAttributes({
        email : req.body.email,
        name: req.body.name,
        lastname:  req.body.lastname,
        biography: req.body.biography
      })
    }
  }).catch(function (err) {
    res.status(500).send({"status":"error"});
  });
});


/*****************************************************************************
* EVENTS
/*****************************************************************************/

//POST
router.post('/api/events/', function(req, res) {
  models.Event.create({
    title: req.body.title,
    description:  req.body.description,
    place: req.body.place,
    UserId : req.body.UserId
  }).then(function(event) {
    res.status(200).send({"status": "success", "id": event.id});
  })
  .catch(function (err) {
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
      attributes: { exclude: ['password'] },
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
  res.status(500).send({"status": "error", "description": err});
});
});


//UPDATE
router.put('/api/events/:id',function (req,res) {
  models.Event.find({
    where:{
      id: req.params.id,
    }
  }).then(function (event) {
    if (event){
      event.updateAttributes({
       title: req.body.title,
       description:  req.body.description,
       place: req.body.place
     }).then(function (event){
      models.Occur.destroy({
        where: {
          EventId : event.id
        }
      });
      res.status(200).send({"status": "success", "id": event.id});
    })
   }
 }).catch(function (err) {
  res.status(500).send({"status":"error"});
});
});

//GET ALL
router.get('/api/events/',  function(req, res) {
 models.Event.findAll({
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
      attributes: { exclude: ['password'] },
      as : 'users'
    }]
  }
  ],
  attributes: { exclude: ['UserId'] }
}).then(function(event) {
  res.json(event);
})
.catch(function (err) {
  res.status(500).send({"status": "error", "description": err});
});
});

//suppression
router.delete('/api/events/:id', function(req, res) {
  
  models.Participate.destroy({
    where:{
      EventId: parseInt(req.params.id)
    }
  });
  
  models.Occur.destroy({
    where:{
      EventId: parseInt(req.params.id)
    }
  }).then(function(nb){
    models.Event.destroy({
     where:{
      id: parseInt(req.params.id)
    }
  }).then(function(nb){
    res.status(200).send({"status": "success"});
  });
})
  .catch(function (err) {
    res.status(500).send({"status": "error"});
  });
});


/*****************************************************************************
* CRENEAU
/*****************************************************************************/

//création
router.post('/api/events/:id/slots/', function(req, res) {
  models.Slot.create({
    date : req.body.date,
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
    res.status(500).send({"status": "error"});
  });
});


/*****************************************************************************
* PARTICIPATIONS
/*****************************************************************************/

//création
router.post('/api/events/:id/participations/', function(req, res) {
  models.Participate.create({
    EventId : parseInt(req.params.id),
    UserId : req.body.userId,
    SlotId : req.body.slotId
  })
  .then(function(part){
    res.status(200).send({"status": "success"});
  })
  .catch(function (err) {
    res.status(500).send({"status": "error"});
  });
});

//suppression
router.delete('/api/participations/:id/user/:userid', function(req, res) {
  models.Participate.destroy({
    where: {
      UserId : parseInt(req.params.userid),
      SlotId : parseInt(req.params.id)
    }
  }).then(function(participation){
    res.status(200).send({"status": "success"});
  })
  .catch(function (err) {
    res.status(500).send({"status": "error"});
  });
});


/*****************************************************************************
* CLOTURE
/*****************************************************************************/
//Quand on choisit un créneau pour terminer l'évènement
router.put('/api/events/:id/close/',function (req,res) {
  console.log(req.body);
  models.Event.find({
    where:{
      id: req.params.id,
    }
  })
  .then(function (event) {
    event.updateAttributes({
     closed: true
   });
     models.Slot.find({
    where:{
      id: parseInt(req.body.id),
    }
  })
  .then(function (slot) {
    slot.updateAttributes({
     choosen: true
   });
      res.status(200).send({"status": "success"});
  })
  .catch(function (err) {
    res.status(500).send({"status":"error"});
  });
  
  })
  .catch(function (err) {
    res.status(500).send({"status":"error"});
  });
});


/*****************************************************************************
* NOTIFICATIONS
/*****************************************************************************/
//création
router.post('/api/notifications/', function(req, res) {
  console.log('test');
  models.Notification.create({
    content : req.body.content,
    type: req.body.type,
    seen: false,
    UserId : req.body.UserId
  })
  .then(function(notif){
    res.status(200).send({"status": "success"});
  })
  .catch(function (err) {
    console.log(err);
    res.status(500).send({"status": "error"});
  });
});

//notifications d'un utilisateur
router.get('/api/users/:id/notifications', function(req, res) {
  models.Notification.findAll({
    where: {
      UserId: req.params.id,
    }
  }).then(function(notif) {
    res.status(200).json(notif);
  })
  .catch(function (err) {
    res.status(500).send({"status": "error"});
  });
});

//lecture
router.put('/api/notifications/:id', function(req, res) {
  models.Notification.find({
    where:{
      id: req.params.id,
    }
  })
  .then(function (notif) {
    notif.updateAttributes({
     seen: true
   });
    res.status(200).send({"status":"success"});
  })
  .catch(function (err) {
    console.log(err);
    res.status(500).send({"status":"error"});
  });
  
});

/*****************************************************************************
* DEFAULT
/*****************************************************************************/
router.get('/*', function(req, res, next) {
 res.send('Wesh API');
});




module.exports = router;
