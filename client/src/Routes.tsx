import React from 'react'
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
