import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './LandingPage.css'

function LandingPage() {
  const { user } = useContext(AuthContext)

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Job or Internship</h1>
          <p>
            Connect with top companies and launch your career with the best opportunities
          </p>
          <div className="hero-buttons">
            <Link to="/jobs" className="btn btn-primary btn-lg">
              Explore Opportunities
            </Link>
            {!user && (
              <Link to="/signup" className="btn btn-secondary btn-lg">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Easy Application</h3>
              <p>Apply to multiple jobs with just a few clicks. Track all your applications in one place.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Real-time Updates</h3>
              <p>Get instant notifications on your application status and new job postings.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Matching</h3>
              <p>Find jobs that match your skills and interests using our advanced filtering.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Top Companies</h3>
              <p>Browse opportunities from leading companies and startups in your field.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          {!user ? (
            <div className="cta-buttons">
              <Link to="/login" className="btn btn-primary btn-lg">
                Login
              </Link>
              <Link to="/signup" className="btn btn-success btn-lg">
                Create Account
              </Link>
            </div>
          ) : (
            <p>Welcome back! Check out our latest opportunities.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default LandingPage
