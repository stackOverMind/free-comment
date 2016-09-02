import Vue from 'vue'
import FreeComment from './components/FreeComment'
import css from 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment'
/* eslint-disable no-new */


window.freeComment = function(el){
  new Vue({
    el: el,
    template:'<free-comment></free-comment>',
    replace: false,
    components: { FreeComment }
  })
}

Vue.filter('time', function (value) {
  return moment(value).fromNow()
})