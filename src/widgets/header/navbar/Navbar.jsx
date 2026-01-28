import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TbShoppingBagHeart } from "react-icons/tb";
import { Cart } from "@/widgets/cart/cart";
import logo from "@/shared/assets/logo.png";
import styles from './Navbar.module.scss';
import { TotalArticlesNavbar } from "../../cart/cart-total-indicator";
import { SideMenu } from "../side-menu/SideMenu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const cartRef = useRef(null);
  const cartButtonRef = useRef(null);
  
  const toggleMenu = (e) => {
    e?.stopPropagation();
    setIsMenuOpen(prevState => !prevState);
  };

  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCartOpen && 
        cartRef.current && 
        !cartRef.current.contains(event.target) && 
        cartButtonRef.current && 
        !cartButtonRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
      }
      
      // Для меню
      if (isMenuOpen && !event.target.closest(`.${styles.menuToggle}`)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.mainMenu}>
          <div className={styles.navbarLogo}>
            <Link to="/" className={styles.navLink}>
              <img src={logo} alt="logo" className={styles.companyLogo} />
            </Link>
          </div>
          
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/stocks" className={styles.navLink}>
                СТРОИТЕЛЬНЫЕ И ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/promos" className={styles.navLink}>
                ПРОМОАКЦИИ
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/shop" className={styles.navLink}>
                КАТАЛОГ СТРОЙМАТЕРИАЛОВ
              </Link>
            </li>
          </ul>
          
          <div className={styles.cartQuantity} ref={cartButtonRef}>
            <button 
              onClick={toggleCart} 
              className={styles.cartBtn}
              aria-label="Корзина покупок"
              aria-expanded={isCartOpen}
            > 
              <TbShoppingBagHeart className={styles.cartIcon} />
            </button>
            <TotalArticlesNavbar />
          </div>
          
          <div 
            className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`} 
            onClick={toggleMenu}
            role="button"
            aria-label="Меню"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu(e)}
            aria-expanded={isMenuOpen}
          >
            <div className={styles.hamburger}>
              <span className={styles.hamburgerTop}></span>
              <span className={styles.hamburgerMiddle}></span>
              <span className={styles.hamburgerBottom}></span>
            </div>
          </div>
        </nav>
      </header>
      
      {isCartOpen && (
        <div className={styles.cartOverlay} ref={cartRef}>
          <Cart active={isCartOpen} setActive={setIsCartOpen} />
        </div>
      )}
 
      <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};