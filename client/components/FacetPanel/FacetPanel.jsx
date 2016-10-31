import React, { Component } from 'react';
import {Table, Accordion, Panel} from 'react-bootstrap';
import * as _ from "lodash";
class FacetPanelComponent extends Component {   
  handleClick(title, val) {
      this.props.filter(title, val);
  };
  handleOver(title, val) {
      this.props.brush(title, val);
  };

  handleBrushOut(val) {
      this.props.clearFilter();
  };

  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Facet Panel is empty. </p>        
      );
    }
    var itemHoveredTags = [];
    var panelSubject = this.props.itemTitle;
    if (this.props.selected) {
        itemHoveredTags = this.props.selected.tags[panelSubject];
    }

    var dataList =  this.props.items.map( (val,i) => {
        var theClass = _.includes(itemHoveredTags, val) ? 'selected' : '';
          return(<tr  className={theClass} key={"i"+i} onMouseOut= {(e)=>this.handleBrushOut(val)}  onMouseOver= {(e)=>this.handleOver(panelSubject, val)}  onClick={(e) => this.handleClick(panelSubject,val)}> 
          <td> {val} </td>
          </tr>);
      });

    return(<Table bordered condensed hover>
        <thead>
        <tr>
            <th> {panelSubject} </th>
        </tr>
        </thead>
        <tbody>
        {dataList}
        </tbody>
        </Table>) 
  }    
}

FacetPanelComponent.defaultProps = {
  items: []
};

export default FacetPanelComponent;
