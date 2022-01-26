import React from 'react';
import Api from '../../api/Api';
import { Link } from 'react-router-dom';

const AdminList = ({visits, companies, bezoekers}) => {
    const output = visits.map(visit => {
        return (
            <div className='item' key={visit.VisitId}>
                <div className='row col-12'>
                    <div className='col-8 col-md-10'>
                        <h3><NumberList companies={companies} visit={visit}/></h3>
                        <p>{visit.email}</p>
                    </div>
                    <div className='col-4 col-md-2 row'>
                        <Link className='col-5 m-auto btn' to={`/bezoek/edit/${visit.visitID}`}><span className='material-icons'>edit</span></Link>
                        <p>{visit.visitID}</p>
                        <button className='col-5 m-auto btn' onClick={() => Api.deleteVisit(visit.visitID).then(()=>{window.location.reload(false);})}><span className='material-icons'>delete</span></button>
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

function NumberList(props) {
    const companies = props.companies;
    const visit = props.visit
    const listItems = companies.map((company) => {
        if(company.companyID === visit.companyID)
            return <p>Bezoek - {company.name}</p>
        return null
    }   

    );
    return (
      <p>{listItems}</p>
    );
}

export default AdminList;
