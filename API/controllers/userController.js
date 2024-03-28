const User = require('../models/userModel')
const vaccination = require("../controllers/vaccinationController");
const Vaccination = require('../models/vaccinationModel')


//Create Read Update Delete
//יש לתמוך בפעולות של הוספת חבר קופה חדש, מחיקה, עריכה של
//חברים קיימים ותשאול מאגר הנתונים לגבי פרטיהם )קריאה של


//לבדוק את הפונקציה הזו
exports.newUser = async (req, res) => {
    try {
        const { identity, firstName, lastName, cellPhone, phone, birthday, cityName, streetName, houseNum } = req.body;
        let myUser = new User({
            identity,
            firstName,
            lastName,
            cellPhone,
            phone,
            birthday,
            cityName,
            streetName,
            houseNum
        }).populate()
        // if (req.body.vaccinations) {
        //     myUser.vaccinations = req.body.vaccinations.map( v => vaccination.createVaccination(v)._id);
        // };
        await myUser.save();
        res.status(200).json({ newUser: myUser });
    }
    catch (error) {
        res.send("Cannot save new user: " + error.message)
    }
}

//חיפוש משתמש לפי id mongoose
exports.findUserById = (req, res) => {
    User.findById(req.params.identity, (err, user) => { }).then((user) => {
        res.status(200).json({ getUserById: user });
    }).catch((err) => {
        res.status(400).send("Cannot find user: " + err.message)
    })
}
//חיפוש משתמש לפי תז
exports.getUserById = (req, res) => {

    User.findOne({ identity: req.params.identity }, (err, user) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(400).send("Cannot find user: " + err.message);
        }
        if (!user) {
            return res.status(404).send("User not found");
        }
    })
    .populate('vaccinations') // Populate the vaccinations field with details from Vaccination schema
    .exec()
    .then((user) => {
        res.status(200).json({ user: user });
    })
    .catch((err) => {
        res.status(500).json({ message: "Failed to return user", error: err.message });
    });    
};


//חיפוש משתמש לפי שם
exports.findUserByName = (req, res) => {
    User.findOne({ name: req.body.name }, (err, user) => { }).then((user) => {
        res.status(200).json({ user: user })
    }).catch((err) => {
        res.status(400).send("Cannot find user: " + err.message);
    })

}

//הצגת כל המשתמשים
exports.getAllUsers = (req, res) => {
    User.find()
    .populate({
        path: 'vaccinations',
        populate: {
            path: 'manufacturer' // Populate the manufacturer field within vaccinations
        }
    }) // Populate the vaccinations field with details from Vaccination schema
        .exec()
        .then((users) => {
            res.status(200).json({ getAllusers: users });
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to return all users", error: err.message });
        });
};

// עדכון חיסונים
async function updateVaccinations(userId, vaccinations) {
    try {
        const user = await User.findOne({ identity: userId });
        if (!user) {
            throw new Error('User not found');
        }
        for (const v of vaccinations) {
            if (v._id) {
                // Update existing vaccination
                const existingVaccination = await Vaccination.findByIdAndUpdate(v._id, v, { new: true });
                if (!existingVaccination) {
                    throw new Error('Vaccination not found');
                }
                console.log('Vaccination updated:', existingVaccination);
            } else {
                // Create new vaccination
                if (user.vaccinations.length >= 4) {
                    throw new Error('Maximum limit of vaccinations reached');
                }        
                const newVaccination = await Vaccination.create(v);
                user.vaccinations.push(newVaccination._id);
                console.log('New vaccination created:', newVaccination);
            }
        }

        await user.save();
        console.log('User vaccinations updated successfully');
    } catch (error) {
        console.error('Error updating user vaccinations:', error);
        throw error; // Propagate the error
    }
}
async function uploadImageByIdentity(req, res) {
    try {
        // Extract image data from req.body
        const data = req.body.image.data;
        const contentType = req.body.image.contentType;

        // Convert data URL to Buffer
        const bufferData = Buffer.from(data.split(';base64,')[1], 'base64');

        // Find the user by some identifier (e.g., userIdentity)
        const user = await User.findOne({ identity: req.params.identity });

        // Update the user document with the image data
        user.image.data = bufferData;
        user.image.contentType = contentType;

        // Save the updated user document
        await user.save();

        // Send response
        // res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateById = async (req, res) => {
    const { firstName, lastName, cellPhone, phone, birthday, cityName, dateRecovery, dateTestPositive, streetName, houseNum } = req.body;
    const updateData = {
        firstName,
        lastName,
        birthday,
        phone,
        cellPhone,
        cityName,
        streetName,
        houseNum,
        dateRecovery,
        dateTestPositive,
    };

    try {
        // Update the user document
        const updatedUser = await User.findOneAndUpdate({ identity: req.params.identity }, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update vaccinations
        await updateVaccinations(req.params.identity, req.body.vaccinations);

        // Upload image
        await uploadImageByIdentity(req, res);

        // Success: Return updated user
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message || 'Failed to update user' });
    }
};
exports.getVaccinations = (req, res) => {
    User.findById(req.params.identity, (err, user) => {
        if (err) {
            res.status(400).send("Cannot find user: " + err.message);
            return;
        }
        res.status(200).json({ vaccinations: user.vaccinations });
    });
};


// לפי   id  מחיקה
exports.deleteUserById = async (req, res) => {
    try {
        let user = await User.findByIdAndDelete({ _id: req.params._id })

        res.send("user deleted" + user)
    }
    catch {
        res.send("Cannot find user")
    }
}


//מחיקה לפי תז
exports.deleteUserByIdentity = async (req, res) => {
    try {
        let user = await User.findOneAndDelete({ identity: req.params.identity })
        res.send("User deleted successfully" + user);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
//מחיקת המשתמש כולל החיסונים שלו
exports.deleteAllUserByIdentity = async (req, res) => {
    try {
        let vaccinations = User.findOne({ identity: req.params.identity }).vaccinations 
        let user = await User.findOneAndDelete({ identity: req.params.identity })
        await vaccination.deleteVaccinations(vaccinations)
        res.send("user deleted" + user)
    }
    catch {
        res.send("Cannot find user")
    }
}


//  //צורה 1
//   try {
//     await currentUser.save()
//     res.status(200).json({ user: currentUser })
//   } catch (error) {
//     res.send("cannot save user: ", error.message)
//   }


//  //צורה 2
//   currentUser.save()
//   .then((user) => {
//     res.status(200).json({ user: user })
//   }).catch((error) => {
//     res.status(400).send(error);
//   })


//  //צורה 3
//   currentUser.save(function (err, user) {
//     if (err)
//       res.status(400).send(err);
//       else
//       res.status(200).json({ user: user })
//   })


exports.getImageByIdentity = async (req, res) => {
    try {
        const user = await User.findOne({ identity: req.params.identity });
        if (!user ) {
            console.log( 'User not found')

            return res.status(404).json({ message: 'User not found' });
        }
        if(!user.image || !user.image.data){
            console.log( 'Image not found')
            return res.status(404).json({ message: 'Image not found' });
        }

        // Send image data back to client
        res.set('Content-Type', user.image.contentType);
        res.send(user.image.data);
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
