/*eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Users', 'company',
      {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'Companies',
            key: 'id',
            as: 'company',
          }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users', 'company');
  }
};
