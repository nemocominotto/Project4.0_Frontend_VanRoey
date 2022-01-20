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
          console.log(res.data);
      }).then(() => {
          setIsLoaded(true);
      });
    }, []);
    

    return (
        <div className='container m-5'>
            {isLoaded && <AdminList admins={admins}/>}
            <Link to='/administrator/create' className='m-auto btn btn-outline-info'>Administrator toevoegen</Link>
        </div>
    )
};

export default AdminIndex;

