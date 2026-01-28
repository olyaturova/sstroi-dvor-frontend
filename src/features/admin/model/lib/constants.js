import { API_ENDPOINTS } from '@/shared/api/constants';

export const API_SHOP = API_ENDPOINTS.SHOP;

export const getFieldLabel = (fieldName) => {
    const labels = {
        name: 'Название товара',
        price: 'Цена',
        image: 'Изображение',
        applying: 'Область применения',
        category: 'Категория',
        fullDescription: 'Полное описание',
        brand: 'Бренд',
        productType: 'Тип продукта',
        productWidth: 'Ширина',
        productHeight: 'Высота',
        productThickness: 'Толщина'
    };
    return labels[fieldName] || fieldName;
};

export const CATEGORIES = [
    "Стеновые и фасадные материалы", 
    "Кровля и водосточная система", 
    "Цемент и сыпучие материалы", 
    "Пиломатериалы и отделка деревом", 
    "Электрика", 
    "Канализация и водоотведение", 
    "Поликарбонат", 
    "Краски", 
    "Пена монтажная, жидкие гвозди", 
    "Сантехника", 
    "Кирпич", 
    "Погонажные изделия"
];

export const initialItemState = {
    name: '',
    price: '',
    image: null,
    applying: '',
    category: '',
    fullDescription: '',
    brand: '',
    productType: '',
    productWidth: '',
    productHeight: '',
    productThickness: ''
};

export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
        return imagePath;
    }
    return `${API_ENDPOINTS.BASE_URL}/uploads/${imagePath}`;
};