import React, { Component } from 'react';
import * as D3 from "d3";
import * as _ from "lodash";

    
const KeywordVis = React.createClass({
  
  getInitialState: function () {   
      return({highlightProjects:[],
          highlightSubjects:[],
        currentProject:'',
        currentSubect:''});                
  },
  calcHighlight: function(aproject) {
      if (this.state.highlightProjects.indexOf(aproject)>=0) {
          return("highlighted");
      } else {
          if (this.state.currentProject == aproject) {
              return("highlighted");
          }
          return("normal")
      }
  },
  calcHighlightSubject: function(aSubject) {
      if (this.state.highlightSubjects.indexOf(aSubject)>=0) {
          return("highlighted");
      } else {
         if (this.state.currentSubject == aSubject) {
              return("highlighted");
          }

          return("normal")
      }
  },
  highlightProjects: function(aKey) {
      var toHighlight = _.filter(this.props.items, (anItem)=> anItem.tags.subject.indexOf(aKey)>0);
      var highlightList = _.map(toHighlight, (e)=>e.caption);
      this.setState({highlightProjects:highlightList});
      this.setState({currentSubject:aKey});      
  },
  clearHighlightProjects: function() {
      this.setState({"highlightProjects":[]});
      this.setState({currentSubject:''});
  },

   highlightSubjects: function(aProject) {
      var theProject = _.filter(this.props.items, (anItem)=> (anItem.caption == aProject));
      var highlightList = theProject[0].tags.subject;
      this.setState({highlightSubjects:highlightList});
      this.setState({currentProject:aProject});
  },

  clearHighlightSubjects: function() {
      this.setState({"highlightSubjects":[]});
      this.setState({currentProject:''});
  },
  render: function() {
    const {  items } = this.props;
    var width = this.props.width;
    var height = Math.max(this.props.height, 960);
    
    var keywords = _.orderBy(_.uniq(_.flatten(_.map(items, function (d) { return d.tags["subject"] }))));
    var projects = _.map(items, function (d) { return d.caption });
    var marginx = 150;
    var marginy = 170;
    var xmaxspacing = 20;
    var ymaxspacing = 20;
    
    var xspacing = Math.min((width - marginx-10)/projects.length, xmaxspacing);
    var yspacing = Math.min((height - marginy-5)/keywords.length, ymaxspacing);
    var xmaxpos = marginx+  xspacing*(projects.length);
    var ymaxpos = marginy + yspacing*(keywords.length);

    var y = D3.scaleLinear()
        .domain([0, keywords.length])
        .range([marginy, ymaxpos]);
    var x = D3.scaleLinear()
        .domain([0, projects.length])
        .range([marginx, xmaxpos]);

    var keywordlist = keywords.map((akey,i)=> {
        return(<g key={"k"+i} transform={"translate(" + (marginx-5) + "," + y(i) + ")" }>
            <text dy="-.3em" className={"keyword "+ this.calcHighlightSubject(akey)}  
            onMouseEnter={(e)=>this.highlightProjects(akey)} 
            onMouseLeave={(e)=>this.clearHighlightProjects()}>{akey}</text>
        </g>);
    } );

    var projectlist =projects.map((akey,i)=> {
        return(<g key={"p"+i} transform={"translate(" + x(i) + ",150)" }>
            <text dy=".3em" transform="rotate(-90)" className={"project " + this.calcHighlight(akey)} 
            onMouseEnter={(e)=>this.highlightSubjects(akey)} 
            onMouseLeave={(e)=>this.clearHighlightSubjects()}>
            {akey}
            </text>
        </g>);
    } );

    var vertlines = projects.map((akey,i)=> {
         return(<line  key={"l"+i} x1={x(i)} x2={x(i)} y1={marginy-7} y2={y(keywords.length-1)-7} className={"vertline " + this.calcHighlight(akey)}></line>
        );
    })

    var horlines = keywords.map((akey,i)=> {
         return(<line key={"hl"+i} x1={marginx} x2={x(projects.length-1)} y1={y(i)-7} y2={y(i)-7} className={"horline " + this.calcHighlightSubject(akey)}> </line>
        );
    })
    var circles = _.flatten(items.map((anItem, i) => {
        return(
            anItem.tags.subject.map((sItem, j) => {
                var vertPosition = y(keywords.indexOf(sItem))-7;
                var horPosition = x(i);
                return(<circle cx={horPosition} cy={vertPosition} r={2} fill={'red'} />); 
            })
        );
    }));
 /*           <circle cx={30} cy={80} r={25} fill={'red'} /> */
    
    return (
        
        <svg cursor="pointer" width={width} height={height} className='chart'>
    
            {keywordlist}
            {projectlist}
            {vertlines}
            {horlines}
            {circles}
        </svg>
    );
  }
});

export default KeywordVis;