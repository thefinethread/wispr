const { Router } = require('express');
const { saveMessage } = require('../controllers/message.controller');

const router = Router();

router.post('/', saveMessage);

module.exports = router;
