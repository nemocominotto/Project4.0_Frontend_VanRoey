import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserStore from '../../UserStore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8050/administrators/login?email=' + email + '&password=' + password, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data === true) {
                UserStore.isLoggedIn = true;
                UserStore.email = email;
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('password', password);
            } else {
                UserStore.isLoggedIn = false;
            }
        }).then(() => {
            history.push('/');
        })
    }
    

    return (
        <div className='col-10 col-md-6 m-auto'>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                  type="email" 
                  className='col-12'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input 
                  type="password" 
                  className='col-12'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;
