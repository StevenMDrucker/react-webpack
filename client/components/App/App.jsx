'use strict';

import React from 'react';
import { render } from 'react-dom';
import Index from 'components/Index/Index';
import FacetPanel from 'components/FacetPanel/FacetPanel';
import MyPopop from 'components/ImageBox/ImageBox';
import * as D3 from "d3";
import * as _ from "lodash";
import { Button,ButtonToolbar, DropdownButton, SplitButton, MenuItem, Grid, Row, Col, Tabs, Tab, PanelGroup, Panel } from 'react-bootstrap';

export default React.createClass({
  globalData: [],
  facetPanels: {},      
  getInitialState: function () {   
      return({researchData:[],
          itemHovered:'',
          sortedBy:'year',
          reverse: false,
          mode:"tile",
          filterSpec:{}});
  },
  calculateResults: function(localFilterSpec, localOrderBy, localReverse ) {
      var results = 
            _.reduce(localFilterSpec, (result, value, key) => {
                result= _.filter(result, (o) => {
                    return !_.isEmpty(_.intersection(value,o.tags[key]))}); 
                return result}, this.globalData)
     var afacet = localOrderBy;
      var finalresults = (localReverse) ? _.reverse(_.sortBy(results, (a)=>a.tags[afacet])) : _.sortBy(results, (a)=>a.tags[afacet]);

    this.setState({"researchData": finalresults});
  },
  onSortBy: function (afacet) {
      var reverse  = false;
      if (this.state.sortedBy == afacet) {
          if (this.state.reverse) {
            this.setState({"reverse":false});
          } else {
              reverse = true;
              this.setState({"reverse":true});
          }
      } else {
          this.setState({"sortedBy":afacet});
      }

      this.calculateResults(this.state.filterSpec, afacet, reverse);
  },
  componentDidMount: function() {
    D3.json("http://localhost:3001/client/researchData.json", (error, data) => {
        this.globalData = data;
        this.setState({"researchData":data}); 
    }); 
  },
  handleBrush: function(title,val) {
      this.setState({'highlight':[title,val]});
  },
  handleBrushOut: function(val) {
      this.setState({'itemHovered':val});
  },
  handleBrushReset: function() {
      this.setState({'itemHovered':''});
  },
  handleFilter: function(title,val) {
    var localFilterSpec = this.state.filterSpec;
    //this.setState({"researchData": this.researchData.filter(function(item) { return _.includes(item.tags[title],val)})});
    if (title in localFilterSpec) {
        if (localFilterSpec[title].indexOf(val) >= 0) {
            localFilterSpec[title] = _.filter(localFilterSpec[title],(a)=>(a!=val));
            if (_.isEmpty(localFilterSpec[title])) {
                delete localFilterSpec[title];
            }
        } else {
            localFilterSpec[title].push(val);
        }
    } else {
        localFilterSpec[title]=[val];
    }
    this.setState({"filterSpec":localFilterSpec});
    this.calculateResults(localFilterSpec, this.state.orderBy, this.state.reverse);    
  },
  tileMode:function(){
    this.setState({'mode':"tile"})
  },
  detailMode: function() {
    this.setState({'mode':"details"})
  },
  handleExit:function(){
      this.setState({'highlight':''});
  },

  resetData: function() {
      this.setState({"filterSpec":{}});
      this.setState({"reverse":false});
      this.setState({"researchData":this.globalData});
  },
  openModal: function(val) {
      this.refs.myPopup.setState({ showModal: true, item: val });
  },
  calculateLocalData: function() { 
    if (this.globalData != null) {
        var facets = _.keys(this.globalData[0].tags);
        var researchData = this.globalData;
        var filterSpec = this.state.filterSpec;        
        _.each(facets, val=>{
            var localfilterspec =_.omit(filterSpec,val);
            this.facetPanels[val] = _.reduce(localfilterspec, function(result, value, key) {result= _.filter(result, function(o) {return !_.isEmpty(_.intersection(value,o.tags[key]))}); return result}, researchData)
        });
    }
  },
  render: function() {
    var self = this;
    var subjects = [];
    var years = [];
    var collaborators = [];
    var tabList = [];
    if (!_.isEmpty(this.state.researchData)) {
        this.calculateLocalData();
      //  subjects = _.uniq(_.flatten(_.map(this.state.researchData, function(val) {return val.tags['subject']}))) 
      //  years = _.uniq(_.flatten(_.map(this.state.researchData, function(val) {return val.tags['year']}))) 
      //  collaborators = _.uniq(_.flatten(_.map(this.state.researchData, function(val) {return val.tags['collaborators']})))
         
      //subjects = _.countBy(_.flatMap(this.state.researchData, val=>val.tags.subject))
      //years = _.countBy(_.flatMap(this.state.researchData, val=>val.tags.year))
      //collaborators =_.countBy(_.flatMap(this.state.researchData, val=>val.tags.collaborators))
      self = this;
      var i=0;
      tabList = _.map(this.facetPanels, (filteredVals,tag) => {
          i++;
          var values = _.countBy(_.flatMap(filteredVals, val=>val.tags[tag]));
            //   <Tab eventKey={i} title={tag}>
            //         <FacetPanel items={values} filterSpec={this.state.filterSpec} itemTitle={tag} selected = {this.state.itemHovered} brush = {this.handleBrush} filter = {this.handleFilter} clearFilter= {this.handleExit}>
            //         </FacetPanel>
            //   </Tab>);
          return(
              <Panel eventKey={i} header={tag} className="filterPanel">
                    <FacetPanel items={values} filterSpec={this.state.filterSpec} itemTitle={tag} selected = {this.state.itemHovered} brush = {this.handleBrush} filter = {this.handleFilter} clearFilter= {this.handleExit}>
                    </FacetPanel>
              </Panel>);
      });
    } 
    if (this.state.researchData.length > 0) {
        var facets = _.keys(this.state.researchData[0].tags);
        var sortByItems = facets.map((afacet,i)=> <MenuItem eventKey={i} onSelect={(e)=>this.onSortBy(afacet)}> {afacet} </MenuItem>  );
    } else {
        sortByItems = '';
    }
             // <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                //     {tabList}
                // </Tabs>
    const divStyle = {
    margin: '0 20 2 20'
    };
    return(<div> 
        <Grid className="show-grid" fluid={true}>           
            <Row>
                <Col lg={3} sm={3} md={3}>
                 <Row>
                 <ButtonToolbar>
                    <Button style={divStyle} bsSize="small" bsStyle="default" onClick={self.resetData} >Reset Filter</Button>
                </ButtonToolbar>
                    <MyPopop ref="myPopup"> </MyPopop>                                      
                </Row>
       
                <PanelGroup defaultActiveKey={1} id="uncontrolled-tab-example" accordion>
                    {tabList}
                </PanelGroup>

                </Col>
                <Col lg={9} sm={9} md={9}>
                    <Row>
                         <ButtonToolbar>
                          

                            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                            <Button bsSize="small" bsStyle="primary" onClick={self.tileMode}>Tiles</Button>

                            {/* Indicates a successful or positive action */}
                            <Button bsSize="small" bsStyle="success"  onClick={self.detailMode}>Details</Button>                            
                            <DropdownButton bsSize="small" title={self.state.sortedBy + " " + ((self.state.reverse) ? String.fromCharCode( "8595" ) : String.fromCharCode( "8593" ))} pullRight id="split-button-pull-right">
                            {sortByItems}
                            </DropdownButton>

                        </ButtonToolbar>
                    </Row>
                    <Row>
                        <Index mode={this.state.mode} items={this.state.researchData}  handleClick={this.openModal} highlight={this.state.highlight} brushOut={this.handleBrushOut} brushReset={this.handleBrushReset}/>
                    </Row>
                </Col>                   
            </Row>
        </Grid>
    </div>);
  }
});



 