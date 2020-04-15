import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Constructor from "./Containers/Constructor/Constructors";
import Articles from "./Containers/Articles/Articles";
import Layout from "./Containers/Layout/Layout";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/articles" component={Articles}/>
                    <Route path="/" component={Constructor}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    </div>
  );
}

export default App;
