import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';
import HomeImg from '../assets/Home.gif';


const Home = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showSecondText, setShowSecondText] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    };

    // Once the fade-in animation is complete, trigger the second paragraph to show
    const handleAnimationEnd = () => {
        setShowSecondText(true);
    };

    if (error) {
        return <ErrorPage />;
    }

    useEffect(() => {
        // Trigger the fade-in animation after the component mounts
        setIsVisible(true);
    }, []);

    return (
        <>
            {!loginCheck ? (
                <div className="login-notice">
                  <img className="eye" src={HomeImg} />
                    <h1
                        className={isVisible ? 'fade-in' : ''}
                        onAnimationEnd={handleAnimationEnd} // Listen for when the animation ends
                    >
                        Log in to speak with Finn
                    </h1>
                    
                    {showSecondText && (
                        <h3 className='fade-in'>He's been waiting</h3>
                    )}
                </div>
            ) : (
                <UserList users={users} />
            )}
        </>
    );
};

export default Home;