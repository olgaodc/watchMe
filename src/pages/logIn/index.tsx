import React, { useState } from 'react';
import styles from './styles.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
// import Cookie from 'cookie';

function LogInPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccess, setSuccess] = useState(false);

    const logIn = async () => {
        try {
            const response = await axios.post('http://localhost:8080/logIn', {
                email: email,
                password: password,
            });

            console.log(response);

            if (response.status === 200) {
                setSuccess(true);
                Cookies.set('token', response.data.jwt, { path: '/'});
                Cookies.set('userId', response.data.userId);

                setTimeout(() => {
                    const userId = response.data.userId
                    router.push(`/movies/${userId}`)
                }, 1000);
            }
        } catch (err) {
            console.log(err);
        }

    }

    const clearAllInputs = () => {
        setPassword('');
        setEmail('');
    }

    return (
        <>
            <Navbar/>
            <div className={styles.formWrapper}>
                <div className={styles.container}>
                    {/* <span className={styles.logoText}>watch<span className={styles.logoTextMe}>Me</span></span> */}
                    <h1 className={styles.formTitle}>Welcome back</h1>
                    <div className={styles.form}>
                        <input
                            value={email}
                            placeholder='Email'
                            onChange={(event) => { setEmail(event.target.value) }}
                        />

                        <input
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={(event) => { setPassword(event.target.value) }}
                        />

                        <button
                            className={styles.logInButton}
                            onClick={() => { logIn(); clearAllInputs() }}
                        >
                            Log In
                        </button>
                        <div className={styles.formTextWrapper}>
                            <span className={styles.formText}>Don't have an account yet?</span>
                            <a className={styles.formTextLink} href='./signUp'>Sign Up</a>
                        </div>
                        {isSuccess && <div className={styles.message}>Successfully logged in</div>}
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default LogInPage