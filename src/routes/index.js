import {Route, BrowserRouter as Router} from 'react-router-dom'
import React from 'react'

import { Main } from '../screens'
import Places from "../screens/Places";

const RootRoutes = () => {
    return(
            <Router>
                <React.Fragment>
                    <Route exact path={'/nearBy/:data'} component={Places} />
                    <Route exact path={'/'} component={Main} />
                </React.Fragment>
            </Router>
    )
};
export default RootRoutes
