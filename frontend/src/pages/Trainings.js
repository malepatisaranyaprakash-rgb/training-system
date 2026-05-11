import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';


function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const res = await API.get('/trainings');
      setTrainings(res.data.value || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const enroll = async (id) => {
    try {
      await API.post('/enroll', { trainingId: id });

      // ✅ Update UI instantly
      setEnrolledIds([...enrolledIds, id]);

      alert("Enrolled!");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="container">

      {/* 🔷 Navbar */}
      <div className="navbar">
        <h2>🎓 Training System</h2>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* 🔷 Page Title */}
      <h1 className="page-title">
        📚 Training Programs
      </h1>

      {/* 🔷 Empty State */}
      {trainings.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No trainings available
        </p>
      )}

      {/* 🔷 Trainings Grid */}
      <div className="training-grid">
        {trainings.map((t) => (
          <div className="training-card" key={t._id}>

            <h3>{t.title}</h3>

            <p>{t.description}</p>

            <p>
              👨‍🏫 <b>{t.trainerId?.name}</b>
            </p>

            <button
              className="primary-btn"
              onClick={() => enroll(t._id)}
              disabled={enrolledIds.includes(t._id)}
            >
              {enrolledIds.includes(t._id)
                ? "Enrolled"
                : "Enroll"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Trainings;