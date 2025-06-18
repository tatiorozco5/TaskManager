import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import PersonsPage from './pages/PersonsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/persons" element={<PersonsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
