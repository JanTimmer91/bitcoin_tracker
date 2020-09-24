import React from 'react';
import Dashboard from "./views/Dashboard";
import Menu from "./components/Menu/Menu";
import BitcoinDiagram from "./views/BitcoinDiagram";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path='/' exact component={Dashboard}/>
                <Route path='/bitcoinDiagram' component={BitcoinDiagram}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
