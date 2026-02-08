const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc   Create application
// @route  POST /api/applications
exports.createApplication = async (req, res) => {
  try {
    const { jobId, resumeLink, coverNote } = req.body;

    // Validation
    if (!jobId || !resumeLink) {
      return res.status(400).json({ message: 'jobId and resumeLink are required' });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({
      userId: req.user.id,
      jobId,
    });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = await Application.create({
      userId: req.user.id,
      jobId,
      resumeLink,
      coverNote,
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('CreateApplication error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get user applications
// @route  GET /api/applications/me
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .populate('jobId')
      .populate('userId', 'name email');

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error('GetUserApplications error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all applications (admin only)
// @route  GET /api/applications
exports.getAllApplications = async (req, res) => {
  try {
    const { status, jobId } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (jobId) filter.jobId = jobId;

    const applications = await Application.find(filter)
      .populate('jobId')
      .populate('userId', 'name email')
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error('GetAllApplications error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update application status
// @route  PUT /api/applications/:id/status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const validStatuses = ['Applied', 'Shortlisted', 'Selected', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('jobId')
      .populate('userId', 'name email');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('UpdateApplicationStatus error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single application
// @route  GET /api/applications/:id
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobId')
      .populate('userId', 'name email');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('GetApplicationById error:', error);
    res.status(500).json({ message: error.message });
  }
};
