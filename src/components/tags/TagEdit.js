import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory, useParams } from 'react-router-dom';

const TagEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [address, setAddress] = useState('');
    const [status, setStatus] = useState(false);
    const [tagId, setTagId] = useState(0);

    useEffect(() => {
        Api.getTag(id).then(res => {
            setAddress(res.data.address);
            setStatus(res.data.status);
            setTagId(res.data.tagId);
        })
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const tag = {tagId, address, status}
        Api.updateTag(tag).then(() => {
            history.push('/tags');
        });
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <label>Address</label>
                <input 
                  type="text" 
                  className='col-12'
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <button>Update tag</button>
            </form>
        </div>
    )
};

export default TagEdit;
