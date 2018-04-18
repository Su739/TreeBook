const Book = require('./book');
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    depth: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    parent: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    content: {
      type: DataTypes.TEXT
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    public: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};
