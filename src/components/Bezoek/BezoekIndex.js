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
            <div className='row py-5 pb-0 mb-0 form-t'>
                <h1>
                    Bezoeken
                </h1>
            </div>
            <div className='row'>
            <form onSubmit={handleSubmit} className="form-inline">
                <div className='' >
                    <label>Van</label>
                    <input 
                        type="datetime-local" 
                        className='form-control'
                        value={fromdate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                <div className='m-1'>

                </div>
                
                <div className=''>
                    <label>Tot</label>
                    <input 
                        type="datetime-local" 
                        className='form-control'
                        value={tilldate}
                        onChange={(e) => setTillDate(e.target.value)}
                    />
                </div>

                <div className='m-1'>

                </div>
                
                <div className='form-controle mt-4 pt-2'>
                    <button className='btn btn-primary px-3'>Filter</button>
                </div>
                </form>
            </div>
           
            {isLoaded && <BezoekList visits={visits} companies={companies} />}
            <Link to='/bezoek/create' className='btn btn-primary px-4'>Add</Link>
        </div>
    )
};

export default BezoekIndex;
