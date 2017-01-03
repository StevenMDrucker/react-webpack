import 'styles/main.scss';
import 'styles/bootstrap.min.css';
import 'styles/bootstrap-theme.css';
import 'styles/slick.scss'
import 'styles/slick-theme.scss'
import React from 'react'
import { Link } from 'react-router'
import {Navbar, Nav, NavItem, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
      <div>
          <Row>
          <Col lg={1} md={1} sm={1}>
          </Col>
          <Col lg={8} md={8} sm={8}>
           <Navbar>        
            <Navbar.Header>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
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
              </Nav>
            </Navbar.Collapse>
            </Navbar>
          </Col>          
          <Col lg={1} md={1} sm={1}>
          </Col>        
        </Row>
        <div className="spacer"  />
        <Row>
          {this.props.children}
        </Row>
      </div>
    )
  } 
})