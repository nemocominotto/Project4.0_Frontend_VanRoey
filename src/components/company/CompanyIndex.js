import React from 'react'
import { useState, useEffect } from 'react'
import Api from '../../api/Api';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                        <span className='col-5 m-auto btn' onClick={() => handleDelete(company.companyID)}><span className='material-icons'>delete</span></span>
                    </div>
                </div>
            </div>
        )
    })

    const handleDelete = async (id) => {
        Api.deleteCompany(id).then(() => {
            setIsChanged(true);
        }).catch(error => {
            toast.error("Bedrijf kan niet worden verwijderd", {position: toast.POSITION.TOP_RIGHT});
        })
    }

  return (
    <div>
        <div className='container mt-0 mb-5'>
        <ToastContainer
              position="top-right"
              autoClose={1200}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <div className='row py-4 m-0'>
                <h1 className='m-0 p-0'>
                    Bedrijven
                </h1>
            </div>
            {output_companies}
            {isLoaded && <Link to='/companies/create' className='btn btn-primary px-3'>Toevoegen</Link>}
        </div>
    </div>
  )
}

export default CompanyIndex