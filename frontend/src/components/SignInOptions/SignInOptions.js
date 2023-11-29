import './SignInOptions.css'
import { NavLink } from 'react-router-dom'

function SignInOptions () {
  return (
    <div className='signInContainer'>
      <div className='optionsContainer'>
        <div className='lsContainer'>
          <NavLink
            exact
            to='/sign-in'
            className={({ isActive }) => (isActive ? 'Sign-in2' : 'Sign-in')}
          >
            <img
              className='ls-login-image'
              src='/../ls-login.png'
              alt='ls-login-image'
            />
          </NavLink>
        </div>
        <div className='noLsContainer'>
          <NavLink
            exact
            to='/sign-in-noLS'
            className={({ isActive }) => (isActive ? 'Sign-in2' : 'Sign-in')}
          >
            <h6>Beacon Network IDP Login</h6>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
export default SignInOptions
