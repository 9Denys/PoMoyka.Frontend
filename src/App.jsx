import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/main_page.jsx';
import Locations from './Pages/Locations/Locations.jsx';
import Services from './Pages/Services/Services.jsx';
import Auth from './Pages/Auth/Auth.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Locations" element={<Locations />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;