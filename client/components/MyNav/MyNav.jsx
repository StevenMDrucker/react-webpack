import 'styles/main.scss';
import 'styles/bootstrap.min.css';
import 'styles/bootstrap-theme.css';
import 'styles/slick.scss'
import 'styles/slick-theme.scss'
import React from 'react'
import { Link } from 'react-router'
import {Nav, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
      <div>
        <Nav bsStyle="pills">  
          <LinkContainer to="/about">
              <NavItem eventKey={1}> Bio </NavItem>
          </LinkContainer>
          <LinkContainer to="/featured">
              <NavItem eventKey={2}> Featured </NavItem>
          </LinkContainer>
          <LinkContainer to="/app">
              <NavItem eventKey={3}> Research </NavItem>
          </LinkContainer>
          <LinkContainer to="/cv">
              <NavItem eventKey={4}> CV </NavItem>
          </LinkContainer>

        </Nav>
        <div className="spacer"  />
        {this.props.children}
      </div>
    )
  } 
})