import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/main_page.jsx";
import Locations from "./Pages/Locations/Locations.jsx";
import Services from "./Pages/Services/Services.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import WorkerLayout from "./Components/WorkerPanel/WorkerLayout.jsx";
import MyInfo from "./Pages/Worker/MyInfo.jsx";
import SendRequest from "./Pages/Worker/SendRequest.jsx"; 
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Locations" element={<Locations />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/worker" element={<WorkerLayout />}>
        <Route path="myinfo" element={<MyInfo />} />
        <Route path="sendrequest" element={<SendRequest />} /> 
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
