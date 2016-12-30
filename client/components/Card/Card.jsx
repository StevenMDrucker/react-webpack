import React, { Component } from 'react';
import {Row, Col, Button, SplitButton, MenuItem} from 'react-bootstrap';

class CardComponent extends Component {
    render() {
        var val = this.props.theItem;
        if (this.props.mode == "tile") {
             var theCard = 
                <div onMouseOver= {(e)=>this.props.handleOver(val)}
                    onMouseOut= {(e)=>this.props.handleOut(val)}
                    onClick=  {(e)=>this.props.handleClick(val)}
                    key={"i"+val.id}>           
                    <img src={"client/" + val.img} width="180" height="120"></img>
                    {val.caption}
                </div>;
         } else if (this.props.mode == "details") {
            var theCard = 
                <div onMouseOver= {(e)=>this.props.handleOver(val)}
                    onMouseOut= {(e)=>this.props.handleOut(val)}
                    onClick=  {(e)=>this.props.handleClick(val)}
                    key={"i"+val.id}> 
                    <Row>
                        <Col lg={2} sm={2} md={2}>
                        <Row>
                        <img src={"client/" + val.img}  className="detailsImage"></img>
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
                </div>;
        } else if (this.props.mode == "publication") {
        var theCard =  
            <div onMouseOver= {(e)=>this.props.handleOver(val)}
                onMouseOut= {(e)=>this.props.handleOut(val)}
                onClick=  {(e)=>this.props.handleClick(val)}
                key={"i"+val.id}>
                <Row> 
                <Col lg={12} sm={12} md={12}>
                    <span> <a href={val.pdf}> PDF: </a> </span> <span className="DReference"> {val.reference}</span>
                </Col>
                </Row>
            </div>;
      }
      return(theCard);
    }
}

CardComponent.propTypes = {
    theItem: React.PropTypes.object.required,
    theMode: React.Proptype.string,
    handleOver: React.PropTypes.func.required,
    handleOut: React.PropTypes.func.required,
    handleClick: React.PropTypes.func.required
} 
export default CardComponent;
