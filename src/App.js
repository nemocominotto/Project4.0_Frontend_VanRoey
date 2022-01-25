import './App.css';
import Navbar from "./components/Navbar";
import {Router} from "react-router-dom";
import Login from "./components/authentication/Login";

import AdminIndex from './components/Administrator/AdminIndex';
import AdminCreate from './components/Administrator/AdminCreate';
import AdminEdit from './components/Administrator/AdminEdit';
import BezoekIndex from './components/Bezoek/BezoekIndex';
import TrackerEdit from './components/Trackers/TrackerEdit';
import TrackerCreate from './components/Trackers/TrackerCreate';
import TrackerIndex from './components/Trackers/TrackerIndex';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/administrators' component={AdminIndex} />
          <Route exact path='/trackers' component={TrackerIndex} />
          <Route exact path='/administrator/create' component={AdminCreate}/>
          <Route exact path='/bezoeken' component={BezoekIndex} />
          <Route path='/administrator/edit/:id' component={AdminEdit}/>
          <Route path='/tracker/edit/:id' component={TrackerEdit}/>
          <Route exact path='/tracker/create' component={TrackerCreate}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
