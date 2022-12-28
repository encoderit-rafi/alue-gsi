<template>
  <div class="login-cont" v-loading="isLoading">
    <div class="page-body bg-neutral-white border-radius-6">
      <div style="display: flex; justify-content: center">
        <div id="buttonDiv"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import config from "../assets/config.json";

const useScript = (src, onLoad) => {
  const existedScript = Array.from(
    document.getElementsByTagName("script")
  ).find(script => script.src === src);

  if (existedScript) {
    return {
      remove: () => {
        document.head.removeChild(existedScript);
      }
    };
  }

  const script = document.createElement("script");
  script.setAttribute("async", true);
  script.setAttribute("defer", true);
  script.setAttribute("src", src);
  script.addEventListener("load", onLoad);
  document.head.appendChild(script);

  return {
    remove: () => {
      document.head.removeChild(script);
    }
  };
};

export default {
  name: "login",

  data() {
    return {
      GOOGLE_CLIENT_ID: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      gsiScript: null,
      isLoading: false,
      loggedin: false,

      logoutButton: false,
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      userInfo: {
        email: null,
        fullname: null,
        id: null,
        image: null,
        expires_at: null
      }
    };
  },
  created() {
    this.gsiScript = useScript("https://accounts.google.com/gsi/client", () => {
      window.google.accounts.id.initialize({
        client_id: this.GOOGLE_CLIENT_ID,
        callback: this.handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      // window.google.accounts.id.prompt(); // also display the One Tap dialog
    });
  },
  mounted() {
    const token = localStorage.getItem("setToken") || "";
    this.client_id = config.client_id;

    if (token != "") {
      this.$router.push({ path: "/home" });
      // location.reload();
    }
  },

  watch: {
    loginlink: function(val) {
      alert("Changed!");
    }
  },
  beforeDestroy() {
    this.gsiScript?.remove();
  },
  methods: {
    getInfo() {},
    handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      localStorage.setItem("setToken", response.credential);
      const token = localStorage.getItem("setToken") || "";
      if (token != "") {
        this.$router.push({ path: "/home" });
      }
    },
    refresh_auth(googleUser) {
      var self = this;
      let promise = googleUser.reloadAuthResponse().then(function(data) {
        googleUser.getAuthResponse().id_token;
        self.userInfo.id = data.id_token;
        self.userInfo.expires_at = data.expires_at;
      });

      return promise;
    },
    make_request() {
      var token_data = { token: this.userInfo.id };
      var self = this;
      self.isLoading = true;
      axios
        .post(config.base_url + "/api/signup", token_data, {
          headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
        .then(function() {
          self.$notify({
            title: "Login",
            message: "Successful logged in!",
            type: "success"
          });

          self.$store.commit("setToken", self.userInfo.id);
          localStorage.setItem("setToken", self.userInfo.id);
          localStorage.setItem("expires_at", self.userInfo.expires_at);

          self.$router.push({ path: "/home" });
          self.isLoading = false;
        })
        .catch(function(error) {
          self.$notify({
            title: "Login",
            message: "Unauthenticated user",
            type: "error"
          });
          self.$store.commit("setToken", "");
          localStorage.setItem("setToken", "");
          localStorage.setItem("expires_at", 0);

          self.isLoading = false;
        });
    }
    // onSuccess(googleUser) {
    //   this.userInfo.id = googleUser.getAuthResponse().id_token;
    //   this.userInfo.expires_at = googleUser.getAuthResponse().expires_at;

    //   if (this.userInfo.expires_at <= new Date().getTime()) {
    //     var self = this;
    //     this.refresh_auth(googleUser).then(function() {
    //       self.make_request();
    //     });
    //   } else this.make_request();
    // },
    // onFailure() {
    //   this.$notify({
    //     title: "Login",
    //     message: "Unauthenticated user",
    //     type: "error"
    //   });
    // },
  }
};
</script>

<style scoped lang="scss">
.login-cont {
  .page-title {
    margin: 40px 0 20px 10px;
  }
  .page-body {
    box-shadow: 0px 4px 16px rgba(185, 185, 185, 0.25);
    padding: 30px 30px;
    min-height: 350px;
    .code-cont {
      text-align: justify;
      line-height: 1.45;
      background-color: #ffffff;
      padding: 0 16px;
      .copy-icon {
        top: 12px;
        right: 12px;
      }
      pre {
        code {
          color: #24292e;
          font-family: monospace, monospace !important;
          white-space: pre-line;
        }
      }
    }
  }
}
</style>
