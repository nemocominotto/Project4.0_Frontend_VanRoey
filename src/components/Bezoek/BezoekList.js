import React from 'react';
import Api from '../../api/Api';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const VisitList = ({visits, companies, bezoekers}) => {

    Moment.locale('nl');

    const output = visits.map(visit => {
        return (
            <div className='item' key={visit.VisitID}>
                <div className='row col-12'>
                    <div className='col-8 col-md-10'>
                        <h3>{visit.company.name}</h3>
                        <p>{Moment(visit.date).format("DD-MM-YYYY - hh:mmu")}</p>
                    </div>
                    <div className='col-4 col-md-2 row'>
                        <Link className='col-5 m-auto btn' to={`/bezoek/edit/${visit.visitID}`}><span className='material-icons'>edit</span></Link>
                        
                        <button className='col-5 m-auto btn' onClick={() => Api.deleteVisit(visit.visitID).then(()=>{window.location.reload(false);})}><span className='material-icons'>delete</span></button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div>
                {output}
            </div>
        </div>
    )
};

export default VisitList;
