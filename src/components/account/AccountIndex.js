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
            <div className='row s-row mt-md-5'>
                <div className='col-12 col-md-6 p-md-5 pt-md-3'>
                <form>
                <h1 className='m-0 pb-3'>Administrator</h1>
                <label>Naam</label>
                <input 
                  type="text" 
                  className='form-control'
                  disabled
                  value={name}
                />

                <label>Email</label>
                <input 
                  type="text" 
                  className='form-control'
                  disabled
                  value={mail}
                />
                <br/>
                <p>
                    <Link className='btn btn-primary' to={`/account/${mail}`}>Bewerken</Link>  <span className='btn btn-primary' onClick={() => {logout()}}>Log uit</span> <Link to='account/reset' className='btn btn-secondary'>Reset</Link>
                </p>
            </form>
                </div>
                <div className='d-none d-md-block col-6 back-image'>

                </div>
            </div>
        </div>
    )
};

export default AccountIndex;
