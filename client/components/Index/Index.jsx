import React, { Component } from 'react';
import * as D3 from "d3";
import { CSSGrid, SpringGrid, measureItems, makeResponsive } from 'react-stonecutter';
class IndexComponent extends Component {   
   componentDidMount() {
     /*
      D3.json("http://localhost:3001/client/researchData.json", (error, data) => {
          this.setState({"researchData":data});
      });
      */
  }
  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty. </p>        
      );
    }
  var dataList =  this.props.items.map( (val,i) => {return (<li className="grid-item" key={i}> <p className="research-item"> {i}: {val.caption}</p></li>);});
                
  const Grid = makeResponsive(CSSGrid, {maxWidth: 1920});
  return(<Grid
        component="ul"
        columns={6}
        columnWidth={100}
        gutterWidth={25}
        gutterHeight={5}
        duration={800}                      
        springConfig={{ stiffness: 170, damping: 26 }}
      >
      {dataList}
    </Grid>);
  }    
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
