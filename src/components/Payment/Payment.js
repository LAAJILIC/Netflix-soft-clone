import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

import { useNavigate } from 'react-router-dom';

 import './Payment.css';

function Payment({ type, price, paymentHandler }) {
  const navigate = useNavigate();

  //const msg = 'Succesful Payment';
  return (
  <div className='payment-data'>
  <div className='final-plan'>So, the choosen plan is {type}</div>
   <form className='payment-form' onSubmit={paymentHandler}>
   <button className='button-plan' onClick={() => navigate('/payment')}>Subscribe & Pay {price}</button>
   <h3> Credit Card Payment: </h3>
   <CardElement />
   </form>
   </div>
  )}

export default Payment