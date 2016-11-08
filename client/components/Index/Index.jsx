import React, { Component } from 'react';
import * as D3 from "d3";
import * as _ from "lodash";
import { CSSGrid, SpringGrid, measureItems, makeResponsive,enterExitStyle } from 'react-stonecutter';
const enterExitStyles = ['Simple', 'Skew', 'Newspaper',  'Fold Up', 'From Center', 'From Left to Right', 'From Top', 'From Bottom'];
class IndexComponent extends Component {   
  componentWillMount() {
 //   let Grid = makeResponsive(measureItems(CSSGrid), {maxWidth: 1920, minPadding:100});
    let Grid = measureItems(CSSGrid);
    this.setState({ Grid });
  };
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
    var highlightTitle = '';
    var highlightVariable = '';
    if (this.props.highlight) { 
      highlightTitle = this.props.highlight[0];
      highlightVariable = this.props.highlight[1];
    } 
    var dataList =  this.props.items.map( (val,i) => {
      var theClass = _.includes(val.tags[highlightTitle], highlightVariable) ? "grid-item selected research-item" : "grid-item research-item";
      /*           <p className="research-item" key={"K"+val.uniqueId} > 
              {val.caption}
              <img src={"client/" + val.img} width={180} height={120}></img>
          <span className="research-item" key={"K"+val.uniqueId} >   
              
              
          </span>      
          </p>
*/
      return(<div className={theClass}
        onMouseOver= {(e)=>this.handleOver(val)}
        onMouseOut= {(e)=>this.handleOut(val)}  
  
            style={{
                  width: 190,
                  height: 180,
              }} key={"i"+val.uniqueId}> 
        <img src={"client/" + val.img} width={180} height={120}></img>
        
          </div>);
    });
 
            
 // const Grid = makeResponsive(measureItems(CSSGrid), {maxWidth: 1920, minPadding:100});
 const { Grid } = this.state;

  return(<Grid
      component="div"
      itemHeight={180}
        columns={6}
        columnWidth={180}        
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
