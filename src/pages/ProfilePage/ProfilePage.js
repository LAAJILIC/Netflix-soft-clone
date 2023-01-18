import React from 'react'
import { useSelector } from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import { selectUser } from '../../features/user/userSlice';

import firebase from 'firebase/compat/app';
import 'firebase/compat/functions'
import { auth } from '../../firebase';

import Stripe from 'stripe';
//import * as dotenv from 'dotenv' 
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import './ProfilePage.css';

function ProfilePage() {

  const planPrices = [7.99, 10,.99, 12.99];
  const user = useSelector(selectUser);
  const stripe=useStripe();
  const elements= useElements();


//the following function aims to process the stripe payment
  const paymentHandler = (e) => {
    e.preventDefault();


    if(!stripe || !elements) { return;}
    //I will make a fetch request to backend part in order to create a payment intent and make stripe aware about it
    
    //1 If I will do this using serveless netlify functions as the following:
    
     //  const response = await fetch('/netlify/functions/create-payment-intent.js', {
    //  method: 'post',
    //  headers: {
    //   'Content-Type': 'application/json',
    //          },
    //  body: JSON.stringify({ amount: planPrices[0] }),
    //  }).then((res) => res.json());

    //2 with Firebase functions
        //if we use .env
       //dotenv.config();
       const stripeInstance = require("stripe")(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
       const createStripePayment = firebase.functions().httpsCallable('createPaymentIntent');
       createStripePayment().then((res) => stripeInstance.redirectToCheckout(res.data.id));

  };
  return (
    <div className='profile-page'>
     <Navigation />
       <div className='profile-component'> 
        <h1>Update Profile</h1>
        <div className='profile-data'>
         <img src='https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/avatar-512.png' alt=''/>
          <div className='profile-details'> 
            <h2>{user.email}</h2>
            <div className='user-plans'>
               <h2>Your plans</h2>
                <div className='plan-detail'>
                 <h3>Basic Plan {planPrices[0]}€</h3>
                 <span>Watch on 1 supported device at a time</span>
                <p>🗸Watch in HD<br />
                🗸Ad-free TV shows and movies<br />
                🗸Download on 1 supported device
                </p>                
                </div>
                <div className='plan-detail'>
                <h3>Standard Plan {planPrices[1]}€</h3>
                <span>Watch on 2 supported devices at a time</span>
               <p>🗸Watch in Full HD<br />
               🗸Ad-free TV shows and movies<br />
               🗸Download on 2 supported devices
               </p>
              </div>
              <div className='plan-detail'>
               <h3>Premium Plan {planPrices[2]}€</h3>
               <span>Watch on 4 supported devices at a time</span>
              <p>🗸Watch in ULTRA HD<br />
              🗸Ad-free TV shows and movies<br />
              🗸Download on 4 supported devices
              </p>
               <form className='payment-form' onSubmit={paymentHandler}>
               <button className='button-plan'>Subscribe & Pay</button>
               <h3> Credit Card Payment: </h3>
               <CardElement />
               </form>
               </div>

{                //without the possibility of attending body training courses
}            <button className='profile-button' onClick={() => auth.signOut()}>Log out</button>
            </div>
          </div>
         </div>
       </div>
    </div>
  )
}

export default ProfilePage