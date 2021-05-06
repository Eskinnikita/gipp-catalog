const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Organ = sequelize.define("Organ", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = Organ;
