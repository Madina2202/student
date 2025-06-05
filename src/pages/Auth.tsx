import { useNavigate } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import { request } from '@umijs/max';
import { useState } from 'react';

//export default function Auth() {
    
    //const loginHandler = (data: any) => {
        //console.log(data);
        //request('/api/Auth/Login', { data, method: 'POST' })
            //.then((result: any) => {
                //if (result.status != 0) {
                    //message.error("Не удалось авторизоваться");
                    //localStorage.removeItem('token');
               // }
               // else
                //{
                    
                  //  message.success("Авторизация прошла успешно")
               // }
           // })
    //}


    export default function Auth() { 
    const [loading, setLoading] = useState(false);
    const loginHandler = (data: any) => {
        console.log(data); }
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


        return (
            <div>
                <Form
                    layout="inline"
                    onFinish={loginHandler}
                >
                    <Form.Item name="email" label="Логин" className="input-inline">
                        <Input />
                    </Form.Item>

                    <Form.Item name="password" label="Пароль" className="input-inline">
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Авторизоваться</Button>
                    </Form.Item>
                </Form>
            </div>
        );
}

