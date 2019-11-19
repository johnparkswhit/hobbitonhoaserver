module.exports = function (sequelize, DataTypes) {
    return sequelize.define('userinfo', {
        testInfo : DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}