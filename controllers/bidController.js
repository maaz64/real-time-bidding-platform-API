const Bid = require('../models/bid');
const Item = require('../models/item');
const { Op } = require('sequelize');

exports.getBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { itemId: req.params.itemId } });
    res.send(bids);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.placeBid = async (req, res) => {
  try {
    const { bidAmount } = req.body;
    const item = await Item.findByPk(req.params.itemId);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    if (new Date(item.endTime) < new Date()) {
      return res.status(400).send({ error: 'Auction has ended' });
    }
    if (bidAmount <= item.currentPrice) {
      return res.status(400).send({ error: 'Bid amount must be higher than the current price' });
    }
    const bid = await Bid.create({ bidAmount, ItemId: req.params.itemId, UserId: req.user.id });
    item.currentPrice = bidAmount;
    await item.save();
    // Emit bid update via WebSocket
    req.app.get('io').emit('update', { ItemId: item.id, bidAmount });
    res.status(201).send(bid);
  } catch (error) {
    res.status(400).send(error);
  }
};
