import React, { useRef } from 'react'
import { auth } from '../../firebase';

import './SignInComponent.css';


function SignInComponent() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const signUp = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);
        }).catch((error) => {
            alert(error.message);
        });
    };
    const signIn = (e) => {
        e.preventDefault();  
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);
        }).catch((error) => {
            alert(error.message);
        });     
    }

  return (
    <div className='signin'>
      <form>
       <h1>Sign In</h1>
       <input ref={emailRef} type='email' placeholder='Type your username' />
       <input ref ={passwordRef} type='password' placeholder='Type your password' />
       <button type='submit' onClick={signIn}>Sign In</button>

       <h4> 
         <span className='signup'>Not yet a member? </span>
       <span className='signup-link' onClick={signUp}>Sign Up Now.</span>
       </h4>
       </form>
    </div>
  )
}

export default SignInComponent