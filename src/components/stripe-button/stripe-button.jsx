import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51H0S89LZ34cFyG7FdWHVBLrJ44uLYwSuSRUI4tbYpGkJ3eNJb78mtQKRfhfuQfcalcCqdGgXNJkg97InHr9wi1GT00bwQBfU4y';
  // const publishableKey = 'pk_test_51H0S89LZ34cFyG7FdWHVBLrJ44uLYwSuSRUI4tbYpGkJ3eNJb78mtQKRfhfuQfcalcCqdGgXNJkg97InHr9wi1GT00bwQBfU4y';
  
  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  }


  return (
    <StripeCheckout 
      label='Pay Now'
      name='Elite Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;