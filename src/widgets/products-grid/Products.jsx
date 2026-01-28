import { React, useEffect, useRef, useState } from 'react';
import { Product } from "./Product";
import { useSelector } from "react-redux";
import { getSelectedCategory } from "@/features/category-filter";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from 'axios';
import { API_ENDPOINTS } from '@/shared/api/constants';
import styles from './Products.module.scss';

gsap.registerPlugin(ScrollTrigger);

export const Products = () => {
    const selectedCategory = useSelector(getSelectedCategory);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ref = useRef();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(API_ENDPOINTS.SHOP);
                setProducts(response.data);
            } catch (error) {
                setError('Не удалось загрузить товары. Проверьте подключение к серверу.');
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (el && products.length > 0) {
            gsap.fromTo(el, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.7, scrollTrigger: {
                    trigger: el,
                    start: "top bottom-=70",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }, [products]);

    // Функция для нормализации строк
    const normalizeString = (str) => {
        if (!str) return '';
        return String(str)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, ' ');
    };

    const filteredProducts = products.filter(product => {
        if (selectedCategory === 'Все категории') return true;
        
        if (!product.category) return false;
        
        const normalizedSelected = normalizeString(selectedCategory);
        const normalizedProduct = normalizeString(product.category);
        
        return normalizedSelected === normalizedProduct;
    });

    if (loading) {
        return (
            <div className={styles.productsContainer}>
                <div className={styles.loadingContainer} ref={ref}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Загрузка товаров...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.productsContainer}>
                <div className={styles.errorContainer} ref={ref}>
                    <h3 className={styles.errorHeading}>Ошибка загрузки</h3>
                    <p className={styles.errorMessage}>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className={styles.refreshButton}
                    >
                        Обновить страницу
                    </button>
                </div>
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className={styles.productsContainer}>
                <div className={styles.emptyContainer} ref={ref}>
                    <h3 className={styles.emptyHeading}>Товары не найдены</h3>
                    <p className={styles.emptyMessage}>
                        {selectedCategory !== 'Все категории' 
                            ? `В категории "${selectedCategory}" пока нет товаров`
                            : 'На данный момент товары отсутствуют'
                        }
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.productsContainer}>
            <div className={`${styles.productsGrid} ${styles.animatedElement}`} ref={ref}>
                {filteredProducts.map(product =>
                    <Product 
                        product={product} 
                        key={product._id || product.id}
                    />
                )}
            </div>
        </div>
    );
};