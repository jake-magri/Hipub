import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';


const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState<boolean>(false);

  // Check login status once when component mounts
  useEffect(() => {
    const isLoggedIn = auth.loggedIn();
    setLoginCheck(!!isLoggedIn); // Update state based on login status
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <div className="button-container">
        {/* Conditionally render buttons based on login status */}
        {!loginCheck && (
          <>
          <img />
            <button className="button">
              <Link to='./'>Home</Link>
            </button>
            <button className="button">
              <Link to='./signup'>Sign Up</Link>
            </button>
          </>
        )}
        
        {/* Only show Log In button if not logged in */}
        {!loginCheck && (
          <button className="button">
            <Link to='/login'>Log In</Link>
          </button>
        )}

        {/* Show Logout button when logged in */}
        {loginCheck && (
          <button className="exit" onClick={() => { 
            auth.logout(); 
            setLoginCheck(false); // Update state on logout
          }}>
            Exit
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;