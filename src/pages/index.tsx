// import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './styles.module.css';


export default function Home() {
  return (
    <>
      <Navbar/>
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <h1 className={styles.contentTitle}>The Best App In The World</h1>
        </div>
      </div>
      <Footer/>
    </>
  )
}
