const express = require('express');
const router = express.Router();

const recordController = require('../controllers/recordsController');
const userController = require('../controllers/userController');
const imageController = require("../controllers/cardController");
const callController = require("../controllers/callSummaryController");

const { verifyToken } = require('../middleware/verifyToken');
const { verifyAdminRole } = require('../middleware/authMiddleware');

//Routes for records
router.get('/list-record', recordController.getAllRecords);
router.get('/record/:Id',  recordController.searchRecords);
router.post('/add-record', recordController.addRecord);
router.put('/update-record/:Id', recordController.updateRecord);
router.delete('/record/:Id', verifyToken, verifyAdminRole, recordController.deleteRecord);

//Routes for users
router.get('/users', verifyToken, verifyAdminRole, userController.getUsers);
router.post('/signup', userController.addUser);
router.post('/login', userController.loginUser);

// Routes for Visiting Cards
router.post('/upload-image', imageController.upload, imageController.uploadImage);
router.get('/image/:Id', imageController.getImage);
router.get('/visiting-cards', imageController.getAllVisitingCards);

// Routes for Call Summary
router.post('/add-call', callController.addCallSummary);
router.get('/call-summaries', callController.getAllCallSummaries);
router.get('/call-summaries/:id', callController.getCallSummaryById);

module.exports = router;
