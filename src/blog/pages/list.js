import Head from 'next/head'
import homeStyles from '../styles/Home.module.css'
import ListStyle from '../styles/List.module.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import {Col, Row, List, Breadcrumb} from 'antd'

export default function myList() {
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Blog</title>
      </Head>
      <Header></Header>
      <Row className={homeStyles["comm-main"]} type="flex" justify="center">
        <Col className={homeStyles["comm-left"]} xs={24} sm={24} md={16} lg={18} xl={14}>
        <Breadcrumb>
          <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>学习</Breadcrumb.Item>
        </Breadcrumb>
          <List
            header={<p>最新日志</p>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (<List.Item>
              <div className={ListStyle["list-title"]}>{item.title}</div>
              <div className={ListStyle["list-icon"]}>
              </div>
              <div className={ListStyle["list-context"]}>{item.context}</div>
            </List.Item>)}
          />
        </Col>
        <Col className={homeStyles["comm-right"]} xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}
