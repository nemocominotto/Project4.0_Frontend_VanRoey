import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory,useParams } from 'react-router-dom';
import { vi } from 'date-fns/locale';

const BezoekerCreate = () => {
    const history = useHistory();
    const {id} = useParams();
    const [visitors, setVisitors] = useState([]);
    const [tags, setTags] = useState([]);
    const [visitID, setVisitID] = useState(id);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
      Api.getAllTags().then(res => {
        setTags(res.data);
      }).then(() => {});

      Api.getAllVisitorsByVisit(id).then(res => {
        setVisitors(res.data);
      }).then(() => {});
    }, []);
      
    const handleSubmit = (e) => {
        e.preventDefault();
        let unusedtagID = 0;

        tags.forEach(tag => {
          let found = false
          visitors.forEach(visitor => {
            if(tag.tagID == visitor.tagID) {
              found = true;
            }
          });

          if(found == false)
          {
            unusedtagID= tag.tagID
          }
        });

        const visitor = {visitID,tagID:unusedtagID, name, lastname, email}

        Api.createVisitor(visitor).then(res => {
        }).then(() => {
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

                <button>Add bezoeker</button>
            </form>
        </div>
    )
};

export default BezoekerCreate;
