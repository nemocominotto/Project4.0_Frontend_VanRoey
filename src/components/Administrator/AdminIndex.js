import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';
import AdminList from './AdminList';

const AdminIndex = () => {
    const [admins, setAdmins] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      Api.getAllAdmins().then(res => {
          setAdmins(res.data);
      }).then(() => {
          setIsLoaded(true);
      });
    }, []);
    

    return (
        <div className='container m-auto mt-0 mb-5'>
            <div className='row py-4 m-0'>
                <h1 className='m-0 p-0'>
                    Administrators
                </h1>
            </div>
            {isLoaded && <AdminList admins={admins}/>}
            {isLoaded && <Link to='/administrator/create' className='m-auto btn btn-primary'>Toevoegen</Link>}
        </div>
    )
};

export default AdminIndex;

