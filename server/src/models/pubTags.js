const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const PubTag = sequelize.define("PubTag", {
  tag: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = PubTag;
