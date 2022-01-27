import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory } from 'react-router-dom';
import UserStore from '../../UserStore';

const AccountReset = () => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [administratorId, setAdministratorId] = useState(0);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        Api.getAdminByMail(UserStore.email).then(res => {
            setName(res.data.name);
            setLastname(res.data.lastname);
            setEmail(res.data.email);
            setAdministratorId(res.data.administratorId);
        })
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const administrator = {name, lastname, email, password}

        if (password === confirmPassword) {
            Api.deleteAdmin(administratorId).then(() => {
                Api.createAdmin(administrator).then(() => {
                    sessionStorage.setItem('password', password);
                    history.push('/account');
                })
            })
        }
    }

    return (
        <div className='container'>
            <div className='item'>
                <h3>{email}</h3>

                <form className='mt-3' onSubmit={handleSubmit}>

                <label>Password</label>
                <input 
                  type="password" 
                  className='col-12'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label>Confirm password</label>
                <input 
                  type="password" 
                  className='col-12'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <div className='col-12 m-aut text-center'>
                    <button className={password === confirmPassword && password !== '' ? 'btn btn-success' : 'btn btn-secondary disabled'}>Update password</button>
                </div>
            </form>
            </div>
        </div>
    )
};

export default AccountReset;
