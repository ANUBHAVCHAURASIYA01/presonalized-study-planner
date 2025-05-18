import { useState } from "react";

function App() {
  const [subjects, setSubjects] = useState("");
  const [timetable, setTimetable] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subjectArray = subjects.split(",").map((s) => s.trim());

    const res = await fetch("http://localhost:4000/api/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjects: subjectArray }),
    });

    const data = await res.json();
    setTimetable(data.timetable);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Personalized Study Planner</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
          placeholder="Enter subjects (comma-separated)"
        />
        <button type="submit">Generate</button>
      </form>
      <div>
        <h3>Your Timetable</h3>
        <ul>
          {timetable.map((entry, i) => (
            <li key={i}>
              {entry.subject}: {entry.hours} hours
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

\