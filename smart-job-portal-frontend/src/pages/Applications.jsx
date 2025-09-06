import { useEffect, useState } from "react";
import { fetchApplications } from "../api/applicationsApi";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications", err);
        setError("Failed to load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  if (loading) return <p className="text-center my-4">Loading applications...</p>;
  if (error) return <p className="text-center text-danger my-4">{error}</p>;

  if (applications.length === 0) {
    return <p className="text-center my-4">You haven’t applied to any jobs yet.</p>;
  }

  return (
    <div className="container my-4">
      <h2>My Applications</h2>
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Applied Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.jobId}</td>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>
                <span className="badge bg-primary">{app.status}</span>
              </td>
              <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
