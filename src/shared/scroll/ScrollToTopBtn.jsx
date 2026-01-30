import React from 'react';
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";
import { useScroll } from './useScroll'; 
import styles from './ScrollToTopBtn.module.scss';

export const ScrollToTopBtn = () => {
    const { isVisible, scrollToTop } = useScroll();

    return (
        <div className={styles.scrollToTop}>
            {isVisible && (
                <button 
                    onClick={scrollToTop} 
                    aria-label="Scroll to top"
                    className={styles.scrollTopBtn}
                >
                    <TbSquareRoundedArrowUpFilled className={styles.topBtnIcon} />
                </button>
            )}
        </div>
    );
}