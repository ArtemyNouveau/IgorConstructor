import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Constructor from "./Pages/Constructor/Constructors";
import Articles from "./Pages/Articles/Articles";
import Layout from "./Containers/Layout/Layout";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/articles" component={Articles}/>
                    <Route path="/constructor" component={Constructor}/>
                    <Redirect to={"/articles"}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
