import React from 'react'
import {Row, Col, Menu} from 'antd'
import {HomeOutlined, YoutubeOutlined, SmileOutlined} from '@ant-design/icons'
import headStyles from '../styles/Header.module.css'
import Link from 'next/link'

export default function MyHeader(props) {
  return (
    <div className={headStyles.header}>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className={headStyles.log}>ThirdQ</span>
          <span className={headStyles.txt}>前端一菜鸟</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu className='menu' mode="horizontal">           
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link href="/">
                学习
              </Link>
            </Menu.Item>
            <Menu.Item key="life" icon={<SmileOutlined />}>
              <Link href="/life">
                生活
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>    
    </div>
  )
}
