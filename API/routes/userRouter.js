const router = require("express").Router();// הגדרת הנתב שאקספרס מספק לנו וכך יש יכולת לדפדף בין המודולים


const multer = require('multer');

// Multer configuration
const storage = multer.memoryStorage(); // Store files in memory
// const upload = multer({ storage: storage });
const upload  = multer({dest:'uploads/'})


const user = require("../controllers/userController")
const {midNewUser , userExistMiddleware} = require("../midleware/validation.js")
router.post('/newUser',midNewUser, user.newUser);
router.get('/findUserById/:identity', user.findUserById);
router.get('/getVaccinations/:identity', user.getVaccinations);
router.get('/getUserById/:identity', user.getUserById);

router.get('/getAllUsers', user.getAllUsers);
router.get('/findUserByName/:name', user.findUserByName);
router.patch('/updateById/:identity', user.updateById);
router.delete('/deleteUserById/:_id',user.deleteUserById);
router.delete("/deleteAllUserByIdentity/:identity",/*user.userExistMiddleware,*/user.deleteAllUserByIdentity);
router.delete("/deleteUserByIdentity/:identity",/*user.userExistMiddleware,*/user.deleteUserByIdentity);
// router.patch('/updateVaccinations/:identity', user.updateVaccinations)
// router.post('/uploadImage', upload.single('image'),user.uploadImageByIdentity)
router.get('/getImageByIdentity/:identity', user.getImageByIdentity);

module.exports = router;
