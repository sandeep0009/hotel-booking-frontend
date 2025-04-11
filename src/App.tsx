

import {Routes, Route} from 'react-router-dom'
import SignUpForm from './pages/SignUp'
import SignInForm from './pages/SignIn'
function App() {

  return (
    <>
    <Routes>
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
    </Routes>
    </>
  )
}

export default App
