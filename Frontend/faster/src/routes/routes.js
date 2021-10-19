import React from "react";
import AccountantView from "../views/accountant";
import Autorize from "../views/autorize";
import CaseActive from "../views/clientservice/caseactive";
import LoginPage from "../views/login";
import Register from "../views/register";
import SellerView from "../views/sellerview";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


export default function AppRoutes() {
    return(
        <Router>
            <Switch>
                <Route path="/" exact>
                    <LoginPage/>
                </Route>
                <Route path="/autorize">
                    <Autorize/>
                </Route>
                <Route path="/detailed">
                    <SellerView/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/accountant">
                    <AccountantView/>
                </Route>  
                <Route path="/ActiveCSACases">
                    <CaseActive/>
                </Route>  
            </Switch>
        </Router>
    )
}