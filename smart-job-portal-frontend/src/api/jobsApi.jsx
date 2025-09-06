import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";


// Get all jobs with filters
export const getJobs = async ({ page = 1, limit = 5, search = "", location = "", sort = "newest" } = {}) => {
  const res = await axios.get(API_URL, {
    params: { page, limit, search, location, sort },
  });
  return res.data;
};

// Get single job
export const getJobById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create new job (recruiter only, with JWT token)
export const createJob = async (jobData, token) => {
  const res = await axios.post(API_URL, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
