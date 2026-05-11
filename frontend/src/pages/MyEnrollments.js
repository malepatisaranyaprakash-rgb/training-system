import { useEffect, useState } from 'react';
import API from '../services/api';

function MyEnrollments() {

  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {

    try {

      const res = await API.get('/enroll/my');

      setEnrollments(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">

      <h1 className="page-title">
        📘 My Enrollments
      </h1>

      <div className="training-grid">

        {enrollments.map((e) => (

          <div className="training-card" key={e._id}>

            <h3>{e.trainingId?.title}</h3>

            <p>{e.trainingId?.description}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyEnrollments;