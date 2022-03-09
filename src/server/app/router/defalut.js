module.exports = app=>{
  const {router,controller} = app
  router.get('/default/index',controller.default.home.index)
  router.get('/default/getArticleList',controller.default.home.getArticleList)
  router.get('/default/getLifeList',controller.default.home.getLifeList)
  router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
}