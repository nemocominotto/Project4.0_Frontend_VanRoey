import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory, useParams } from 'react-router-dom';

const TrackerEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [trackerID, setTrackerID] = useState(0);

    useEffect(() => {
        Api.getTracker(id).then(res => {
            setName(res.data.name);
            setStatus(res.data.status);
            setTrackerID(res.data.trackerID);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tracker = {trackerID, name, status}
        Api.updateTracker(tracker).then(() => {
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
