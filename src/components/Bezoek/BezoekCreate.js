import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { useHistory } from 'react-router-dom';
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BezoekCreate = () => {
    const history = useHistory();

    const [companies, setCompanies] = useState([]);

    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
   
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

        let today = new Date();
        let today_final = format(today,"yyyy-MM-dd'T'");

        let datef = new Date(date);
        let datef_final = format(datef,"yyyy-MM-dd'T'");

        if(datef_final >= today_final) {
            let formattedDate = format(datef,"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            const visit = {companyID, email, date:formattedDate, status:false}
            Api.createVisit(visit).then(() => {
                history.push('/bezoeken');
            });
        }
        else {
            toast.error("Can't book a visit in the past", {position: toast.POSITION.TOP_RIGHT});
        }
    }

    return (
        <div className='container'>
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
            <div className='row pt-4 m-0'>
                <h1 className='m-0'>
                    Bezoek
                </h1>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <form onSubmit={handleSubmit} className=''>
                        <label>Email address</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Date</label>
                        <input 
                            type="datetime-local" 
                            className='form-control'
                            value={date}
                            required
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <label>Company</label>
                            <select className="form-control" id="category" value={companyID} onChange={(e) => setCompanyID(e.target.value)}>
                                {companies.map((company) => 
                                <option key={company.companyID} value={company.companyID}>{company.name}</option>)}
                        </select>

                        <button className='btn btn-primary'>Create Visit</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default BezoekCreate;
