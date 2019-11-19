module.exports = function (sequelize, DataTypes){
    return sequelize.define('mischiefs', {
    complaint: DataTypes.STRING, 
    suspect: DataTypes.STRING,
    owner: DataTypes.STRING
    })
    }
    