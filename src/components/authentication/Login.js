import React from 'react';
import {FaArrowRight} from 'react-icons/fa'
import {BrowserRouter, Link, NavLink} from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="mb-4">Login</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 col-sm-12">
                        <form method="post" action="">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Login <FaArrowRight/></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
