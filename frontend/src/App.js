import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './pages/Login';
import Trainings from './pages/Trainings';
import TrainerDashboard from './pages/TrainerDashboard';
import MyEnrollments from './pages/MyEnrollments';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/trainings"
          element={<Trainings />}
        />

        <Route
          path="/trainer"
          element={<TrainerDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;