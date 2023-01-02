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

import store from "../store";
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
      gsiScript: null,
      isLoading: false,
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
        auto_select: true,
        callback: this.handleCredentialResponse,
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID || config.client_id
      });

      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );

      !this.$store.state.token && window.google.accounts.id.prompt();
    });
  },
  beforeRouteEnter(_to, _from, next) {
    if (store.state.token) {
      return next("/home");
    }
    return next();
  },
  methods: {
    handleCredentialResponse(response) {
      const token = response?.credential || "";
      this.onSignUp({ token });
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
    onSignUp(body) {
      this.isLoading = true;
      axios
        .post(config.base_url + "/api/signup", body, {
          headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          this.$notify({
            title: "Login",
            type: "success",
            message: "Successful logged in!"
          });

          this.$store.commit("setToken", body?.token);
          this.$router.push({ path: "/home" });
          this.isLoading = false;
        })
        .catch(() => {
          this.$notify({
            type: "error",
            title: "Login",
            message: "Unauthenticated user"
          });
          this.$store.commit("setToken", "");
          this.isLoading = false;
        });
    },
    onFailure() {
      this.$notify({
        title: "Login",
        message: "Unauthenticated user",
        type: "error"
      });
    }
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
