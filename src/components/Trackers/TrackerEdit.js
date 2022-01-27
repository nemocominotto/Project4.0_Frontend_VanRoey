import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory, useParams } from 'react-router-dom';

const TrackerEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [trackerId, setTrackerId] = useState(0);

    useEffect(() => {
        Api.getTracker(id).then(res => {
            setName(res.data.name);
            setStatus(res.data.status);
            setTrackerId(res.data.trackerId);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tracker = {trackerId, name, status}
        Api.updateAdmin(tracker).then(() => {
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

                <label>Satus</label>
                <input 
                  type="text" 
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />

                <button>Update Tracker</button>
            </form>
        </div>
    )
};

export default TrackerEdit;
