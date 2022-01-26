import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';
import TrackerList from './TrackerList';

const TrackerIndex = () => {
    const [trackers, setTrackers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      Api.getAllTrackers().then(res => {
          setTrackers(res.data);
          console.log(res.data);
      }).then(() => {
          setIsLoaded(true);
      });
    }, []);
    

    return (
        <div className='container m-5'>
            {isLoaded && <TrackerList trackers={trackers}/>}
            <Link to='/tracker/create' className='m-auto btn btn-outline-info'>Tracker toevoegen</Link>
        </div>
    )
};

export default TrackerIndex;
