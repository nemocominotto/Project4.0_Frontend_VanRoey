import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory, useParams } from 'react-router-dom';

const BezoekerEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [visitorID, setVisitorID] = useState(0);
    const [visitID, setVisitID] = useState(0);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    

    useEffect(() => {
        Api.getVisitor(id).then(res => {
            setVisitID(res.data.visitID);
            setVisitorID(res.data.visitorID);
            setName(res.data.name);
            setLastname(res.data.lastname);
            setEmail(res.data.email);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const visitor = {visitorID,visitID, name, lastname, email}
        Api.updateVisitor(visitor).then(() => {
            history.push(`/bezoek/edit/${visitor.visitID}`);
        });
    }
    

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                  type="text" 
                  className='col-12'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Last name</label>
                <input 
                  type="text" 
                  className='col-12'
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />

                <label>Email address</label>
                <input 
                  type="email" 
                  className='col-12'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button>Update administrator</button>
            </form>
        </div>
    )
};

export default BezoekerEdit;
