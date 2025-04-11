import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "../components/ui/button"
import { Menu } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../app/store"
import { removeUser } from "../slice/userSlice"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRole = user?.role

  const handleLogout = () => {
    dispatch(removeUser())
    navigate("/signin")
  }

  const renderLinks = () => {
    if (userRole === "admin") {
      return (
        <>
          <Link to="/admin/hotel">Hotel</Link>
          <Link to="/admin/booking">Booking</Link>
        </>
      )
    }
    if (userRole === "user") {
      return (
        <>
          <Link to="/">Home</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/booking">Booking</Link>
        </>
      )
    }
    return null
  }

  return (
    <nav className="w-full px-4 py-3 border-b shadow-sm bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">TranquilStay</div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {userRole && (
            <>
              {renderLinks()}
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          {userRole && (
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>

        {!userRole && (
          <div className="flex gap-2">
            <Link to="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>

      {mobileOpen && userRole && (
        <div className="md:hidden flex flex-col gap-4 px-4 pt-4 text-sm font-medium">
          {renderLinks()}
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  )
}
