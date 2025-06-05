import { useNavigate } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import { request } from '@umijs/max';
import { useState } from 'react';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const response = await request('/api/Auth/Login', {
                method: 'POST',
                data: values,
            });
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                message.success('Успешная авторизация');
                navigate('/'); // редирект на главную
            } else {
                message.error('Неверный ответ от сервера');
            }
        } catch (error: any) {
            message.error('Ошибка авторизации');
        } finally {
            setLoading(false);
        }
    };

    
}