import './App.css';
import Navbar from "./components/Navbar";
import Login from "./components/authentication/Login";

import { useEffect } from 'react';

import { observer } from 'mobx-react';
import UserStore from './UserStore';

import AdminIndex from './components/Administrator/AdminIndex';
import AdminCreate from './components/Administrator/AdminCreate';
import AdminEdit from './components/Administrator/AdminEdit';

import TagIndex from './components/tags/TagIndex';
import TagCreate from './components/tags/TagCreate';
import TagEdit from './components/tags/TagEdit';

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
          <Route exact path='/administrators' component={UserStore.isLoggedIn ? AdminIndex : ''} />
          <Route exact path='/administrator/create' component={UserStore.isLoggedIn ? AdminCreate : ''}/>
          <Route exact path='/tags' component={UserStore.isLoggedIn ? TagIndex : ''}/>
          <Route exact path='/tag/create' component={UserStore.isLoggedIn ? TagCreate : ''}/>
          <Route path='/administrator/edit/:id' component={UserStore.isLoggedIn ? AdminEdit : ''}/>
          <Route path='/tag/edit/:id' component={UserStore.isLoggedIn ? TagEdit : ''}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
