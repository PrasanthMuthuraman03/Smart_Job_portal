import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ApplyModal from "../components/ApplyModal";
import { fetchApplications } from "../api/applicationsApi";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Get current logged-in user's email
  const currentUserEmail = localStorage.getItem("email");
  const savedKey = `savedJobs_${currentUserEmail}`; // unique key per user

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("❌ Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const apps = await fetchApplications();
        console.log("📌 AppliedJobs from API:", apps);
        setAppliedJobs(apps.map((a) => Number(a.jobId)));
      } catch (error) {
        console.error("❌ Error fetching applied jobs:", error);
      }
    };

    fetchJob();
    fetchAppliedJobs();
  }, [id]);

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p className="text-danger">❌ Job not found</p>;

  const alreadyApplied = appliedJobs.includes(Number(job.id));
  console.log("🟢 alreadyApplied:", alreadyApplied, "JobID:", job.id, "AppliedJobs:", appliedJobs);

  const handleSaveJob = () => {
    if (!currentUserEmail) {
      alert("⚠️ Please log in to save jobs.");
      return;
    }

    const savedJobs = JSON.parse(localStorage.getItem(savedKey)) || [];
    if (savedJobs.find((j) => j.id === job.id)) {
      alert("⚠️ This job is already saved.");
      return;
    }

    savedJobs.push(job);
    localStorage.setItem(savedKey, JSON.stringify(savedJobs));
    alert("✅ Job Saved!");
  };

  return (
    <div className="container my-4">
      <Link to="/jobs" className="btn btn-secondary mb-3">
        ← Back to Jobs
      </Link>

      <h2>{job.title}</h2>
      <p className="text-muted">{job.company} • {job.location}</p>
      <p><strong>Skills:</strong> {job.skills}</p>
      <p>{job.description}</p>

      {alreadyApplied ? (
        <button className="btn btn-success me-2" disabled>
          ✅ Applied
        </button>
      ) : (
        <button
          className="btn btn-success me-2"
          data-bs-toggle="modal"
          data-bs-target="#applyModal"
        >
          Apply Now
        </button>
      )}

      <button
        className="btn btn-outline-primary"
        onClick={handleSaveJob}
      >
        Save Job
      </button>

      <ApplyModal
        job={job}
        onApplied={() => setAppliedJobs([...appliedJobs, Number(job.id)])}
      />
    </div>
  );
}
