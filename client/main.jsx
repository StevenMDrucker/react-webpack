'use strict';

import 'styles/main.scss';
import 'styles/bootstrap.min.css';
import 'styles/bootstrap-theme.css';
import React from 'react';
import { render } from 'react-dom';
import Index from 'components/Index/Index';
import FacetPanel from 'components/FacetPanel/FacetPanel';
import MyPopop from 'components/ImageBox/ImageBox';
import * as D3 from "d3";
import * as _ from "lodash";

import { Button,ButtonToolbar,Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';

var App = React.createClass({
  globalState: [],
  facetPanels: {},      
  getInitialState: function () {   
      return({researchData:[],itemHovered:'',filterSpec:{}});
  },
  componentDidMount: function() {
    D3.json("http://localhost:3001/client/researchData.json", (error, data) => {
        this.researchData = data;
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
    this.setState({"researchData": 
            _.reduce(localFilterSpec, (result, value, key) => {
                result= _.filter(result, (o) => {
                    return !_.isEmpty(_.intersection(value,o.tags[key]))}); 
                return result}, this.researchData)});

  },
  handleExit:function(){
      this.setState({'highlight':''});
  },
  randomSubset: function() {
      this.newList = [];
      for (let i=0;i<this.researchData.length; i++) {if (Math.random() > .5) this.newList.push(this.researchData[i]);}
      this.setState({"researchData":this.newList});
  },
  resetData: function() {
      this.setState({"filterSpec":{}});
      this.setState({"researchData":this.researchData});
  },
  openModal: function(val) {
      this.refs.myPopup.setState({ showModal: true, item: val });
  },
  calculateLocalData: function() { 
    if (this.researchData != null) {
        var facets = _.keys(this.researchData[0].tags);
        var researchData = this.researchData;
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
          return(
              <Tab eventKey={i} title={tag}>
                    <FacetPanel items={values} filterSpec={this.state.filterSpec} itemTitle={tag} selected = {this.state.itemHovered} brush = {this.handleBrush} filter = {this.handleFilter} clearFilter= {this.handleExit}>
                    </FacetPanel>
              </Tab>);
      });
    } 
    return(<div> 
        <Grid className="show-grid" fluid={true}>           
            <Row>
                <Col lg={3} sm={3} md={3}>
                 <Row>
                    <Button bsStyle="primary" onClick={self.resetData} >Reset Filter</Button>
                    <MyPopop ref="myPopup"> </MyPopop>                                      
                </Row>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    {tabList}
                </Tabs>
                </Col>
                <Col lg={9} sm={3} md={3}>
                    <Index items={this.state.researchData}  handleClick={this.openModal} highlight={this.state.highlight} brushOut={this.handleBrushOut} brushReset={this.handleBrushReset}/>
                </Col>                   
            </Row>
        </Grid>
    </div>);
  }
});


render(<App />,document.getElementById('js-main'));

 