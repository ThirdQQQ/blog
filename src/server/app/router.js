'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/defalut')(app)

  require('./router/admin')(app)
};
