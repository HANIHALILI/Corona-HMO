const User = require('../models/userModel'); // Assuming you have a User model
exports.midNewUser = (req, res, next) => {
    const nullValues = Object.entries(req.body).filter(([key, value]) => key!="dateRecovery"&&key!="dateTestPositive"&& value === null);
    if (nullValues.length > 0) {
      return res.status(400).json({ error: 'The request body cannot contain null values' });
    }
    else {
        next()
    }
}
exports.userExistMiddleware = async (req, res, next) => {
    const { identity } = req.params;
    try {
        const user = await User.findOne({ identity });
        if (user) {
            next(); // User exists, proceed to the next middleware or route handler
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
