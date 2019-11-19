
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
.then(() => console.log('Connected to postgres database'))
.catch(err => console.log(err))

User = sequelize.import('./models/user');
UserInfo = sequelize.import('./models/userinfo');
Home = sequelize.import('./models/home')
Mischiefs = sequelize.import('./models/mischiefs')

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

Home.belongsTo(User);
User.hasMany(Home);

Mischiefs.belongsTo(User);
User.hasMany(Mischiefs)

module.exports = sequelize;
