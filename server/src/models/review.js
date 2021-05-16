const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Publisher = require("../models/publisher")
const User = require("../models/user")
const Organ = require("../models/organization")

const Review = sequelize.define("Review", {
  reviewerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  publicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reviewerRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

Review.belongsTo(Publisher, {foreignKey: 'reviewerId'})
Review.belongsTo(Organ, {foreignKey: 'reviewerId'})
Review.belongsTo(User, {foreignKey: 'reviewerId'})

module.exports = Review;
