import React, { useState } from 'react'
import SignInComponent from '../../components/SignInComponent/SignInComponent';

import './LoginPage.css'

function LoginPage() {
    const [signIn, setSignIn] = useState(false);
  return (
    <div className='login-page'>
      <div className='loginPage-background'>
      <img className='loginPage-logo'
      src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt=""/>
       <button className='signIn-button' onClick={() => setSignIn(true)}>Sign in</button>
       <div className='loginPage-gradient' />
        </div>

        <div className='login-component'>
        { signIn ? (<SignInComponent />) :
          ( 
            <>
            <h1>Uncountable films, TV shows, documentaries and MORE</h1>
            <h2>Watch wherever you want. Cancel whenever you want</h2>
            <h3>Be a member or restart your membership</h3>
             <div className='signUp-form'>
                <form>
                   <input type='email' placeholder='Enter your email address' />
                   <button onClick={() => setSignIn(true)}>Start</button>
                </form>
             </div> </>
            )}
        </div>
    </div>
  )}
export default LoginPage;