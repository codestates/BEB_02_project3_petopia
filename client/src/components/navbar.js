import { Container, FormControl, Navbar, Form, Button, Nav } from "react-bootstrap";
import { useState } from "react";

function Navigation() {

    const [search, setSearch] = useState('')

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    const searchBtn = () => {
        localStorage.setItem('searchName', search);
        window.location.replace('http://localhost:3000/user/' + search)
    }


    const handleRemoveToken = async () => {
        // localStorage.setItem('isConnected', false);
        // localStorage.setItem('account', null);
        // localStorage.removeItem('user-token');
        // localStorage.removeItem('token-verification');
        // localStorage.removeItem('searchName');
        // localStorage.removeItem('userId');
        // localStorage.removeItem('networkType');
        localStorage.clear();
        window.location.replace('http://localhost:3000/');
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchBtn()
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
                            onChange={searchHandler}
                            onKeyPress={handleKeyPress}
                        />
                        <Button variant="outline-success" onClick={searchBtn} >Search</Button>
                    </Form>
                    <Nav
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/" className="me-2">🏠</Nav.Link>
                        <Nav.Link href="/create" className="me-2">➕</Nav.Link>
                        <Nav.Link href="/mypage" className="me-2">🙋🏻‍♂️</Nav.Link>
                        <Nav.Link href="/hospital" className="me-2">🏥</Nav.Link>
                        <Button onClick={handleRemoveToken}>Disconnect</Button>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    );
}

export default Navigation;