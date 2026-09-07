import { useState } from "react";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      status: "Applied",
      date: "2026-09-07",
      location: "Bangalore",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Software Engineer Intern",
      status: "Interview",
      date: "2026-09-05",
      location: "Hyderabad",
    },
    {
      id: 3,
      company: "Amazon",
      role: "SDE Intern",
      status: "Rejected",
      date: "2026-09-01",
      location: "Bangalore",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addApplication = (e) => {
    e.preventDefault();

    const newApplication = {
      id: Date.now(),
      ...formData,
    };

    setApplications([...applications, newApplication]);

    setFormData({
      company: "",
      role: "",
      status: "Applied",
      date: "",
      location: "",
    });

    setShowForm(false);
  };

  const deleteApplication = (id) => {
    setApplications(
      applications.filter((application) => application.id !== id)
    );
  };

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offers = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span>Job</span>Tracker
        </div>

        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#applications">Applications</a>
        </nav>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Application
        </button>
      </header>

      <main className="container" id="dashboard">
        <section className="hero">
          <div>
            <h1>Job Application Tracker</h1>
            <p>
              Keep track of your job applications, interviews, offers and
              rejections in one place.
            </p>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <h3>Total Applications</h3>
            <strong>{totalApplications}</strong>
          </div>

          <div className="stat-card">
            <h3>Interviews</h3>
            <strong>{interviews}</strong>
          </div>

          <div className="stat-card">
            <h3>Offers</h3>
            <strong>{offers}</strong>
          </div>

          <div className="stat-card">
            <h3>Rejected</h3>
            <strong>{rejected}</strong>
          </div>
        </section>

        {showForm && (
          <section className="form-card">
            <h2>Add New Application</h2>

            <form onSubmit={addApplication}>
              <div className="form-grid">
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="role"
                  placeholder="Job Role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-button">
                  Save Application
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="applications-section" id="applications">
          <div className="section-header">
            <div>
              <h2>My Applications</h2>
              <p>Track the progress of your job applications.</p>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Date Applied</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="company-name">
                      {application.company}
                    </td>

                    <td>{application.role}</td>

                    <td>{application.location || "—"}</td>

                    <td>
                      <span
                        className={`status ${application.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td>{application.date}</td>

                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteApplication(application.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {applications.length === 0 && (
              <div className="empty-state">
                <h3>No applications yet</h3>
                <p>Add your first job application to get started.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;