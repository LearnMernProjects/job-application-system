import type { Route } from "./+types/home";
import "../styles/landing.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Job Application System - Find Your Perfect Job" },
    { name: "description", content: "Discover and apply for the best job opportunities and internships" },
  ];
}

export default function Home() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Job or Internship</h1>
          <p>
            Connect with top companies and launch your career with the best opportunities
          </p>
          <div className="hero-buttons">
            <a href="/jobs" className="btn btn-primary btn-lg">
              Explore Opportunities
            </a>
            <a href="/signup" className="btn btn-secondary btn-lg">
              Get Started
            </a>
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
              <h3>Stay Updated</h3>
              <p>Get instant notifications about your application status and new job postings.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Curated Opportunities</h3>
              <p>Access hand-picked internships and job opportunities from top companies.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of candidates who've found their dream jobs</p>
        <a href="/signup" className="btn btn-primary btn-lg">
          Create Account Today
        </a>
      </section>
    </div>
  );
}
