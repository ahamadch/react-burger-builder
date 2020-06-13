import React from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== props.show || nextProps.children !== props.children;
  // }

  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      {
        props.show && (
          <div
            style={{
              transform: props.show ? 'translateY(0)' : 'translateY(-vh100)',
              opacity: '1',
            }}
            className={classes.Modal}>
            {props.children}
          </div>
        )
      }
    </Auxiliary>
  );
}

export default React.memo(modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);

