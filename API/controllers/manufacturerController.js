const Manufacturer = require('../models/manufacturerModel')
exports.createManufacturer = async (req, res) => {
    console.log(req.body)
    try {
        const { manufacturerName } = req.body; // Assuming dateReceived and manufacturerName are the properties of the vaccination
        const newManufacturer = await Manufacturer.create({ manufacturerName });
        res.status(201).json(newManufacturer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createManufacturers = async (req, res) => {
    console.log(req.body)
    try {
        const { manufacturerNamesEnum } = req.body; // Assuming the JSON is structured as { "manufacturerNamesEnum": [...] }
        
        // Iterate over the manufacturer names array and create new manufacturers
        const newManufacturers = await Promise.all(manufacturerNamesEnum.map(async (manufacturer) => {
            const newManufacturer = await Manufacturer.create({ manufacturerName: manufacturer.manufacturerName });
            return newManufacturer;
        }));
        
        res.status(201).json(newManufacturers); // Respond with an array of created manufacturers
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getAllManufacturers = (req, res) => {

    Manufacturer.find().then((manufacturers) => {
        res.status(200).json({ getAllManufacturers: manufacturers })
    }).catch((err) => {
        res.send("Failed to return all manufacturers: " + err.message)
    })
}


exports.updateManufacturer = async (filter, update) => {
    try {
        const updatedManufacturer = await Manufacturer.findOneAndUpdate(filter, update, { new: true });
        return updatedManufacturer;
    } catch (error) {
        console.error('Error updating manufacturer:', error);
        throw error;
    }
};

exports.deleteManufacturer = async (req , res) => {
    try {
        const deleteManufacturer = await Manufacturer.findOneAndDelete({_id:req.body._id});
        return deleteManufacturer;
    } catch (error) {
        console.error('Error delete manufacturer:', error);
        throw error;
    }
};

exports.deleteManufacturers = async (req, res) => {
    const manufacturers = req.body.manufacturers;
    try {
        const deletePromises = manufacturers.map(v => Manufacturer.findOneAndDelete({ _id: v._id }));
        const deletedManufacturers = await Promise.all(deletePromises);
        return res.status(200).json({ message: 'Manufacturers deleted successfully', deletedManufacturers });
    } catch (error) {
        console.error('Error deleting manufacturers:', error);
        return res.status(500).json({ error: 'Error deleting manufacturers' });
    }
};
