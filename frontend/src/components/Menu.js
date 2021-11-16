import { Nav, Container, Modal, Button, Form, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useState } from 'react';

const Menu = () => {

  return (
    <Container>
      <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
        <LinkContainer to='/'>
          <Nav.Link className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none'>
            AI News Reporter
          </Nav.Link>
        </LinkContainer>
        <Nav>
          {/* <div className='col-md-3 text-end'>
            <LinkContainer to='/'>
              <button type='button' className='btn btn-outline-primary me-2'>
                Add
              </button>
            </LinkContainer>
          </div> */}
        </Nav>
      </header> 
    </Container>
  )
}

export default Menu
