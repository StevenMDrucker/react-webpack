'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from 'components/App/App'
import About from 'components/About/About'
import MyNav from 'components/MyNav/MyNav'
import Feature from 'components/Feature/Feature'
var Root = React.createClass({

    render() {
        return(
            <Router history={hashHistory}>                
                <Route path="/" component={MyNav}>
                    <IndexRoute component={About}/>
                    <Route path="/app" component={App}/>
                    <Route path="/featured" component={Feature}/>                 
                    <Route path="/about" component={About}/>
                    <Route path="/cv" component={About}/>
                </Route>
            </Router>);
    }
})

render(<Root />,document.getElementById('js-main'));

 