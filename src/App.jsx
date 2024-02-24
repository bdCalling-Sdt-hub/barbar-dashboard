import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Notification from "./Pages/Dashboard/Notification/Notification";
import Wallet from "./Pages/Dashboard/Wallet/Wallet";
import Email from "./Pages/Email/Email";
import Otp from "./Pages/Otp/Otp";
import Signin from "./Pages/Signin/Signin";
import UpdatePass from "./Pages/UpdatePass/UpdatePass";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Setting from "./Pages/Dashboard/Setting/Setting";
import SettingPage from "./Pages/Dashboard/Setting/SettingPage/SettingPage";
import Message from "./Pages/Dashboard/Message/Message";
import PersonalMessage from "./Pages/Dashboard/Message/PersonalMessage/PersonalMessage";
import Payment from "./Pages/Dashboard/Payment/Payment";
import UserList from "./Pages/Dashboard/UserList/UserList";
import BarbarList from "./Pages/Dashboard/BarbarList/BarbarList";
import SalonList from "./Pages/Dashboard/SalonList/SalonList";
import AppointmentList from "./Pages/Dashboard/Appointment/AppointmentList";
import AppointmentReq from "./Pages/Dashboard/Appointment/AppointmentReq";
import NotFound from "./404";
import Bookings from "./Pages/Dashboard/Earning/Bookings";
import Subscription from "./Pages/Dashboard/Earning/Subscription";
import ProviderList from "./Pages/Dashboard/ProviderList/ProviderList";
import ProviderRequest from "./Pages/Dashboard/ProviderRequest/ProviderRequest";
import ProviderSubscription from "./Pages/Dashboard/ProviderSubscription/ProviderSubscription";
import Categories from "./Pages/Dashboard/Categories/Categories";

function App() {
  return (
    <>
      <div className="maincontainer">
        {/* <Router> */}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
              }
            >
              <Route path="/" element={<DashboardHome />} />
              <Route path="/earning/booking" element={<Bookings />} />
              <Route path="/earning/subscription" element={<Subscription />} />
              {/* <Route path="/payment" element={<Payment />} /> */}
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/appointmentlist" element={<AppointmentList />} />
              {/* <Route path="/appointmentreq" element={<AppointmentReq />} /> */}
              <Route path="/salonlist" element={<SalonList />} />
              <Route path="/providerList" element={<ProviderList />} />
              <Route path="/provider-request" element={<ProviderRequest />} />
              <Route path="/provider-subscription" element={<ProviderSubscription />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/barbarlist" element={<BarbarList />} />
              <Route path="/message" element={<Message />} />
              <Route path="/message/:id" element={<PersonalMessage />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/setting/:dynamic" element={<SettingPage />} />
              <Route path="/notification" element={<Notification />} />
            </Route>

            <Route path="/signin" element={<Signin />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/forget-password" element={<Email />} />
            <Route path="/update-password" element={<UpdatePass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        {/* </Router> */}
      </div>
    </>
  );
}

export default App;
