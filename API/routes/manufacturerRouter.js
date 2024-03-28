const router=require("express").Router();
const manufacturer=require("../controllers/manufacturerController")

router.get('/getAllManufacturers',manufacturer.getAllManufacturers)
router.delete('/deleteManufacturer',manufacturer.deleteManufacturer)
router.put('/updateManufacturer',manufacturer.updateManufacturer)
router.delete('/deleteManufacturers', manufacturer.deleteManufacturers);
router.post('/createManufacturer', manufacturer.createManufacturer);
router.post('/createManufacturers', manufacturer.createManufacturers);



module.exports=router;
