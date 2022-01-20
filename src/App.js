import './App.css';
import Navbar from "./components/Navbar";
import {Router} from "react-router-dom";
import Login from "./components/authentication/Login";

import AdminIndex from './components/Administrator/AdminIndex';
import AdminCreate from './components/Administrator/AdminCreate';
import AdminEdit from './components/Administrator/AdminEdit';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container mt-5">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/administrators' component={AdminIndex} />
          <Route exact path='/administrator/create' component={AdminCreate}/>
          <Route path='/administrator/edit/:id' component={AdminEdit}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
