const Item = require('../models/item');
const { Op } = require('sequelize');

exports.getItems = async (_, res) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description, startingPrice,endTime } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("ID ",req.user.id);
    const item = await Item.create({ name, description, startingPrice, currentPrice: startingPrice,endTime, imageUrl, UserId:req.user.id });
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    if (item.userId !== req.user.id ) {
      return res.status(403).send({ error: 'Access denied' });
    }
    const { name, description, startingPrice, endTime } = req.body;
    item.name = name;
    item.description = description;
    item.startingPrice = startingPrice;
    item.endTime = endTime;
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    if (item.UserId !== req.user.id) {
      return res.status(403).send({ error: 'Access denied' });
    }
    await item.destroy();
    res.send({ message: 'Item deleted' });
  } catch (error) {
    res.status(400).send(error);
  }
};
