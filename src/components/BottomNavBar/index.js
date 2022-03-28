import React, {useState, useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {FirebaseProvider} from '../../firebase/firebaseContext';
// import firebaseAuth from '../../firebase/firebaseAuth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import {Link} from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap'
// react-router-bootstrap integrates react-router and react-bootstrap to create nav links
{/* <LinkContainer to="/foo/bar">
  <Button>Foo</Button>
</LinkContainer> */}

export default function BottomNavBar(props) {
    const pages = ["For You", "Learn"];
    // const userEmail = props.userEmail;
    // get context and authUser from FirebaseProvider
    // const firebase = useContext(FirebaseProvider);
    const {authUser} = useContext(FirebaseProvider);

    return (
        <div>
            <Navbar fixed="bottom" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Minute</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink href="/">For You</NavLink>
                        <NavLink href="/learn">Learn</NavLink>
                    </Nav>
                    {/* Confirm firebase signed in user */}
                    {authUser.userEmail ? 
                    (<Navbar.Text>
                        Logged in as: <a href="/profile">{authUser.userEmail}</a>
                    </Navbar.Text>)
                    :
                    (<Link to="/signin">
                          <button>SIGN IN/REGISTER</button>
                    </Link>)}
                </Container>
            </Navbar>
        </div>
    )
}