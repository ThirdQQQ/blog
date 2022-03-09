module.exports = app => {
  const {router,controller} = app
  router.get('/admin/index', controller.admin.main.index)
  router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo)
  router.get('/admin/getArticleList', controller.admin.main.getArticleList)
  router.post('/admin/getArticleById/:id', controller.admin.main.getArticleById)
  router.post('/admin/checkLogin', controller.admin.main.checkLogin)
  router.post('/admin/addArticle', controller.admin.main.addArticle)
  router.post('/admin/updateArticle', controller.admin.main.updateArticle)
  router.post('/admin/delArticle/:id', controller.admin.main.delArticle)
}