import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

  let summary = <Redirect to="/" />;

  if(props.ings) {
    const purchasedRedirerct = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirerct}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutContinued={checkoutContinuedHandler}
          checkoutCancelled={checkoutCancelledHandler}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    );
  }
  return summary;
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
}

export default connect(mapStateToProps)(checkout);