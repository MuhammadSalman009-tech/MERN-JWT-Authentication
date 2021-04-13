import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUP from "./components/Auth/SignUp";
import Navbar from "./components/Layout/Navbar";
import Home from "./components/Views/Home";
import CheckOut from "./components/Views/CheckOut";
import {Provider} from "react-redux";
import { configureStore } from "./components/Redux/configureStore";
import EmailVerification from "./components/Auth/EmailVerification";

const store=configureStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={()=><Home />}/>
            <Route exact path="/email-verification" component={()=><EmailVerification />}/>
            <Route exact path="/checkout" component={()=><CheckOut />}/>
            <Route exact path="/signin" component={()=><SignIn />}/>
            <Route exact path="/signup" component={()=><SignUP />}/>
          </Switch>  
      </BrowserRouter>
    </Provider>
  );
}

export default App;
