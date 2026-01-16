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
            
          </Route>
        </Route>
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
