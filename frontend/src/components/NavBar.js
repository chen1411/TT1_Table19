import React, { useState, useEffect } from "react";
import { Form, Navbar, FormControl, Nav } from "react-bootstrap";
import styled from 'styled-components'
import dbs_logo from '../dbs_logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

function NavBar() {
    const [token, setToken] = useState();
    useEffect(() => {
        setToken(localStorage.getItem("auth-token"));
    }, []);

    if (!token) {
        return <div></div>;
    }

    return (
        <Navbar bg="light" variant="light">
            <Wrapper href="/">
                <img src={dbs_logo} width="75" height="75" alt="/" />
            </Wrapper>
            <Navbar.Brand href="/">TechTrek 2024</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Create</Nav.Link>
                <Nav.Link href="/">Some Link</Nav.Link>
                <Nav.Link href="/">Some Link</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form> */}
                <Nav.Link
                    href="/login"
                    style={{ color: "red" }}
                    onClick={() => localStorage.removeItem("auth-token")}
                >
                    Log Out
                </Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;