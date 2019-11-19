var router = require('express').Router();
var UserInfo = require('../db').import('../models/userinfo');
var User = require('../db').import('../models/user')
const validateSession = require('../middleware/validate-session');

module.exports = router;

router.post('/createUserInfo', validateSession, function(req,res){
    UserInfo.create({
        testInfo : req.body.testInfo,
        userId: req.user.id,
        owner: req.user.id
    }).then(
        function createSuccess(userinfo){
            res.status(200).json({
                userinfo: userinfo,
                message: 'User Info Created',
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})

router.get('/getuserinfo', validateSession, (req,res) => {
    UserInfo.findAll({
        // where: {
        //     userId: req.user.id
        // },
        include: 'user'
    })
    .then (function createSuccess(data) {
        res.status(200).json({
            message:'User Info Found',
            data:data
        })
    }).catch(err => res.status(500).json('User Info not found', err))
})

router.get('/getuser', validateSession, (req, res) => {
    User.findAll({ 
        // where: {
        //     owner:req.user.id
        // }, 
        include: ['mischiefs', 'homes']
    })
        .then(info => res.status(200).json(info))
        .catch(err => res.status(500).json(err))
})
