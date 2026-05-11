import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {

  const [trainings, setTrainings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    const res = await API.get('/trainings');
    setTrainings(res.data);
  };

  const enroll = async (id) => {
    try {
      await API.post('/enroll', {
        trainingId: id
      });

      alert("Enrolled Successfully");

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="container">

      <div className="navbar">
        <h2>🎓 Employee Dashboard</h2>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <h1 className="page-title">Available Trainings</h1>

      <div className="training-grid">

        {trainings.map((t) => (

          <div className="training-card" key={t._id}>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="training"
              className="card-image"
            />

            <h3>{t.title}</h3>

            <p>{t.description}</p>

            <button
              className="primary-btn"
              onClick={() => enroll(t._id)}
            >
              Enroll
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default EmployeeDashboard;