const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');
const Item = require('./item');

const Bid = sequelize.define('Bid', {
  bidAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

Item.hasMany(Bid, {
});
Bid.belongsTo(Item);

module.exports = Bid;
