import './App.css'
import Registration from './pages/Registration'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Medicine from './pages/medicine/Medicine'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/medicine" element={<Medicine/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
