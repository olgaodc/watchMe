import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './styles.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const newMovie = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [contentText, setContentText] = useState('');
  const [isSuccess, setSuccess] = useState(false);

  const createMovie = async () => {
    const response = await axios.post('https://watchme-app.onrender.com/addMovie', {
      title: title,
      image: image,
      contentText: contentText,
    }, {
      headers: {
        authorization: Cookies.get('token'),
      }
    })
    console.log(response);

    if (response) {
      setSuccess(true);
    }

    setTimeout(() => {
      setSuccess(false);
    }, 1500);
  }

  const clearAllInputs = () => {
    setTitle('');
    setImage('');
    setContentText('');
  }


  return (
    <>
      <Navbar />
      <div className={styles.movieFormWrapper}>
        <div className={styles.container}>
          <div className={styles.movieForm}>
            <h1 className={styles.movieFormTitle}>Add new movie</h1>
            <input
              value={title}
              placeholder='Movie title'
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              value={image}
              placeholder='Movie image URL'
              onChange={(event) => setImage(event.target.value)}
            />
            <textarea
              value={contentText}
              placeholder='Movie description'
              onChange={(event) => setContentText(event.target.value)}
            >
            </textarea>

            <button
              className={styles.createButton}
              onClick={() => { createMovie(); clearAllInputs() }}
            >
              Add
            </button>
            {isSuccess && <div className={styles.message}>Movie was created successfully</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default newMovie