/*eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
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
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      home_address : {
        allowNull: false,
        type: Sequelize.STRING,
      },
      postal_address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customer_type: {
        defaultValue: 'platinum',
        type: Sequelize.ENUM('platinum', 'gold', 'silver'),
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    return queryInterface.dropTable('Users');
  }
};