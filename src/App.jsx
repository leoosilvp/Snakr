import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./routes/Home"
import ChangeIcon from './hooks/ChangeIcon'
import Error from "./routes/Error";
import Status from "./routes/Status";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Notifications from "./routes/Notifications";

import Settings from "./routes/Settings";
import General from "./components/settings/General";
import Account from "./components/settings/Account";
import Notification from "./components/settings/Notifications";
import Security from "./components/settings/Security";
import Support from "./components/settings/Support";
import TermsPrivacy from "./components/settings/TermsPrivacy";

function App() {

  ChangeIcon();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to='/home' />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<Settings />} >
            <Route index element={<Navigate to='general' />} />
            <Route path="general" element={<General />} />
            <Route path="account" element={<Account />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="security" element={<Security />} />
            <Route path="support" element={<Support />} />
            <Route path="terms and privacy" element={<TermsPrivacy />} />

          </Route>
        </Route>
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
