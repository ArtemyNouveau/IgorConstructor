import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

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
                    <Route path="/" component={Constructor}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
