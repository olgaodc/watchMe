import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './styles.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import editIcon from '../../assets/edit_icon.png'
import Link from 'next/link';
import Cookies from 'js-cookie';

// type userMovieProps = {
//   title: string,
// }

// type userMovieData = Array<userMovieProps> | null
//@ts-ignore
const MoviePage = ({movies, status}) => {
  const router = useRouter();
  const [movie, setMovie] = useState(movies);
  const [isMovieWatched, setMovieWatched] = useState(status);

  // setMovieWatched(status);

  // const fetchMovie = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/movie/${router.query.id}`, {
  //       headers: {
  //         authorization: localStorage.getItem("token"),
  //       },
  //     });

  //     const { data } = response;
  //     setMovie(data.movies);
  //     setMovieWatched(data.movies.status);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const deleteMovie = async () => {
    try {
      const response = await axios.delete(`https://watchme-app.onrender.com/movie/${router.query.id}`, {
        headers: {
          authorization: Cookies.get('token'),
        },
      });
      if (response.status === 200) {
        setMovie([]);
        const userId = Cookies.get('userId');
        router.push(`/movies/${userId}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   router.query.id && fetchMovie();
  // }, [router.query.id])

  return (
    <>
      <Navbar />
      <div className={styles.movieWrapper}>
        <div className={styles.container}>
          {movie && (
            <div className={styles.movieCardWrapper}>
              <div className={styles.movieCard}>
                <Link
                  className={styles.editButton}
                  href={`/editMovie/${router.query.id}`}
                >
                  <Image
                    className={styles.editIcon}
                    src={editIcon}
                    alt='edit button'
                  />
                </Link>
                {/* @ts-ignore */}
                <h1 className={styles.movieTitle}>{movie.title}</h1>
                {/* @ts-ignore */}
                {movie.image && <img
                  className={styles.movieImage}
                  // @ts-ignore 
                  src={movie.image}
                  alt='movie image'
                />}

                {/* @ts-ignore  */}
                {movie.contentText && <p className={styles.movieDescription}>{movie.contentText}</p>}

                {isMovieWatched ? <span>Watched</span> : <span>Not watched</span>}
                {/* <input
                type='checkbox'
                name='watched'
                id='watched'
                checked={isMovieWatched}
                disabled 
              /> */}
                {/* <label htmlFor="">watched</label> */}
                <button 
                  className={styles.deleteButton}
                  onClick={deleteMovie}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
      <Footer />
    </>
  )
}

export default MoviePage;

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

      const { data } = response;
      return {props: {movies: data.movies, status: data.movies.status}}
  } catch (err) {
    console.log(err);
  }
}