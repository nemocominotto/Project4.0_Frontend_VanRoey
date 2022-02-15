import React from 'react';
import { useState } from 'react';
import Api from '../../api/Api';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast.error("Email is al ingebruik", {position: toast.POSITION.TOP_RIGHT});
          }
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

                <button className='btn btn-primary'>Toevoegen</button>
            </form>
                </div>
            </div>
        </div>
    )
};

export default AdminCreate;
