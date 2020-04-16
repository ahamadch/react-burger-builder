import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildCoutrols/BuildCoutrols';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 1,
      bacon: 0,
      cheese: 2,
      salad: 2
    }
  };
  render() {
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;