import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import DoctorProfile from './pages/DoctorProfile';
import PatientProfile from './pages/PatientProfile';
import AddPatient from './pages/AddPatient';
import Chat from './pages/Chat';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="/patient/:id" element={<PatientProfile />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/chat/:patientId" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;