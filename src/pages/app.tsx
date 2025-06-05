import { request } from '@umijs/max';
import { Button, Form, Input } from 'antd';

export async function getInitialState() {
    const token = localStorage.getItem('token');
    if (!token) return { isAuthenticated: false };

    try {
        const userInfo = await request('/api/User/Info', { method: 'GET' });
        return {
            isAuthenticated: true,
            email: userInfo.email,
        };
    } catch {
        localStorage.removeItem('token');
        return { isAuthenticated: false };
    }

    function onFinish(values: any): void {
      throw new Error('Function not implemented.');
    }

  }