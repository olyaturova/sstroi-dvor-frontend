import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.scss';
import { useAuth } from '../../features/auth/model/AuthContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(username, password);
            if (success) {
                navigate('/admin/dashboard');
            } else {
                setError('Ошибка входа: Проверьте логин/пароль');
            }
        } catch (err) {
            setError('Произошла ошибка при входе. Попробуйте снова.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Вход в Админ-Панель</h2>
            
            {error && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <input 
                    type="text" 
                    placeholder="Логин" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className={styles.input}
                    disabled={loading}
                />
                
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className={styles.input}
                    disabled={loading}
                />
                
                <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? (
                        <div className={styles.loadingOverlay}>
                            <div className={styles.loadingSpinner} />
                        </div>
                    ) : 'Войти'}
                </button>
            </form>

            <div className={styles.infoText}>
                <p>Для ВКР используются</p>
                <p><strong>Логин:</strong> admin <strong>Пароль:</strong> admin</p>
            </div>
        </div>
    );
};

export default AdminLogin;