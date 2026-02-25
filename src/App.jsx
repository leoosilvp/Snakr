import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ConsoleBanner } from './hooks/ConsoleBanner'
import ChangeIcon from './hooks/ChangeIcon'
import Home from "./routes/Home"
import Error from "./routes/Error";
import Status from "./routes/Status";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import PageNotifications from "./routes/Notifications";
import Gifts from "./routes/Gifts";
import News from "./routes/News";

import Settings from "./routes/Settings";
import General from "./components/settings/General";
import Account from "./components/settings/Account";
import Notifications from "./components/settings/Notifications";
import Security from "./components/settings/Security";
import Support from "./components/settings/Support";
import Steam from "./components/settings/Steam";
import TermsPrivacy from "./components/settings/TermsPrivacy";
import Contribute from "./routes/Contribute";
import ResetPassword from "./routes/ResetPassword";

import Notification from "./components/Notification";
import ChangeTitle from "./hooks/ChangeTitle";
import Friends from "./routes/Friends";
import MyFriends from "./components/friends/MyFriends";
import AddFriends from "./components/friends/AddFriends";
import Invitation from "./components/friends/Invitation";
import { useUserStatus } from "./hooks/useUserStatus";
import Welcome from "./routes/Welcome";
import User from "./routes/User";
import Catalog from "./routes/Catalog";
import Game from "./routes/Game";

function App() {
  ConsoleBanner()
  ChangeIcon();

  const isPlaying = false
  const gameName = null

  useUserStatus({ isPlaying, gameName })

  return (
    <BrowserRouter>
      <ChangeTitle />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Navigate to='/home' />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/user/:username" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/notifications" element={<PageNotifications />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/news" element={<News />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/friends" element={<Friends />} >
            <Route index element={<Navigate to='my-friends' />} />
            <Route path="my-friends" element={<MyFriends />} />
            <Route path="add-friends" element={<AddFriends />} />
            <Route path="invitations" element={<Invitation />} />
          </Route>
          <Route path="/settings" element={<Settings />} >
            <Route index element={<Navigate to='general' />} />
            <Route path="general" element={<General />} />
            <Route path="account" element={<Account />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="steam" element={<Steam />} />
            <Route path="security" element={<Security />} />
            <Route path="support" element={<Support />} />
            <Route path="terms and privacy" element={<TermsPrivacy />} />
          </Route>
          <Route path='/contribute' element={<Contribute />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/game/:game-id" element={<Game />} />
        </Route>
        <Route path='/security/reset-password' element={<ResetPassword />} />
        <Route path="/status" element={<Status />} />
      </Routes>
      <Notification />
    </BrowserRouter>
  )
}

export default App
