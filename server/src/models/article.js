const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Article = sequelize.define("Article", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mainImageUrl: {
    type: DataTypes.STRING,
  },
  blocks: {
    type: DataTypes.JSON
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  authorRole: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Article;
