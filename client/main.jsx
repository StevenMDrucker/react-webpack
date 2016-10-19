'use strict';

import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import Index from 'components/Index/Index';
import * as D3 from "d3";
import { Button,ButtonToolbar } from 'react-bootstrap';

var App = React.createClass({
  globalState: [],    
  getInitialState: function () {   
      return({researchData:[]});
  },
  componentDidMount: function() {
    D3.json("http://localhost:3001/client/researchData.json", (error, data) => {
        this.globalState = data;
        this.setState({"researchData":data}); 
    }); 
  },
  randomSubset: function() {
      this.newList = [];
      for (let i=0;i<this.globalState.length; i++) {if (Math.random() > .5) this.newList.push(this.globalState[i]);}
      this.setState(this.newList);
  },
  render: function() {
    return(<div> 
    <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.randomSubset} >Primary</Button>
    </ButtonToolbar>
    <Index items={this.state.researchData } />
    </div>);
  }
});


render(<App />,
 document.getElementById('js-main'));

 