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
import Register from "../views/register"; //Manu
import LoginPage from "../views/login"; // Manu
import Active from "../views/active"; //-
import Done from "../views/done"; // Nat
import AllActive from "../views/allActive";// Nat
import AllDone from "../views/allDone"; // Nat
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

                <Route path="/active"><Active/></Route>  {/* user_type  CHECKED!*/}
                <Route path="/done/"><Done/></Route> {/* agent_id  CHECKED!*/}
                <Route path="/all/active/"> <AllActive/></Route> {/* criteria  CHECKED!*/}
                <Route path="/all/done/"><AllDone/></Route> {/* criteria  CHECKED!*/}
                <Route path="/case/"><Case/></Route> {/* request_id  */}
                <Route path="/active/:agent_id/:request_id"><Action/></Route> {/* agent_id and requets_id */}
                <Route path="/seller/"><Seller/></Route> {/* agent_id  */}
            </Switch>
        </Router>
    )
}
