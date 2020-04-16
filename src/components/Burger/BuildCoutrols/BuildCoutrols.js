import React from 'react';
import classes from './BuildCoutrols.module.css';
import BuildControl from './BuildCoutrol/BuildCoutrol';

const controls = [
  {label:'Salad', type:'salad'},
  {label:'Bacon', type:'bacon'},
  {label:'Cheese', type:'cheese'},
  {label:'Meat', type:'meat'}
];

const buildControls =(props) => (
  <div className={classes.BuildCoutrols}>
    {controls.map(ctrl => (
      <BuildControl key={ctrl.label} label={ctrl.label}/>
    ))}
  </div>
)

export default buildControls;