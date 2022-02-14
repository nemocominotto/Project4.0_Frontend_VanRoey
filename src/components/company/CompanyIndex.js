import React from 'react'
import { useState, useEffect } from 'react'
import Api from '../../api/Api';
import { Link } from 'react-router-dom';

const CompanyIndex = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
      Api.getAllCompanies().then(res => {
          setCompanies(res.data);
      }).then(() => {
          setIsLoaded(true);
      })

      setIsChanged(false);
    }, [isChanged]);
    
    const output_companies = isLoaded && companies.map(company => {
        return (
            <div className='item' key={company.companyID}>
                <div className='row col-12'>
                    <div className='col-8 col-md-10'>
                        <h3>{company.name}</h3>
                    </div>
                    <div className='col-4 col-md-2 row'>                   
                        <Link className='col-5 m-auto btn' to={`/companies/edit/${company.companyID}`}><span className='material-icons'>edit</span></Link>
                        <button className='col-5 m-auto btn' onClick={() => handleDelete(company.companyID)}><span className='material-icons'>delete</span></button>
                    </div>
                </div>
            </div>
        )
    })

    const handleDelete = async (id) => {
        Api.deleteCompany(id).then(() => {
            setIsChanged(true);
        })
    }

  return (
    <div>
        <div className='container mt-5 mb-5'>
            {output_companies}
            {isLoaded && <Link to='/companies/create' className='m-auto btn btn-outline-info'>Bedrijf toevoegen</Link>}
        </div>
    </div>
  )
}

export default CompanyIndex