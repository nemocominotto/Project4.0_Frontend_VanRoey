import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserStore from '../../UserStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://backend-vanroey-project40.azurewebsites.net/administrators/login?email=' + email + '&password=' + password, {
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
                toast.error("Wachtwoord of email in onjuist", {position: toast.POSITION.TOP_RIGHT});
            }
        }).then(() => {
            history.push('/');
        })
    }
    

    return (
        <div className='container'>
            <ToastContainer
                    position="top-right"
                    autoClose={1200}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            <div className='row s-row mt-md-5'>
                <div className='col-12 col-md-6 p-md-5 pt-md-3'>
                <form onSubmit={handleSubmit}>
                <h1 className='m-0 pb-3'>Login</h1>
                <label>Email</label>
                <input 
                  type="email" 
                  className='form-control'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Wachtwoord</label>
                <input 
                  type="password" 
                  className='form-control'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className='btn btn-primary'>Login</button>
            </form>
                </div>
                <div className='d-none d-md-block col-6 back-image'>

                </div>
            </div>
        </div>
    )
}

export default Login;
