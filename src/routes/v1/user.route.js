const express = require('express');
const userController = require('../../controllers/UserController');
const router = express.Router();
router.post('/signup',userController.signup);
router.post('/login', userController.login);
router.post('/isEmailVerified', userController.verifyEmail);
router.get('/getUsers', userController.getUsers);

module.exports = router;