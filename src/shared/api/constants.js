export const BASE_URL = 'https://sstroi-dvor-backend.onrender.com';

export const API_ENDPOINTS = {
    SHOP: `${BASE_URL}/api/shop`,
    AUTH: `${BASE_URL}/api/auth`,
    UPLOADS: `${BASE_URL}/uploads`,
    
    getImageUrl: (filename) => {
        if (!filename) return '';
        if (filename.startsWith('http')) return filename;
        return `${BASE_URL}/uploads/${filename}`;
    },
    
    getShopItemUrl: (id) => `${BASE_URL}/api/shop/${id}`,
};

export const API_SHOP = API_ENDPOINTS.SHOP;