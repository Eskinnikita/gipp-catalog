const { DataTypes } = require("sequelize");
const Publication = require('./publication')
const sequelize = require("../database");

const Publisher = sequelize.define("Publisher", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  approved: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

Publisher.hasMany(Publication, {
  foreignKey: 'publisherId'
})

module.exports = Publisher;
