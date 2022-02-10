import React from 'react';
import Api from '../../api/Api';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const VisitList = ({visits, companies, bezoekers}) => {

    Moment.locale('nl');

    const output = visits.map(visit => {
        return (
            <div key={visit.visitID} className='row p-3 my-3 bg-w border-rd pt-4'>
                <div className='col-4'>
                    <p className='font-weight-bold'>{visit.company.name}</p>
                </div>
                <div className='col-4 font-weight-bold'>{Moment(visit.date).format("DD-MM-YYYY - hh:mmu")}</div>
                <div className='col-4 text-right'>
                    <Link className='btn btn-primary' to={`/bezoek/edit/${visit.visitID}`}><span className='px-4'>Edit</span></Link>
                    <span className='spacer d-none d-xs-inline'></span>
                    <button className='btn btn-danger delete' onClick={() => Api.deleteVisit(visit.visitID).then(()=>{window.location.reload(false);})}><span className='px-3'>Delete</span></button>
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
