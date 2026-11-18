'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuario', 'google_id', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });

    await queryInterface.addColumn('Usuario', 'foto', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Usuario', 'senha', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Usuario', 'google_id');
    await queryInterface.removeColumn('Usuario', 'foto');
  }
};