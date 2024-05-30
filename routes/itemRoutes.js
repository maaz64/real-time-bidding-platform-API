const express = require('express');
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.post('/', auth, upload.single('image'), itemController.createItem);
router.put('/:id', auth, upload.single('image'), itemController.updateItem);
router.delete('/:id', auth, itemController.deleteItem);

module.exports = router;
