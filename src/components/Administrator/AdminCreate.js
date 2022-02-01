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

                <label>Password</label>
                <input 
                  type="password" 
                  className='col-12'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button>Add administrator</button>
            </form>
        </div>
    )
};

export default AdminCreate;
