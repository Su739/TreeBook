const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [1, 60]
      }
    },
    writerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    description: {
      type: DataTypes.STRING
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
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
