import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import LandingPage from './Landing_Page/LandingPage';

import './App.css';

const AppointmentsPlaceholder = () => {
  return (
    <main
      style={{
        minHeight: 'calc(100vh - 76px)',
        display: 'grid',
        placeItems: 'center',
        padding: '40px 20px',
        background: '#f4f7fa',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '12px' }}>Appointments</h1>
        <p style={{ color: '#64748b' }}>
          Appointment booking will be added in the next stage.
        </p>
      </div>
    </main>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointments" element={<AppointmentsPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;