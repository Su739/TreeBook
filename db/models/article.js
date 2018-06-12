const Book = require('./book');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    superior: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    ispublic: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    writer: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'userName'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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
