import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';
import BezoekList from './BezoekList';
import { format } from "date-fns";
import { PropagateLoader } from 'react-spinners';

const BezoekIndex = () => {
    const [fromdate, setFromDate] = useState('');
    const [tilldate, setTillDate] = useState('');

    const [actualvisits, setActualVisits] = useState([]);
    const [visits, setVisits] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Api.getAllVisits().then(res => {
            let today = new Date();
            let today_final = format(today,"yyyy-MM-dd'T'");

            let filteredVisits = [];

            res.data.forEach(visit => {
                let date = new Date(visit.date);
                let date_final = format(date,"yyyy-MM-dd'T'");

                if(date_final >= today_final) {
                    filteredVisits.push(visit);
                }
            });


            setVisits(filteredVisits);
            setActualVisits(res.data);
         }).then(() => {
            setIsLoaded(true);
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
    }

    if(isLoaded) {
        return (
            <div className='container'>
            
                <div className='row pt-3'>
                <h1>
                        Bezoeken
                    </h1>
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
                        <button className='btn btn-primary px-3'>Zoeken</button>
                    </div>
                    </form>
                </div>
               
                {isLoaded && <BezoekList visits={visits}/>}
                <Link to='/bezoek/create' className='btn btn-primary px-3'>Toevoegen</Link>
            </div>
        )
    }
    else {
        const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        return (
            <div style={style}>
                <div className='sweet-loading'>
                    <PropagateLoader
                        color={'#287abe'}
                        size="40px"
                        loading="true"
                    />
                </div>
            </div>
        )
    }
    
};

export default BezoekIndex;
