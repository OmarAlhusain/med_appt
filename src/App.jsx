import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Notification from './Components/Notification/Notification';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import BookingConsultation from './Components/BookingConsultation';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import LandingPage from './Landing_Page/LandingPage';
import GiveReviews from './Components/GiveReviews/GiveReviews';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Notification>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
<Route path="/reviews" element={<GiveReviews />} />
          <Route
            path="/appointments"
            element={<BookingConsultation />}
          />

          <Route
            path="/instant-consultation"
            element={<InstantConsultation />}
          />
        </Routes>
      </Notification>
    </BrowserRouter>
  );
}

export default App;