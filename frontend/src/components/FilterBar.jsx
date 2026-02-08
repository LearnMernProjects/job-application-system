import './FilterBar.css'

function FilterBar({ filters, setFilters, onFilter }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleApplyFilter = () => {
    onFilter()
  }

  const handleReset = () => {
    setFilters({ type: '', role: '', location: '' })
    onFilter(null)
  }

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Type:</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">All Types</option>
          <option value="Internship">Internship</option>
          <option value="Job">Job</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Role:</label>
        <input
          type="text"
          name="role"
          placeholder="Search role..."
          value={filters.role}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Location:</label>
        <input
          type="text"
          name="location"
          placeholder="Search location..."
          value={filters.location}
          onChange={handleChange}
        />
      </div>

      <div className="filter-actions">
        <button className="btn btn-primary" onClick={handleApplyFilter}>
          Apply Filters
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default FilterBar
