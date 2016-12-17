import React, { Component } from 'react';
import * as D3 from "d3";
import * as _ from "lodash";

    
const KeywordVis = React.createClass({
    updateDimensions: function() {
        var myWidth = document.getElementById('js-main').clientWidth;
        var myHeight = document.getElementById('js-main').clientHeight;
        this.setState({width: myWidth, height: myHeight});
    },
    componentWillMount: function() {
        this.updateDimensions();
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.updateDimensions);
    },
  render() {
    const {  items } = this.props;
    var width = this.state.width;
    var height = Math.min(this.state.height, 960);

    var keywords = _.uniq(_.flatten(_.map(items, function (d) { return d.tags["subject"] })));
    var projects = _.map(items, function (d) { return d.caption });
    var marginx = 150;
    var marginy = 150;
    var y = D3.scaleLinear()
        .domain([0, keywords.length])
        .range([marginy, height-marginy]);
    var x = D3.scaleLinear()
        .domain([0, projects.length])
        .range([marginx, width-marginx]);

    var keywordlist = keywords.map((akey,i)=> {
        return(<g key={"k"+i} transform={"translate(0," + y(i) + ")" }>
            <text fill="white"> {akey}</text>
        </g>);
    } );

    var projectlist =projects.map((akey,i)=> {
        return(<g key={"p"+i} transform={"translate(" + x(i) + ",150)" }>
            <text transform="rotate(-90)" fill="white"> {akey}</text>
        </g>);
    } );
    return (
      <svg width={width} height={height} className='chart'>
        <circle cx={30} cy={80} r={25} fill={'red'} />
        <circle cx={130} cy={80} r={60} fill={'green'} />
        <circle cx={260} cy={80} r={40} fill={'blue'} />
        {keywordlist}
        {projectlist}
      </svg>
    );
  }
});

export default KeywordVis;