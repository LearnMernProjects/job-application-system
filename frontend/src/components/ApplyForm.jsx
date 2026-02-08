import { useState } from 'react'
import './ApplyForm.css'

function ApplyForm({ jobId, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    resumeLink: '',
    coverNote: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.resumeLink.trim()) {
      setError('Resume link is required')
      return
    }

    try {
      await onSubmit({ ...formData, jobId })
      setSuccess('Application submitted successfully!')
      setFormData({ resumeLink: '', coverNote: '' })
    } catch (err) {
      setError(err.message || 'Error submitting application')
    }
  }

  return (
    <form className="apply-form" onSubmit={handleSubmit}>
      <h3>Apply for this position</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="form-group">
        <label htmlFor="resumeLink">Resume Link *</label>
        <input
          type="url"
          id="resumeLink"
          name="resumeLink"
          placeholder="https://example.com/resume.pdf"
          value={formData.resumeLink}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="coverNote">Cover Note</label>
        <textarea
          id="coverNote"
          name="coverNote"
          placeholder="Tell us why you're interested in this position..."
          value={formData.coverNote}
          onChange={handleChange}
          rows="5"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  )
}

export default ApplyForm
