<style scoped lang="scss">
#app {
  .black-overlay {
    background-color: #0000005e;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }
}
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

<template>
  <div id="app">
    <meta name="viewport" content="width=1024" />
    <alue-header ref="header"></alue-header>
    <alue-footer ref="footer"></alue-footer>
    <!-- <div class="black-overlay d-none" v-on:click="expanded(false)"></div> -->

    <!-- <el-dialog class="contact-us-dialog" v-bind:visible.sync="dialogVisible" v-bind:class="isMobile()" width="500px">
      <div class="dialog-body">
        <p class="title ft-size-20 ft-w-bold ft-blue-1 text-center">Contact Us</p>
        <p class="sub-title ft-size-14 ft-blue-1 text-center">We would like to hear from you</p>
        <div class="form-body">
          <div class="tuple">
            <p class="ft-size-14 ft-blue-1">Name</p>
            <el-input v-model="name"></el-input>
          </div>
          <div class="tuple">
            <p class="ft-size-14 ft-blue-1">Email <span class="ft-red-2">*</span></p>
            <el-input v-model="email"></el-input>
          </div>
          <div class="tuple">
            <p class="ft-size-14 ft-blue-1">Subject</p>
            <el-input v-model="subject"></el-input>
          </div>
          <div class="tuple">
            <p class="ft-size-14 ft-blue-1">Message <span class="ft-red-2">*</span></p>
            <el-input v-model="message" type="textarea" resize="none" rows="4"></el-input>
          </div>
          <el-button class="primary block" v-on:click="sendEmail">SEND</el-button>
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Slide from "./components/Slide.vue";

import Vue from "vue";

Vue.component("alue-header", Header);
Vue.component("alue-footer", Footer);
Vue.component("alue-slide", Slide);

export default {
  name: "app",
  components: {
    Header,
    Footer,
    Slide
  },
  watch: {
    $route(to, from) {
      this.$refs.header.selectTab(window.location.pathname);
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    this.$refs.header.selectTab(window.location.pathname);
  },
  data() {
    return {
      loggedin: false,
      dialogVisible: false,
      name: "",
      email: "",
      subject: "",
      message: ""
    };
  },
  methods: {
    handleCredentialResponse(response) {
      console.log(response);

      const token = response?.credential || "";
      this.$store.commit("setToken", token);

      if (token) {
        // this.onSuccess(response);
        this.$router.push({ path: "/home" });
      }
    },
    renderLoggedinState: function() {
      this.loggedin = true;
    },
    userDropdownTriggered: function(command) {
      switch (command) {
        case "logout":
          this.expanded = false;
          this.loggedin = false;
          localStorage.clear();
          this.$notify({
            title: "Success",
            message: "Logged out Successfully",
            type: "success"
          });
          break;
      }
    },
    expanded: function(expand) {
      $(this.$el.querySelector(".black-overlay")).stop();
      if (expand) {
        $(this.$el.querySelector(".black-overlay")).fadeIn();
        this.$refs.header.expand();
      } else {
        $(this.$el.querySelector(".black-overlay")).fadeOut();
        this.$refs.header.collapse();
      }
    }
  }
};
</script>
