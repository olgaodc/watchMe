import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './styles.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

//@ts-ignore
const EditMoviePage = ({movieInfo, title, image, description, status}) => {
    const router = useRouter();
    const [movie, setMovie] = useState(movieInfo);
    const [movieTitle, setMovieTitle] = useState(title);
    const [movieImage, setMovieImage] = useState(image);
    const [movieDescription, setMovieDescription] = useState(description);
    const [isMovieWatched, setMovieWatched] = useState(status);

    // const fetchMovie = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/movie/${router.query.id}`, {
    //             headers: {
    //                 authorization: localStorage.getItem("token"),
    //             },
    //         });

    //         const { data } = response;
    //         setMovie(data.movies);
    //         setMovieTitle(data.movies.title);
    //         setMovieImage(data.movies.image);
    //         setMovieDescription(data.movies.contentText);
    //         setMovieWatched(data.movies.status);
    //         console.log(data.movies);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const changeMovieStatus = () => {
        setMovieWatched(!isMovieWatched);
    };

    const updateMovie = async () => {
        try {
            const response = await axios.put(`https://watchme-app.onrender.com/movie/${router.query.id}`,
                {
                    title: movieTitle,
                    image: movieImage,
                    contentText: movieDescription,
                    status: isMovieWatched,
                },
                {
                    headers: {
                        authorization: Cookies.get('token'),
                    },
                }
            );

            if (response.status === 200) {
                router.push(`/movie/${router.query.id}`);
            }

        } catch (err) {
            console.log(err);
        }
    };

    // useEffect(() => {
    //     router.query.id && fetchMovie();
    // }, [router.query.id])

    return (
        <>
            <Navbar />
            <div className={styles.movieWrapper}>
                <div className={styles.container}>
                    {movie && (
                        <div className={styles.movieForm}>
                            {/* @ts-ignore */}
                            <input
                                type='text'
                                value={movieTitle}
                                onChange={(event => setMovieTitle(event.target.value))}
                            />
                            <input
                                type='text'
                                value={movieImage}
                                onChange={(event => setMovieImage(event.target.value))}
                            />
                            <textarea
                                value={movieDescription}
                                onChange={(event => setMovieDescription(event.target.value))}
                            ></textarea>
                            <div>
                                <input
                                    name='watched'
                                    id='watched'
                                    type='checkbox'
                                    checked={isMovieWatched}
                                    onChange={changeMovieStatus}
                                />
                                <label htmlFor="watched">watched</label>
                            </div>

                            <button
                                className={styles.updateButton}
                                onClick={updateMovie}
                            >
                                Update
                            </button>
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </>
    )
}

export default EditMoviePage;

export async function getServerSideProps(ctx: any) {
    const cookieString = ctx.req.headers.cookie;
      const cookies = cookieString.split('; ');
  
      let token;
      cookies.forEach((cookie : any) => {
        const [key, value] = cookie.split('=');
        if (key === 'token') {
          token = value;
        }
      });
  
    try {
        const response = await axios.get(`https://watchme-app.onrender.com/movie/${ctx.query.id}`, {
            headers: {
                authorization: token,
            },
        });

        const { movies } = response.data;
        return {props: {movieInfo: movies, title: movies.title, image: movies.image, description: movies.contentText, status: movies.status}}
    } catch (err) {
      console.log(err);
    }
  }