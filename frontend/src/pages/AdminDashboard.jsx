import { useState, useEffect, useContext } from 'react'
import api from '../utils/api'
import AuthContext from '../context/AuthContext'
import StatusBadge from '../components/StatusBadge'
import './Dashboard.css'

function AdminDashboard() {
  const { token, user } = useContext(AuthContext)
  const [applications, setApplications] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    jobId: '',
  })
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    fetchData()
  }, [token])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [appsRes, jobsRes] = await Promise.all([
        api.get('/applications'),
        api.get('/jobs'),
      ])
      setApplications(appsRes.data.data || [])
      setJobs(jobsRes.data.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleApplyFilters = async () => {
    try {
      setLoading(true)
      const response = await api.get('/applications', {
        params: filters,
      })
      setApplications(response.data.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (appId, newStatus) => {
    try {
      setUpdatingId(appId)
      const response = await api.put(`/applications/${appId}/status`, {
        status: newStatus,
      })
      setApplications((prev) =>
        prev.map((app) => (app._id === appId ? response.data.data : app))
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage job applications and track applicant status</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="filter-section">
          <h3>Filters</h3>
          <div className="filter-controls">
            <div className="filter-group">
              <label>Status:</label>
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Job:</label>
              <select name="jobId" value={filters.jobId} onChange={handleFilterChange}>
                <option value="">All Jobs</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary" onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-3">
            <div className="spinner"></div>
            <p>Loading applications...</p>
          </div>
        ) : applications.length > 0 ? (
          <div className="applications-table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Applicant Email</th>
                  <th>Job Title</th>
                  <th>Applied Date</th>
                  <th>Current Status</th>
                  <th>Update Status</th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.userId.name}</td>
                    <td>{app.userId.email}</td>
                    <td>{app.jobId.title}</td>
                    <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td>
                      <StatusBadge status={app.status} />
                    </td>
                    <td>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        disabled={updatingId === app._id}
                        className="status-select"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <a
                        href={app.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info mt-3">No applications found with the selected filters.</div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
