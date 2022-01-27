import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory, useParams } from 'react-router-dom';
import UserStore from '../../UserStore';

const AccountEdit = () => {
    const {mail} = useParams();

    const history = useHistory();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [administratorId, setAdministratorId] = useState(0);

    useEffect(() => {
        Api.getAdminByMail(mail).then(res => {
            setName(res.data.name);
            setLastname(res.data.lastname);
            setEmail(res.data.email);
            setAdministratorId(res.data.administratorId);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        UserStore.email = email;

        sessionStorage.setItem('email', email);

        const administrator = {administratorId, name, lastname, email}
        Api.updateAdmin(administrator).then(() => {
            history.push('/account');
        });
    }
    

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                  type="text" 
                  className='col-12'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Last name</label>
                <input 
                  type="text" 
                  className='col-12'
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />

                <label>Email address</label>
                <input 
                  type="email" 
                  className='col-12'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button>Update account</button>
            </form>
        </div>
    )
};

export default AccountEdit;
