import { useState, useEffect, useContext } from 'react'
import api from '../utils/api'
import AuthContext from '../context/AuthContext'
import StatusBadge from '../components/StatusBadge'
import './Dashboard.css'

function UserDashboard() {
  const { token, user } = useContext(AuthContext)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [token])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await api.get('/applications/me')
      setApplications(response.data.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}!</h1>
          <p>Track your job applications and their status</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">{applications.length}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {applications.filter((a) => a.status === 'Shortlisted').length}
            </div>
            <div className="stat-label">Shortlisted</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {applications.filter((a) => a.status === 'Selected').length}
            </div>
            <div className="stat-label">Selected</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {applications.filter((a) => a.status === 'Rejected').length}
            </div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-3">
            <div className="spinner"></div>
            <p>Loading your applications...</p>
          </div>
        ) : applications.length > 0 ? (
          <div className="applications-table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Role</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.jobId.title}</td>
                    <td>{app.jobId.role}</td>
                    <td>{app.jobId.location}</td>
                    <td>
                      <StatusBadge status={app.status} />
                    </td>
                    <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info mt-3">
            <h3>No Applications Yet</h3>
            <p>You haven't applied for any jobs yet. Let's change that!</p>
            <a href="/jobs" className="btn btn-primary">
              Browse Jobs
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
