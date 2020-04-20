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
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}>ORDER NOW</button>
  </div>
)

export default buildControls;