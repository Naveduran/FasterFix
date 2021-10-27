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
                <Route exact path="/"><Landing/></Route>
                <Route exact path="/autorize"><Autorize/></Route>
                <Route exact path="/detailed"><SellerView/></Route>
                <Route exact path="/accountant"><AccountantView/></Route>
                <Route exact path="/ActiveCSACases"><CaseActive/></Route>

                <Route exact path="/login"><LoginPage/></Route>
                <Route exact path="/register"><Register/></Route>
                <Route exact path="/create"><Create/></Route>

                <Route exact path="/active"><Active/></Route>
                <Route exact path="/done/:agent_id"><Done/></Route>
                <Route exact path="/allActive/:criteria"> <AllActive/></Route>
                <Route exact path="/allDone/:criteria"><AllDone/></Route>
                <Route exact path="/case/:request_id"><Case/></Route>
                <Route exact path="/active/:agent_id/:request_id"><Action/></Route>
                <Route exact path="/seller/:agent_id"><Seller/></Route>
            </Switch>
        </Router>
    )
}
