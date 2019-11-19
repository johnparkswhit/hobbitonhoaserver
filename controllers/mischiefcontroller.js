var router = require('express').Router();
var Mischiefs = require('../db').import('../models/mischiefs');
const validateSession = require('../middleware/validate-session');

module.exports = router;

router.post('/report', validateSession, (req,res) => {
    Mischiefs.create({
        complaint: req.body.complaint,
        suspect: req.body.suspect,
        owner: req.user.username,
        userId: req.user.id
    }).then(
        function createSuccess(mischiefs){
            res.status(200).json({
                mischiefs: mischiefs,
                message: 'Report has been logged',
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})


router.put('/update/:id', validateSession, (req, res) => {
    Mischiefs.update({ 
        complaint: req.body.complaint,
        suspect: req.body.suspect,
        owner: req.user.username,
    },
    {
        where: {
            id : req.params.id,
            owner: req.user.username
        }
    })
        .then(
            updateSuccess = recordsChanged => {
                res.status(200).json({message:'Report Updated'})
            },
            updateFail = err => {
                res.status(500).json({message:'Update failed', error:err})
            }
        );
});


router.get('/', validateSession, (req,res) => {
    Mischiefs.findAll({
        // where: {
        //     owner: req.user.id
        //   }
        include: 'user'
    })
        .then(mischiefs => res.status(200).json(mischiefs))   
        .catch(err => res.status(500).json({error:err}))
})

router.get('/:id', validateSession, (req,res) => {
    console.log(req.params.id, req.user.id)
    Mischiefs.findOne({
        where: {
            id : req.params.id,
            owner: req.user.username,
            userId: req.user.id
        },
        include: 'user'
    })
        .then(mischiefs => res.status(200).json(mischiefs))
        .catch(err => res.status(500).json({error:err}))
})


router.delete('/delete/:id', validateSession, (req, res) => {
    Mischiefs.destroy({
        where: {
            id : req.params.id,
            owner: req.user.username
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