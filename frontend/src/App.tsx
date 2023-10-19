import { useState } from 'react'
import './App.css'
import Signup from './pages/signup'
import Login from './pages/login'
import { Link, Outlet } from 'react-router-dom'
import { useLogout } from './hooks/useLogout'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const [count, setCount] = useState(0)

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      {user && (
        <div>
          <span>{user.email}</span>
          <button onClick={handleClick}>Log out</button>
        </div>
      )}
      {!user && (
      <div>
        <Outlet />
      </div>
      )}
    </>
  )
}

export default App
