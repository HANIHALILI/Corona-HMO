const Vaccination = require('../models/vaccinationModel')
exports.createVaccination = async (req, res) => {
    console.log(req.body)
    try {
        const { dateReceived, manufacturer } = req.body; // Assuming dateReceived and manufacturerName are the properties of the vaccination
        const newVaccination = await Vaccination.create({ dateReceived, manufacturer });
        res.status(201).json(newVaccination);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getAllVaccinations = (req, res) => {

    Vaccination.find().then((vaccinations) => {
        res.status(200).json({ getAllvaccinations: vaccinations })
    }).catch((err) => {
        res.send("Failed to return all vaccinations: " + err.message)
    })
}


exports.updateVaccination = async (filter, update) => {
    try {
        const updatedVaccination = await Vaccination.findOneAndUpdate(filter, update, { new: true });
        return updatedVaccination;
    } catch (error) {
        console.error('Error updating vaccination:', error);
        throw error;
    }
};

exports.deleteVaccination = async (req , res) => {
    try {
        const deleteVaccination = await Vaccination.findOneAndDelete({_id:req.body._id});
        return deleteVaccination;
    } catch (error) {
        console.error('Error delete vaccination:', error);
        throw error;
    }
};

exports.deleteVaccinations = async (req, res) => {
    const vaccinations = req.body.vaccinations;
    try {
        const deletePromises = vaccinations.map(v => Vaccination.findOneAndDelete({ _id: v._id }));
        const deletedVaccinations = await Promise.all(deletePromises);
        return res.status(200).json({ message: 'Vaccinations deleted successfully', deletedVaccinations });
    } catch (error) {
        console.error('Error deleting vaccinations:', error);
        return res.status(500).json({ error: 'Error deleting vaccinations' });
    }
};
