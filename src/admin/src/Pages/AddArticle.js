import React, {useEffect, useState} from 'react';
import marked from 'marked'
import '../Static/css/AddArticle.css'
import {Row, Col, Input, Select, Button, DatePicker, message} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { useNavigate, useLocation } from 'react-router-dom';
const {Option} = Select
const {TextArea} = Input

export default function AddArticle() {

  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState(1) //选择的文章类别
  const navigate = useNavigate()
  const location = useLocation()

  const type = ['','笔记', '生活']

  useEffect(()=>{
    getTypeInfo()
    if(location.state){
      setArticleId(location.state.params.id)
      getArticleById(location.state.params.id)
    }
    console.log(location);
  }, [])

  marked.setOptions({
    render:marked.Renderer(),
    gfm:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:false,
    smartLists:true,
    smartypants:false
  })

  const changeContent = (e)=>{
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e)=>{
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  const getTypeInfo = ()=>{
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials:true
    }).then(
      res => {
        if(!localStorage.getItem('openId')){
          navigate('/')
        }else{
          setTypeInfo(res.data.data)
        }
      }
    )
  }

  const selectTypeHandler = (value)=>{
    console.log(value);
    setSelectType(value)
  }

  const saveArticle = ()=>{
    if(!selectedType){
      message.error('必须选择文章类型')
      return false
    }else if(!articleTitle){
      message.error('文章标题不能为空')
      return false
    }else if(!articleContent){
      message.error('文章内容不能为空')
      return false  
    }else if(!introducemd){
      message.error('文章简介不能为空')
      return false  
    }else if(!showDate){
      message.error('发布日期不能为空')
      return false  
    }
    let dataProps = {}
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    dataProps.addTime = showDate

    if(articleId === 0){        //增加修改操作
      dataProps.view_count = 0
      console.log(dataProps);
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          console.log(2);
          setArticleId(res.data.insertId)
          if(res.data.isSuccess){
            message.success('文章添加成功!')
          }else{
            message.error('文章添加失败!')
          }
        }
      )
    }else{
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if(res.data.isSuccess){
            message.success('文章修改成功!')
          }else{
            message.error('文章修改失败!')
          }
        }
      )
    }
  }

  const getArticleById = (id)=>{
    axios({
      method: 'post',
      url: servicePath.getArticleById+id,
      withCredentials: true
    }).then(
      res => {
        let articleInfo = res.data.result[0]
        setArticleTitle(articleInfo.title)
        setArticleContent(articleInfo.content)
        let html = marked(articleInfo.content)
        setMarkdownContent(html)
        setIntroducemd(articleInfo.introduce)
        let tmpInt = marked(articleInfo.introduce)
        setIntroducehtml(tmpInt)
        setShowDate(articleInfo.addTime)
        setSelectType(articleInfo.typeId)
      }
    )
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={20}>
          <Row gutter={5}>
            <Col span={20}>
              <Input 
                value={articleTitle}
                placeholder='博客标题'
                size='large'
                value={articleTitle}
                onChange={e => {setArticleTitle(e.target.value)}}
              ></Input>
            </Col>
            <Col span={2}>
              <Select defaultValue={type[selectedType]} size='large' onChange={selectTypeHandler} style={{width: '95px'}}>
                {
                  typeInfo.map((item,index) => {
                    return (
                      <Option key={index} value = {item.Id}>{item.typeName}</Option>
                    )
                  })
                }
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={5}>
        <Col span={9}>
          <TextArea className='markdown-content' rows={30} 
            value={articleContent}
            placeholder='文章内容' 
            onChange={changeContent}  
          >

          </TextArea>
        </Col>
        <Col span={9}>
          <div className='show-html' dangerouslySetInnerHTML={{__html:markdownContent}}></div>
        </Col>
        <Col span={6}>
          <TextArea rows={4} placeholder='文章简介' 
            className='markdown-content'
            value={introducemd}
            onChange={changeIntroduce}  
          >
          </TextArea>
          <div className='introduce-html' dangerouslySetInnerHTML={{__html:introducehtml}}></div>
          <div className='date-select'>
            <DatePicker placeholder='发布日期' size='large' onChange={(date, dateString)=>{
              setShowDate(dateString)
            }}>
            </DatePicker>
          </div>
          <Button size='large' className='btn1'>暂存文章</Button>
          <Button type='primary' size='large' className='btn2' onClick={saveArticle}>发布文章</Button>
        </Col>
      </Row>
    </div>
  );
}
