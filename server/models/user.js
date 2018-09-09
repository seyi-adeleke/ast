import bcrypt from 'bcrypt';
import utitlity from '../utils/Utilities';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        postal_address: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        phone_number: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        street: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        home_address: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 2,
        },
        customer_type: {
            allowNull: false,
            defaultValue: 'platinum',
            type: DataTypes.ENUM('platinum', 'gold', 'silver'),
        },
        role: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 2,
        },
        company: {
            allowNull: true,
            type: DataTypes.INTEGER,
          }
    }, {
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(user.password, salt);
                user.password = hash;
            },
        },
    });

    User.associate = (models) => {
        User.belongsTo(models.Company, {
            foreignKey: 'company',
            onDelete: 'CASCADE',
        });
    };

    return User;
};
