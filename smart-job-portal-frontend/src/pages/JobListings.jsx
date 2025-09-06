import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import axios from "axios";

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const jobsPerPage = 5;

  // Fetch jobs from backend whenever filters or page changes
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs", {
          params: {
            page: currentPage,
            limit: jobsPerPage,
            search,
            location,
            sort,
          },
        });
        setJobs(res.data.jobs);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [search, location, sort, currentPage]);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Available Jobs</h2>

      {/* Search + Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-control" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All Locations</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        
      </div>

      {/* Job Cards */}
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-center">No jobs found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
