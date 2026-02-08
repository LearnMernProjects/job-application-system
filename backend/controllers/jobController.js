const Job = require('../models/Job');

// @desc   Get all jobs
// @route  GET /api/jobs
exports.getAllJobs = async (req, res) => {
  try {
    const { type, role, location } = req.query;
    let filter = { isActive: true };

    if (type) filter.type = type;
    if (role) filter.role = { $regex: role, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };

    const jobs = await Job.find(filter).populate('createdBy', 'name email');

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error('GetAllJobs error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single job
// @route  GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy', 'name email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('GetJobById error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create job
// @route  POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    const { title, description, skills, type, role, location, stipend, duration } = req.body;

    // Validation
    if (!title || !description || !skills || !type || !role || !location) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const job = await Job.create({
      title,
      description,
      skills,
      type,
      role,
      location,
      stipend,
      duration,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('CreateJob error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update job
// @route  PUT /api/jobs/:id
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the creator
    if (job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('UpdateJob error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete job
// @route  DELETE /api/jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the creator
    if (job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('DeleteJob error:', error);
    res.status(500).json({ message: error.message });
  }
};
