import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory, useParams } from 'react-router-dom';

const TagEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [address, setAddress] = useState('');
    const [status, setStatus] = useState(false);
    const [tagID, setTagID] = useState(0);

    useEffect(() => {
        Api.getTag(id).then(res => {
            setAddress(res.data.address);
            setStatus(res.data.status);
            setTagID(res.data.tagID);
        })
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const tag = {tagID, address, status}
        Api.updateTag(tag).then(() => {
            history.push('/tags');
        });
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <label>Mac address</label>
                <input 
                  type="text" 
                  className='col-12'
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <label>Status</label>
                <input 
                  type="checkbox" 
                  className='col-12'
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />

                <button>Update tag</button>
            </form>
        </div>
    )
};

export default TagEdit;
