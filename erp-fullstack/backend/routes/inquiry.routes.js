const express = require('express');
const router = express.Router();
const inquiryCtrl = require('../controllers/inquiry.controller');
const auth = require('../middleware/auth');
const { validate } = require('../middleware/validator');
const { createInquiry, updateInquiry } = require('../validators/inquiry.validator');

router.use(auth);

router.post('/', validate(createInquiry), inquiryCtrl.createInquiry);
router.get('/', inquiryCtrl.getInquiries);
router.get('/:id', inquiryCtrl.getInquiry);
router.put('/:id', validate(updateInquiry), inquiryCtrl.updateInquiry);
router.delete('/:id', inquiryCtrl.deleteInquiry);

module.exports = router;
