// import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './styles.module.css';
import comingSoon from '../assets/coming-soon.png'


export default function Home() {
  return (
    <>
      <Navbar/>
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={comingSoon.src} alt="coming soon" />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
