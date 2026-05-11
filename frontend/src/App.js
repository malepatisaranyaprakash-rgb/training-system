import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Trainings from './pages/Trainings';
import TrainerDashboard from './pages/TrainerDashboard';
import MyEnrollments from './pages/MyEnrollments';

import './App.css';

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/trainings" element={<Trainings />} />

        <Route path="/trainer" element={<TrainerDashboard />} />

        <Route
          path="/my-enrollments"
          element={<MyEnrollments />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;