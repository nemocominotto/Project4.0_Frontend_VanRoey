import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory,useParams } from 'react-router-dom';
import { vi } from 'date-fns/locale';

const BezoekerCreate = () => {
    const history = useHistory();

    const {id} = useParams();

    const [visitortags, setVisitortags] = useState([]);
    const [tags, setTags] = useState([]);

    const [visitID, setVisitID] = useState(id);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
      Api.getAllTags().then(res => {
        setTags(res.data);
      }).then(() => {
      
      });

      Api.getAllVisitorTags().then(res => {
        setVisitortags(res.data);
        console.log(res.data)
      }).then(() => {
          //console.log(res.data)
          //setIsLoaded(true);
      });
    }, []);
      
    const handleSubmit = (e) => {
        e.preventDefault();
        const visitor = {visitID, name, lastname, email}
        let unusedTagId = 0;
        let newvisitorId = 0;

        tags.forEach(tag => {
          let found = false
          visitortags.forEach(visitortag => {
            if(tag.tagId == visitortag.tagId) {
              found = true;
            }
          });

          if(found == false)
          {
            unusedTagId = tag.tagId
          }
        });

        console.log(unusedTagId);

        Api.createVisitor(visitor).then(res => {
          newvisitorId = res.data.visitorID
        }).then(() => {
          let visitorTag = {tagId:unusedTagId, visitorId:newvisitorId}
          console.log(visitorTag);
          Api.createVisitorTag(visitorTag).then(res => {
            console.log(res.data);
          }).then(() => {
            history.push(`/bezoek/edit/${visitor.visitID}`);
          });
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
