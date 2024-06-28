import './App.css'
import Registration from './pages/Registration'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


function App() {

  return (
    <>
    Welcome to Pharmacy system
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
