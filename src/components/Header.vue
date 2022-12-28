<template>
  <div>
    <meta name="google-signin-scope" content="profile email" />
    <meta
      name="google-signin-client_id"
      content="932846290701-uqtm2gq9g3f3nhtsji16ls61tvr84qhk.apps.googleusercontent.com"
    />
    <div class="header bg-blue-1">
      <div
        class="container-wrapper d-flex align-center space-between horizontal layout"
      >
        <div class="horizontal layout align-center">
          <img
            v-if="ismobile"
            src="../assets/images/icons/menu.svg"
            class="menu ft-neutral-white"
            v-on:click="expanded = !expanded"
          />
          <div
            class="hoirizontal layout align-center pointer"
            v-on:click="goHome"
          >
            <span class="logo-icon el-icon-phone ft-blue-3 ft-size-20"></span>
            <p class="ft-size-24 ft-blue-3 ft-w-bold">ALUE</p>
          </div>
        </div>
        <div class="horizontal layout">
          <div v-if="!ismobile" class="nav horizontal layout align-center flex">
            <div
              class="nav-item horizontal layout pointer align-center"
              v-for="(item, index) in items"
              v-show="item.show"
              :key="item.title"
              v-on:click="tabClicked"
              v-bind:index="index + 2"
              v-bind:data-route="item.route"
            >
              <p class="ft-neutral-white ft-size-18">{{ item.title }}</p>
            </div>

            <div
              index="10"
              class="nav-item horizontal layout pointer align-center"
              v-if="!$store.state.token"
              v-on:click="tabClicked"
              data-route="/login"
            >
              <p class="ft-neutral-white ft-size-18">Login</p>
            </div>

            <div
              index="11"
              class="nav-item horizontal layout pointer align-center"
              data-route="/signup"
              v-if="$store.state.token"
            >
              <p class="ft-neutral-white ft-size-18">
                <GoogleLogin
                  :params="params"
                  :onSuccess="onSuccess"
                  :logoutButton="true"
                  >Logout</GoogleLogin
                >
              </p>
            </div>
          </div>
          <el-dropdown
            v-if="loggedin"
            trigger="click"
            @command="userDropdownTriggered"
          >
            <div
              class="el-dropdown-link user-bubble-cont align-center pointer horizontal layout"
            >
              <div
                class="user-bubble bg-neutral-white border-radius-25 align-center d-flex"
              >
                <span
                  class="user-icon el-icon-user ft-blue-1 ft-size-32 text-center"
                ></span>
              </div>
              <span
                class="el-icon-arrow-down ft-neutral-white ft-w-bold"
              ></span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goProfile()" command="profile"
                >Profile</el-dropdown-item
              >
              <el-dropdown-item @click.native="logout()" command="logout"
                >Log out</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="mobile-nav-main-content-cont horizontal layout">
      <div v-if="ismobile" class="mobile-nav">
        <el-menu v-bind:default-active="activeTab" :collapse="isCollapse">
          <el-menu-item
            index="0"
            v-on:click="tabClicked"
            data-route="/home"
            class="ft-grey-2 ft-w-500 ft-size-12 d-none"
          >
            <span
              class="ft-size-28 text-center el-icon-s-home ft-neutral-white"
            ></span>
            <p class="ft-neutral-white text-center ft-w-bold ft-size-14 m-0">
              Home
            </p>
          </el-menu-item>
          <el-menu-item
            v-for="(item, index) in items"
            :key="item.title"
            :index="index + 1"
            v-on:click="tabClicked"
            :data-route="item.route"
            class="horizontal layout align-center ft-grey-2 ft-w-500 ft-size-12"
          >
            <span
              v-if="item.icon"
              :class="item.icon"
              class="ft-size-28 text-center ft-neutral-white"
            ></span>
            <img v-if="item.img" :src="item.img" :alt="item.title" />
            <p class="ft-neutral-white text-center ft-w-bold ft-size-14 m-0">
              {{ item.title }}
            </p>
          </el-menu-item>
          <el-menu-item
            v-if="!$store.state.token"
            index="8"
            v-on:click="tabClicked"
            data-route="/login"
            class="horizontal layout align-center ft-grey-2 ft-w-500 ft-size-12"
          >
            <img src="../assets/images/icons/login.svg" alt="Login" />
            <p class="ft-neutral-white text-center ft-w-bold ft-size-14 m-0">
              Login
            </p>
          </el-menu-item>
          <el-menu-item
            v-if="!$store.state.token"
            index="9"
            v-on:click="tabClicked"
            data-route="/signup"
            class="horizontal layout align-center ft-grey-2 ft-w-500 ft-size-12"
          >
            <img src="../assets/images/icons/singup.svg" alt="Sign up" />
            <p class="ft-neutral-white text-center ft-w-bold ft-size-14 m-0">
              Logout
            </p>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-content vertical layout border-box bg-grey-7">
        <div class="main-inner-cont">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";

export default {
  name: "alue-header",
  components: {
    GoogleLogin,
  },
  mounted() {

    const token = localStorage.getItem("setToken") || "";
    this.$store.commit("setToken", token);
    this.getStatus = token;

  },
  beforeDestroy() {
    window.removeEventListener("resize", this.windowResized);
  },
  data() {
    return {
      params: {
        client_id:
          "932846290701-uqtm2gq9g3f3nhtsji16ls61tvr84qhk.apps.googleusercontent.com",
      },
      renderParams: {
        width: 2500,
        height: 500,
        longtitle: true,
      },
      getStatus: localStorage.getItem("setToken") || "",
      ismobile: this.isMobile(),
      expanded: false,
      isCollapse: false,
      activeTab: "0",
      loggedin: false,
      items: [
        {
          title: "Paper",
          route: "/paper",
          icon: "el-icon-document",
          show: true,
        },
        {
          title: "Cite",
          route: "/cite",
          icon: "el-icon-paperclip",
          show: true,
        },
        {
          title: "Code",
          route: "/code",
          img: require("../assets/images/icons/code.svg"),
          show: true,
        },
        {
          title: "Tasks",
          route: "/tasks",
          icon: "el-icon-notebook-2",
          show: true,
        },
        {
          title: "Leaderboard",
          route: "/leaderboard",
          icon: "el-icon-trophy",
          show: true,
        },
        { title: "FAQ", route: "/FAQ", icon: "el-icon-info", show: true },
        {
          title: "Diagnostics",
          route: "/diagnostics",
          img: require("../assets/images/icons/bug.svg"),
          show: true,
        },
        {
          title: "Submit",
          route: "/Submit",
          img: require("../assets/images/icons/bug.svg"),
          show: true,
        },
        // { title: 'Login', route: '/login', img: require('../assets/images/icons/login.svg'), show: ! this.isLoggedin() },
      ],
    };
  },
  watch: {
    expanded: function() {
      this.$parent.expanded(this.expanded);
    },
  },
  methods: {
    isMobile() {
      return false;
    },
    onSuccess(googleUser) {
      this.$notify({
        title: "Logout",
        message: "Successfully logged out",
        type: "success",
      });

      this.$store.commit("setToken", null);
      localStorage.setItem("setToken", "");
      this.getStatus = "";

      this.$router.push({ path: "/home" });
      location.reload();
    },
    // async logout(){
    //   var asd = window.open('https://competitions.codalab.org/accounts/logout/','_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=00, height=0, visible=none', '');
    //   asd.close();
    //   // window.open("https://competitions.codalab.org/accounts/logout/", '', params);
    //   this.loggedin = false
    //   this.$notify({
    //     title: "",
    //     message: "Logout",
    //     type: "success"
    // });

    // },
    // async isLoggedin(){
    //   await  axios.get('https://competition.aluebenchmark.com/api/competition/13/mystatus/')
    //   .then(response => {
    //     let ret = response.data;
    //     alert(ret);
    //     const containsKey = (obj, key ) => Object.keys(obj).includes(key);
    //     let hasStatus = containsKey(ret, 'status');
    //     if (hasStatus){
    //       return false
    //     }
    //     else{
    //       return true
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log("response..");
    //     console.log(response);
    //     if (error.response) {
    //       console.log("error");
    //   }})
    // },
    goHome: function() {
      $(this.$el.querySelectorAll(".nav-item")).removeClass("selected");
      this.activeTab = "0";
      if (this.$route.path != "/home") this.$router.push({ path: "/home" });
    },
    goProfile: function() {
      this.$router.push({ path: "/profile" });
    },

    windowResized: function() {
      this.ismobile = this.isMobile();
    },
    expand: function() {
      $(this.$el.querySelector(".mobile-nav")).css("left", "0px");
    },
    collapse: function() {
      $(this.$el.querySelector(".mobile-nav")).css("left", "-150px");
    },
    tabClicked: function(e) {
      let route = "";
      if (e.target) {
        route = $(e.target.closest(".nav-item")).attr("data-route");
        $(this.$el.querySelectorAll(".nav-item")).removeClass("selected");
        $(e.target.closest(".nav-item")).addClass("selected");
      } else {
        route = $(e.$el).attr("data-route");
      }

      if (this.$route.path != route) {
        this.$router.push({ path: route });
        this.expanded = false;
      }
    },
    selectTab: function(path) {
      let tabIndex = 0;
      let index = [];

      for (let i in this.items) {
        index.push(this.items[i].route);
      }
      index.push("/login");
      index.push("/signup");

      if (path == "/home") tabIndex = 0;
      else tabIndex = index.indexOf(path) + 1;

      this.activeTab = String(tabIndex);
      // alert(this.activeTab)
      $(this.$el.querySelectorAll(".nav-item")).removeClass("selected");
      $("div.nav-item:nth-of-type(" + tabIndex + ")").addClass("selected");
      this.expanded = false;
    },
  },
};
</script>
<style scoped lang="scss">
#app {
  .header {
    height: 64px;
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    .logo-icon {
      margin-top: 2px;
    }
    .user-bubble-cont {
      .user-bubble {
        width: 40px;
        height: 40px;
      }
      .user-icon {
        width: 100%;
      }
      & > span {
        margin-left: 6px;
      }
    }
    .nav {
      .nav-item {
        margin-right: 10px;
        padding: 0 6px;
        span {
          margin-right: 4px;
        }
        img {
          height: 20px;
          margin: 0 4px 0 0;
        }
        &.selected {
          border-bottom: 4px solid #00c2c3;
          margin-bottom: -3px;
        }
      }
    }
  }
  .mobile-nav-main-content-cont {
    .mobile-nav {
      width: 150px;
      overflow: hidden;
      .el-menu {
        height: 100%;
        background-color: #7d7d7d;
        border: 0;
        .el-menu-item.is-active {
          background-color: #dadada;
          p,
          span {
            color: #010544;
          }
          img {
            filter: invert(95%) sepia(6%) saturate(55570%) hue-rotate(1348deg)
              contrast(100%);
          }
        }
        .el-menu-item:hover:not(.is-active) {
          background-color: #7d7d7d;
        }
        .el-menu-item {
          padding: 14px 8px !important;
          margin: 0 !important;
          height: unset;
          p {
            line-height: 20px;
          }
          span {
            width: 40px;
          }
          p,
          span {
            transition: color 500ms ease;
          }
          img {
            width: 22px;
            margin: 0 9px;
          }
        }
      }
    }
    .main-content {
      padding: 0 30px;
      min-height: calc(100vh - 150px);
      margin-top: 64px;
      width: 100%;
      .main-inner-cont {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding-bottom: 50px;
      }
    }
  }
}

/* MEDIA STYLES BELOW */
@media only screen and (max-width: 767px) {
  #app {
    .header {
      .menu {
        width: 25px;
        height: 25px;
        margin-right: 18px;
      }
    }
    .mobile-nav-main-content-cont {
      .mobile-nav {
        transition: all 500ms ease;
        z-index: 1;
        position: fixed;
        height: 100%;
        top: 65px;
        left: -150px;
      }
      .main-content {
        width: 100vw;
        padding: 0 12px;
      }
    }
  }
}
</style>
