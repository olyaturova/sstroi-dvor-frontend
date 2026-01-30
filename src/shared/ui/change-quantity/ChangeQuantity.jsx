import { PiPlusLight } from "react-icons/pi";
import { PiMinusLight } from "react-icons/pi";
import styles from './ChangeQuantity.module.scss';

export const ChangeQuantity = ({quantity, setQuantity}) => {
    const addQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity)
    }

    const removeQuantity = () => {
        if (quantity <= 1) return;
        const newQuantity = quantity - 1;
        setQuantity(newQuantity)
    }

    return(
    <div className={styles.addedItems}>
        <button 
            className={styles.addDeleteBtn} 
            onClick={removeQuantity}
            disabled={quantity <= 1}
        >
            <PiMinusLight className="minus"/>
        </button>
        <span className={styles.addedQuantity}>{quantity}</span>
        <button className={styles.addDeleteBtn} onClick={addQuantity}>
            <PiPlusLight />
        </button>
    </div>
    )
}