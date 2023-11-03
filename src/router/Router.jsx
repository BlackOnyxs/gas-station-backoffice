import { DownOutlined } from '@ant-design/icons';
import { Layout, Menu, Space, Dropdown, Image  } from 'antd';
import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AppRoutes } from '../app/routes/AppRoutes'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { accountOptions, siderOptions } from '../data/menus';
import { useAuthStore } from '../hooks';


const { Sider, Content, Header } = Layout;

export const Router = () => {
  
  const { checkAuthToken, status, user, startLogout  } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);
  

  if ( status === 'checking') {
    return (
      <h1>Cargando...</h1>
    )
  }

  const handleDropdownClick = (e) => {
    switch( e.key ) {
      case '1':
        console.log('profile')
      break;
      case '2': 
        startLogout();
      break;
      default: 
        console.log('No programado')
    }
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider 
        style={{
          backgroundColor: 'white',
          borderRight: '1px solid #f0f0f0'
        }}
        hidden={ !user.uid }>
        <div className="logo">
            <Image
              width={ 200 } 
              src="/src/assets/banner.png"
              preview={ false }
            />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={ siderOptions }
        />
      </Sider>
    <Layout 
      className="site-layout"
      style={{ backgroundColor: 'white'}}
    >
      {/* <Header 
         hidden={ !user.uid }
        className="site-layout-background" 
        style={{
            textAlign: 'end',
            backgroundColor: 'white',
        }}>
           <Dropdown overlay={ (
            <Menu 
              onClick={ handleDropdownClick }
              items={ accountOptions }
            />
           )}>
              <a onClick={ e=> e.preventDefault() }>
                <Space>
                  { user.name }
                  <DownOutlined/>
                </Space>
              </a>
           </Dropdown>
      </Header> */}
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Routes>
            {
               ( status === 'not-authenticated')  
               ? (
                  <>
                     <Route path="/auth/*" element={ <AuthRoutes /> } />
                      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                  </>
               )
               : (
                  <>
                    <Route path="*" element={ <AppRoutes /> } /> 
                    <Route path="/*" element={ <Navigate to="/" /> } /> 
                  </>
               )
            }
            {/*  <Route path="/auth/*" element={ <AuthRoutes /> } />
            <Route path="*" element={ <AppRoutes /> } />  */}
        </Routes>
      </Content>
    </Layout>
  </Layout>
    
  )
}
