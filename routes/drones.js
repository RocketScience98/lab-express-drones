const express = require('express');
const Drone = require("../models/Drone.model")
// require the Drone model here

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then(dronesFromDb => {
      console.log('drones:', dronesFromDb)
      res.render('drones/list',{drones: dronesFromDb})
    }).catch(e => {
      console.log('Error while getting drones from Db')
      next(e)
    })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form")
  
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  
    // console.log(req.body);
    const { name, propellers, maxSpeed, image } = req.body;
   
    Drone.create({ name, propellers, maxSpeed, image })
      .then(droneFromDB =>{ 
        console.log(`New drone created: ${droneFromDB.title}.`)
        res.redirect("/drones")
      })
      .catch(error => {
        console.log(`Error while creating a new drone:`, error)
        res.render("drones/create-form")
      });
  });


  router.get('/drones/:id/edit', (req, res, next) => {
    // Iteration #4: Update the drone
    // ... your code here
    const { id } = req.params
    Drone.findById(id)
      .then((droneToEdit => {
        console.log('drone edited', droneToEdit)
        res.render('drones/update-form', { drone: droneToEdit })
      }))
      .catch(e => next(e))
  });

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params
  const { name, propellers, maxSpeed, image } = req.body
  Drone.findByIdAndUpdate(id, { name:name, propellers:propellers, maxSpeed:maxSpeed, image:image },{new: true})
    .then(updatedDrone => {
      res.redirect(`/drones`)
      console.log('update:', updatedDrone)
    })
    .catch(e => console.log('There was an error while updating the drone'))
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const { id } = req.params
  Drone.findByIdAndDelete(id)
    .then(deletedDrone => {
      res.redirect(`/drones`)
      console.log('deleted:', deletedDrone)
    })
    .catch(e => console.log('There was an error while deleting the drone'))
});
module.exports = router;
