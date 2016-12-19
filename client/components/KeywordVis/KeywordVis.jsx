import React, { Component } from 'react';
import * as D3 from "d3";
import * as _ from "lodash";

    
const KeywordVis = React.createClass({
  
  getInitialState: function () {   
      return({highlightProjects:[],
          highlightSubjects:[]});                
  },
  calcHighlight: function(aproject) {
      if (this.state.highlightProjects.indexOf(aproject)>=0) {
          return("mediumblue");
      } else {
          return("white")
      }
  },
  calcHighlightSubject: function(aSubject) {
      if (this.state.highlightSubjects.indexOf(aSubject)>=0) {
          return("mediumblue");
      } else {
          return("white")
      }
  },
  highlightProjects: function(aKey) {
      var toHighlight = _.filter(this.props.items, (anItem)=> anItem.tags.subject.indexOf(aKey)>0);
      var highlightList = _.map(toHighlight, (e)=>e.caption);
      this.setState({highlightProjects:highlightList});
  },
  clearHighlightProjects: function() {
      this.setState({"highlightProjects":[]});
  },

   highlightSubjects: function(aProject) {
      var theProject = _.filter(this.props.items, (anItem)=> (anItem.caption == aProject));
      var highlightList = theProject[0].tags.subject;
      this.setState({highlightSubjects:highlightList});
  },

  clearHighlightSubjects: function() {
      this.setState({"highlightSubjects":[]});
  },
  render: function() {
    const {  items } = this.props;
    var width = this.props.width;
    var height = Math.max(this.props.height, 960);

    var keywords = _.orderBy(_.uniq(_.flatten(_.map(items, function (d) { return d.tags["subject"] }))));
    var projects = _.map(items, function (d) { return d.caption });
    var marginx = 150;
    var marginy = 170;
    var y = D3.scaleLinear()
        .domain([0, keywords.length])
        .range([marginy, height-marginy]);
    var x = D3.scaleLinear()
        .domain([0, projects.length])
        .range([marginx, width-5]);

    var keywordlist = keywords.map((akey,i)=> {
        return(<g key={"k"+i} transform={"translate(0," + y(i) + ")" }>
            <text fill={this.calcHighlightSubject(akey)}  
            onMouseEnter={(e)=>this.highlightProjects(akey)} 
            onMouseLeave={(e)=>this.clearHighlightProjects}>{akey}</text>
        </g>);
    } );

    var projectlist =projects.map((akey,i)=> {
        return(<g key={"p"+i} transform={"translate(" + x(i) + ",150)" }>
            <text transform="rotate(-90)" fill={this.calcHighlight(akey)} 
            onMouseEnter={(e)=>this.highlightSubjects(akey)} 
            onMouseLeave={(e)=>this.clearHighlightSubjects}>
            {akey}
            </text>
        </g>);
    } );

    var vertlines = projects.map((akey,i)=> {
         return(<line strokeWidth={2} key={"l"+i} x1={x(i)} x2={x(i)} y1={marginy-7} y2={height-marginy-7} stroke={this.calcHighlight(akey)}> {akey}</line>
        );
    })

    var horlines = keywords.map((akey,i)=> {
         return(<line strokeWidth={2} key={"hl"+i} x1={marginx} x2={width-5} y1={y(i)-7} y2={y(i)-7} stroke={this.calcHighlightSubject(akey)}> {akey}</line>
        );
    })
    return (
        
        <svg cursor="pointer" width={width} height={height} className='chart'>
            <circle cx={30} cy={80} r={25} fill={'red'} />
            <circle cx={130} cy={80} r={60} fill={'green'} />
            <circle cx={260} cy={80} r={40} fill={'blue'} />
            {keywordlist}
            {projectlist}
            {vertlines}
            {horlines}
        </svg>
    );
  }
});

export default KeywordVis;