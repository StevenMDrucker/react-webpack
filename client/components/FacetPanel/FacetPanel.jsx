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

    var dataList =  _.keys(this.props.items).map( (val,i) => {
        var itemName = val;
        var itemCount = this.props.items[val]; 
        var theClass = _.includes(itemHoveredTags, itemName) ? 'selected' : '';
          return(<tr  className={theClass} key={"i"+i} onMouseOut= {(e)=>this.handleBrushOut(itemName)}  onMouseOver= {(e)=>this.handleOver(panelSubject, itemName)}  onClick={(e) => this.handleClick(panelSubject,itemName)}> 
          <td> {itemName} </td>
          <td> {itemCount}</td>
          </tr>);
      });

    return(<Table bordered condensed hover>
        <thead>
        <tr>
            <th> {panelSubject} </th>
            <th> Count </th>
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
