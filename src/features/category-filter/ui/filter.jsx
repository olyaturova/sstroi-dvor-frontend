import { useSelector, useDispatch } from "react-redux";
import { getSelectedCategory, filterCategory } from "@/features/category-filter";
import styles from './filter.module.scss';

export const Filter = ({ category }) => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector(getSelectedCategory);
    
    const handleCategoryClick = () => {
        dispatch(filterCategory(category));
    };
    
    const buttonClass = selectedCategory === category 
        ? `${styles.filterButton} ${styles.filterButtonSelected}` 
        : styles.filterButton;
    
    return (
        <div className={styles.filterContainer}>
            <button 
                onClick={handleCategoryClick}
                className={buttonClass}
                type="button" 
                aria-pressed={selectedCategory === category}
            >
                {category}
            </button>
        </div>
    );
};