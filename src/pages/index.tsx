import { request } from '@umijs/max';
import { Button,Form,Input,message,Modal,Popconfirm,Select,Space,Table, } from 'antd';
import { useEffect, useState } from 'react';

// DTO из C#
interface Student {
    id: number;
    lastname: string;
    firstname: string;
    midname: string;
    email: string;
    groupName: string;
}

interface StudentAddDto {
    lastname: string;
    firstname: string;
    midname: string;
    email: string;
    password: string;
    groupId: string;
}

interface GroupOption {
    value: string; // ⚠ string, потому что C# string
    label: string;
}

export default function HomePage() {
    const [dataSource, setDataSource] = useState<Student[]>([]);
    const [groupOptions, setGroupOptions] = useState<GroupOption[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formEdit] = Form.useForm();

    // загрузка данных
    const loadStudents = () => {
        request('http://localhost:8000/api/Student/GetAll', { method: 'GET' })
            .then((result: Student[]) => {
                setDataSource(result);
            })
            .catch(() => message.error('Ошибка загрузки студентов'));
    };

    const loadGroups = () => {
        request('/api/Group/GetAll', { method: 'GET' }).then((result: any[]) => {
            const options = result.map((item) => ({
                value: String(item.id), // ⚠ string
                label: item.name,
            }));
            setGroupOptions(options);
        });
    };

    useEffect(() => {
        loadStudents();
        loadGroups();
    }, []);

    // поиск студентов
    const updateData = (values: any) => {
        const searchDto = {
            groupId: values.groupId || '-1', // -1 если не выбрано
            lastname: values.lastname || '',
            firstname: values.firstname || '',
            midname: values.midname || '',
            email: values.email || '',
        };

        request('http://localhost:8000/api/Student/FindUsers', {
            method: 'POST',
            data: searchDto,
        })
            .then((result: Student[]) => {
                setDataSource(result);
            })
            .catch(() => message.error('Ошибка поиска студентов'));
    };

    // удаление
    const onRemove = (studentId: number) => {
        request(`/api/Student/Delete?id=${studentId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setDataSource((prev) => prev.filter((item) => item.id !== studentId));
                message.success('Студент удалён');
            })
            .catch(() => message.error('Ошибка при удалении'));
    };

    // добавление нового
    const onStudentAdd = (values: any) => {
        const dataToSend: StudentAddDto = {
            lastname: values.lastname,
            firstname: values.firstname,
            midname: values.midname,
            email: values.email,
            password: values.password,
            groupId: String(values.groupId),
        };

        request('api/Student/Add', { method: 'PUT', data: dataToSend })
            .then(() => {
                setIsModalOpen(false);
                loadStudents();
                message.success('Новый студент добавлен');
            })
            .catch(() => message.error('Ошибка при добавлении'));
    };

    // редактирование
    const onStudentEdit = (values: any) => {
        const dataToSend = {
            id: values.id,
            lastname: values.lastname,
            firstname: values.firstname,
            midname: values.midname,
            email: values.email,
            password: values.password,
            groupId: String(values.groupId),
        };

        request('api/Student/Post', { method: 'POST', data: dataToSend })
            .then(() => {
                setIsModalOpen(false);
                loadStudents();
                message.success('Данные студента обновлены');
            })
            .catch(() => message.error('Ошибка при обновлении'));
    };

    // открыть модалку для редактирования
    const onEdit = (id: number) => {
        request(`/api/Student/Get?id=${id}`, { method: 'GET' }).then((result: Student) => {
            formEdit.setFieldsValue(result);
            setIsModalOpen(true);
        });
    };

    const columns = [
        { title: 'Id', dataIndex: 'id' },
        { title: 'Фамилия', dataIndex: 'lastname' },
        { title: 'Имя', dataIndex: 'firstname' },
        { title: 'Отчество', dataIndex: 'midname' },
        { title: 'E-mail', dataIndex: 'email' },
        { title: 'Группа', dataIndex: 'groupName' },
        {
            title: 'Действия',
            key: 'action',
            render: (_: any, record: { id: number; }) => (
                <Space>
                    <Popconfirm
                        title="Вы уверены?"
                        okText="Да"
                        cancelText="Нет"
                        onConfirm={() => onRemove(record.id)}
                    >
                        <a>Удалить</a>
                    </Popconfirm>
                    <Button type="link" onClick={() => onEdit(record.id)}>
                        Редактировать
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Form layout="inline" onFinish={updateData}>
                <Form.Item name="groupId" label="Группа">
                    <Select allowClear options={groupOptions} style={{ width: '200px' }} />
                </Form.Item>
                <Form.Item name="lastname" label="Фамилия">
                    <Input />
                </Form.Item>
                <Form.Item name="firstname" label="Имя">
                    <Input />
                </Form.Item>
                <Form.Item name="midname" label="Отчество">
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="E-mail">
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Найти
                </Button>
            </Form>

            <Button
                type="primary"
                onClick={() => {
                    formEdit.resetFields();
                    setIsModalOpen(true);
                }}
                style={{ margin: '16px 0' }}
            >
                Новый студент
            </Button>

            <Modal
                title="Создание / редактирование студента"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form
                    form={formEdit}
                    layout="horizontal"
                    labelCol={{ span: 6 }}
                    onFinish={(values) => {
                        if (values.id) {
                            onStudentEdit(values);
                        } else {
                            onStudentAdd(values);
                        }
                    }}
                >
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label="Фамилия" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="firstname" label="Имя" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="midname" label="Отчество">
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="E-mail" rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Пароль">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="groupId" label="Группа">
                        <Select allowClear options={groupOptions} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Table rowKey="id" dataSource={dataSource} columns={columns} />
        </div>
    );
}
