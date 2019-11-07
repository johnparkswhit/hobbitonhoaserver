
const Sequelize = require('sequelize');

const sequelize = new Sequelize('hobbiton', 'postgres', 'Rska2017!', {
    host: 'localhost', 
    dialect: 'postgres' 
});

sequelize.authenticate().then(
    function() { 
        console.log('Connected to hobbiton postgres database');
    },
    function(err){ 
        console.log(err);
    }
);

module.exports = sequelize;
