import React, { Component } from 'react';
import * as D3 from "d3";
import { SpringGrid, measureItems, makeResponsive } from 'react-stonecutter';
class IndexComponent extends Component {
   componentDidMount() {
      D3.json("http://localhost:3001/client/researchData.json", (error, data) => {
          this.setState({"researchData":data});
      });
  }
  render() {
      if (this.state != null) {
            if ("researchData" in this.state) {
                var dataList =  this.state["researchData"].map( (val,i) => {return (<li className="grid-item" key={i}> <p className="research-item"> {i}: {val.caption}</p></li>);});
                const Grid = makeResponsive(measureItems(SpringGrid), {maxWidth:1920});
                return(<Grid
                      component="ul"
                      columns={5}
                      columnWidth={100}
                      gutterWidth={25}
                      gutterHeight={5}                      
                      springConfig={{ stiffness: 170, damping: 26 }}
                    >
                    {dataList}
                    </Grid>);                                       
            }
        } else {
            return (<div> nodata </div>);
        }
      }
      /* 
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty.</p>
      );
    }

    return (
      <section>
        <h2>react-webpack-boilerplate</h2>
        <ul ref="indexList" className="index-list">
          {this.props.items.map((item, index) => {
            return (<li key={index}>item {item}</li>);
          })}
        </ul>
      </section>
    );
    
  }*/
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
