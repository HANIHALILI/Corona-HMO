const mongoose = require('mongoose');


const manufacturerSchema = mongoose.Schema({
    manufacturerName: { type: String, required: true }
});

module.exports = mongoose.model("Manufacturer", manufacturerSchema);
