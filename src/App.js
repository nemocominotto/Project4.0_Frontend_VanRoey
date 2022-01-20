import './App.css';

import AdminIndex from './components/Administrator/AdminIndex';
import AdminCreate from './components/Administrator/AdminCreate';
import AdminEdit from './components/Administrator/AdminEdit';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container mt-5">
      <BrowserRouter>
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
