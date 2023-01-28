import React from 'react'
 import Navigation from '../../components/Navigation/Navigation';

 import './PaymentPage.css';

function PaymentPage() {
  return (
    <div className='payment-page'>
    <Navigation />
    <div className='payment-message'>
    <img className='netf-image'
    src="https://www.happyballoon.de/media/image/8b/b2/81/folienballon-_done_-emoji-46-cm_02-47485-S_1.jpg" alt=""/>
    <h2>Your Subscription to Netflix clone is canceled<br />
    You can renew your subscription anytime <br />
     Movies are fun with Netflix</h2>
    </div>
   
    </div>
  )
}

export default PaymentPage