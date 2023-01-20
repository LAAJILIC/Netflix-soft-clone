import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import { login, logout, selectUser } from './features/user/userSlice';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((userAuth) => {
       if (userAuth) {//logged in 
        dispatch(login({
           uid:userAuth.uid,
           email: userAuth.email,
                      }));
        } else { 
          // logged out
        dispatch(logout());
        }});
      return unsubscribe; 
  }, [dispatch]);

  return (
    <div className="app">
    <Router>
      { !user ? (<LoginPage />) : 
      (<Routes>
       <Route exact path="/" element={<HomePage />}></Route>
       <Route path="/profile" element={<ProfilePage />}></Route>
       <Route path="/payment" element={<PaymentPage />}></Route>
       </Routes>
       )}
    </Router>
       </div>
  );
}

export default App;
