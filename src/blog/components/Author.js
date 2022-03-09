import {Avatar, Divider} from 'antd'
import React,{useState} from 'react'
import {GithubOutlined,QqOutlined} from '@ant-design/icons'
import avatarStyle from '../styles/Avatar.module.css'

export default function Author() {

  return (
    <div>
      <div className={avatarStyle.avatar}>
        <Avatar size={100} src="myAvatar.jpg"/>
      </div>
      <div className={avatarStyle.instructionBox}>
        <div className={avatarStyle.instruction}>刚开始学前端不久的菜鸟</div>
        <Divider>其他账号</Divider>
        <Avatar  size={32} className={avatarStyle.account} icon={<GithubOutlined />}></Avatar>
        <Avatar  size={32} className={avatarStyle.account} icon={<QqOutlined />}></Avatar>
      </div>
    </div>
  )
}
