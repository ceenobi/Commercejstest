import { useState } from 'react'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBBadge
} from 'mdb-react-ui-kit'
import logo from '../../umu.svg'
import {NavWrapper} from './styles'
import {Link, useLocation} from 'react-router-dom'

export default function Navbar({ totalItems }) {
  const [showNavColorSecond, setShowNavColorSecond] = useState(false)
  const location = useLocation()
 

  return (
    <NavWrapper>
      <MDBNavbar sticky expand='lg' dark bgColor='dark'>
        <MDBContainer lg>
          <MDBNavbarBrand>
            <Link to='/' className='text-reset'>
              <img src={logo} alt='logo' className='img-fluid logo' />
              Navbar
            </Link>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColorSecond(!showNavColorSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColorSecond} navbar id='navbarColor02'>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <Link to='/'>
                  <MDBNavbarLink aria-current='page'>Home</MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/'>
                  <MDBNavbarLink>Features</MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/'>
                  <MDBNavbarLink>About</MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              {location.pathname === '/' && (
                <MDBNavbarItem className='ms-lg-auto '>
                  <Link to='/cart'>
                    <MDBNavbarLink>
                      <span>
                        <MDBIcon fas icon='shopping-cart' size='lg'></MDBIcon>
                      </span>
                      <MDBBadge pill color='danger' className=''>
                        {totalItems}
                      </MDBBadge>
                    </MDBNavbarLink>
                  </Link>
                </MDBNavbarItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </NavWrapper>
  )
}
