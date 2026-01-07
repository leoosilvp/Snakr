import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./routes/Home"
import ChangeIcon from './hooks/ChangeIcon'

function App() {
  
  ChangeIcon();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='/home'/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
