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
            <div className='row py-4 pb-2 m-0'>
                <h1 className='m-0'>
                    Tag 
                </h1>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <form onSubmit={handleSubmit}>
                        <label>Mac address</label>
                        <input 
                            type="text" 
                            className='form-control'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label>Active</label>
                        <select className="form-control" id="category" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value={true}>{'True'}</option>
                            <option value={false}>{'False'}</option>
                        </select>
                        <button className='btn btn-primary'>Update tag</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default TagEdit;
