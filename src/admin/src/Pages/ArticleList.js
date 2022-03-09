import React, {useState, useEffect} from "react"
import { Modal, message, Button, Table, Space} from 'antd'
import axios from "axios"
import servicePath from "../config/apiUrl"
import { useNavigate, useParams } from 'react-router-dom';
const {confirm} = Modal
const { Column } = Table;

export default function ArticleList() {

  const [list, setList] = useState([])
  const navigate = useNavigate()
  const params = useParams()

  //获取文章
  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true
    }).then(
      res => {
        setList(res.data.data)
      }
    )
  }

  //删除文章
  const delArticle = (id)=>{
    confirm({
      title: '确定要删除这篇blog吗?',
      content: '如果点击ok,文章将永远被删除!',
      onOk(){
        axios({
          method: 'post',
          url: servicePath.delArticle + id,
          withCredentials: true
        }).then(
          res => {
            message.success('文章删除成功!')
            setList(list.filter( listId => id !== listId.id))
          }
        )
      }
    })
  }

  //修改文章
  const update = (record)=>{
    navigate('/index/addArticle', { state: {params: record} })
  }


  useEffect(()=>{
    getList()
  }, [])

  return (
  <div>
    <Table dataSource={list} rowKey = {record=>record.id}>
      <Column title="标题" dataIndex="title" key="title" />
      <Column title="类别" dataIndex="typeName" key="typeName" />
      <Column title="发布时间" dataIndex="addTime" key="addTime" />
      <Column title="浏览量" dataIndex="view_count" key="view_count" />
      <Column
        title="操作"
        key="action"
        render={(record) => (
          <Space size="middle">
            <Button type="primary" onClick={()=>{update(record)}}>修改</Button>
            <Button type="danger" onClick={()=>{delArticle(record.id)}}>删除</Button>
          </Space>
        )}
      />
  </Table>
    
  </div>
  )
}