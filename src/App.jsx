<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/main_page.jsx";
import Locations from "./Pages/Locations/Locations.jsx";
import Services from "./Pages/Services/Services.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import WorkerLayout from "./Components/WorkerPanel/WorkerLayout.jsx";
import MyInfo from "./Pages/Worker/MyInfo.jsx";
import SendRequest from "./Pages/Worker/SendRequest.jsx";
import AdminLayout from "./Components/AdminPanel/AdminLayout.jsx";
import Employers from "./Pages/Admin/Employers.jsx"; 
import Request from "./Pages/Admin/Request.jsx";
import "./App.css";
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/main_page.jsx';
import Locations from './Pages/Locations/Locations.jsx';
import Services from './Pages/Services/Services.jsx';
import Auth from './Pages/Auth/Auth.jsx';
import AdminPanel from './Pages/AdminPanel/AdminPanel.jsx';
import './App.css';
>>>>>>> 80504ffacba9e919a367e5723481d5240762b627

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Locations" element={<Locations />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Auth" element={<Auth />} />
<<<<<<< HEAD

        <Route path="/worker" element={<WorkerLayout />}>
          <Route path="myinfo" element={<MyInfo />} />
          <Route path="sendrequest" element={<SendRequest />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="employers" element={<Employers />} /> 
          <Route path="services" element={<h1>Services Page</h1>} />
          <Route path="centers" element={<h1>Centers Page</h1>} />
          <Route path="reports" element={<h1>Reports Page</h1>} />
          <Route path="request" element={<Request />} /> 
          <Route path="setprice" element={<h1>Set Price Page</h1>} />
        </Route>
=======
        <Route path="/admin" element={<AdminPanel />} />
>>>>>>> 80504ffacba9e919a367e5723481d5240762b627
      </Routes>
    </Router>
  );
}

export default App;
