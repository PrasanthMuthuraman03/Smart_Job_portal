import { useEffect, useState } from "react";
import { fetchApplications } from "../api/applicationsApi";

export default function Applications() {
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

  if (applications.length === 0) {
    return <p className="text-center my-4">You haven’t applied to any jobs yet.</p>;
  }

  return (
    <div className="container my-4">
      <h2>My Applications</h2>
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Applied Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.jobTitle}</td>
              <td>{app.companyName}</td>
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
