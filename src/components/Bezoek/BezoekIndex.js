import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';
import BezoekList from './BezoekList';

const BezoekIndex = () => {
    const [visits, setVisits] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Api.getAllVisits().then(res => {
            setVisits(res.data);
         }).then(() => {
            Api.getAllCompanies().then(res => {
                setCompanies(res.data);
             }).then(() => {
                setIsLoaded(true);
            });
        });
    }, []);
    

    return (
        <div className='container m-5'>
            {isLoaded && <BezoekList visits={visits} companies={companies} />}
            <Link to='/bezoek/create' className='m-auto btn btn-outline-info'>Add visit</Link>
        </div>
    )
};

export default BezoekIndex;
