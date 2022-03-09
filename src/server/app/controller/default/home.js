'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    this.ctx.body = 'api hi'
  }

  async getLifeList(){
    this.id = this.ctx.params.id
    let sql = 'SELECT article.id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              'article.article_content as article_content ,'+
              'article.view_count as view_count ,'+
              'type.typeName as typeName ,'+
              'type.id as typeId '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'where typeName = "生活" '+
              'ORDER BY article.id DESC'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }


  async getArticleById(){
    this.id = this.ctx.params.id
    let sql = 'SELECT article.id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              'article.article_content as article_content ,'+
              'article.view_count as view_count ,'+
              'type.typeName as typeName ,'+
              'type.id as typeId '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'article.id='+this.id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  async updateArticle(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.update('article', tempArticle)
    const updateSuccess = result.affectedRows === 1
    this.ctx.body = {
      isSuccess: updateSuccess
    }
  }

  async getArticleList(){
    let sql = 'SELECT article.id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              'article.addTime as addTime ,'+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'WHERE typeName = "笔记"'
              'ORDER BY article.id DESC'
    
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data:results}
  }
}

module.exports = HomeController;
