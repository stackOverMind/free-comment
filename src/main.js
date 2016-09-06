import Vue from 'vue'
import FreeComment from './components/FreeComment'
import css from 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment'
/* eslint-disable no-new */

var WildVue = require('wildvue')
var Wilddog = require('wilddog')
// 在模块化环境中需要使用 user 安装
Vue.use(WildVue)

window.freeComment = function(el,id){
  new Vue({
    el: el,
    data:{
      id:id,
    },
    template:'<free-comment :id="id"></free-comment>',
    replace: false,
    components: { FreeComment }
  })
}

Vue.filter('time', function (value) {
  return moment(value).fromNow()
})