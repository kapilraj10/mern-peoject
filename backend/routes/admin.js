const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { getAdminDashboard, deleteUser } = require('../controllers/adminController');

router.get('/dashboard', isAdmin, getAdminDashboard);
router.delete('/delete-user/:id', isAdmin, deleteUser);

module.exports = router;
