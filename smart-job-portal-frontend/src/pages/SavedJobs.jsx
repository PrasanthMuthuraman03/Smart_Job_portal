import { useEffect, useState } from "react";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const currentUserEmail = localStorage.getItem("email");
  const savedKey = `savedJobs_${currentUserEmail}`;

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem(savedKey)) || [];
    setSavedJobs(jobs);
  }, [savedKey]);

  return (
    <div className="container my-4">
      <h2>Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p className="text-center my-4">No saved jobs found.</p>
      ) : (
        <ul className="list-group mt-3">
          {savedJobs.map((job) => (
            <li key={job.id} className="list-group-item">
              <strong>{job.title}</strong> – {job.company} ({job.location})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
