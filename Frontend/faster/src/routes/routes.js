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
import Active from "../views/active"; // Check
import Done from "../views/done"; // Back
import AllActive from "../views/allActive";// Back
import AllDone from "../views/allDone"; // Back
import Case from "../views/case"; 
import Create from "../views/newCase"; 
import Action from "../views/action"; // Back
import Seller from "../views/seller";


export default function AppRoutes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/autorize"><Autorize/></Route>
                <Route exact path="/detailed"><SellerView/></Route>
                <Route exact path="/accountant"><AccountantView/></Route>
                <Route exact path="/ActiveCSACases"><CaseActive/></Route>

                <Route exact path="/"><Landing/></Route>
                <Route exact path="/login"><LoginPage/></Route>
                <Route exact path="/register"><Register/></Route>
                <Route exact path="/create"><Create/></Route>

                <Route exact path="/active"><Active/></Route>  {/* user_type  CHECKED!*/}
                <Route exact path="/done/"><Done/></Route> {/* agent_id  CHECKED!*/}
                <Route exact path="/all/active/"> <AllActive/></Route> {/* criteria  CHECKED!*/}
                <Route exact path="/all/done/"><AllDone/></Route> {/* criteria  CHECKED!*/}
                <Route exact path="/case/"><Case/></Route> {/* request_id  */}
                <Route exact path="/action/"><Action/></Route> {/* agent_id and requets_id */}
                <Route exact path="/seller/"><Seller/></Route> {/* agent_id  */}
            </Switch>
        </Router>
    )
}
