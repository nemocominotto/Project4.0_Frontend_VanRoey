import React from 'react';
import Api from '../../api/Api';
import { Link } from 'react-router-dom';

const TrackerList = ({trackers}) => {
    const output = trackers.map(tracker => {
        return (
            <div className='item' key={tracker.administratorId}>
                <div className='row'>
                    <div className='col-8 col-md-10'>
                        <h3>{tracker.name}</h3>
                    </div>
                    <div className='col-4 col-md-2 row'>
                        <Link className='col-5 m-auto btn' to={`/tracker/edit/${tracker.trackerID}`}><span className='material-icons'>edit</span></Link>
                        <button className='col-5 m-auto btn' onClick={() => Api.deleteTracker(tracker.trackerID).then(()=>{window.location.reload(false);})}><span className='material-icons'>delete</span></button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            {output}
        </div>
    )
};

export default TrackerList;
