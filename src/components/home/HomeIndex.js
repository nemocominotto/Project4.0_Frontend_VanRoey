import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import UserStore from '../../UserStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PropagateLoader } from 'react-spinners';

const HomeIndex = () => {
    const [user, setUser] = useState('');
    const [visits, setVisits] = useState([]);
    const [company, setCompany] = useState(false);

    const today = new Date();
    const [todayString, setTodayString] = useState('');
    /*const [tomorrowString, setTomorrowString] = useState('');
    const [selectedDate, setSelectedDate] = useState('');*/

    const [isLoaded, setIsLoaded] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        Api.getAdminByMail(UserStore.email).then(res => {
            setUser(res.data.name + ' ' + res.data.lastname);
        })

        Api.getAllVisits().then(res => {
            /*setTomorrowString(today.getDate()+1 + '-' + today.toLocaleString('nl', {month: 'numeric'}) + '-' + today.toLocaleString('nl', {year: 'numeric'}))*/
            setTodayString(today.getDate() + '-' + today.toLocaleString('nl', {month: 'numeric'}) + '-' + today.toLocaleString('nl', {year: 'numeric'}));
            /*setSelectedDate(today.getDate() + '-' + today.toLocaleString('nl', {month: 'numeric'}) + '-' + today.toLocaleString('nl', {year: 'numeric'}));*/
            setVisits(res.data);
            setUpdate(false);
            res.data.map(visit => {
                if (visit.status === true && today.getDate() + '-' + today.toLocaleString('nl', {month: 'numeric'}) + '-' + today.toLocaleString('nl', {year: 'numeric'}) === new Date(visit.date).toLocaleString('nl', {day: 'numeric'}) + '-' + new Date(visit.date).toLocaleString('nl', {month: 'numeric'}) + '-' + new Date(visit.date).toLocaleString('nl', {year: 'numeric'})) {
                    setCompany(true)
                }
            });
            setIsLoaded(true);
        })
    }, [update]);

    const oneActive = (visit) => {
        if ((company === true && visit.status === true) || (company === false)) {
            Api.updateVisitStatus(visit).then(() => {
                setUpdate(true);
                setCompany(!company);
            });
        } else {
            toast.error("Er is al een bezoek actief", {position: toast.POSITION.TOP_RIGHT});
        }
    }

    /*const setFilterDate = () => {
        if (selectedDate === todayString) {
            setSelectedDate(tomorrowString);
        } else {
            setSelectedDate(todayString);
        }
    }*/

    const output_visits = [].concat(visits).sort((a,b) => a.date > b.date ? 1 : -1).map(visit => {
        if (new Date(visit.date).toLocaleString('nl', {day: 'numeric'}) + '-' + new Date(visit.date).toLocaleString('nl', {month: 'numeric'}) + '-' + new Date(visit.date).toLocaleString('nl', {year: 'numeric'}) === todayString) {
            return (
            <div className='item' key={visit.visitID}>
                <div className='col-12 m-auto row'>
                    <div className='col-8 col-md-10'>
                        <h3>{visit.company.name}</h3>
                        <p>vandaag om {new Date(visit.date).toLocaleString('nl', {hour: 'numeric'}) + ':' + new Date(visit.date).toLocaleString('nl', {minute: '2-digit'})}</p>
                    </div>
                    <div className='col-4 pt-3 col-md-2'>
                        {visit.status ? (
                            <p onClick={() => {oneActive(visit)}} className='col-3 m-auto btn'><span className='material-icons done'>done</span></p>
                        ): (
                            <p onClick={() => {oneActive(visit)}} className='col-3 m-auto btn'><span className='material-icons'>close</span></p>
                        )}
                    </div>
                </div>
            </div>
            )
        } else {
            return null
        }
    }).filter(x => x !== null)

    const no_data = (
        <div className='item'>
            <div className='col-12 m-auto row'>
                <div className='col-12'>
                    <h3>Geen afspraken vandaag</h3>
                    <p>Geniet van uw dag!</p>
                </div>
            </div>
        </div>
    )

    if(isLoaded) {
        return (
            isLoaded && <div className='container m-auto'>
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
                <h1 className='mt-4'>Welkom {user}</h1>
                <p className='mb-5'>{today.toLocaleString('nl', {weekday: 'long'}) + ' ' + today.toLocaleString('nl', {day: 'numeric'}) + ' ' + today.toLocaleString('nl', { month: 'long' }) + ' ' + today.toLocaleString('nl', {year: 'numeric'})}</p>
    
                {/*<nav className='filter-nav mt-5'>
                    <button onClick={setFilterDate} className={todayString === selectedDate ? 'active' : ''}>Vandaag</button>
                    <button onClick={setFilterDate} className={tomorrowString === selectedDate ? 'active' : ''}>Morgen</button>
                </nav>*/}
    
                {output_visits.length === 0 ? no_data : output_visits}
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

export default HomeIndex;
