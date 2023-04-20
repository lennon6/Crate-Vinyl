import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './Search';
import Records from './Records';
import Home from './Home';
import { Favorites } from './Favorites';
import '../stylesheets/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/records/:master_id" component={Records} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
