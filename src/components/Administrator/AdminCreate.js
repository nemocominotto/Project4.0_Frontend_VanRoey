import React from 'react';
import { useState } from 'react';
import Api from '../../api/Api';
import { useHistory } from 'react-router-dom';

const AdminCreate = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const administrator = {name, lastname, email, password}
        
        Api.getAdminByMail(email).then(res => {
          if (!res.data) {
            Api.createAdmin(administrator).then(() => {
              history.push('/administrators');
            });
          } else {
            alert('email al in gebruik')
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
                <label>Name</label>
                <input 
                  type="text" 
                  className='form-control'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Last name</label>
                <input 
                  type="text" 
                  className='form-control'
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />

                <label>Email address</label>
                <input 
                  type="email" 
                  className='form-control'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className='btn btn-primary'>Update administrator</button>
            </form>
                </div>
            </div>
        </div>
    )
};

export default AdminCreate;
