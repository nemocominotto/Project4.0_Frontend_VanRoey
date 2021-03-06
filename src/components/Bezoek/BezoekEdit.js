import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { Link, useHistory, useParams } from 'react-router-dom';
import { format } from "date-fns";
import { PropagateLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BezoekEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [companies, setCompanies] = useState([]);
    const [visitors, setVisitors] = useState([]);
    
    const [getvisit, setGetVisit] = useState(0);
    const [visitID, setVisitID] = useState(0);
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [companyID, setCompanyID] = useState(0);
    const [status, setStatus] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Api.getVisit(id).then(res => {
            setEmail(res.data.email);
            setStatus(res.data.status);
            setCompanyID(res.data.companyID);
            setVisitID(res.data.visitID);
            setGetVisit(res.data);

            var datef = new Date(res.data.date);
            var formattedDate = format(datef,"yyyy-MM-dd'T'HH:mm:ss");
            setDate(formattedDate);
        })
        Api.getAllCompanies().then(res => {
            setCompanies(res.data);
        }).then(() => {});

        Api.getAllVisitors().then(res => {
            setVisitors(res.data);
        }).then(() => {
            setIsLoaded(true);
        });

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        var datef = new Date(date);
        var formattedDate = format(datef,"yyyy-MM-dd'T'HH:mm:ss");

        const visit = {visitID,companyID ,email, date:formattedDate, status}
        console.log(visit);
        
        Api.updateVisit(visit).then(() => {
            history.push('/bezoeken');
        });
        
    }
    
    if(isLoaded){
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
                            <label>Email adres</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                className='form-control'
                                onChange={(e) => setEmail(e.target.value)}
                            />
    
                            <label>Datum</label>
                            <input 
                                type="datetime-local" 
                                className='form-control'
                                value={date}
                                required
                                onChange={(e) => setDate(e.target.value)}
                            />

                            
    
                            <label>Bedrijf</label>
                                <select className="form-control" id="category" value={companyID} onChange={(e) => setCompanyID(e.target.value)}>
                                    {companies.map((company) => 
                                    <option key={company.companyID} value={company.companyID}>{company.name}</option>)}
                            </select>
    
                            <button className='btn btn-primary px-3'>Update</button>
                        </form>
                    </div>
                    <div className='col-12 col-md-6'>
                        <form>
                            <label>Bezoekers</label>           
                            <VisitorList visitors={visitors} id={id} />
                            <Link to={`/bezoeker/create/${id}`} className='m-auto btn btn-primary'>Toevoegen</Link>           
                        </form>
                    </div>
                </div>
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

function VisitorList(props) {
    const history = useHistory();
    const visitors = props.visitors;
    const id = props.id
    const listItems = visitors.map((visitor) => {
        return visitor.visitID == id ?
        <tr>
            <td>{visitor.name} {visitor.lastname}</td>
            <td className='text-center'>
              TAG -   {visitor.tag.tagID}
            </td>
            <td className='text-right'>
                <Link className='btn btn-primary px-4' to={`/bezoeker/edit/${visitor.visitorID}`}>Bewerken</Link>
                <span className='m-1'></span>
                
                <span className='btn btn-primary mt-0' onClick={() => Api.deleteVisitor(visitor.visitorID).
                    then(()=>{
                        //history.push(`/bezoek/edit/${visitor.visitID}`);
                        window.location.reload(false);
                    }).catch(error => {
                        toast.error("Bezoeker kan niet worden verwijderd", {position: toast.POSITION.TOP_RIGHT});
                    })
                    }>Verwijderen</span>
            </td>
        </tr>
        
    :
        null
    }   

    );
    return (
      <table className='w-100 mb-2'>{listItems}</table>
    );
}

export default BezoekEdit;
