'use strict';

import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import Index from 'components/Index/Index';
import * as D3 from "d3";
import { Button,ButtonToolbar } from 'react-bootstrap';
import { CSSGrid, SpringGrid, measureItems, makeResponsive,enterExitStyle } from 'react-stonecutter';

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
      this.setState({"researchData":this.newList});
  },
  render: function() {
    var dataList =  this.state.researchData.map( (val,i) => {    
        return(<li className="grid-item"  style={{
                width: 150,
                height: 160,
            }} key={"i"+val.uniqueId}> 
        <p className="research-item" key={"K"+val.uniqueId} > 
            {val.caption}
        </p>
        </li>);
    });
 

    return(<div> 
    <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.randomSubset} >Primary</Button>
    </ButtonToolbar>
    <SpringGrid
      component="ul"
      itemHeight={190}   
        columns={6}
        columnWidth={100}
        gutterWidth={25}
        gutterHeight={5}
        duration={800}                       
        springConfig={{ stiffness: 170, damping: 26 }}
        enter={enterExitStyle.simple.enter}
        entered={enterExitStyle.simple.entered}
        exit={enterExitStyle.simple.exit}      
      >
     {dataList} 
    </SpringGrid>);
    </div>);
  }
});


render(<App />,document.getElementById('js-main'));

 