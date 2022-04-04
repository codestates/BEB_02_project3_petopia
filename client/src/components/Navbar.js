import { Container, FormControl, Navbar, Form, Button, Nav } from "react-bootstrap";
import { useState } from "react";
import petopia from '../css/image/petopia_text.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStethoscope, faUser } from '@fortawesome/free-solid-svg-icons'

import dotenv from 'dotenv';
dotenv.config();

const domain = process.env.REACT_APP_DOMAIN;


function Navigation() {

    const [search, setSearch] = useState('')

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    const searchBtn = () => {
        if (search !== '') {
            localStorage.setItem('searchName', search);
            window.location.replace(`${domain}/user/` + search);
        } else {
            alert('검색어를 입력해주세요.')
        }
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
        window.location.replace(`${domain}`);
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
                    <Navbar.Brand href="/"><img src={petopia} width="200px" /></Navbar.Brand>
                    <Form className="d-flex justify-content-end">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            class="search-bar"
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
                        <Nav.Link href="/" className="me-2"><FontAwesomeIcon size="lg" icon={faHouse} /></Nav.Link>
                        <Nav.Link href="/hospital" className="me-2"><FontAwesomeIcon size="lg" icon={faStethoscope} /></Nav.Link>
                        <Nav.Link href="/mypage" className="me-2"><FontAwesomeIcon size="lg" icon={faUser} /></Nav.Link>
                        <Button onClick={handleRemoveToken}>Disconnect</Button>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    );
}

export default Navigation;
