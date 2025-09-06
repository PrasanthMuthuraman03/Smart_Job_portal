const db = require("./models/db");

const titles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "QA Engineer", "DevOps Engineer"];
const companies = ["Tech Corp", "Soft Inc", "InnovateX", "Creative Studio", "CloudOps", "AI Labs"];
const locations = ["Chennai", "Bangalore", "Hyderabad", "Pune", "Remote"];
const skillsList = [
  "React, Bootstrap, JavaScript",
  "Node.js, Express, MySQL",
  "React, Node.js, MongoDB",
  "Figma, Photoshop",
  "Selenium, Cypress",
  "AWS, Docker, Jenkins"
];

for (let i = 0; i < 100; i++) {
  const title = titles[Math.floor(Math.random() * titles.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const skills = skillsList[Math.floor(Math.random() * skillsList.length)];
  const description = `We are hiring a ${title}.`;

  db.query(
    "INSERT INTO jobs (title, company, location, description, skills, postedDate, recruiterId) VALUES (?, ?, ?, ?, ?, NOW(), 1)",
    [title, company, location, description, skills],
    (err) => {
      if (err) console.error("Error inserting job:", err.message);
    }
  );
}

console.log("✅ 100 jobs inserted successfully!");
process.exit();
