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
    <h2>Thank you for your order <br />
    The payment is succesfully done <br />
     Enjoy your netflix TIME</h2>
    </div>
   
    </div>
  )
}

export default PaymentPage