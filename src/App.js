import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Layout from "./Containers/Layout/Layout";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/articles" />
                    <Route path="/" />
                </Switch>
            </Layout>
        </BrowserRouter>
    </div>
  );
}

export default App;
