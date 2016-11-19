import React, { Component } from 'react';
import * as D3 from "d3";
import * as _ from "lodash";
import {Row, Col, Button} from 'react-bootstrap';

//import { CSSGrid, SpringGrid, measureItems, makeResponsive,enterExitStyle } from 'react-stonecutter';
import Masonry from 'react-masonry-component';
var masonryOptions = {
  transitionDuration: 500,  
  itemSelector: ".researchItem",
  gutter: 20,
  resize: true
};
const enterExitStyles = ['Simple', 'Skew', 'Newspaper',  'Fold Up', 'From Center', 'From Left to Right', 'From Top', 'From Bottom'];
class IndexComponent extends Component {   
  componentWillMount() {
 //   let Grid = makeResponsive(measureItems(CSSGrid), {maxWidth: 1920, minPadding:100});
//    let Grid = measureItems(CSSGrid);
//    this.setState({ Grid });
  this.setState({"over":null});
  };
  handleOver(val) {
    this.setState({"over":val});
    this.props.brushOut(val);
  };
  handleOut(val) {
    this.setState({"over":null});
      this.props.brushReset(val);
  };
  localHandleClick(val) {
    this.props.handleClick(val);
  };

  generateCard(val)
  { 
    var highlightTitle = '';
    var highlightVariable = '';
    if (this.props.highlight) { 
      highlightTitle = this.props.highlight[0];
      highlightVariable = this.props.highlight[1];
    } 
    var overItem = this.state.over;
  
    if (this.props.mode == "tile") {
      var theClass = _.includes(val.tags[highlightTitle], highlightVariable) ? "researchItem gridItem selected" : "researchItem gridItem ";
      theClass = (val == overItem) ? "researchItem gridItem  myOver" : theClass;
 
      return(<div className={theClass}
          onMouseOver= {(e)=>this.handleOver(val)}
          onMouseOut= {(e)=>this.handleOut(val)}
          onClick=  {(e)=>this.localHandleClick(val)}
          key={"i"+val.id}>           
          <img src={"client/" + val.img} width="180" height="120"></img>
            {val.caption}
            </div>);
      } else {
        var theClass = _.includes(val.tags[highlightTitle], highlightVariable) ? "researchItem detailItem  selected" : "researchItem detailItem";
         theClass = (val == overItem) ? "researchItem detailItem  myOver" : theClass;
 
        return(<div className={theClass}
          onMouseOver= {(e)=>this.handleOver(val)}
          onMouseOut= {(e)=>this.handleOut(val)}
          onClick=  {(e)=>this.localHandleClick(val)}
          key={"i"+val.id}> 
          <Row>
            <Col lg={2} sm={2} md={2}>
              <Row>
              <img src={"client/" + val.img} width="180" height="120" className="detailsImage"></img>
              </Row>
              <Row>
                <Button> Paper </Button>
                <Button> Video </Button>
              </Row>
            </Col>
            <Col lg={10} sm={10} md={10}>
              <div className="DCaption"> {val.caption} </div>
              <div className="DReference"> {val.reference}</div>
              <div className="DAbstract"> {val.pabstract}</div>
            </Col>
          </Row>
            </div>);
      }
  };

  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty. </p>        
      );
    }
     
    var dataList =  this.props.items.map( (val,i) => {
      var aCard = this.generateCard(val);
      return(aCard);  
    });
           
 //const { Grid } = this.state;
 return (
   <Masonry
      className={'indexClass'}
      elementType={'div'}  
      options={masonryOptions}
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}
      >
      {dataList}
      </Masonry>);
/*
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
    */ 
  }    
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
