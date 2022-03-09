import React, {useEffect, useState} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import { useNavigate } from 'react-router-dom'
import {Route, Routes, Link, Router} from 'react-router-dom'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../Static/css/Home.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  
  const onCollapse = (collapsed)=>{
    setCollapsed(collapsed)
  }

  const checkOpenId = () => {
    if(!localStorage.getItem('openId')){
      navigate('/')
    }
  }

  const handleClickArticle = e => {
    if(e.key == 'addArticle'){
      navigate('/index/add')
    }else{
      navigate('/index/list')
    }
  }

  useEffect(()=>{
    checkOpenId()
  },[])

  return (<div>
     <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to='/index/list'>工作台</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to='/index/addArticle'>添加文章</Link>
            </Menu.Item>
            <SubMenu key="sub1" onTitleClick={handleClickArticle} icon={<UserOutlined />} title="文章管理">
              <Menu.Item key="addArticle">
                <Link to='/index/addArticle'>添加文章</Link>
              </Menu.Item>
              <Menu.Item key="articleList">
                <Link to='/index/list'>文章列表</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              <Link to='/index/addArticle'>留言管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path='addArticle' element={<AddArticle></AddArticle>}></Route>
                <Route path='list' element={<ArticleList></ArticleList>}></Route>
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
  </div>)
}
