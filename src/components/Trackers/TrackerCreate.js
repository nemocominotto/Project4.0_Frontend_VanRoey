import React from 'react';
import { useState } from 'react';
import Api from '../../api/Api';
import { useHistory } from 'react-router-dom';

const TrackerCreate = () => {
    const history = useHistory();

    const [name, setName] = useState('');
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
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Status</label>
                <input 
                  type="checkbox" 
                  className='col-12'
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />

                <button>Add tracker</button>
            </form>
        </div>
    )
};

export default TrackerCreate;
