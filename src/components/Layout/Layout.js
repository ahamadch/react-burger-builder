import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from '../Layout/Layout.module.css';

const layout = (props) => (
  <Auxiliary>
    <div>Toolbars, SideDrawer, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Auxiliary>
);

export default layout;