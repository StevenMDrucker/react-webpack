'use strict';

import React from 'react';
import { render } from 'react-dom';
import Index from 'components/Index/Index';
import FacetPanel from 'components/FacetPanel/FacetPanel';
import MyPopop from 'components/ImageBox/ImageBox';
import * as D3 from "d3";
import * as _ from "lodash";
import {Form, FormControl, Button,ButtonToolbar, DropdownButton, SplitButton, MenuItem, Grid, Row, Col, Tabs, Tab, PanelGroup, Panel } from 'react-bootstrap';
import ContainerDimensions from 'react-container-dimensions'; 
//import SearchInput, {createFilter} from 'react-search-input';
import KeywordVis from 'components/KeywordVis/KeywordVis';
import TimelineVis from 'components/TimelineVis/TimelineVis';
import Bibliography, {parseString} from 'bibliography';


//const KEYS_TO_FILTERS = ['']
export default React.createClass({
  globalData: [],
  facetPanels: {},      
  getInitialState: function () {
     // this.searchUpdate = this.searchUpdated.bind(this);   
      return({researchData:[],
          currentProjects:[],
          highlight:[],
          itemHovered:'',
          sortedBy:'year',
          reverse: false,
          mode:"tile",
          searchTerm: "",
          filterSpec:{}});
  },
  calculateResults: function(localFilterSpec, localOrderBy, localReverse, localSearchTerm ) {
      var results = 
            _.reduce(localFilterSpec, (result, value, key) => {
                result= _.filter(result, (o) => {
                    return !_.isEmpty(_.intersection(value,o.tags[key]))}); 
                return result}, this.globalData)
     var afacet = localOrderBy;
     var finalresults = (localReverse) ? _.reverse(_.sortBy(results, (a)=>a.tags[afacet])) : _.sortBy(results, (a)=>a.tags[afacet]);
     
     var searchResearchData = localSearchTerm.length==0 ?  finalresults : finalresults.filter((a)=>_.startsWith(_.toLower(a.caption), _.toLower(localSearchTerm)));
     return(searchResearchData);
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
      
      this.setState({"researchData": this.calculateResults(this.state.filterSpec, afacet, reverse, this.state.searchTerm)});
  },
  convertData: function(anItem) {
      var facetlist = _.filter(_.keys(anItem), (a)=>_.startsWith(a,"facet"));
      var newItem = Object.assign({}, anItem);
      newItem["tags"] = {};
      _.each(facetlist, (afacet)=>{
          delete newItem[afacet];
          var facetname = afacet.split('.')[1]
          newItem["tags"][facetname]=anItem[afacet].split(',');
      });
      return(newItem);
  },
  componentDidMount: function() {
      D3.json("client/researchData.json", (error, data) => {
          this.globalData = data;
          this.globalData = this.calculateResults({}, "year", true, "");
          this.setState({"researchData": this.globalData}); 
      });
    // D3.json("client/bibtextjson.txt", (error, data) => {
    //         this.globalData = _.map(data, (a)=>this.convertData(a));
    //         this.globalData = this.calculateResults({}, "year", true, "");   
    //         this.setState({"researchData": this.globalData}); 
    // }); 
  },
  handleBrush: function(title,val) {
    var projList = _.map(_.filter(this.state.researchData, (proj)=> (_.includes(proj.tags[title], val))), (aProj)=>aProj.caption);
    this.setState({"currentProjects": projList});
    this.setState({"highlight":[title,val]});
  },
  handleBrushOut: function(val) {
      this.setState({'itemHovered':val});
      this.setState({"currentProjects":[]});
      this.setState({"highlight":[]});
  },
  handleBrushReset: function() {
    this.setState({'itemHovered':''});
    this.setState({"currentProjects":[]});
    this.setState({"highlight":[]});
  },
  handleFilter: function(title,val) {
    var localFilterSpec = this.state.filterSpec;
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
    this.setState({"researchData": this.calculateResults(localFilterSpec, this.state.orderBy, this.state.reverse, this.state.searchTerm)});   
  },
  tileMode:function(){
    this.setState({'mode':"tile"})
  },
  detailMode: function() {
    this.setState({'mode':"details"})
  },
  keywordMode: function() {
    this.setState({'mode':"keyword"})
  },
  timelineMode: function() {
    this.setState({'mode':"timeline"})
  },
  publicationMode: function() {
    this.setState({'mode':"publication"})
  },
  handleExit:function(){
    this.setState({'highlight':''});
    this.setState({"currentProjects":[]});
  },

  resetData: function() {
      this.state.searchTerm = "";
      this.setState({"filterSpec":{}});
      this.setState({"reverse":false});
      this.setState({"researchData":this.globalData});
  },
  openModal: function(val) {
      if (typeof(val)=="string") {
          var myIndex = _.findIndex(this.globalData, (a)=>a.caption==val);
          if (myIndex >=0) {
            this.refs.myPopup.setState( {showModal: true, item: this.globalData[myIndex]});
          }
      } else {
        this.refs.myPopup.setState({ showModal: true, item: val });
      }  
  },
  searchUpdated: function(e) {
    var term = e.target.value;
    this.setState({"searchTerm":term});
    this.setState({"researchData": this.calculateResults(this.state.filterSpec, this.state.orderBy, this.state.reverse, term)});   
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
              <Panel key={i} eventKey={i} header={tag} className="filterPanel" style={{"cursor":"pointer"}}>
                    <FacetPanel key={"P"+i} items={values} filterSpec={this.state.filterSpec} itemTitle={tag} selected = {this.state.itemHovered} brush = {this.handleBrush} filter = {this.handleFilter} clearFilter= {this.handleExit}>
                    </FacetPanel>
              </Panel>);
      });
    } 
    if (this.state.researchData.length > 0) {
        var facets = _.keys(this.state.researchData[0].tags);
        var sortByItems = facets.map((afacet,i)=> <MenuItem key={i} eventKey={i} onSelect={(e)=>this.onSortBy(afacet)}> {afacet} </MenuItem>  );
    } else {
        sortByItems = '';
    }
             // <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                //     {tabList}
                // </Tabs>
    const divStyle = {
    margin: '0 20 2 20'
    };
    var resultsDisplay = '';
    if (this.state.mode == "tile" || this.state.mode == "details" || this.state.mode == "publication") {
        resultsDisplay = <Index mode={this.state.mode} items={this.state.researchData} currentProjects={this.state.currentProjects} handleClick={this.openModal} brushOut={this.handleBrushOut} brushReset={this.handleBrushReset}/>
    } else if (this.state.mode == "keyword") {
        resultsDisplay = <div> 
            <ContainerDimensions> 
               { ({ width, height }) => 
                <KeywordVis items={this.state.researchData} currentProjects={this.state.currentProjects} highlight={this.state.highlight} handleClick={this.openModal} filter = {this.handleFilter} width={width} height={height}>
                </KeywordVis> 
                
                }
             </ContainerDimensions>
          </div>
    } else if (this.state.mode == "timeline") {
        resultsDisplay = <div>
            <ContainerDimensions> 
               { ({ width, height }) => 
                <TimelineVis items={this.state.researchData} currentProjects={this.state.currentProjects} handleClick={this.openModal} width={width} height={height}>
                </TimelineVis> 
                
                }
             </ContainerDimensions>
          </div>
    } else  resultsDisplay = <div>No View</div>
    var rowStyle = {
        margin: "0 0 0 25",
    }
    var buttonBarStyle = {
        margin: "0 0 10 0",
    }
//                            <SearchInput className="search-input" onChange={this.searchUpdated} />
    var itemsDisplayedString = this.state.researchData.length == 1 ? 
        this.state.researchData.length + " item displayed" :
        this.state.researchData.length + " items displayed";
    return(<div> 
        <Grid className="show-grid" fluid={true} style={rowStyle}>           
            <Row>          
                <Col lg={10} sm={10} md={10}>
                    <Row>
                    <Col lg={6} sm={6} md={6}>
                          <ButtonToolbar style={{float:"left"}}>                         
                            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                            <Button key="Tiles" style={{background: "brown"}} bsSize="small"  onClick={self.tileMode}>Tile</Button>
                            <Button key="Details" bsSize="small" bsStyle="primary" onClick={self.detailMode}>Detail</Button>
                            <Button key="Publications" bsSize="small" bsStyle="success"  onClick={self.publicationMode}>Publication</Button>
                            <Button key="TimelineVis"  bsSize="small" bsStyle="info" onClick={self.timelineMode}>TimelineVis</Button>
                            <Button key="KeywordVis"  bsSize="small" bsStyle="warning" onClick={self.keywordMode}>KeywordVis</Button>                           
                            <DropdownButton style={{float:"right"}} bsSize="small" title={"Sort By: " + self.state.sortedBy + " " + ((self.state.reverse) ? String.fromCharCode( "8595" ) : String.fromCharCode( "8593" ))} pullRight id="split-button-pull-right">
                             {sortByItems}
                            </DropdownButton>                          
                        </ButtonToolbar>
                    </Col>
                    <Col lg={4} sm={4} md={4} lgOffset={1} smOffset={1} mdOffset={1}>
                          <div style={{padding:"0 20 0 0", display:"table-cell", verticalAlignment:"middle"}}> {itemsDisplayedString}  </div>
                            <Form  inline style={{padding:"0 0 5 0", display:"table-cell", verticalAlignment:"middle"}}>
                                <FormControl
                                    bsSize="small"
                                    type="text"
                                    value={this.state.searchTerm}
                                    placeholder="Search"
                                    onChange={this.searchUpdated}
                                />
                            </Form>
                    </ Col>
                    </Row>
                    <Row>                    
                        {resultsDisplay}                        
                    </Row>
                </Col>
                <Col lg={2} sm={2} md={2}>
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
            </Row>
        </Grid>
    </div>);
  }
});



 