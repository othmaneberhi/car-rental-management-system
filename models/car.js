const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.hasMany(models.Rental,{foreignKey:'car_id'})
    }
  }
  Car.init({
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Brand is required.'
        },
        notEmpty: {
          msg: 'Brand cannot be empty.'
        }
      }
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Model is required.'
        },
        notEmpty: {
          msg: 'Model cannot be empty.'
        }
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Year is required.'
        },
        isInt: {
          msg: 'Year must be an integer.'
        }
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Color is required.'
        },
        notEmpty: {
          msg: 'Color cannot be empty.'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required.'
        },
        isDecimal: {
          msg: 'Price must be a decimal number.'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Status is required.'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Car',
  });



  return Car;
};