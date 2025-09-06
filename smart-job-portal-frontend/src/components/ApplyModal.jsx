import { useState } from "react";
import { applyJob } from "../api/applicationsApi";

export default function ApplyModal({ job, onApplied }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("name", localStorage.getItem("name"));
      formData.append("email", localStorage.getItem("email"));
      formData.append("jobId", job.id);

      await applyJob(formData);

      alert("✅ Application submitted successfully!");
      if (onApplied) onApplied();

      const modal = document.getElementById("applyModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to apply for the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="applyModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Apply for {job?.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                value={localStorage.getItem("name") || ""}
                readOnly
              />
              <input
                type="email"
                className="form-control mb-3"
                value={localStorage.getItem("email") || ""}
                readOnly
              />
              <input
                type="file"
                className="form-control mb-3"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
