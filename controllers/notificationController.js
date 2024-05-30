const { Notification } = require('../models/notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { userId: req.user.id } });
    res.send(notifications);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.markRead = async (req, res) => {
  try {
    const notifications = await Notification.update({ isRead: true }, { where: { userId: req.user.id, isRead: false } });
    res.send({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).send(error);
  }
};
