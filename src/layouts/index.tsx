import { Link, Outlet } from '@umijs/max';
import {  Layout, Menu, theme } from 'antd';
import  './index.less';
const { Header, Content, Footer } = Layout;
export default function () {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  
  const menuItems = [

    {
      key: 'Auth',
      label: <Link to="/Auth">Авторизация</Link>
    },
    
    //{
     // key: 'docks',
     // label: <Link to="/docs">Docs</Link>
    //},
     {
      key: 'home',
      label: <Link to="/">Студенты</Link>
    },
    {
      key: 'Group',
      label: <Link to="/Group">Группа</Link>
    },
     
  ]
   return (
  
 <Layout style={{minHeight: '100vh'}}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>

    
    
  );
}
