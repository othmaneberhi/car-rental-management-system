const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rental.belongsTo(models.Car,{ foreignKey:'car_id'})
      Rental.belongsTo(models.User,{foreignKey:'user_id'})
    }
  }
  Rental.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User ID is required.'
        },
        isInt: {
          msg: 'User ID must be an integer.'
        }
      }
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Car ID is required.'
        },
        isInt: {
          msg: 'Car ID must be an integer.'
        }
      }
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Start date is required.'
        },
        isDate: {
          msg: 'Invalid start date format.'
        }
      }
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'End date is required.'
        },
        isDate: {
          msg: 'Invalid end date format.'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Status is required.'
        },
        isIn: {
          args: [['pending', 'approved', 'rejected']],
          msg: 'Invalid status.'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Rental',
  });

  return Rental;
};