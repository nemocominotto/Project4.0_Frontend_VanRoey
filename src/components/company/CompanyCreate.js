import React from 'react'
import { useState } from 'react'
import Api from '../../api/Api';
import { useHistory } from 'react-router-dom';

const CompanyCreate = () => {
    const history = useHistory();

    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const company = { name }

        let isEqual

        await Api.getAllCompanies().then(res => {
            res.data.map(comp => {
                if (comp.name === name) {
                    isEqual = true
                }
            })
        }).then(() => {
            if (isEqual) {
                alert('Naam is al in gebruik')
            } else {
                Api.createCompany(company).then(() => {
                    history.push('/companies')
                })
            }
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

                <button className='btn btn-primary px-3'>Opslaan</button>
            </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompanyCreate