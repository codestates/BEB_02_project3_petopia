import { Container, FormControl, Navbar, Form, Button, Nav } from "react-bootstrap";
import { useState } from "react";

import { injected } from "./walletconnect";
import { useWeb3React } from '@web3-react/core';

function Navigation() {

    const CONNECT_TEXT = "Connect Wallet"
    const DISCONNECT_TEXT = "Disconnect"

    const [btnText, setBtnText] = useState(CONNECT_TEXT);

    const { account, activate, deactivate } = useWeb3React()

    const Connecthandler = async () => {
        if (btnText === CONNECT_TEXT) {
            try {
                setBtnText(DISCONNECT_TEXT);
                await activate(injected)
            } catch (err) {
                console.log(err);
            }
        } else {
            setBtnText(CONNECT_TEXT)
            deactivate()
        }
    }

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
                        <Nav.Link href="/" className="me-2">🏠</Nav.Link>
                        <Nav.Link href="/feedwrite" className="me-2">➕</Nav.Link>
                        <Nav.Link href="/mypage" className="me-2">🙋🏻‍♂️</Nav.Link>
                        <Button onClick={Connecthandler}>
                            {btnText === DISCONNECT_TEXT ? <b>{account}</b> : <span>Wallet Connect</span>} </Button>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    );
}

export default Navigation;