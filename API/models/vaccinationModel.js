const mongoose = require('mongoose');


const vaccinationSchema = mongoose.Schema({
    dateReceived: { type: Date, required: true },
    manufacturer: {type:mongoose.Schema.Types.ObjectId,ref:'Manufacturer'}

    
});

module.exports = mongoose.model("Vaccination", vaccinationSchema);
