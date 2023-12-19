import { NavLink } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout'

export default function Navbar() {
  const {user } = useAuthContext()
  const {logout} = useLogout()

  return (
    <header>   
      <nav>
          <div className="logo">
              <h2>Upwark</h2>
          </div>
          <div className="menu">
              <NavLink to='/'>Home</NavLink>
             
              { !user && (
                <>
                  <NavLink to='/login'>Login</NavLink>
                  <NavLink to='/signup'>Sign Up</NavLink>
                </>
              )}

              { user && (
                <>
                  <NavLink to="/dashboard">{user.name}</NavLink>
                  <span className="cursor-pointer" onClick={() => logout()}>Logout</span>
                </>
              )}
          </div>
      </nav>
    </header>
  )
}
