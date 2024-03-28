const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    identity:{ type: String , unique: true },
    firstName: { type: String, maxlength: 15, require },
    lastName: { type: String, maxlength: 15, require },
    birthday:{type:Date,require},
    phone:{type:String , require},
    cellPhone:{type:String , require},
    cityName: { type: String,  require },
    streetName: { type: String,  require },
    houseNum:{ type: Number,  require },
    vaccinations:[
        {type:mongoose.Schema.Types.ObjectId,ref:'Vaccination'}
    ],  // לבדוק במודל וויר או ב WEB שלא עבר את ה 4
    dateTestPositive: { type: Date },
    dateRecovery: { type: Date },
    image: {
        data: Buffer, // Store the binary image data
        contentType: String // Store the MIME type of the image
    }}) 


module.exports = mongoose.model("User", userSchema)//יצוא
