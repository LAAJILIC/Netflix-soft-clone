import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import { subs, selectUser } from '../../features/user/userSlice';
import Payment from '../../components/Payment/Payment';

import firebase from 'firebase/compat/app';
import 'firebase/compat/functions'
import { auth } from '../../firebase';

import { doc, getDoc } from "firebase/firestore"; 
import db from '../../firebase';

import { RiCheckboxCircleFill } from "react-icons/ri";

//import Stripe from 'stripe';
//import * as dotenv from 'dotenv' 
import { useStripe, useElements } from '@stripe/react-stripe-js';

import './ProfilePage.css';

function ProfilePage() {
const plans = ['Basic Plan', 'Standard Plan', 'Premium Plan'];
  const planPrices = [7.99, 12.99, 14.99];
  const user = useSelector(selectUser);
  const stripe=useStripe();
  const elements= useElements();
  const [selectedPlan, setSelectedPlan] = useState({
    type: '',
    price: 0,
    choosen: false,
    checkNb: 0
  });
  const [payment, setPayment] = useState(false);
 
  const [choosenPlan, setchoosenPlan] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlanByEmail(email) {
      let plan = '';
      // Make the initial query
      const query = await db.collection('users').where('userId', '==', email).get();
       if (!query.empty) {
        const snapshot = query.docs[0];
        const data = snapshot.data();
        console.log(data.plan);
        plan = data.plan;
      }
      setchoosenPlan(plan);
      return plan;
    }

        dispatch(subs({
           uid:user.uid,
           email: user.email,
           plan: getPlanByEmail(user.email)

                      })); 
  }, []);
//the following function aims to process the stripe payment
  const paymentHandler = (e) => {
    e.preventDefault();
    //if(!stripe || !elements) { return;}
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
  const selectPlan = (i) => {
    setSelectedPlan({
    ref: i,
    type: plans[i],
    price: planPrices[i],
    choosen: true,
    checkNb: selectedPlan.checkNb +1
    });
    if(payment) {
      setSelectedPlan({
        ref: selectedPlan.ref,
        type: selectedPlan.type,
      price: selectedPlan.price,
      choosen: true,
      checkNb: 10
      }); 
          //when logout payment will be false so the data will get lost!! not found for the remaining subscription when log in again
    
    }
    };

  return (
    <div className='profile-page'>
     <Navigation />
       <div className='profile-component'> 
        <h1>Update Profile</h1>
        <div className='profile-data'>
         <img src='https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/avatar-512.png' alt=''/>
          <div className='profile-details'> 
            <h3>UserId: {user.email}</h3>
            {(choosenPlan) ? (<div className='intro'>
            <div>Information about your current plan :</div>
            <Payment type={choosenPlan} exist/>

      </div>) : 
             ((!selectedPlan.choosen && selectedPlan.checkNb === 0 || !user.plan) ? (
              <div className='intro intro-step1'>
                <h3>You do not have a plan yet ? choose your favorite one NOW</h3></div>
              ) : (
                  (!payment)
                  ?
                ( <div className='intro' onClick={() => setPayment(true)}>
        <Payment type={selectedPlan.type} price={selectedPlan.price} email={user.email} paymentHandler={paymentHandler} />
        </div>
        ) :
             (
              <div className='intro'>
              <div>Information about current plan :</div>
              <Payment type={selectedPlan.type} price={selectedPlan.price} paymentHandler={paymentHandler} exist/>

        </div>
            )
                
              ))
            }
            {
              (selectedPlan.choosen && selectedPlan.checkNb === 10) ? ( <div className='intro intro-step1'>You can upgarde your current plan Just above:</div>
              ) : null
            }
            <div className='user-plans'>
               <div className='plan-detail'>
                 <h3>{plans[0]} {planPrices[0]}€</h3>
                <RiCheckboxCircleFill className='check-icon' onClick={()=> selectPlan(0)}/>
                <h4>Watch on 1 supported device at a time</h4>
                <p>🗸Watch in HD<br />
                🗸Ad-free TV shows and movies<br />
                🗸Download on 1 supported device
                </p> 
                </div>
                <div className='plan-detail'>
                <h3>{plans[1]} {planPrices[1]}€</h3>
                <RiCheckboxCircleFill className='check-icon' onClick={()=> selectPlan(1)}/>
                <h4>Watch on 2 supported devices at a time</h4>
               <p>🗸Watch in Full HD<br />
               🗸Ad-free TV shows and movies<br />
               🗸Download on 2 supported devices
               </p>
              </div>
              <div className='plan-detail'>
               <h3>{plans[2]} {planPrices[2]}€</h3>
               <RiCheckboxCircleFill className='check-icon' onClick={()=> selectPlan(2)}/>
               <h4>Watch on 4 supported devices at a time</h4>
              <p>🗸Watch in ULTRA HD<br />
              🗸Ad-free TV shows and movies<br />
              🗸Download on 4 supported devices
              </p> </div>
              </div>
         
          <button className='profile-button' onClick={() => auth.signOut()}>Log out</button>

</div>
         </div>
       </div>
    </div>
  )
}

export default ProfilePage