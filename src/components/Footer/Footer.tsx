import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
        <div className={styles.container}>
            <div className={styles.footer}>
                <span className={styles.footerInfo}>©watchMe | 2023</span>
            </div>
        </div>
    </div>
  )
}

export default Footer