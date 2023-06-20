import React, { FC } from 'react';
import Link from 'next/link';
import styles from './MovieCard.module.css';

type MovieCardProps = {
    id: string,
    title: string,
    isWatched: boolean,
    // onClickMovie: () => void;
}

const MovieCard: FC<MovieCardProps> = ({
    id,
    title,
    isWatched,
    // onClickMovie,
}) => {
    return (
        <Link 
            href={`/movie/${id}`} 
            className={`${styles.movieCard} ${isWatched ? styles.watchedMovie : styles.unwatchedMovie}`}
            // onClick={onClickMovie}
        >
            <span className={styles.movieTitle}>{title}</span>
            {/* <div className={styles.statusWrapper}>
                <input type="checkbox" id='watched' name='watched'/>
                <label htmlFor="watched">Watched</label>
            </div> */}
        </Link>
    )
}

export default MovieCard