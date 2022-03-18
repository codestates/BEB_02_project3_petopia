import React, { useState } from 'react';
import axios from 'axios';

function Login() {

    const username = 'admin';
    const [inputId, setInputId] = useState('');

    const inputHandler = (e) => {
        setInputId(e.target.value)
    }

    const LoginHandler = () => {
        console.log(inputId)

        if (inputId === username) {
            alert('로그인 성공')
            document.location.href = '/'
        }
        axios.post("http://localhost:4000/login", {
            'username': inputId
        })
    }

    const SignupHandler = () => {
        document.location.href = '/signup'
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>username : </label>
                <input type='text' value={inputId} onChange={inputHandler} />
            </div>
            <div>
                <button type='button' onClick={LoginHandler}>Login</button>
                <button type='button' onClick={SignupHandler}>SignUp</button>
            </div>
        </div >
    );
}

export default Login;