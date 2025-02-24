const express = require('express');
const router = express.Router();
const personalController = require('../controllers/personalController');

router.get('/', personalController.list);
router.get('/create', personalController.createView);
router.post('/create', personalController.create);
router.get('/edit/:id', personalController.editView);
router.post('/edit/:id', personalController.update);
router.get('/delete/:id', personalController.delete);

module.exports = router;
