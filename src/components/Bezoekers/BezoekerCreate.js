import React from 'react';
import { useState } from 'react';
import Api from '../../api/Api';
import { useHistory,useParams } from 'react-router-dom';

const BezoekerCreate = () => {
    const history = useHistory();

    const {id} = useParams();

    const [visitID, setVisitID] = useState(id);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const visitor = {visitID, name, lastname, email}

        Api.createVisitor(visitor).then(() => {
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

                <button>Add administrator</button>
            </form>
        </div>
    )
};

export default BezoekerCreate;
