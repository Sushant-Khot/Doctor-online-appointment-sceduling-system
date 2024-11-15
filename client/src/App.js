import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import Appointment from './pages/Appointment';
import DoctorProfile from './pages/DoctorProfile';
import PatientProfile from './pages/PatientProfile';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/Register' element={<Register/>}/>
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/DoctorProfile" element={<DoctorProfile />} />
        <Route path="/PatientProfile" element={<PatientProfile />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
