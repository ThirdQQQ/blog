import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import homeStyles from '../styles/Home.module.css'
import ListStyle from '../styles/List.module.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import axios from 'axios'
import {Col, Row, List} from 'antd'
import {CalendarOutlined,FolderOpenOutlined,FireOutlined} from '@ant-design/icons'

export default function Index(list) {
  const [myList, setMyList] = useState(list.data)
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Blog</title>
      </Head>
      <Header></Header>
      <Row className={homeStyles["comm-main"]} type="flex" justify="center">
        <Col className={homeStyles["comm-left"]} xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<p>最新日志</p>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => {
              return (
                <List.Item>
                  <div className={ListStyle["list-title"]}>
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className={ListStyle["list-icon"]}>
                    <span>
                      <CalendarOutlined />{item.addTime}
                      <FolderOpenOutlined />{item.typeName}
                      <FireOutlined />{item.view_count}人
                    </span>
                  </div>
                  <div className={ListStyle["list-context"]}>{item.introduce}</div>
                </List.Item>
              )
            }}
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

Index.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios.get('http://localhost:7001/default/getArticleList').then(
      (res)=>{
        console.log('--->',res.data);
        resolve(res.data)
      }     
    )
  })
  return await promise
}
