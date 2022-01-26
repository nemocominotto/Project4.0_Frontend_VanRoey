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

import TagIndex from './components/tags/TagIndex';
import TagCreate from './components/tags/TagCreate';
import TagEdit from './components/tags/TagEdit';

import BezoekCreate from './components/Bezoek/BezoekCreate';
import BezoekEdit from './components/Bezoek/BezoekEdit';

import BezoekerEdit from './components/Bezoekers/BezoekerEdit';
import BezoekerCreate from './components/Bezoekers/BezoekerCreate';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/administrators' component={AdminIndex} />
          <Route exact path='/administrator/create' component={AdminCreate}/>
          <Route path='/administrator/edit/:id' component={AdminEdit}/>

          <Route exact path='/trackers' component={TrackerIndex} />
          <Route path='/tracker/edit/:id' component={TrackerEdit}/>
          <Route exact path='/tracker/create' component={TrackerCreate}/>

          <Route exact path='/tags' component={TagIndex}/>
          <Route exact path='/tag/create' component={TagCreate}/>
          <Route path='/tag/edit/:id' component={TagEdit}/>

          <Route exact path='/bezoeken' component={BezoekIndex} />
          <Route exact path='/bezoek/create' component={BezoekCreate}/>
          <Route path='/bezoek/edit/:id' component={BezoekEdit}/>

          <Route path='/bezoeker/edit/:id' component={BezoekerEdit}/>
          <Route exact path='/bezoeker/create/:id' component={BezoekerCreate}/>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
