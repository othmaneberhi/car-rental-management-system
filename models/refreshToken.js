const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RefreshToken extends Model {
        static associate(models) {

        }
    }

    RefreshToken.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'User ID is required.',
                    },
                    isInt: {
                        msg: 'User ID must be an integer.',
                    },
                },
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'RefreshToken',
            paranoid: true
        }
    );

    return RefreshToken;
};
