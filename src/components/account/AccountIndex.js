import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import UserStore from '../../UserStore';
import { useHistory, Link } from 'react-router-dom';

const AccountIndex = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');

    const history = useHistory();

    useEffect(() => {
        Api.getAdminByMail(UserStore.email).then(res => {
            setName(res.data.name + ' ' + res.data.lastname);
            setMail(res.data.email);
        })
    }, []);
    
    const logout = () => {
        UserStore.isLoggedIn = false;
        UserStore.email = '';

        sessionStorage.setItem('email', '');
        sessionStorage.setItem('password', '');

        history.push('/login');
    }

    return (
        <div className='container'>
            <div className='item col-10 col-md-8 mt-5 m-auto'>
                <div className='row col-12'>
                    <div className='col-8 col-md-10'>
                        <h3>{name}</h3>
                        <p>{mail}</p>
                    </div>
                </div>

                <div className='col-12 mt-3 m-auto text-center'>
                    <Link className='btn btn-outline-primary m-2' to={`/account/${mail}`}>Edit account</Link>
                    <button className='btn btn-outline-primary m-2' onClick={() => {logout()}}>Logout</button>
                    <Link to='account/reset' className='btn btn-outline-secondary m-2'>Password reset</Link>
                </div>
            </div>
        </div>
    )
};

export default AccountIndex;
