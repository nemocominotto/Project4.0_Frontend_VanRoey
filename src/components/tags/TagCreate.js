import React from 'react';
import { useState } from 'react';
import Api from '../../api/Api';
import { useHistory } from 'react-router-dom';

const TagCreate = () => {
    const history = useHistory();

    const [address, setAddress] = useState('');
    const [status, setStatus] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tag = {address, status}
        Api.createTag(tag).then(() => {
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

                <button>Add tag</button>
            </form>
        </div>
    )
};

export default TagCreate;
