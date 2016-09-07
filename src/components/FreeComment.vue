<template>
  <div class='container'>
    <div class='row'>
      {{c|json}}
      <div class="row clear">
        <div class="col-md-1"></div>
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">最新评论</div>
            <div class="panel-body">
              <ul class="media-list">
                <li class="media">
                  <div class="media-left">
                    <a href="#"> <img v-if='!currentUser||!!currentUser.photoUrl == false' alt="currentUser.uid" class="media-object"
                        src="../assets/default-head.jpg" data-holder-rendered="true" style="width: 64px; height: 64px;">

                      <img v-if='currentUser&&!!currentUser.photoUrl == true' alt="{{currentUser.photoUrl}}" class="media-object" style="width: 64px; height: 64px;">
                    </a>
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading" v-if="currentUser">{{currentUser.displayName||'匿名-'+ currentUser.uid}}</h4>
                    <textarea class="form-control" v-model="currentMessage" rows="2"></textarea>
                    <div class='margin-8' v-if="canPost">
                      <button type="button" class="btn btn-success float-right" @click="post">&nbsp&nbsp&nbsp提交&nbsp&nbsp&nbsp;</button>
                    </div>

                  </div>
                </li>
                <li class="media" v-for="item in commentsR">
                  <div class="media-left">
                    <a href="#"> <img v-if='item.headUrl==null' alt="item.uname||item.uid" class="media-object" src="../assets/default-head.jpg"
                        data-holder-rendered="true" style="width: 64px; height: 64px;">

                      <img v-if='item.headUrl!=null' alt="{{item.uname}}" class="media-object" style="width: 64px; height: 64px;">
                    </a>
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">{{item.uname || '匿名-'+item.uid}}</h4>
                    <span>{{item.time | time}}</span>
                    <p>{{item.text}}</p>
                  </div>
                </li>
                <a id="end" @click='loadMore()'>更多...</a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import wilddog from 'wilddog'
//野狗的配置信息
var config = {
  authDomain: "test123.wilddog.com",
  syncURL: "https://test123.wilddogio.com"
};
//初始化野狗
wilddog.initializeApp(config);
//获取一个ref
var ref = wilddog.sync().ref().child('free-comments');

export default {
  props:[
    "id"//接受上层通过props传入的id变量
  ],
  data () {
    return {
      ref:null,
      currentMessage: '',
      authMethod:null,
      currentUser:null,
      profile:{},
      loading:true

    }
  },
  created(){
    if(this.id){
      //auth 首先默认进行anonymouse 认证
      var self = this;
      wilddog.auth().onAuthStateChanged(function(user) {
        if (user) {
          //user longin success
          self.currentUser = user;

        } else {
          //TODO
        }
      })
      setTimeout(function(){
        if(wilddog.auth().currentUser == null){
            wilddog.auth().signInAnonymously().then(function(res){
	          //self.currentUser = res;
          }).catch(function (error) {
            //TODO
          })
        }
      },500)

      this.ref = ref.child(this.id);
      
      this.$bindAsArray('comments',this.ref.limitToLast(10));
      ref.limitToLast(10).once('value',function(snapshot){
        console.log('init');
        this.loading = false;
      });
    }
    this.$watch('comments',function(newValue,oldValue){
      if(!!this.newValue == false && this.loading){
        return oldValue;
      }
      
    })
   
  },
  computed:{
    commentsR:function(){
      if(this.comments == null){
        return [];
      }
      else{
        var res = [];
        for(var i = this.comments.length-1;i>=0;i--){
          res.push(this.comments[i]);
        }
        return res;
      }
    },
    showCount:function(){
      if(this.comments){
        return this.comments.length;
      }
      return 0;
    },
    canPost:function(){
      if(!!this.currentMessage&& !this.loading){
        return true;
      }
      return false;
    }
  },
  methods:{
    post(){
      var message = this.currentMessage;
      var uname = this.currentUser.displayName;
      var uid = this.currentUser.uid;
      var time = new Date().getTime();
      this.ref.push({
        text:message,
        uname:uname,
        time:time,
        uid:uid
      },(err)=>{
        if(err){
          //TODO 
        }
        else{
          this.currentMessage = '';
        }
      });
    },
    loadMore(){
      var limit = this.showCount+20;
      this.$unbind('comments');
      this.loading = true;
      this.$bindAsArray('comments',this.ref.limitToLast(limit));
      ref.limitToLast(limit).once('value',function(snapshot){
        window.location.href = "#end";
        this.loading = false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    max-width: 800px;
  }
  
  .head {
    width: 64px;
    height: 64px;
    margin-top: 20px;
  }
  
  .flex {
    display: flex;
  }
  
  .flex-col {
    flex-direction: column;
    height: 100%
  }
  
  .flex-center {
    justify-content: center;
  }
  
  .submit-wrapper {
    height: 100px;
  }
  
  .border {
    margin-right: 0;
    margin-left: 0;
    background-color: #fff;
    border-style: solid;
    border-color: #ddd;
    border-width: 1px;
    border-radius: 4px 4px 0 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  
  .clear {
    clear: both;
  }
  
  .light-backgound {
    background-color: #f5f5f5
  }
  
  .margin-8 {
    margin: 8px;
  }
  
  .padding-8 {
    padding: 8px;
  }
  
  .fill {
    width: 100%;
    height: 100%;
  }
  
  .float-right {
    float: right;
  }
</style>