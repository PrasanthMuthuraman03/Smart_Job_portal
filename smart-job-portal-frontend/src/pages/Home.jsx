import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">Welcome to Smart Job Portal</h1>
      <p className="lead">Find your dream job or post jobs as a recruiter.</p>
      <Link className="btn btn-primary btn-lg" to="/jobs">Browse Jobs</Link>
    </div>
  );
}
