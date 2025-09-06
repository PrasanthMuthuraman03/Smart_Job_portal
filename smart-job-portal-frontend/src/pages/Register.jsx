import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi"; // ✅ use your centralized API file

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate"); // default
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register({ name, email, password, role });

      alert("✅ Registration successful! Please log in.");
      // Clear form after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setRole("candidate");

      navigate("/login");
    } catch (error) {
      console.error("❌ Registration Error:", error);
      alert(error.response?.data?.error || "Registration failed. Try again.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-3">Register</h2>
      <form onSubmit={handleRegister}>
        {/* Name */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email */}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role */}
        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-primary">
          Login here
        </a>
      </p>
    </div>
  );
}
