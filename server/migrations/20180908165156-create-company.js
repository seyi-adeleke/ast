/*eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      street : {
        allowNull: false,
        type: Sequelize.STRING,
      },
      office_address : {
        allowNull: false,
        type: Sequelize.STRING,
      },
      postal_address : {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
    },
  );

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Companies');
  }
};