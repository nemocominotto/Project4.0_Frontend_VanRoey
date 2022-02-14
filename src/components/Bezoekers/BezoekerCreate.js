import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory,useParams } from 'react-router-dom';
import { vi } from 'date-fns/locale';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      }).then(() => {

      });
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

          if(found == false && tag.status == true)
          {
            unusedtagID = tag.tagID
          }
        });

        if(unusedtagID == 0) {
          toast.error("Out of tags!", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        else {
          const visitor = {visitID,tagID:unusedtagID, name, lastname, email}

          Api.createVisitor(visitor).then(res => {
          }).then(() => {
            history.push(`/bezoek/edit/${visitor.visitID}`);
          });
        }
    }

    return (
        <div className='container'>
            <ToastContainer
              position="top-right"
              autoClose={800}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
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

                <button className='btn btn-primary px-3'>Opslaan</button>
            </form>
              </div>
            </div>
        </div>
    )
};

export default BezoekerCreate;
