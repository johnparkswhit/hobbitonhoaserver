var router = require('express').Router();
var Home = require('../db').import('../models/home');
const validateSession = require('../middleware/validate-session');

module.exports = router;

router.post('/create', validateSession, (req,res) => {
    Home.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address, 
        occupation: req.body.occupation,
        publicMessage: req.body.publicMessage,
        emergencyContact: req.body.emergencyContact,
        owner: req.user.id,
    }).then(
        function createSuccess(home){
            res.status(200).json({
                home: home,
                message: 'Home Created',
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})


router.put('/update/:id', validateSession, (req, res) => {
    Home.update({ 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address, 
        occupation: req.body.occupation,
        publicMessage: req.body.publicMessage,
        emergencyContact: req.body.emergencyContact,
        owner: req.body.owner
    },
    {
        where: {id: req.params.id}
    })
        .then(
            updateSuccess = recordsChanged => {
                res.status(200).json({message:'Home updated'})
            },
            updateFail = err => {
                res.status(500).json({message:'Update failed', error:err})
            }
        );
});


router.get('/dir', validateSession, (req,res) => {
    Home.findAll({
        where: {
            owner: req.user.id
          }
    })
        .then(home => res.status(200).json(home))   
        .catch(err => res.status(500).json({error:err}))
})

router.get('/dir/:id', validateSession, (req,res) => {
    console.log(req.params.id, req.user.id)
    Home.findOne({
        where: {
            id : req.params.id,
            owner: req.user.id
        }
    })
        .then(home => res.status(200).json(home))
        .catch(err => res.status(500).json({error:err}))
})


router.delete('/delete/:id', validateSession, (req, res) => {
    Home.destroy({
        where: {
            id : req.params.id,
            owner: req.user.id
        }
    })
      .then(
        deleteSuccess = recordsChanged => {  
            res.status(200).json({message: `${recordsChanged} record(s) deleted.`})
        },
        deleteFail = err => {
            res.status(500).json({ message: 'Failed to delete', error:err})
        }
)});