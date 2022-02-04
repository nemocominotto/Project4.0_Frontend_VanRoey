import React from 'react';
import Api from '../../api/Api';
import { Link } from 'react-router-dom';
import UserStore from '../../UserStore';

const AdminList = ({admins}) => {
    const output = admins.map(admin => {
        return (
            <div className='item' key={admin.administratorID}>
                <div className='row col-12'>
                    <div className='col-8 col-md-10'>
                        <h3>{admin.name + ' ' + admin.lastname}</h3>
                        <p>{admin.email}</p>
                    </div>
                    <div className='col-4 col-md-2 row'>                   
                        {UserStore.email === admin.email ? '' : <Link className='col-5 m-auto btn' to={`/administrator/edit/${admin.administratorID}`}><span className='material-icons'>edit</span></Link>}
                        {UserStore.email === admin.email ? '' : <button className='col-5 m-auto btn' onClick={() => Api.deleteAdmin(admin.administratorID).then(()=>{window.location.reload(false);})}><span className='material-icons'>delete</span></button>}
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div>
            {output}
        </div>
    )
};

export default AdminList;
