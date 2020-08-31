import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import inventory from './Components/Inventory/Inventory';
import Inventory from './Components/Inventory/Inventory';
import NotFoud from './Components/Not Found/NotFoud';

function App() {
  return (
    <div>
        <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/review">
           <Review></Review>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="*">
            <NotFoud></NotFoud>
          </Route>
        </Switch>
      </Router>
    

    </div>
  );
}

export default App;
