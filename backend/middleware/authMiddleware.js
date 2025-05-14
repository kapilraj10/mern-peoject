const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const isAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'your-secret-key');
        const user = await User.findOne({ _id: decoded._id });

        if (!user || user.role !== 'admin') {
            return res.status(403).send({ error: 'Access denied. Admins only.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = { isAdmin };
