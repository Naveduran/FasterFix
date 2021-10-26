import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Static Routes
import AccountantView from "../views/accountant";
import Autorize from "../views/autorize";
import CaseActive from "../views/clientservice/caseactive";
import SellerView from "../views/sellerview";

// API Integrated Routes
import Landing from "../views/landing";
import Register from "../views/register";
import Active from "../views/active";
import Done from "../views/done";
import LoginPage from "../views/login";
import AllActive from "../views/allActive";
import AllDone from "../views/allDone";
import Case from "../views/case";
import Create from "../views/newCase";
import Action from "../views/action";
import Seller from "../views/seller";


export default function AppRoutes() {
    return (
        <Router>
            <Switch>
                <Route path="/autorize"><Autorize/></Route>
                <Route path="/detailed"><SellerView/></Route>
                <Route path="/accountant"><AccountantView/></Route>
                <Route path="/ActiveCSACases"><CaseActive/></Route>

                <Route path="/landing"><Landing/></Route>
                <Route path="/login"><LoginPage/></Route>
                <Route path="/register"><Register/></Route>
                <Route path="/create"><Create/></Route>

                <Route path="/active/:user_type"><Active/></Route>
                <Route path="/done/:agent_id"><Done/></Route>
                <Route path="/allActive/:criteria"> <AllActive/></Route>
                <Route path="/allDone/:criteria"><AllDone/></Route>
                <Route path="/case/:request_id"><Case/></Route>
                <Route path="/active/:agent_id/:request_id"><Action/></Route>
                <Route path="/seller/:agent_id"><Seller/></Route>
            </Switch>
        </Router>
    )
}
