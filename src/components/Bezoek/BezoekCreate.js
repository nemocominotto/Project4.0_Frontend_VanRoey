import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory } from 'react-router-dom';
import { format } from "date-fns";

const BezoekCreate = () => {
    const history = useHistory();

    const [companies, setCompanies] = useState([]);

    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(false);
    const [companyID, setCompanyID] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        Api.getAllCompanies().then(res => {
            setCompanies(res.data);
         }).then(() => {
            setIsLoaded(true);
        });
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        var datef = new Date(date);

        var formattedDate = format(datef,"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

        const visit = {companyID, email, date:formattedDate, status:false}
        console.log(visit);
        Api.createVisit(visit).then(() => {
            history.push('/bezoeken');
        });
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <label>Email address</label>
                <input 
                  type="email" 
                  className='col-12'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Email address</label>
                <input 
                    type="datetime-local" 
                    className='col-12'
                    value={date}
                    required
                    onChange={(e) => setDate(e.target.value)}
                    min="2022-01-01" max="2022-12-31"
                />

                <label>Bedrijf</label>
                <select className="form-control" id="category" value={companyID} onChange={(e) => setCompanyID(e.target.value)}>
                    {companies.map((company) => <option key={company.companyID} value={company.companyID}>{company.name}</option>)}
                </select>

                <button>Add Bezoek</button>
            </form>
        </div>
    )
};

export default BezoekCreate;
