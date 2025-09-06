import { useEffect, useState } from "react";
import axios from "axios";

export default function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/applications", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setApplications(res.data.applications))
    .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container my-4">
      <h2>Applications</h2>
      {applications.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Email</th>
              <th>Job ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.jobId}</td>
                <td>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications yet.</p>
      )}
    </div>
  );
}
