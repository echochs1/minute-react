import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink'
// import { LinkContainer } from 'react-router-bootstrap'

export default function BottomNavBar() {
    const pages = ["For You", "Learn"];

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
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
        </div>
    )
}
