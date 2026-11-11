const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../instances/mysql');

class HistoricoClima extends Model {}

HistoricoClima.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  temperatura: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'HistoricoClima',
  tableName: 'historico_clima',
  timestamps: true,
});

module.exports = HistoricoClima;