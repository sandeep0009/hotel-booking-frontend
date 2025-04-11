

import {Routes, Route} from 'react-router-dom'
import SignUpForm from './pages/SignUp'
import SignInForm from './pages/SignIn'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import SearchHotels from './pages/SearchedHotels'
import Booking from './pages/Booking'
import ManageBookings from './pages/ManageBookings'
function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/admin-dashobard" element={<AdminDashboard/>} />
      <Route path="/search-hotels" element={<SearchHotels/>} />
      <Route path="/booking/:id" element={<Booking/>}/>
      <Route path="/booking-details" element={<ManageBookings/>}/>
    </Routes>
    </>
  )
}

export default App
