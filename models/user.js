const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Rental,{foreignKey:'user_id'})
      User.hasOne(models.Account,{foreignKey:'user_id'})
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required.'
        },
        notEmpty: {
          msg: 'First name cannot be empty.'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required.'
        },
        notEmpty: {
          msg: 'Last name cannot be empty.'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone is required.'
        },
        notEmpty: {
          msg: 'Phone cannot be empty.'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required.'
        },
        notEmpty: {
          msg: 'Email cannot be empty.'
        },
        isEmail: {
          msg: 'Invalid email format.'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Address cannot be empty.'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },

  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};