import Head from 'next/head'
import hightlight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import marked from 'marked'
import detailStyle from '../styles/Detail.module.css'
import 'markdown-navbar/dist/navbar.css'
import MarkNavbar from 'markdown-navbar'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import {Col, Row, Breadcrumb, Affix} from 'antd'
import {CalendarOutlined,FolderOpenOutlined,FireOutlined} from '@ant-design/icons'
import axios from 'axios'


export default function Detailed(props) {
  const renderer = new marked.Renderer()
  renderer.heading = function(text,level,raw){
    const anchor = tocify.add(text,level)
    return `<a id=${anchor} href='#${anchor} class='anchor-fix'><h${level}>${text}</h></a>\n`
  }
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,  //github风格
    pedantic: false, //容错
    sanitize: false, //html标签是否显示：显示
    tables: true, //github样式表格
    breaks: false,//是否支持github换行符
    smartLists: true, //自动渲染一定样式,
    hightlight:function(code){
      return hightlight.highlightAuto(code).value
    }
  })
  let html = marked(props.article_content)
  let newn = String(props.article_content)
  console.log(props.article_content);
  return (
    <div className={detailStyle.container}>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header></Header>
      <Row className={detailStyle.commMain} type="flex" justify="center">
        <Col className={detailStyle.commLeft} xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className={detailStyle.bread}>
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/list">学习</a></Breadcrumb.Item>
              <Breadcrumb.Item>xxxx</Breadcrumb.Item>
            </Breadcrumb>
            </div>
            <div className={detailStyle.title}>
              学习内容
            </div>
            <div className={detailStyle.center}>
              <span><CalendarOutlined />2022-1-19</span>
              <span><FolderOpenOutlined />个人日志</span>
              <span><FireOutlined />5人</span>
            </div>
            <div className={detailStyle.context} dangerouslySetInnerHTML={{__html:html}}>

            </div>
          </div>
        </Col>
        <Col className={detailStyle.commRight} xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Affix offsetTop={5}>
            <div className={detailStyle.navBar}>
              <div className={detailStyle.title}>文章目录</div>
                <MarkNavbar
                  source={newn}
                ></MarkNavbar>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}

Detailed.getInitialProps = async(content)=>{
  let id = content.query.id
  const promise = new Promise((resolve)=>{
    axios.get('http://localhost:7001/default/getArticleById/'+id).then(
      res=>{
        console.log(res);
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}