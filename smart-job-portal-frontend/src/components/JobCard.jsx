import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  // Ensure skills are an array
  const skillsArray = Array.isArray(job.skills)
    ? job.skills
    : job.skills.split(",").map((s) => s.trim());

  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{job.title}</h5>
          <p className="card-text text-muted">{job.company} • {job.location}</p>
          <p>
            <strong>Skills:</strong> {skillsArray.join(", ")}
          </p>
          <Link to={`/jobs/${job.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
