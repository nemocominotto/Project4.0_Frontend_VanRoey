import './App.css';
import Navbar from "./components/Navbar";
import {Router} from "react-router-dom";
import Login from "./components/authentication/Login";

import AdminIndex from './components/Administrator/AdminIndex';
import AdminCreate from './components/Administrator/AdminCreate';
import AdminEdit from './components/Administrator/AdminEdit';

import TagIndex from './components/tags/TagIndex';
import TagCreate from './components/tags/TagCreate';
import TagEdit from './components/tags/TagEdit';

// powerBI reporting
import PBIIndex from './components/PowerBI/PBIIndex';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/administrators' component={AdminIndex} />
          <Route exact path='/administrator/create' component={AdminCreate}/>
          <Route exact path='/tags' component={TagIndex}/>
          <Route exact path='/tag/create' component={TagCreate}/>
          <Route path='/administrator/edit/:id' component={AdminEdit}/>
          <Route path='/tag/edit/:id' component={TagEdit}/>
          <Route path='/pbiindex' component={PBIIndex}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
