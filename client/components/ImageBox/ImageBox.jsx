import React, { Component } from 'react';
import * as RB from 'react-bootstrap';

class MyPopop extends Component {
  componentWillMount() {
      this.setState({ showModal: false, item: null });    
  }

  close() {
    this.setState({ showModal: false, item: null });    
  }

  open(itemVal) {
    this.setState({ showModal: true, item: itemVal });
  }

  render() {
      if (this.state.item) {   
        return (
        <div>                
            <RB.Modal show={this.state.showModal} onHide={(e)=>this.close()}>
            <RB.Modal.Header closeButton>
                <RB.Modal.Title>{this.state.item.caption}</RB.Modal.Title>
            </RB.Modal.Header>
            <RB.Modal.Body>                
                <img src={"client/" + this.state.item.img} width="360" height="240"></img>
                <RB.Button href={this.state.item.paper}>Paper</RB.Button> <RB.Button href={this.state.item.video}>Video</RB.Button>
                <h4>Abstract</h4>
                <p> {this.state.item.pabstract}</p>                
            </RB.Modal.Body>
            <RB.Modal.Footer>
                <RB.Button onClick={(e)=>this.close()}>Close</RB.Button>
            </RB.Modal.Footer>
            </RB.Modal>
        </div>
        );
      } else {
          return (
        <div>                
            <RB.Modal show={this.state.showModal} onHide={(e)=>this.close()}>
            <RB.Modal.Header closeButton>
                <RB.Modal.Title>Modal heading</RB.Modal.Title>
            </RB.Modal.Header>
            <RB.Modal.Body>
                <h4>Text in a modal</h4>
                
                <h4>Overflowing text to show scroll behavior</h4>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            </RB.Modal.Body>
            <RB.Modal.Footer>
                <RB.Button onClick={(e)=>this.close()}>Close</RB.Button>
            </RB.Modal.Footer>
            </RB.Modal>
        </div>
          );
      }
  }
}

 export default MyPopop;