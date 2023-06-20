import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Navbar = () => {
const router = useRouter();
const [isUserLoggedIn, setUserLoggedIn] = useState(false);
const [userId, setUserId] = useState('');



const checkUserLoggedIn = async () => {
    try {
        const response = await axios.get('https://watchme-app.onrender.com/auth', { headers: {
            authorization: Cookies.get("token"),
        }});        

        if (response.data.loggedIn === true) {
            setUserLoggedIn(true);
            setUserId(response.data.userId);
        } else {
            setUserLoggedIn(false);
        }
    } catch(err) {
        console.log(err);
    }
    
}

useEffect(() => {
    checkUserLoggedIn();
}, [isUserLoggedIn]);


const moviesClick = async () => {
    await checkUserLoggedIn();

    if (isUserLoggedIn) {
        router.push(`/movies/${userId}`);
    } else {
        router.push(`/logIn`);
    }
};


  return (
    <div className={styles.navbarWrapper}>
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link className={styles.logoLink} href='/'>
                    <span className={styles.logoText}>watch<span className={styles.logoTextMe}>Me</span></span>
                </Link>
                <ul className={styles.navbarList}>
                    <li className={styles.listItem}>
                        <Link className={styles.itemLink} href='/'>Home</Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link className={styles.itemLink} href='#' onClick={moviesClick}>Movies</Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link className={styles.itemLink} href='/signUp'>Sign Up</Link>
                    </li>
                    {/* <li className={styles.listItem}>
                        <a className={styles.itemLink} href='./logIn'>Log In</a>
                    </li> */}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar