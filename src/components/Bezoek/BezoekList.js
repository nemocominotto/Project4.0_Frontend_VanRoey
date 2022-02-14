import React from 'react';
import Api from '../../api/Api';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VisitList = ({visits}) => {

    Moment.locale('nl');

    const output = visits.map(visit => {
        return (
            <div className='item' key={visit.VisitID}>
                <div className='row col-12'>
                    <div className='col-8 col-md-10'>
                        <h3>{visit.company.name}</h3>
                        <p>{Moment(visit.date).format("DD-MM-YYYY - HH:mmu")}</p>
                    </div>
                    <div className='col-4 col-md-2 row'>
                        <Link className='col-5 m-auto btn' to={`/bezoek/edit/${visit.visitID}`}><span className='material-icons'>edit</span></Link>
                        
                        <button className='col-5 m-auto btn' onClick={() => Api.deleteVisit(visit.visitID).
                            then(()=>{
                                window.location.reload(false);
                            }).
                            catch(error => {
                                toast.error("Bezoek kan niet worden verwijderd", {position: toast.POSITION.TOP_RIGHT});
                            })}>
                            <span className='material-icons'>delete</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div>
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
                {output}
            </div>
        </div>
    )
};

export default VisitList;
