const router = require('express').Router();
const userController = require('./controllers/user.controller');
const authMiddleware = require('./middleware/auth.middleware');

router.get('/test', (req, res) => {
    res.send({
        title: "Hello World!",
        description: "Hi there! How are you?"
    });
});

router.post('/login', userController.login);

router.post("/reset-password", userController.resetPassword);

router.get('/users/:username', userController.getUser);
 
router.get('/users', authMiddleware.isAuthorized('readAny', 'user'), userController.getAllUsers);

router.post('/users', authMiddleware.isAuthorized('createAny', 'user'), userController.createUser);

router.put('/users/:userId', authMiddleware.isAuthorized('updateAny', 'user'), userController.updateUser);
 
router.delete('/users/:userId', authMiddleware.isAuthorized('deleteAny', 'user'), userController.deleteUser);

module.exports = router;