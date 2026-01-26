import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ConsoleBanner } from './hooks/ConsoleBanner'
import ChangeIcon from './hooks/ChangeIcon'
import Home from "./routes/Home"
import Error from "./routes/Error";
import Status from "./routes/Status";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Notifications from "./routes/Notifications";
import Gifts from "./routes/Gifts";
import News from "./routes/News";

import Settings from "./routes/Settings";
import General from "./components/settings/General";
import Account from "./components/settings/Account";
import Notification from "./components/settings/Notifications";
import Security from "./components/settings/Security";
import Support from "./components/settings/Support";
import Steam from "./components/settings/Steam";
import TermsPrivacy from "./components/settings/TermsPrivacy";
import Contribute from "./routes/Contribute";
import ResetPassword from "./routes/ResetPassword";

function App() {
  ConsoleBanner()
  ChangeIcon();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Navigate to='/home' />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/news" element={<News />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/settings" element={<Settings />} >
            <Route index element={<Navigate to='general' />} />
            <Route path="general" element={<General />} />
            <Route path="account" element={<Account />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="steam" element={<Steam />} />
            <Route path="security" element={<Security />} />
            <Route path="support" element={<Support />} />
            <Route path="terms and privacy" element={<TermsPrivacy />} />
          </Route>
          <Route path='/contribute' element={<Contribute />} />
        </Route>
        <Route path='/security/reset-password' element={<ResetPassword />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
