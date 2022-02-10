import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';
import BezoekList from './BezoekList';
import { format } from "date-fns";

const BezoekIndex = () => {
    const [fromdate, setFromDate] = useState('');
    const [tilldate, setTillDate] = useState('');
    const [actualvisits, setActualVisits] = useState([]);
    const [visits, setVisits] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Api.getAllVisits().then(res => {
            setVisits(res.data);
            setActualVisits(visits);
         }).then(() => {
            Api.getAllCompanies().then(res => {
                setCompanies(res.data);
             }).then(() => {
                setIsLoaded(true);
            });
        });
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        let filteredVisits = [];

        if(fromdate == '' && tilldate =='') {
            setVisits(actualvisits);
        }
        else if(fromdate != '' && tilldate =='') {
            let datefFrom = new Date(fromdate);
            let formattedFromDate = format(datefFrom,"yyyy-MM-dd'T'HH:mm:ss");

            actualvisits.forEach(actualvisit => {
                if(actualvisit.date > formattedFromDate) {
                    filteredVisits.push(actualvisit);
                }
            });
            setVisits(filteredVisits);
        }
        else if(fromdate == '' && tilldate !='') {
            let datefTill = new Date(tilldate);
            let formattedTillDate = format(datefTill,"yyyy-MM-dd'T'HH:mm:ss");

            actualvisits.forEach(actualvisit => {
                if(actualvisit.date < formattedTillDate) {
                    filteredVisits.push(actualvisit);
                }
            });
            setVisits(filteredVisits);
        }
        else if(fromdate != '' && tilldate !='') {
            let datefFrom = new Date(fromdate);
            let formattedFromDate = format(datefFrom,"yyyy-MM-dd'T'HH:mm:ss");

            let datefTill = new Date(tilldate);
            let formattedTillDate = format(datefTill,"yyyy-MM-dd'T'HH:mm:ss");

            actualvisits.forEach(actualvisit => {
                if(actualvisit.date > formattedFromDate && actualvisit.date < formattedTillDate) {
                    filteredVisits.push(actualvisit);
                }
            });
            setVisits(filteredVisits);
        }

        console.log();
    }

    return (
        <div className='container'>
            <div className='row py-5 pb-0 form-t'>
                <h1>
                    Bezoeken
                </h1>
            </div>
            <div className='row'>
            <form onSubmit={handleSubmit} className="form-inline form-l">
                <div className='col-5 col-sm-3 m-1 form-date' >
                    <label>Van</label>
                    <input 
                        type="datetime-local" 
                        className='form-control'
                        value={fromdate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div className='col-5 col-sm-3 m-1'>
                    <label>Tot</label>
                    <input 
                        type="datetime-local" 
                        className='form-control'
                        value={tilldate}
                        onChange={(e) => setTillDate(e.target.value)}
                    />
                </div>
                <div className='col-2 col-sm-6 m-2'>
                    <button className='mt-5 btn btn-primary'>Filter</button>
                </div>
                </form>
            </div>
           
            {isLoaded && <BezoekList visits={visits} companies={companies} />}
            <Link to='/bezoek/create' className='m-auto btn btn-success px-5'>Add</Link>
        </div>
    )
};

export default BezoekIndex;
