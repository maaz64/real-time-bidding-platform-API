const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Item = require('./item');
const Bid = require('./bid');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

User.hasMany(Item, {
});
Item.belongsTo(User);

User.hasMany(Bid, {
});
Bid.belongsTo(User);



module.exports = User;
