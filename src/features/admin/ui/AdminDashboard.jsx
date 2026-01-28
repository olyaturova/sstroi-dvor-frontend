import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalForm from './ModalForm';
import styles from './AdminDashboard.module.scss';
//import { useAuth } from '@/features/auth/model/auth-context';
import { API_SHOP, initialItemState } from '../model/lib/constants';
import { Loader } from '@/shared/ui/loader';
import { useAuth } from '../../auth/model/AuthContext';

const AdminDashboard = () => {
    const { logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(initialItemState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_SHOP);
            setItems(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
            if (error.response?.status === 403 || error.response?.status === 401) {
                alert("Сессия истекла. Пожалуйста, войдите снова.");
                logout();
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    }, [logout, navigate]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingItem(initialItemState);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Удалить товар?")) {
            try {
                await axios.delete(`${API_SHOP}/${id}`);
                fetchItems();
            } catch (error) {
                if (error.response?.status === 403 || error.response?.status === 401) {
                    alert("Токен истек. Пожалуйста, войдите снова.");
                    logout();
                    navigate('/admin/login');
                } else {
                    alert("Ошибка удаления.");
                }
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setUploading(true);
        
        try {
            const formData = new FormData();

            if (editingItem.image instanceof File) {
                formData.append('image', editingItem.image);
            } else if (editingItem.image) {
                formData.append('image', editingItem.image);
            }

            Object.keys(editingItem).forEach(key => {
                if (key !== 'image' && editingItem[key] !== undefined && editingItem[key] !== null) {
                    formData.append(key, editingItem[key]);
                }
            });

            if (editingItem._id) {
                await axios.put(`${API_SHOP}/${editingItem._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                await axios.post(API_SHOP, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            
            setIsModalOpen(false);
            fetchItems();
        } catch (error) {
            if (error.response?.status === 403 || error.response?.status === 401) {
                alert("Токен истек. Пожалуйста, войдите снова.");
                logout();
                navigate('/admin/login');
            } else {
                alert("Ошибка сохранения. Проверьте данные.");
            }
        } finally {
            setUploading(false);
        }
    };

    const handleFieldChange = (name, value) => {
        const numFields = ['price'];
        const valueToSet = numFields.includes(name) ? 
            (value === "" ? 0 : parseFloat(value)) : 
            value;
        
        setEditingItem(prev => ({ ...prev, [name]: valueToSet }));
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    if (!isAdmin) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <div className="card shadow">
                            <div className="card-body py-5">
                                <h2 className="text-danger mb-3">Доступ запрещен</h2>
                                <p className="text-muted mb-4">У вас нет прав для доступа к этой странице.</p>
                                <button 
                                    onClick={() => navigate('/admin/login')}
                                    className="btn btn-primary"
                                >
                                    Войти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-dark">Управление товарами</h1>
                <button 
                    onClick={handleLogout} 
                    className="btn btn-danger"
                >
                    Выход
                </button>
            </div>

            <div className="mb-4">
                <button 
                    onClick={handleAdd} 
                    className="btn btn-success"
                >
                    <i className="bi bi-plus-circle me-2"></i>Добавить Товар
                </button>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" className="px-4 py-3">ID</th>
                                    <th scope="col" className="px-4 py-3">Название</th>
                                    <th scope="col" className="px-4 py-3">Цена</th>
                                    <th scope="col" className="px-4 py-3">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr 
                                        key={item._id} 
                                        className={item._id === editingItem._id ? 'table-active' : ''}
                                    >
                                        <td className="px-4 py-3">
                                            <code className={styles.idCell}>
                                                {item._id?.substring(0, 8)}...
                                            </code>
                                        </td>
                                        <td className="px-4 py-3">{item.name}</td>
                                        <td className="px-4 py-3 fw-bold">{item.price} руб.</td>
                                        <td className="px-4 py-3">
                                            <div className="btn-group btn-group-sm" role="group">
                                                <button 
                                                    onClick={() => handleEdit(item)}
                                                    className="btn btn-outline-primary me-2"
                                                >
                                                    <i className="bi bi-pencil me-1"></i>Редактировать
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(item._id)}
                                                    className="btn btn-outline-danger"
                                                >
                                                    <i className="bi bi-trash me-1"></i>Удалить
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {items.length === 0 && !loading && (
                <div className="text-center mt-5">
                    <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        Товары не найдены. Добавьте первый товар.
                    </div>
                </div>
            )}

            {isModalOpen && (
                <ModalForm 
                    item={editingItem}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    onFieldChange={handleFieldChange}
                    loading={uploading} 
                />
            )}
        </div>
    );
};

export default AdminDashboard;