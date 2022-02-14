import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory, useParams } from 'react-router-dom';

const AdminEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [administratorID, setAdministratorID] = useState(0);
    const [oldEmail, setOldEmail] = useState('');

    useEffect(() => {
        Api.getAdmin(id).then(res => {
            setName(res.data.name);
            setLastname(res.data.lastname);
            setEmail(res.data.email);
            setOldEmail(res.data.email);
            setAdministratorID(res.data.administratorID);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const administrator = {administratorID, name, lastname, email}
        
        Api.getAdminByMail(email).then(res => {
            if (email === oldEmail || !res.data) {
                Api.updateAdmin(administrator).then(() => {
                    history.push('/administrators');
                });
            } else {
                alert('email is al in gebruik')
            }
        })
    }
    

    return (
        <div className='container'>
            <div className='row pt-4 m-0'>
                <h1 className='m-0'>
                    Administrator
                </h1>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                <form onSubmit={handleSubmit}>
                <label>Naam</label>
                <input 
                  type="text" 
                  className='form-control'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Achternaam</label>
                <input 
                  type="text" 
                  className='form-control'
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />

                <label>Email adres</label>
                <input 
                  type="email" 
                  className='form-control'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className='btn btn-primary px-3'>Update</button>
            </form>
                </div>
            </div>
        </div>
    )
};

export default AdminEdit;
