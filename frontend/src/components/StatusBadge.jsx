function StatusBadge({ status }) {
  let className = 'badge'

  switch (status) {
    case 'Applied':
      className += ' badge-primary'
      break
    case 'Shortlisted':
      className += ' badge-warning'
      break
    case 'Selected':
      className += ' badge-success'
      break
    case 'Rejected':
      className += ' badge-danger'
      break
    default:
      className += ' badge-primary'
  }

  return <span className={className}>{status}</span>
}

export default StatusBadge
