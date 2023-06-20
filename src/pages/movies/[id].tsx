import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import addIcon from '../../assets/add_new_plus_icon.png';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/spinner';
import styles from './styles.module.css';
import Cookies from 'js-cookie';

type UserMovieProps = {
  id: string,
  title: string,
  status: boolean,
};

type UserMoviesProps = Array<UserMovieProps> | null
//@ts-ignore
function UserMoviesPage({ movies }) {
  // const router = useRouter();
  const [userMovies, setUserMovies] = useState<UserMoviesProps>(movies);

  // setUserMovies(movies.userMovies);

  // const fetchUserMovies = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/movies/${router.query.id}`,
  //       { headers: {
  //           authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     console.log(response);
  //     setUserMovies(response.data.user.userMovies)

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   router.query.id && fetchUserMovies();
  // }, [router.query.id])

  return (
    <>
      <Navbar />
      <div className={styles.moviesWrapper}>
        <div className={styles.container}>
          <h1 className={styles.moviesTitle}>Movies</h1>
          <div className={styles.movies}>
            <Link
              className={styles.addNewMovie}
              href='/addMovie'
            >
              <img className={styles.addNewMovieIcon} src={addIcon.src} alt='add new movie icon' />

            </Link>
            {userMovies && userMovies.map((movie) => (
              <MovieCard
                id={movie.id}
                key={movie.id}
                title={movie.title}
                isWatched={movie.status}
              />
            ))}
          </div>
        </div>
      </div>
      {!userMovies?.length && <Spinner />}
      <Footer />
    </>
  )
}

export default UserMoviesPage;

export async function getServerSideProps(ctx: any) {
  try {
    const userId = ctx.query.id;
    const cookieString = ctx.req.headers.cookie;
    const cookies = cookieString.split('; ');

    let token;
    cookies.forEach((cookie : any) => {
      const [key, value] = cookie.split('=');
      if (key === 'token') {
        token = value;
      }
    });

    const response = await axios.get(`https://watchme-app.onrender.com/movies/${userId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    const { data } = response;
    return { props: { movies: data.user.userMovies } };
  } catch (err) {
    console.log(err);
    return { props: { movies: null } };
  }
}