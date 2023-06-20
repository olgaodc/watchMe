import React, { useState } from 'react';
import styles from './styles.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useRouter } from "next/router";

const SignUpPage = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSuccess, setSuccess] = useState(false);

    const createUser = async () => {
        const response = await axios.post('http://localhost:8080/user', {
            name: name,
            surname: surname,
            password: password,
            email: email,
        });

        // console.log(response);

        if (response) {
            setSuccess(true);
        }

        setTimeout(() => {
            router.push('/logIn')
        }, 1000);

    };

    const clearAllInputs = () => {
        setName('');
        setSurname('');
        setPassword('');
        setEmail('');
    }

    return (
        <>
            <Navbar />
            <div className={styles.formWrapper}>
                <div className={styles.container}>
                    <h1 className={styles.formTitle}>Welcome to watchMe</h1>
                    <div className={styles.form}>
                        <input
                            placeholder='Enter your name'
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />

                        <input
                            placeholder='Enter your last name'
                            onChange={(event) => setSurname(event.target.value)}
                            value={surname}
                        />

                        <input
                            placeholder='Enter your email'
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />

                        <input
                            placeholder='Enter your password'
                            type='password'
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                        />

                        <button
                            className={styles.signUpButton}
                            onClick={() => { createUser(); clearAllInputs() }}
                        >Sign Up</button>

                        <div className={styles.formTextWrapper}>
                            <span className={styles.formText}>Already have an account?</span>
                            <a className={styles.formTextLink} href='./logIn'>Log In</a>
                        </div>

                        {isSuccess && <div className={styles.message}>User was created successfully</div>}

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default SignUpPage