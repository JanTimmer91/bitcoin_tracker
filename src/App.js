import React from 'react';
import Dashboard from "./views/Dashboard";
import Menu from "./components/Menu/Menu";
import BitcoinConverter from "./views/BitcoinConverter";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path='/' exact component={Dashboard}/>
                <Route path='/bitcoinConverter' component={BitcoinConverter}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
