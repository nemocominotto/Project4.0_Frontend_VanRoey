import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';
import TrackerList from './TrackerList';
import { PropagateLoader } from 'react-spinners';

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
    

    if(isLoaded) {
        return (
            <div className='container'>
                <div className='row py-4 m-0'>
                    <h1 className='m-0 p-0'>
                        Trackers
                    </h1>
                </div>
                {isLoaded && <TrackerList trackers={trackers}/>}
                <Link to='/tracker/create' className='btn btn-primary px-3'>Toevoegen</Link>
            </div>
        )
    }
    else {
        const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        return (
            <div style={style}>
                <div className='sweet-loading'>
                    <PropagateLoader
                        color={'#287abe'}
                        size="40px"
                        loading="true"
                    />
                </div>
            </div>
        )
    }
};

export default TrackerIndex;
