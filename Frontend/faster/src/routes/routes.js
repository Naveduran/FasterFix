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

//new routes
import Active from "../views/active";
import Done from "../views/done";
import AllActive from "../views/allActive";
import AllDone from "../views/allDone";
import Case from "../views/case";
import Create from "../views/newCase";
import Action from "../views/action";
import Seller from "../views/seller";


export default function AppRoutes() {
    return(
        <Router>
            <Switch>
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
               <Route path="/login" component="LoginPage"><LoginPage/></Route> 
               <Route path="/register" component=""/>
               <Route path="/active/:user_type" component="Active"/>
               <Route path="/done/:agent_id" component="Done"/>
               <Route path="/allActive/:criteria" component="AllActive"/>
               <Route path="/allDone/:criteria" component="AllDone"/>
               <Route path="/case/:request_id" component="Case"/>
               <Route path="/create" component="Create"/>
               <Route path="/active/:agent_id/:request_id" component="Action"/>
               <Route path="/seller/:agent_id" component="Seller"/>
            </Switch>
        </Router>
    )
}
