import React from 'react'
import UserStore from '../UserStore';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={require('../images/logoDD.png')}  width="30" height="30" alt=""/>
                    </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/bezoeken' : '/login'}>Registraties</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/administrators' : '/login'} >Administrators</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/tags' : '/login'}  > Tags</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/trackers' : '/login'} >Trackers</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/account' : '/login'}>{UserStore.isLoggedIn ? UserStore.email : ''}</Link>
                            </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default observer(Navbar);
