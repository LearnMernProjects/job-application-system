import { Link } from 'react-router-dom'
import './JobCard.css'

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-header">
        <div>
          <h3>{job.title}</h3>
          <p className="job-type">{job.type}</p>
        </div>
      </div>
      <div className="job-body">
        <p className="job-role">
          <strong>Role:</strong> {job.role}
        </p>
        <p className="job-location">
          <strong>Location:</strong> {job.location}
        </p>
        {job.stipend && (
          <p className="job-stipend">
            <strong>Stipend:</strong> ₹{job.stipend}/month
          </p>
        )}
        {job.duration && (
          <p className="job-duration">
            <strong>Duration:</strong> {job.duration}
          </p>
        )}
        <p className="job-description">{job.description.substring(0, 100)}...</p>
        <div className="job-skills">
          {job.skills &&
            job.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="skill-tag">
                {skill}
              </span>
            ))}
          {job.skills && job.skills.length > 3 && (
            <span className="skill-tag">+{job.skills.length - 3} more</span>
          )}
        </div>
      </div>
      <div className="job-footer">
        <Link to={`/jobs/${job._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default JobCard
