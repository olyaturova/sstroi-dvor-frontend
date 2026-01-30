import React from "react";
import styles from './ScrollingAnnouncement.module.scss';

export const ScrollingAnnouncement = () => {
    return(
        <section className={styles.announcement}>
            <p className={styles.scrollingText}>
              Большой ассортимент. Стройте с нами легко и с удовольствием.
            </p>
        </section>
    );
};