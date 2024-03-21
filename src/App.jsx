import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Notification from "./Pages/Dashboard/Notification/Notification";
import Email from "./Pages/Email/Email";
import Otp from "./Pages/Otp/Otp";
import Signin from "./Pages/Signin/Signin";
import UpdatePass from "./Pages/UpdatePass/UpdatePass";
import Setting from "./Pages/Dashboard/Setting/Setting";
import SettingPage from "./Pages/Dashboard/Setting/SettingPage/SettingPage";
import UserList from "./Pages/Dashboard/UserList/UserList";
import BarbarList from "./Pages/Dashboard/BarbarList/BarbarList";
import SalonList from "./Pages/Dashboard/SalonList/SalonList";
import AppointmentList from "./Pages/Dashboard/Appointment/AppointmentList";
import NotFound from "./404";
import Bookings from "./Pages/Dashboard/Earning/Bookings";
import Subscription from "./Pages/Dashboard/Earning/Subscription";
import ProviderList from "./Pages/Dashboard/ProviderList/ProviderList";
import ProviderRequest from "./Pages/Dashboard/ProviderRequest/ProviderRequest";
import ProviderSubscription from "./Pages/Dashboard/ProviderSubscription/ProviderSubscription";
import Categories from "./Pages/Dashboard/Categories/Categories";
import AdminRoute from "./Pages/AdminRoute";

function App() {
  return (
    <>
      <div className="maincontainer">
          <Routes>
            <Route exact path="/" element={<AdminRoute> <Dashboard/> </AdminRoute> } >
              <Route path="/" element={<AdminRoute><DashboardHome /> </AdminRoute> } />
              <Route path="/earning/booking" element={<AdminRoute><Bookings /></AdminRoute> } />
              <Route path="/earning/subscription" element={<AdminRoute><Subscription /></AdminRoute> } />
              <Route path="/appointmentlist" element={<AdminRoute><AppointmentList /></AdminRoute> } />
              <Route path="/salonlist" element={<AdminRoute><SalonList /></AdminRoute> } />
              <Route path="/providerList" element={<AdminRoute><ProviderList /></AdminRoute> } />
              <Route path="/provider-request" element={<AdminRoute><ProviderRequest /></AdminRoute> } />
              <Route path="/provider-subscription" element={<AdminRoute><ProviderSubscription /></AdminRoute> } />
              <Route path="/categories" element={<AdminRoute><Categories /></AdminRoute> } />
              <Route path="/userlist" element={<AdminRoute><UserList /></AdminRoute> } />
              <Route path="/barbarlist" element={<AdminRoute><BarbarList /></AdminRoute> } />
              <Route path="/setting" element={<AdminRoute><Setting /></AdminRoute> } />
              <Route path="/setting/:dynamic" element={<AdminRoute><SettingPage /></AdminRoute> } />
              <Route path="/notification" element={<AdminRoute><Notification /></AdminRoute> } />
            </Route>

            <Route path="/signin" element={<Signin />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/forget-password" element={<Email />} />
            <Route path="/update-password" element={<UpdatePass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
