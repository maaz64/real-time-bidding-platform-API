const express = require('express');
const bidController = require('../controllers/bidController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/items/:itemId/bids', bidController.getBids);
router.post('/items/:itemId/bids', auth, bidController.placeBid);

module.exports = router;
