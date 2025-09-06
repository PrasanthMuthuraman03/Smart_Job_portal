import axios from "axios";

const API_URL = "http://localhost:5000/api/applications";

// Apply for a job
export const applyJob = async (formData) => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "multipart/form-data" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await axios.post(API_URL, formData, { headers });
  return res.data;
};

// Fetch applications
export const fetchApplications = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("⚠️ No token found");
    return [];
  }

  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("📌 fetchApplications response:", res.data.applications);
  return res.data.applications;
};
