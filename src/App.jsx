import React from "react";
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
import Reports from "./Pages/Admin/Reports.jsx";
import AdminServices from "./Pages/Admin/AdminServices.jsx";
import AdminCenters from "./Pages/Admin/AdminCenters.jsx";
import AdminSetPrice from "./Pages/Admin/AdminSetPrice.jsx";
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

        <Route path="/admin" element={<AdminLayout />}>
        <Route path="employers" element={<Employers />} />
        <Route path="adminservices" element={<AdminServices />} />
        <Route path="admincenters" element={<AdminCenters />} />
        <Route path="reports" element={<Reports />} />
        <Route path="request" element={<Request />} />
        <Route path="adminsetprice" element={<AdminSetPrice />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
