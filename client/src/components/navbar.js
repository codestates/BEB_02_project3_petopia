import { Container, FormControl, Navbar, Form, Button, Nav } from "react-bootstrap";
import { useState } from "react";

function Navigation() {

    const CONNECT_TEXT = "Connect Wallet"
    const DISCONNECT_TEXT = "Disconnect"

    const [btnText, setBtnText] = useState(CONNECT_TEXT);

    const Connecthandler = () => {
        if (btnText === CONNECT_TEXT) {
            setBtnText(DISCONNECT_TEXT);
        } else {
            setBtnText(CONNECT_TEXT)
        }
    }

    return (
        <div className="Navbar">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/main">🐻 PETOPIA</Navbar.Brand>
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
                        <Button onClick={Connecthandler}>{btnText}</Button>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    );
}

export default Navigation;