import { useDispatch } from "react-redux";
import { 
    removeItemFromCart, 
    updateCartItemQuantity
} from "@/entities/cart/model/cart-slice";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiPlusLight, PiMinusLight } from "react-icons/pi";
import { useState } from "react";
import styles from './Cart.module.scss';

export const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const [imageError, setImageError] = useState(false);
    
    const imageUrl = imageError || !cartItem.productImg 
        ? '/src/shared/assets/shop/default-product.svg'
        : cartItem.productImg;
    
    const isDefaultImage = imageUrl.includes('default-product');

    const addQuantity = (e) => {
        e.stopPropagation();
        dispatch(updateCartItemQuantity({ 
            productId: cartItem.productId, 
            quantity: cartItem.quantity + 1
        }));
    };
    
    const removeQuantity = (e) => {
        e.stopPropagation();
        if (cartItem.quantity > 1) {
            dispatch(updateCartItemQuantity({ 
                productId: cartItem.productId, 
                quantity: cartItem.quantity - 1
            }));
        }
    };

    const handleRemoveItem = (e) => {
        e.stopPropagation();
        dispatch(removeItemFromCart({ cartItemId: cartItem.id }));
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleItemClick = (e) => {
        e.stopPropagation();
    };

    return(
        <div className={styles.flex} onClick={handleItemClick}>
            <div className={styles.itemPhotoInCart}>
                <img 
                    className={styles.itemImage} 
                    src={imageUrl} 
                    alt={cartItem.productName}
                    onError={handleImageError}
                    style={{
                        objectFit: isDefaultImage ? 'contain' : 'cover',
                        padding: isDefaultImage ? '10px' : '0',
                        backgroundColor: isDefaultImage ? '#f5f5f5' : 'transparent'
                    }}
                />
            </div>
            <div className={`${styles.itemInCart} ${styles.columnLeft}`}>
                <div className={styles.flexRelative}>
                    <p className={styles.itemNameInCart}>{ cartItem.productName }</p>
                    <span 
                        onClick={handleRemoveItem}
                        className={styles.trashIcon}
                    >
                        <FaRegTrashAlt className={styles.trashBin}/>
                    </span>
                </div>
                <div className={styles.quantityControls}>
                    <button 
                        className={`${styles.addDeleteBtn} ${cartItem.quantity <= 1 ? styles.disabled : ''}`} 
                        onClick={removeQuantity}
                        disabled={cartItem.quantity <= 1}
                    >
                        <PiMinusLight />
                    </button>
                    <span className={styles.addedQuantity}>{cartItem.quantity}</span>
                    <button className={styles.addDeleteBtn} onClick={addQuantity}>
                        <PiPlusLight />
                    </button>
                </div>
                <p className={styles.itemsNumber}>{ cartItem.quantity } шт.</p>
                <p className={styles.itemTotalPrice}>
                    {+(cartItem.productPrice * cartItem.quantity).toFixed(2)} руб.
                </p>
            </div>
        </div>
    );
};

export default CartItem;