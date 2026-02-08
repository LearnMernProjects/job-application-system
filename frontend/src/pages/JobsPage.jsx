import { useState, useEffect } from 'react'
import api from '../utils/api'
import JobCard from '../components/JobCard'
import FilterBar from '../components/FilterBar'
import './JobsPage.css'

function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    role: '',
    location: '',
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (appliedFilters = null) => {
    try {
      setLoading(true)
      setError('')

      const params = appliedFilters || filters
      const response = await api.get('/jobs', { params })
      setJobs(response.data.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (appliedFilters = null) => {
    fetchJobs(appliedFilters === null ? filters : appliedFilters)
  }

  return (
    <div className="jobs-page">
      <div className="container">
        <h1>Job & Internship Listings</h1>

        <FilterBar filters={filters} setFilters={setFilters} onFilter={handleFilter} />

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="text-center">
            <div className="spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="alert alert-info">No jobs found matching your criteria.</div>
        )}
      </div>
    </div>
  )
}

export default JobsPage
