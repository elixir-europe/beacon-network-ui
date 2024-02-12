import './Footer.css'
import { NavLink } from 'react-router-dom'

function Footer (props) {
  return (
    <div className='footerContainer'>
      <footer className='footer'>
        <ul className='social-icon'>
          <li className='social-icon__item'>
            <NavLink exact to='/about' className='social-icon__link'>
              <ion-icon name='information-circle-outline'></ion-icon>
            </NavLink>
            <NavLink
              exact
              to='/about'
              className={({ isActive }) =>
                isActive ? 'menu__linkActive' : 'menu__link'
              }
            >
              About
            </NavLink>
          </li>
          <li className='social-icon__item'>
            <NavLink exact to='/validator' className='social-icon__link'>
              <ion-icon name='checkmark-circle-outline'></ion-icon>
            </NavLink>
            <NavLink
              exact
              to='/validator'
              className={({ isActive }) =>
                isActive ? 'menu__linkActive' : 'menu__link'
              }
            >
              Beacon validator
            </NavLink>
          </li>
          <li className='social-icon__item'>
            <a
              className='social-icon__link'
              href='https://github.com/elixir-europe/beacon-network-ui/'
              target='_blank'
              rel='noreferrer'
            >
              <ion-icon name='logo-github'></ion-icon>
            </a>
            <a
              className='menu__link'
              href='https://github.com/elixir-europe/beacon-network-ui/'
              target='_blank'
              rel='noreferrer'
            >
              GitHub
            </a>
          </li>
          <li className='social-icon__item'>
            <a
              className='social-icon__link'
              href='https://docs.genomebeacons.org/'
              target='_blank'
              rel='noreferrer'
            >
              <ion-icon name='document-text-outline'></ion-icon>
            </a>
            <a
              className='menu__link'
              href='https://docs.genomebeacons.org/'
              target='_blank'
              rel='noreferrer'
            >
              Documentation
            </a>
          </li>
          <li className='social-icon__item'>
            <NavLink exact to='/members' className='social-icon__link'>
              <ion-icon name='globe-outline'></ion-icon>
            </NavLink>
            <NavLink
              exact
              to='/members'
              className={({ isActive }) =>
                isActive ? 'menu__linkActive' : 'menu__link'
              }
            >
              Network members
            </NavLink>
          </li>
          <li className='social-icon__item'>
            <NavLink exact to='/sign-in-options' className='social-icon__link'>
              <ion-icon name='log-in-outline'></ion-icon>
            </NavLink>
            <NavLink
              exact
              to='/sign-in-options'
              className={({ isActive }) =>
                isActive ? 'menu__linkActive' : 'menu__link'
              }
            >
              Log in
            </NavLink>
          </li>
        </ul>
      </footer>
    </div>
  )
}
export default Footer
