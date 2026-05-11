import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function TrainerDashboard() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [trainings, setTrainings] = useState([]);

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

  const createTraining = async () => {
    try {

      await API.post('/trainings', {
        title,
        description
      });

      alert("Training created!");

      setTitle('');
      setDescription('');

      fetchTrainings();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const deleteTraining = async (id) => {
    try {

      await API.delete(`/trainings/${id}`);

      alert("Training deleted");

      fetchTrainings();

    } catch (err) {
      alert("Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="container">

      <div className="navbar">
        <h2>🎓 Trainer Dashboard</h2>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="form-box">

        <h3>Create Training</h3>

        <input
          className="input-field"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="input-field"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={createTraining}
        >
          Create Training
        </button>

      </div>

      <h1 className="page-title">
        Your Trainings
      </h1>

      <div className="training-grid">

        {trainings.map((t) => (
          <div
            className="training-card"
            key={t._id}
          >

            <h3>{t.title}</h3>

            <p>{t.description}</p>

            <button
              className="delete-btn"
              onClick={() => deleteTraining(t._id)}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TrainerDashboard;