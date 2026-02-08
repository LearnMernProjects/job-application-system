const express = require('express');
const router = express.Router();
const {
  createApplication,
  getUserApplications,
  getAllApplications,
  updateApplicationStatus,
  getApplicationById,
} = require('../controllers/applicationController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.post('/', authMiddleware, createApplication);
router.get('/me', authMiddleware, getUserApplications);
router.get('/:id', authMiddleware, getApplicationById);
router.get('/', authMiddleware, adminMiddleware, getAllApplications);
router.put('/:id/status', authMiddleware, adminMiddleware, updateApplicationStatus);

module.exports = router;
