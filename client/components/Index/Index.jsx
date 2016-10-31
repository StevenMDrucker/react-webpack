import React, { Component } from 'react';
import * as D3 from "d3";
import * as _ from "lodash";
import { CSSGrid, SpringGrid, measureItems, makeResponsive,enterExitStyle } from 'react-stonecutter';
const enterExitStyles = ['Simple', 'Skew', 'Newspaper',  'Fold Up', 'From Center', 'From Left to Right', 'From Top', 'From Bottom'];
class IndexComponent extends Component {   
  handleOver(val) {
      this.props.brushOut(val);
  };
  handleOut(val) {
      this.props.brushReset(val);
  };
  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty. </p>        
      );
    }
    var highlightTitle = this.props.highlight[0];
    var highlightVariable = this.props.highlight[1];
    var dataList =  this.props.items.map( (val,i) => {
      var theClass = _.includes(val.tags[highlightTitle], highlightVariable) ? "grid-item selected" : "grid-item";
      return(<li className={theClass}
        onMouseOver= {(e)=>this.handleOver(val)}
        onMouseOut= {(e)=>this.handleOut(val)}  
  
            style={{
                  width: 120,
                  height: 100,
              }} key={"i"+val.uniqueId}> 
  
          <p className="research-item" key={"K"+val.uniqueId} > 
              {val.caption}
          </p>
          </li>);
    });
 
            
 // const Grid = makeResponsive(measureItems(CSSGrid), {maxWidth: 1920, minPadding:100});
  return(<CSSGrid
      component="ul"
      itemHeight={100}
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
    </CSSGrid>); 
  }    
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
