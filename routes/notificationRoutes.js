const express = require('express');
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, notificationController.getNotifications);
router.post('/mark-read', auth, notificationController.markRead);

module.exports = router;
