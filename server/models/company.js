import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        postal_address: {
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
        office_address: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 2,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
    });

    Company.associate = (models) => {
        Company.hasMany(models.User, {
            foreignKey: 'company',
            as: 'company',
        });
    };

    return Company;
};
