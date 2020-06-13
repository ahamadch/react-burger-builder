import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildCoutrols/BuildCoutrols';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';
export const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();


  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const tPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const onIngredientAdded = (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(burgerBuilderActions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    }
    else {
      onSetAuthRedirectPath('/checkout')
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {...ings};

  for(let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

  if(ings) {
    burger = (
      <Auxiliary>
        <Burger ingredients={ings}/>
        <BuildControls
          ingredientRemoved={onIngredientRemoved}
          ingredientAdded={onIngredientAdded}
          disabled={disabledInfo}
          isAuthenticated={isAuthenticated}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          price={tPrice}/>
      </Auxiliary>
    );

    orderSummary = <OrderSummary
                      purchaseCancelled={purchaseCancelHandler}
                      purchaseContinued={purchaseContinueHandler}
                      price={tPrice}
                      ingredients={ings}
                    />;
  }

  return (
    <Auxiliary>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
}

export default withErrorHandler(burgerBuilder, axios);