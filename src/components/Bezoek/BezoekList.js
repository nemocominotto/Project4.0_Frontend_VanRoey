import React from 'react';

const AdminList = ({visits}) => {
    const output = visits.map(visit => {
        return (
            <div className='item' key={visit.VisitId}>
                <div className='row col-12'>
                    <div className='col-8 col-md-10'>
                        <h3>{visit.date }</h3>
                        <p>{visit.email}</p>
                    </div>
                    <div className='col-4 col-md-2 row'>
                        
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

export default AdminList;
