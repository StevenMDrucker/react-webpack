import React, { Component } from 'react';
import * as D3 from "d3";
import { CSSGrid, SpringGrid, measureItems, makeResponsive,enterExitStyle } from 'react-stonecutter';
const enterExitStyles = ['Simple', 'Skew', 'Newspaper',  'Fold Up', 'From Center', 'From Left to Right', 'From Top', 'From Bottom'];
class IndexComponent extends Component {   
  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty. </p>        
      );
    }

 
            
  const Grid = makeResponsive(measureItems(CSSGrid), {maxWidth: 1920, minPadding:100});
  return(<Grid
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
    </Grid>); 
  }    
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
