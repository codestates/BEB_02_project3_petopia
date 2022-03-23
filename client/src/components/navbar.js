import { Container, FormControl, Navbar, Form, Button, Nav } from "react-bootstrap";
import { useState } from "react";

function Navigation() {

    const handleRemoveToken = async () => {
        localStorage.setItem('isConnected', false);
        localStorage.setItem('account', null);
        localStorage.removeItem('user-token');
        localStorage.removeItem('token-verification');
        window.location.replace('http://localhost:3001/');
      };

    return (
        <div className="Navbar">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">🐻 PETOPIA</Navbar.Brand>
                    <Form className="d-flex justify-content-end">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/main" className="me-2">🏠</Nav.Link>
                        <Nav.Link href="/create" className="me-2">➕</Nav.Link>
                        <Nav.Link href="/mypage" className="me-2">🙋🏻‍♂️</Nav.Link>
                        <Button onClick={handleRemoveToken}>Disconnect</Button>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    );
}

export default Navigation;