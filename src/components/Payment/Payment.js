import React, {useState, useEffect} from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/user/userSlice';
import { collection, addDoc } from "firebase/firestore"; 
import db from '../../firebase';


 import './Payment.css';

function Payment({ type, price, email, paymentHandler, exist }) {
  
  const plans = ['Basic Plan', 'Standard Plan', 'Premium Plan'];
  const filteredplans = plans.filter(plan => plan !== type);
 
 const user = useSelector(selectUser);
  const [paid, setPaid] = useState(false);
const [datePurchase, setDatePurchase] = useState('');
const [dateExtension, setDateExtension] = useState('');
 const [cancel, setCancel] = useState(false);

const navigate = useNavigate();
  const [extend, setExtend] = useState(false);
    const [upgrade, setUpgtade] = useState({
      done: false,
      planorder: 5,
      plan: ''
    });
const [newPlan, setNewPlan] =useState('');
    useEffect(() => {
      async function getPlanByEmail(email) {
        let plan = '';
        // Make the initial query
        const query = await db.collection('users').where('userId', '==', email).get();
         if (!query.empty) {
          const snapshot = query.docs[0];
          const data = snapshot.data();
          console.log(data);
          plan = data.plan;
          setDatePurchase(data.datePurchase);
          setDateExtension(data.dateExtension);
           setNewPlan(data.extendedPlan);
           setDatePurchase(data.datePurchase);
        }
        return plan;
      }getPlanByEmail(user.email);
      console.log(user.uid);
   
    }, []);
    useEffect(() => {setNewPlan('')},[cancel])
///////////////////////////////////////////////////////////
    const handlePayment = ({ email, type}) => {
      setPaid(true);
       //addDoc(collection(db, "users", user.uid), {
        var userDoc = db.collection("users").doc(`user${email}`);
        userDoc.set({
        userId: email,
        plan: type,
        datePurchase: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`, 
        dateExtension: `${(new Date().getDate()-1)}/${new Date().getMonth()+1}/${(new Date().getFullYear())+1}`, 
        extendedPlan: ""
      });  alert('Payment received');
    };
//////////////////////////////////////////////////////////////
    async function handleUpgrade(email) {
      setUpgtade({done: true, planorder: upgrade.planorder, plan: upgrade.plan});
  setNewPlan(upgrade.plan);
      // var userDoc = db.collection("users").doc(`user${email}`);
      // userDoc.update({
      //   "datePurchase": '15/03/2023', 
      //   "extendedPlan": plan
      //  });  alert('Plan Upgrated');}; does not work!!
      const querySnapshot = await db.collection('users').where('userId', '==', email).get();
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          "datePurchase": `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`,
          "extendedPlan": upgrade.plan });
      });
  
     };
     ///////////////////////////////////////////////////////////
   async function handleCancellation(email) {
    setCancel(true);
    navigate('/cancellation');
  const querySnapshot = await db.collection('users').where('userId', '==', email).get();
        querySnapshot.forEach((doc) => {
          doc.ref.set(({
           plan: '' }))
});
   }
  if(paid.text || exist) 
{    return (
      <div className='current-plan'>
      {// if newPlan exists in plans[ or filteredPlams[] !!!!!!!!!!
        (plans.indexOf(newPlan) === -1) ? (<span>Your plan is <span className='upper'>{type}</span></span>) : (<div>Your plan is upgrated to <span className='upper'>{newPlan}</span></div>)
      }
      <div>This plan is available from <span className='upper'>{datePurchase}</span></div>
      <div className='extend'>
      <div>You can extend your abo from <span className='upper'>{dateExtension}</span></div>
      <button className='extend-button' onClick={() => setExtend(true)}>Extend</button>
      {
        extend ? (<div> <div className='final-plan'>So, your plan will be extended for 1 year starting from today</div>
        <form className='payment-form' onSubmit={paymentHandler}>
        <button className='button-plan plan' onClick={() => setExtend(false)}>Extend & Pay</button>
        <h3> Credit Card Payment: </h3>
        <CardElement />
        </form> </div>) : null
      }
      </div>
      <div>You can upgrade your abo to another abo plan</div>
      <div className='upgrade'>
      <button className='upgrade-button' onClick={() => setUpgtade({done: false, planorder: 0, plan: filteredplans[0]})}>{filteredplans[0]}</button>
      <button className='upgrade-button' onClick={() => setUpgtade({done: false, planorder: 1, plan: filteredplans[1]})}>{filteredplans[1]}</button>
      {
        (upgrade.plan && !upgrade.done) ? (<div>
        <div className='final-plan'>So, you will upgrade your plan to {filteredplans[upgrade.planorder]}</div>
        <form className='payment-form' onSubmit={paymentHandler}>
        <button type='button' className='button-plan' onClick={() => handleUpgrade(user.email)}>Upgrade</button>
        <h3> Credit Card Payment: </h3>
        <CardElement />
        </form> </div>) : null
      }
      </div>
      <div className='cancel'>
      <div>You can cancel your abo</div>
      <button className='cancel-button' onClick={() => handleCancellation(user.email)}>Cancel</button></div>
               </div>
)
  }
  return (
  <div className='payment-data'>
  <div className='final-plan'>So, the choosen plan is {type}</div>
   <form className='payment-form' onSubmit={paymentHandler}>
   <button className='button-plan' onClick={() => handlePayment({ email, type})}>Subscribe & Pay {price} €</button>
   <h3> Credit Card Payment: </h3>
   <CardElement />
   </form>
   </div>
  )}

export default Payment