const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Review = sequelize.define("Review", {
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
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = User;
