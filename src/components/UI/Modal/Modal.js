import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        {
          this.props.show && (
            <div
              style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-vh100)',
                opacity: '1',
              }}
              className={classes.Modal}>
              {this.props.children}
            </div>
          )
        }
      </Auxiliary>
    );
  }
}

export default Modal;

