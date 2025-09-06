import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container py-3">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="fw-bold">Smart Job Portal</h5>
            <p className="mb-0">
              Helping candidates find their dream jobs and recruiters hire the best talent.
            </p>
          </div>

          {/* Right Section - Quick Links */}
          <div className="col-md-6 d-flex align-items-center justify-content-md-end">
            <nav>
              <Link to="/" className="text-white me-3 text-decoration-none">
                Home
              </Link>
              <Link to="/jobs" className="text-white me-3 text-decoration-none">
                Jobs
              </Link>
              <Link to="/saved" className="text-white me-3 text-decoration-none">
                Saved Jobs
              </Link>
              <Link to="/applications" className="text-white text-decoration-none">
                Applications
              </Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-secondary my-3" />

        {/* Bottom Text */}
        <div className="text-center">
          <small>© {new Date().getFullYear()} Smart Job Portal. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
