import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import AuthContext from '../context/AuthContext'
import ApplyForm from '../components/ApplyForm'
import './JobDetailPage.css'

function JobDetailPage() {
  const { id } = useParams()
  const { user, token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    fetchJobDetails()
    if (user) {
      checkIfApplied()
    }
  }, [id, user])

  const fetchJobDetails = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/jobs/${id}`)
      setJob(response.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load job details')
    } finally {
      setLoading(false)
    }
  }

  const checkIfApplied = async () => {
    try {
      const response = await api.get('/applications/me')
      const applications = response.data.data || []
      const applied = applications.some((app) => app.jobId._id === id)
      setHasApplied(applied)
    } catch (err) {
      console.log('Error checking applications')
    }
  }

  const handleApply = async (formData) => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      setIsApplying(true)
      await api.post('/applications', formData)
      setHasApplied(true)
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to submit application')
    } finally {
      setIsApplying(false)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div className="text-center mt-3">
          <div className="spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div className="alert alert-danger mt-3">{error}</div>
        <button onClick={() => navigate('/jobs')} className="btn btn-secondary">
          Back to Jobs
        </button>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div className="alert alert-info mt-3">Job not found</div>
        <button onClick={() => navigate('/jobs')} className="btn btn-secondary">
          Back to Jobs
        </button>
      </div>
    )
  }

  return (
    <div className="job-detail-page">
      <div className="container">
        <button onClick={() => navigate('/jobs')} className="btn btn-secondary mb-3">
          ← Back to Jobs
        </button>

        <div className="job-detail-layout">
          <div className="job-detail-content">
            <div className="job-detail-card">
              <div className="job-detail-header">
                <div>
                  <h1>{job.title}</h1>
                  <p className="job-type-label">{job.type}</p>
                </div>
              </div>

              <div className="job-info-grid">
                <div className="info-item">
                  <label>Role:</label>
                  <p>{job.role}</p>
                </div>
                <div className="info-item">
                  <label>Location:</label>
                  <p>{job.location}</p>
                </div>
                {job.stipend && (
                  <div className="info-item">
                    <label>Stipend:</label>
                    <p>₹{job.stipend}/month</p>
                  </div>
                )}
                {job.duration && (
                  <div className="info-item">
                    <label>Duration:</label>
                    <p>{job.duration}</p>
                  </div>
                )}
              </div>

              <div className="job-description-section">
                <h2>About this Position</h2>
                <p>{job.description}</p>
              </div>

              {job.skills && job.skills.length > 0 && (
                <div className="job-skills-section">
                  <h2>Required Skills</h2>
                  <div className="skills-list">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="job-apply-section">
            {hasApplied ? (
              <div className="alert alert-info">
                <h3>✓ Application Submitted</h3>
                <p>You have already applied for this position. Check your dashboard for updates.</p>
              </div>
            ) : user ? (
              <ApplyForm jobId={id} onSubmit={handleApply} isSubmitting={isApplying} />
            ) : (
              <div className="alert alert-info">
                <h3>Login Required</h3>
                <p>Please log in to apply for this position.</p>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '12px' }}
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailPage
