import React from 'react';
import { useState } from 'react';
import Api from '../../api/Api';
import { useHistory } from 'react-router-dom';

const TrackerCreate = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const tracker = {name, status}
        Api.createTracker(tracker).then(() => {
            history.push('/trackers');
        });
    }

    return (
        <div className='container'>
            <div className='row pt-4 m-0'>
                <h1 className='m-0'>
                    Tracker
                </h1>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                <form onSubmit={handleSubmit}>
                
                <label>Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  className='form-control'
                  onChange={(e) => setName(e.target.value)}
                />
     

  
                <label>Address</label>
                <input 
                  type="text" 
                  required
                  className='form-control'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />


                <label>Satus</label>
                <select className="form-control" id="category" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value={true}>{'True'}</option>
                    <option value={false}>{'False'}</option>
                </select>

        

                <button className='btn btn-primary'>Add Tracker</button>
            </form>
                </div>
            </div>
        </div>
    )
};

export default TrackerCreate;
