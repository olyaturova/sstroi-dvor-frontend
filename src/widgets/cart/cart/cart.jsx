import { 
    clearCart, 
    selectCartItems,  
    selectTotalPrice  
} from "@/entities/cart"; 
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { VscClose } from "react-icons/vsc";
import CartItem from "./CartItem";
import styles from './Cart.module.scss';

export const Cart = ({ active, setActive }) => {
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useDispatch();

    const toggleCart = () => {
        setActive(!active);
    };

    const handleClearCart = (e) => {
        e.stopPropagation();
        dispatch(clearCart());
    };

    const handleCartClick = (e) => {
        e.stopPropagation();
    };

    return(
        <div 
            className={`${styles.cart} ${active ? styles.openCart : ''}`}
            onClick={handleCartClick}
        >
            <div className={styles.startColumn}>
                <div className={`${styles.cartTopLine} ${styles.flexRelative}`}>
                    <p className={styles.cartTop}>Корзина покупок</p>
                    <VscClose 
                        className={styles.closeCartIcon} 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleCart();
                        }} 
                        aria-label="Закрыть корзину"
                    />
                </div>
                
                {cartItems.length === 0 ? (
                    <div className={styles.startColumn}>
                        <p className={styles.emptyCart}>Ваша корзина пуста</p>
                    </div>
                ) : (
                    <div>
                        <div className={styles.allCartItems}>
                            {cartItems.map(cartItem => 
                                <CartItem cartItem={cartItem} key={cartItem.id} />
                            )}
                        </div>
                        <div className={`${styles.cartTopLine} ${styles.startColumn}`}>
                            <p className={styles.totalPrice}>Сумма: {totalPrice} руб.</p>
                            <button 
                                onClick={handleClearCart} 
                                className={styles.clearCart}
                                aria-label="Очистить корзину"
                            >
                                Очистить корзину
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};