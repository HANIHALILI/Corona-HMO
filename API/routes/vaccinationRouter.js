const router=require("express").Router();
const vaccination=require("../controllers/vaccinationController")

router.get('/getAllVaccinations',vaccination.getAllVaccinations)
router.delete('/deleteVaccination',vaccination.deleteVaccination)
router.put('/updateVaccination',vaccination.updateVaccination)
router.delete('/deleteVaccinations', vaccination.deleteVaccinations);
router.post('/createVaccination', vaccination.createVaccination);


module.exports=router;
