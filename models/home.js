module.exports = function (sequelize, DataTypes){
    return sequelize.define('home', {
    firstName: DataTypes.STRING, 
    lastName: DataTypes.STRING, 
    address: DataTypes.STRING,
    occupation: DataTypes.STRING,
    publicMessage: DataTypes.STRING,
    emergencyContact: DataTypes.STRING,
    owner: DataTypes.INTEGER
    })
    }
    