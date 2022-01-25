import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';
import BezoekList from './BezoekList';

const BezoekIndex = () => {
    const [visits, setVisits] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      Api.getAllVisits().then(res => {
          setVisits(res.data);
          console.log(res.data);
      }).then(() => {
          setIsLoaded(true);
      });
    }, []);
    

    return (
        <div className='container m-5'>
            {isLoaded && <BezoekList visits={visits}/>}
            <Link to='/bezoek/create' className='m-auto btn btn-outline-info'>Administrator toevoegen</Link>
        </div>
    )
};

export default BezoekIndex;
