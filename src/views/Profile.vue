<style scoped lang="scss">
  .profile-cont{
    .page-title{
      margin: 40px 0 20px 10px;
    }
    .page-body {
      box-shadow: 0px 4px 16px rgba(185, 185, 185, 0.25);
      padding: 30px 30px;
      min-height: 350px;
      .code-cont{
        text-align: justify;
        line-height: 1.45;
        background-color: #ffffff;
        padding: 0 16px;
        .copy-icon{
          top: 12px;
          right: 12px;
        }
        pre{
          code{
            color: #24292e;
            font-family: monospace,monospace!important;
            white-space: pre-line;
          }
        }
      }
    }
  }
</style>

<template>
	<div class="profile-cont">
    <div class="page-body bg-neutral-white border-radius-6">
      <iframe :src="loginlink" @load="load" scrolling="no" height="1300px" width="100%" v-show="showframe"></iframe>
    </div>

	</div>
</template>

<script>
  import Vue from "vue";
  import axios from "axios";
 
  export default {    
    name: "login",
    mounted() {
      
    },  
    watch:{
      loginlink: function(val){
        alert("Changed!");
      }
    },
    data() {
    	return {
          loginlink: "https://competitions.codalab.org/my/settings/",
          showframe: true,
          loggedin: false
    	};
    },
    methods: {
       async load(){
          // this.ajaxRequest("https://competition.aluebenchmark.com/api/competition/13/mystatus", "get");
          await  axios.get('http://192.168.1.15:5000/login')
          .then(response => {
            let ret = response.data;
            const containsKey = (obj, key ) => Object.keys(obj).includes(key);
            let hasStatus = containsKey(ret, 'status');
            this.loggedin = true
            console.log("1 "+this.loggedin);

            if (hasStatus){
            }
            else{
              this.$parent.$parent.$refs.header.loggedin = false
              this.$router.push({ name: 'home' });
            }
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error);
          }})       
    },
    }
  };
</script>
