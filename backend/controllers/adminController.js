const User = require('../models/user-model');

const getAdminDashboard = (req, res) => {
    res.send('Welcome to the Admin Dashboard!');
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = { getAdminDashboard, deleteUser };
