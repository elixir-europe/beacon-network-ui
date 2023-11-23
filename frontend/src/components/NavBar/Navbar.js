import { NavLink } from 'react-router-dom'

import React, { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useAuth } from 'oidc-react'
import './Navbar.css'

function Navbar () {
  const [selected, setIsSelected] = useState('')
  const [openModal1, setIsOpenModal1] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const { isLoggedIn, setIsLoggedIn, logOutUser } = useContext(AuthContext)
  const auth = useAuth()

  const isAuthenticated = auth.userData?.id_token ? true : false
  if (isAuthenticated || isLoggedIn === true) {
    setIsLoggedIn(true)
  } else {
    setIsLoggedIn(false)
  }

  const handleHelpModal1 = () => {
    setIsOpenModal1(true)
  }

  const handleMenu = () => {
    setOpenMenu(!openMenu)
    console.log('sdsadasdsd')
  }

  const handleClik = () => {
    setIsLoggedIn(false)
    auth.signOut()
    logOutUser()
  }

  return (
    <div className='navB'>
      <nav className='nav2'>
        <NavLink
          exact
          to='/'
          className={({ isActive }) =>
            isActive ? 'Individuals2' : 'Individuals'
          }
        >
          Individuals
        </NavLink>
        <NavLink
          exact
          to='/biosamples'
          className={({ isActive }) =>
            isActive ? 'Biosamples2' : 'Biosamples'
          }
        >
          Biosamples
        </NavLink>
        <NavLink
          exact
          to='/genomicVariations'
          className={({ isActive }) => (isActive ? 'Variants2' : 'Variants')}
        >
          Variant
        </NavLink>
        <NavLink
          exact
          to='/runs'
          className={({ isActive }) => (isActive ? 'Runs2' : 'Runs')}
        >
          Runs
        </NavLink>
        <NavLink
          exact
          to='/analyses'
          className={({ isActive }) => (isActive ? 'Analyses2' : 'Analyses')}
        >
          Analyses
        </NavLink>
        <NavLink
          exact
          to='/cohorts'
          className={({ isActive }) => (isActive ? 'Cohorts2' : 'Cohorts')}
        >
          Cohorts
        </NavLink>
        <NavLink
          exact
          to='/cross-queries/allScopes/%20/'
          className={({ isActive }) =>
            isActive ? 'Cross-queries2' : 'Cross-queries'
          }
        >
          Cross queries
        </NavLink>
        <div class='animation nav2'></div>
      </nav>
      <nav className='nav3'>
        {!isLoggedIn && (
          <NavLink
            to='/members'
            className={({ isActive }) => (isActive ? 'Members2' : 'Members')}
          >
            Network members
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink
            exact
            to='/sign-in'
            className={({ isActive }) => (isActive ? 'Sign-in2' : 'Sign-in')}
          >
            {' '}
            <img
              className='ls-login-image'
              src='/../ls-login.png'
              alt='ls-login-image'
            />
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink
            exact
            to='/sign-in-noLS'
            className={({ isActive }) => (isActive ? 'Sign-in5' : 'Sign-in6')}
          >
            Log in
          </NavLink>
        )}

        {isLoggedIn && (
          <NavLink
            exact
            to='/members'
            className={({ isActive }) => (isActive ? 'Members4' : 'Members3')}
          >
            Network members
          </NavLink>
        )}

        {isLoggedIn && (
          <NavLink
            exact
            to='/individuals'
            className={({ isActive }) => (isActive ? 'Sign-in4' : 'Sign-in3')}
            onClick={handleClik}
          >
            <img
              className='ls-login-image2'
              src='/../logout.png'
              alt='ls-login-image2'
            />
            Log out
          </NavLink>
        )}

        <div class='animation nav3'></div>
      </nav>
      <nav className='nav4'>
        <button className='buttonMenu' onClick={handleMenu}>
          <img className='menuLogo' src='/../menu.png' alt='menuIcon'></img>
          <img
            className='menuLogoHover'
            src='/../menu2.png'
            alt='menuIconHover'
          ></img>
        </button>

        {openMenu && (
          <div className='menuContainer'> 
            <div class='icon'>
              <img
                className='arrowUpIcon'
                src='/../arrow-up2.png'
                alt='arrowUp2'
              ></img>
            </div>
            <div className='menuNav'>
              <NavLink
                to='/members'
                onClick={handleMenu}
                className={({ isActive }) =>
                  isActive ? 'Members2' : 'Members'
                }
              >
                {' '}
                <h1>Network members</h1>
              </NavLink>
              {!isLoggedIn && (
                <NavLink
                  exact
                  to='/sign-in'
                  onClick={handleMenu}
                  className={({ isActive }) =>
                    isActive ? 'Sign-in2' : 'Sign-in'
                  }
                >
                  {' '}
                  <img
                    className='ls-login-image'
                    src='/../ls-login.png'
                    alt='ls-login-image'
                  />
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink
                  exact
                  to='/sign-in-noLS'
                  onClick={handleMenu}
                  className={({ isActive }) =>
                    isActive ? 'Sign-in5' : 'Sign-in6'
                  }
                >
                  <h1>Log in</h1>
                </NavLink>
              )}

              {isLoggedIn && (
                <NavLink
                  exact
                  to='/members'
                  className={({ isActive }) =>
                    isActive ? 'Members4' : 'Members3'
                  }
                >
                  <h1>Network members</h1>
                </NavLink>
              )}

              {isLoggedIn && (
                <NavLink
                  exact
                  to='/individuals'
                  className={({ isActive }) =>
                    isActive ? 'Sign-in4' : 'Sign-in3'
                  }
                  onClick={handleClik}
                >
                  <img
                    className='ls-login-image2'
                    src='/../logout.png'
                    alt='ls-login-image2'
                  />
                  <h1>Log out</h1>
                </NavLink>
              )}
            </div>
            <div className='menuNav2'>
              <NavLink
                exact
                to='/'
                onClick={handleMenu}
                className={({ isActive }) =>
                  isActive ? 'Individuals2' : 'Individuals'
                }
              >
                <h1>Individuals</h1>
              </NavLink>
              <NavLink
                exact
                to='/biosamples'
                onClick={handleMenu}
                className={({ isActive }) =>
                  isActive ? 'Biosamples2' : 'Biosamples'
                }
              >
                <h1>Biosamples</h1>
              </NavLink>
              <NavLink
                exact
                to='/genomicVariations'
                onClick={handleMenu}
                className={({ isActive }) =>
                  isActive ? 'Variants2' : 'Variants'
                }
              >
                <h1>Variant</h1>
              </NavLink>
              <NavLink
                exact
                to='/runs'
                onClick={handleMenu}
                className={({ isActive }) => (isActive ? 'Runs2' : 'Runs')}
              >
                <h1>Runs</h1>
              </NavLink>
              <NavLink
                exact
                to='/analyses'
                onClick={handleMenu}
                className={({ isActive }) =>
                  isActive ? 'Analyses2' : 'Analyses'
                }
              >
                <h1>Analyses</h1>
              </NavLink>
              <NavLink
                exact
                to='/cohorts'
                onClick={handleMenu}
                className={({ isActive }) =>
                  isActive ? 'Cohorts2' : 'Cohorts'
                }
              >
                <h1>Cohorts</h1>
              </NavLink>
              <NavLink
                exact
                to='/cross-queries/allScopes/%20/'
                onClick={handleMenu}
                className={({ isActive }) =>
                  isActive ? 'Cross-queries2' : 'Cross-queries'
                }
              >
                <h1>Cross queries</h1>
              </NavLink>
              <NavLink
                to='/members'
                onClick={handleMenu}
                className={({ isActive }) =>
                  isActive ? 'Members2' : 'Members'
                }
              >
                {' '}
                <h1>Network members</h1>
              </NavLink>
              {!isLoggedIn && (
                <NavLink
                  exact
                  to='/sign-in'
                  onClick={handleMenu}
                  className={({ isActive }) =>
                    isActive ? 'Sign-in2' : 'Sign-in'
                  }
                >
                  {' '}
                  <img
                    className='ls-login-image'
                    src='/../ls-login.png'
                    alt='ls-login-image'
                  />
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink
                  exact
                  to='/sign-in-noLS'
                  onClick={handleMenu}
                  className={({ isActive }) =>
                    isActive ? 'Sign-in5' : 'Sign-in6'
                  }
                >
                  <h1>Log in</h1>
                </NavLink>
              )}

              {isLoggedIn && (
                <NavLink
                  exact
                  to='/individuals'
                  className={({ isActive }) =>
                    isActive ? 'Sign-in4' : 'Sign-in3'
                  }
                  onClick={handleClik}
                >
                  <img
                    className='ls-login-image2'
                    src='/../logout.png'
                    alt='ls-login-image2'
                  />
                  <h1>Log out</h1>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
