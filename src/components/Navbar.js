import React, { useState } from 'react';
import UserStore from '../UserStore';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container">
                    <a className="navbar-brand" >
                        <img src={require('../images/logo.png')}  height="50" alt=""/>
                    </a>

                    <button className="custom-toggler navbar-toggler text-bold" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        MENU
                    </button>

                    <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                        <ul className="navbar-nav ms-auto" eventKey="1">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" >HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/bezoeken' : '/login'}>BEZOEKEN</Link>
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
                                <Link className="nav-link" to={UserStore.isLoggedIn ? '/administrators' : '/login'} >ADMINISTRATORS</Link>
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
