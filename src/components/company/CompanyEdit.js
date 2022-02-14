import React from 'react'
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory, useParams } from 'react-router-dom';

const CompanyEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [name, setName] = useState('');

    useEffect(() => {
      Api.getCompany(id).then(res => {
          setName(res.data.name)
      })
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const company = { name, companyID: id }

        Api.updateCompany(company).then(() => {
            history.push('/companies')
        })
    }

  return (
    <div>
        <div className='container'>
            <div className='row pt-4 m-0'>
                <h1 className='m-0'>
                    Bedrijf
                </h1>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                <form onSubmit={handleSubmit}>
                <label>Naam</label>
                <input 
                  type="text" 
                  className='form-control'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <button className='btn btn-primary px-3'>Update</button>
            </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompanyEdit