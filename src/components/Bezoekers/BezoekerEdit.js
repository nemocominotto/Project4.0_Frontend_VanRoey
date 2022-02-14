import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory, useParams } from 'react-router-dom';


const BezoekerEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [visitorID, setVisitorID] = useState(0);
    const [visitID, setVisitID] = useState(0);
    const [tagID, setTagID] = useState(0);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    

    useEffect(() => {
        Api.getVisitor(id).then(res => {
            setVisitID(res.data.visitID);
            setVisitorID(res.data.visitorID);
            setTagID(res.data.tagID);
            setName(res.data.name);
            setLastname(res.data.lastname);
            setEmail(res.data.email);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const visitor = {visitorID,visitID,tagID, name, lastname, email}

        console.log('visitors');
        console.log(visitor);


        Api.updateVisitor(visitor).then(() => {
            history.push(`/bezoek/edit/${visitor.visitID}`);
        });
    }
    

    return (
        <div className='container'>
            <div className='row pt-4 m-0'>
                <h1 className='m-0'>
                    Bezoeker
                </h1>
            </div>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <form onSubmit={handleSubmit}>
                  <label>Naam</label>
                  <input 
                    type="text" 
                    className='form-control'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <label>Achternaam</label>
                  <input 
                    type="text" 
                    className='form-control'
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />

                <label>Email adres</label>
                <input 
                  type="email" 
                  className='form-control'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className='btn btn-primary px-3'>Update</button>
            </form>
              </div>
            </div>
        </div>
    )
};

export default BezoekerEdit;
