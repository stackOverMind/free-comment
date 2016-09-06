<template>
  {{currentUser |json}}
  <div class='container'>
    <div class='row'>
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
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTZlNDkyMDRkZiB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NmU0OTIwNGRmIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy44NzUiIHk9IjM2LjUiPjY0eDY0PC90ZXh0PjwvZz48L2c+PC9zdmc+"
                        data-holder-rendered="true" style="width: 64px; height: 64px;">

                      <img v-if='currentUser&&!!currentUser.photoUrl == true' alt="{{currentUser.photoUrl}}" class="media-object" style="width: 64px; height: 64px;">
                    </a>
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading" v-if="currentUser">{{currentUser.displayName||'匿名-'+ currentUser.uid}}</h4>
                    <textarea class="form-control" v-model="currentMessage" rows="2"></textarea>
                    <div class='margin-8'>
                      <button type="button" class="btn btn-success float-right" @click="post">&nbsp&nbsp&nbsp提交&nbsp&nbsp&nbsp;</button>
                    </div>
                  </div>
                </li>
                <li class="media" v-for="item in comments">
                  <div class="media-left">
                    <a href="#"> <img v-if='item.headUrl==null' alt="item.uname||item.uid" class="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTZlNDkyMDRkZiB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NmU0OTIwNGRmIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy44NzUiIHk9IjM2LjUiPjY0eDY0PC90ZXh0PjwvZz48L2c+PC9zdmc+"
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
      this.$bindAsArray('comments',this.ref);
    }
  },
  computed:{
    commentsR(){
      if(this.comments == null){
        return [];
      }
      else{
        return this.comments.reverse();
      }
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