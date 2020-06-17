import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import SelectSubscriptionView from './views/user/SelectSubscriptionView/SelectSubscriptionView';
import ExistingUserView from './views/user/ExistingUserView/ExistingUserView';
import CreateAppointmentView from './views/user/CreateAppointmentView/CreateAppointmentView';
import CreateAppointmentViewV2 from './views/user/CreateAppointmentV2/CreateAppointmentV2';
import CheckoutView from './views/user/CheckoutView/CheckoutView';
import ExistingChoice from './views/user/ExistingChoice/ExistingChoiceView';
import BillingInfoView from './views/user/BillingInfoView/BillingInfoView';
import PestProblem from './views/user/PestProblem/PestProblem';
import "./App.css"
import ExistingChoiceView from './views/user/ExistingChoice/ExistingChoiceView';

import WorldPay from './components/user/checkOut/WorldPay/WorldPay';

class App extends React.Component {

  state = {
    isReloaded:false,
    JWT:null
  }
  isReloadChange = () =>{
    let newState = this.state;
    newState.isReloaded = true;
    this.setState(newState);
  }
  onChangeJWT = (jwt) =>{
    let newState = this.state;
    newState.JWT = jwt;
    this.setState(newState);
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
          <Router>
            <Switch>
              <Route path="/existing">
                <ExistingUserView onChangeJWT={this.onChangeJWT} JWT={this.state.JWT}/>
              </Route>
              <Route path="/existing-choice">
                <ExistingChoiceView onChangeJWT={this.onChangeJWT} JWT={this.state.JWT}/>
              </Route>
              <Route path="/select-subscription">
                <SelectSubscriptionView onChangeJWT={this.onChangeJWT} JWT={this.state.JWT}/>
              </Route>
              <Route path="/calendar">
                <CreateAppointmentViewV2 onChangeJWT={this.onChangeJWT} JWT={this.state.JWT}/>
              </Route>
              <Route path="/checkout">
                <CheckoutView onChangeJWT={this.onChangeJWT} JWT={this.state.JWT}/>
              </Route>
              <Route path="/billing">
                <BillingInfoView onChangeJWT={this.onChangeJWT} JWT={this.state.JWT}/>
              </Route>
              <Route path="/pest-problem">
                <PestProblem onChangeJWT={this.onChangeJWT} JWT={this.state.JWT}/>
              </Route>
              <Route path="*">
                <Redirect to='/existing' />
              </Route>
            </Switch>
          </Router>
        </header>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
      </div>
    );
  }

}

export default App;
