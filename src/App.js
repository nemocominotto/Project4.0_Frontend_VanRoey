import './App.css';
import Navbar from "./components/Navbar";
import Login from "./components/authentication/Login";

import { useEffect } from 'react';

import { observer } from 'mobx-react';
import UserStore from './UserStore';

import AdminIndex from './components/Administrator/AdminIndex';
import AdminCreate from './components/Administrator/AdminCreate';
import AdminEdit from './components/Administrator/AdminEdit';

import TrackerEdit from './components/Trackers/TrackerEdit';
import TrackerCreate from './components/Trackers/TrackerCreate';
import TrackerIndex from './components/Trackers/TrackerIndex';

import TagIndex from './components/tags/TagIndex';
import TagCreate from './components/tags/TagCreate';
import TagEdit from './components/tags/TagEdit';

import BezoekIndex from './components/Bezoek/BezoekIndex';
import BezoekCreate from './components/Bezoek/BezoekCreate';
import BezoekEdit from './components/Bezoek/BezoekEdit';

import BezoekerEdit from './components/Bezoekers/BezoekerEdit';
import BezoekerCreate from './components/Bezoekers/BezoekerCreate';

import AccountIndex from './components/account/AccountIndex';
import AccountEdit from './components/account/AccountEdit';
import AccountReset from './components/account/AccountReset';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  useEffect(() => {
    fetch('http://localhost:8050/administrators/login?email=' + sessionStorage.getItem('email') + '&password=' + sessionStorage.getItem('password'), {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(res => {
      return res.json();
    }).then(data => {
      if (data) {
        UserStore.isLoggedIn = true;
        UserStore.email = sessionStorage.getItem('email');
      }
    })
  }, []);

  return (
    <div className="">
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={UserStore.isLoggedIn ? '' : Login} />

          <Route exact path='/administrators' component={UserStore.isLoggedIn ? AdminIndex : ''} />
          <Route exact path='/administrator/create' component={UserStore.isLoggedIn ? AdminCreate : ''}/>
          <Route path='/administrator/edit/:id' component={UserStore.isLoggedIn ? AdminEdit : ''}/>

          <Route exact path='/trackers' component={UserStore.isLoggedIn ? TrackerIndex : ''} />
          <Route path='/tracker/edit/:id' component={UserStore.isLoggedIn ? TrackerEdit : ''}/>
          <Route exact path='/tracker/create' component={UserStore.isLoggedIn ? TrackerCreate : ''}/>

          <Route exact path='/tags' component={UserStore.isLoggedIn ? TagIndex : ''}/>
          <Route exact path='/tag/create' component={UserStore.isLoggedIn ? TagCreate : ''}/>
          <Route path='/tag/edit/:id' component={UserStore.isLoggedIn ? TagEdit : ''}/>

          <Route exact path='/bezoeken' component={UserStore.isLoggedIn ? BezoekIndex : ''} />
          <Route exact path='/bezoek/create' component={UserStore.isLoggedIn ? BezoekCreate : ''}/>
          <Route path='/bezoek/edit/:id' component={UserStore.isLoggedIn ? BezoekEdit : ''}/>

          <Route path='/bezoeker/edit/:id' component={UserStore.isLoggedIn ? BezoekerEdit : ''}/>
          <Route exact path='/bezoeker/create/:id' component={UserStore.isLoggedIn ? BezoekerCreate : ''}/>

          <Route exact path='/account/reset' component={UserStore.isLoggedIn ? AccountReset : ''}/>
          <Route exact path='/account' component={UserStore.isLoggedIn ? AccountIndex : ''}/>
          <Route path='/account/:mail' component={UserStore.isLoggedIn ? AccountEdit : ''}/>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
