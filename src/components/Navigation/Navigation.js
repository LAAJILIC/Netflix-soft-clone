import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';

import './Navigation.css';


function Navigation() {
    //netflix logo,avatar,
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const downAndUp = () => {
        if(window.scrollY > 100) {
            setShow(true);
        } else { setShow(false);}
    };

    useEffect(() => {
      window.addEventListener("scroll", downAndUp);
      return () => window.removeEventListener("scroll", downAndUp);
    }, []);
    
  return (
    <div className={`nav ${show && 'nav-color'}`}>
     <div className='nav-parts'>
     <img className='nav-logo'
     onClick={() => navigate('/')}
     src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt=""/>
     <img className='nav-avatar'
     onClick={() => navigate('/profile')}
     src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/avatar-512.png" alt=""/>
     </div>
    </div>
  )
}

export default Navigation