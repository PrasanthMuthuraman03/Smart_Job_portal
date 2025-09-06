import { useEffect, useState } from "react";
import { fetchApplications } from "../api/applicationsApi";

export default function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications", err);
      }
    };
    loadApplications();
  }, []);

  return (
    <div className="container my-4">
      <h2>Recruiter Dashboard</h2>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <table className="table table-bordered table-striped mt-3">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Candidate</th>
              <th>Email</th>
              <th>Status</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.jobTitle}</td>
                <td>{app.companyName}</td>
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
      )}
    </div>
  );
}
