import { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Popconfirm, Space, Table } from 'antd';
import { request } from '@umijs/max';

const Group = () => {
  return (
    <div>
      <h1>Group Page</h1>
      {/* Ваше содержимое для Group страницы */}
    </div>
  );
};

//export default Group;

interface Group {
  id: number;
  name: string;
}

export default function GroupPage() {
  const [dataSource, setDataSource] = useState<Group[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Загрузка всех групп
  const loadGroups = () => {
    request('/api/Group/GetAll', { method: 'GET' })
      .then((result: Group[]) => setDataSource(result))
      .catch(() => message.error('Ошибка загрузки групп'));
  };

  useEffect(() => {
    loadGroups();
  }, []);

  // Добавление или редактирование
  const onFinish = (values: any) => {
    if (values.id) {
      // Редактирование (POST)
      request('/api/Group/Post', {
        method: 'POST',
        data: values,
      })
        .then(() => {
          message.success('Группа обновлена');
          setIsModalOpen(false);
          loadGroups();
        })
        .catch(() => message.error('Ошибка при обновлении группы'));
    } else {
      // Добавление (PUT)
      request('/api/Group/Add', {
        method: 'PUT',
        data: { name: values.name },
      })
        .then(() => {
          message.success('Группа добавлена');
          setIsModalOpen(false);
          loadGroups();
        })
        .catch(() => message.error('Ошибка при добавлении группы'));
    }
  };

  // Удаление
  const onRemove = (id: number) => {
    request(`/api/Group/Delete?id=${id}`, { method: 'DELETE' })
      .then(() => {
        message.success('Группа удалена');
        loadGroups();
      })
      .catch(() => message.error('Ошибка при удалении группы'));
  };

  // Открыть модалку редактирования
  const onEdit = (record: Group) => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // Открыть модалку добавления
  const onAdd = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const columns = [
    { title: 'Id', dataIndex: 'id' },
    { title: 'Название', dataIndex: 'name' },
    {
      title: 'Действия',
      render: (_: any, record: Group) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>Редактировать</Button>
          <Popconfirm title="Удалить группу?" okText="Да" cancelText="Нет" onConfirm={() => onRemove(record.id)}>
            <Button type="link" danger>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={onAdd}>
        Добавить группу
      </Button>
      <Table rowKey="id" columns={columns} dataSource={dataSource} />

      <Modal
        title="Группа"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Название"
            name="name"
            rules={[{ required: true, message: 'Введите название группы' }]}
          >
            <Input placeholder="Введите название группы" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
