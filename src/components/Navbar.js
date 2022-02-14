import React from 'react'
import UserStore from '../UserStore';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container">
                    <a className="navbar-brand">
                        <img src={require('../images/logo.png')}  height="50" alt=""/>
                    </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" >HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/bezoeken' : '/login'}>BEZOEKEN</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/administrators' : '/login'} >ADMINISTRATORS</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/companies' : '/login'} >BEDRIJVEN</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/tags' : '/login'}  > TAGS</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/trackers' : '/login'} >TRACKERS</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-uppercase" to={UserStore.isLoggedIn ? '/account' : '/login'}>{UserStore.isLoggedIn ? UserStore.email : ''}</Link>
                            </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default observer(Navbar);
