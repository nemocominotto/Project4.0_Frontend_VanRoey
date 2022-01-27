import React from 'react';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { Link, useHistory, useParams } from 'react-router-dom';
import { format } from "date-fns";


const BezoekEdit = () => {
    const {id} = useParams();

    const history = useHistory();

    const [companies, setCompanies] = useState([]);
    const [visitors, setVisitors] = useState([]);
    

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

            var datef = new Date(res.data.date);
            var formattedDate = format(datef,"yyyy-MM-dd'T'HH:mm:ss");
            setDate(formattedDate);
        })
        Api.getAllCompanies().then(res => {
            setCompanies(res.data);
         }).then(() => {
            Api.getAllVisitors().then(res => {
                setVisitors(res.data);
             }).then(() => {
                setIsLoaded(true);
            });
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
                    {companies.map((company) => <option key={company.companyID} value={company.categoryID}>{company.name}</option>)}
                </select>

                <button>Update bezoek</button>

                <p>List</p>
                <NumberList visitors={visitors} id={id} />
                <Link to={`/bezoeker/create/${id}`} className='m-auto btn btn-outline-info'>Bezoek toevoegen</Link>
            </form>
        </div>
    )
};

function NumberList(props) {
    const history = useHistory();
    const visitors = props.visitors;
    const id = props.id
    const listItems = visitors.map((visitor) => {
        return visitor.visitID == id ?
        <li>
            <span>{visitor.name}</span>
            <Link className='col-5 m-auto btn' to={`/bezoeker/edit/${visitor.visitorID}`}><span className='material-icons'>edit</span></Link>
            <button className='col-5 m-auto btn' onClick={() => Api.deleteVisitor(visitor.visitorID).then(()=>{history.push(`/bezoek/edit/${visitor.visitID}`);})}><span className='material-icons'>delete</span></button>
        </li>
        
    :
        null
    }   

    );
    return (
      <ul>{listItems}</ul>
    );
}

export default BezoekEdit;
