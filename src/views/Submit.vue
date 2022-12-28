<template>
  <div class="submit-cont">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage"
      ></loading>
    </div>
    <meta name="google-signin-scope" content="profile email" />
    <meta
      name="google-signin-client_id"
      content="932846290701-uqtm2gq9g3f3nhtsji16ls61tvr84qhk.apps.googleusercontent.com"
    />

    <p class="page-title ft-blue-1 ft-size-20">Submit</p>
    <div class="page-body bg-neutral-white border-radius-6">
      <div style="display: flex; justify-content: center">
        <div style="width: 40%">
          <h3>Make sure to read FAQs before submitting.</h3>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="0px"
            class="demo-ruleForm"
          >
            <el-form-item prop="model_name" v-tooltip="'A short name for your system, which will be displayed in the leaderboard. (Required)'">
              <el-input placeholder="Submission Name*" v-model="ruleForm.model_name"></el-input>
            </el-form-item>

            <el-form-item prop="url" v-tooltip="'A URL for a paper or (if one is not available) website or code repository describing your system.'">
              <el-input placeholder="Model URL/Github" v-model="ruleForm.url"></el-input>
            </el-form-item>

            <el-form-item prop="modelDescription" v-tooltip="'A sentence or two descriping your system. Make sue to mention any outside data or resources. (Required)'">
              <el-input type="textarea" placeholder="Model Description*" v-model="ruleForm.modelDescription"></el-input>
            </el-form-item>

            <el-form-item prop="paramDescription" v-tooltip="'A sentence or two explaining how you share parameters across tasks. (Or stating that you don\'t share parameters) (Required)'">
              <el-input type="textarea" placeholder="Parameter sharing description*" v-model="ruleForm.paramDescription"></el-input>
            </el-form-item>

            <el-form-item prop="totalParam" v-tooltip="' The total number of trained parameters in your model. <br/> Do not count word or word-part embedding parameters, even if they are trained'">
              <el-input placeholder="Total number of parameters" v-model="ruleForm.totalParam"></el-input>
            </el-form-item>

            <el-form-item prop="sharedParam" v-tooltip="' The total number of trained parameters in your model that are shared across multiple tasks. <br/> Do not count word or word-part embedding parameters, even if they are trained'">
              <el-input placeholder="Shared number of parameters" v-model="ruleForm.sharedParam"></el-input>
            </el-form-item>

          </el-form>
          
          <el-checkbox id="checkbox" v-model="checked">Public?</el-checkbox>
          <br /><br />
          <label
            >Select ZIP &nbsp;
            <input
              type="file"
              accept=".zip"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />
          </label>
          <br /><br /><br />
          <button v-on:click="submitFile('ruleForm')">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VTooltip from "v-tooltip";
import config from "../assets/config.json";
import Loading from "vue-loading-overlay";

Vue.use(VTooltip);

export default {
  name: "submit",
  components: {
    Loading,
  },
  mounted() {
    const token = localStorage.getItem("setToken") || "";
    if (token == "") {
      this.$router.push({ path: "/login" });
      // location.reload();
    }
  },
  data() {
    return {
      ruleForm: {
          model_name: "",
          url: "",
          modelDescription: "",
          paramDescription: "",
          totalParam: "",
          sharedParam: "",
      },
      rules: {
        model_name: [
          {
            required: true,
            message: "Please input Submission Name",
            trigger: "blur",
          },
        ],
        url: [
          {
            required: false,
            message: "Please input submission name",
            trigger: "blur",
          }
        ],
        modelDescription: [
          {
            required: true,
            message: "Please input Model Description",
            trigger: "blur",
          }
        ],
        paramDescription: [
          {
            required: true,
            message: "Please input Parameters Description",
            trigger: "blur",
          },
        ],
        totalParam: [
          {
            required: false,
          },
        ],
        sharedParam: [
          {
            required: false,
          },
        ],
      },
      model_name: "",
      url: "",
      modelDescription: "",
      paramDescription: "",
      totalParam: "",
      sharedParam: "",
      checked: false,

      items: [{ title: "Submit", answer: "asdqwe" }],

      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    handleFileUpload() {
      const name = this.$refs.file.files[0].name;
      if (!name.endsWith(".zip")) {
        this.$notify({
          title: "File Format",
          message: "File should be in .zip format",
          type: "error",
        });
      }
    },
    submitFile(formName) {
      let form_valid = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          form_valid = true;
        } else {
          form_valid = false;
        }
      });

      if (!form_valid)
      {
        this.$notify({
          title: "Submission",
          message: "Please fill in all the required fields.",
          type: "error",
        });

        return;
      }

      let json_data = {
        model_name: this.ruleForm.model_name,
        model_description: this.ruleForm.modelDescription,
        param_description: this.ruleForm.paramDescription,
        total_param: this.ruleForm.totalParam.toString(),
        shared_param: this.ruleForm.sharedParam.toString(),
        code_link: this.ruleForm.url,
        public: this.checked,
      };

      let formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      formData.append("metadata", JSON.stringify(json_data));

      var self = this;
      const token = "Bearer " + localStorage.getItem("setToken");
      this.isLoading = true;
      axios
        .post(config.base_url + "/api/submissions", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Authorization: token,
          },
        })
        .then(function () {
          self.$notify({
            title: "Submission",
            message: "File has been submitted successfully",
            type: "success",
          });

          self.isLoading = false;
          self.$router.push({ path: "/leaderboard" });
        })
        .catch(function (error){    
          self.$notify({
            title: "Submission",
            message: error.response.data.data,
            type: "error",
          });
          self.isLoading = false;
        });
    },
  },
};
</script>
<style scoped lang="scss">
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}

.submit-cont {
  // white-space: normal;
  // overflow-wrap: break-word;

  .page-title {
    margin: 40px 0 20px 10px;
  }
  .page-body {
    // white-space: normal;
    // overflow-wrap: break-word;

    box-shadow: 0px 4px 16px rgba(185, 185, 185, 0.25);
    padding: 18px 30px;
    min-height: 350px;
    .el-collapse {
      .el-collapse-item {
        .div {
          // height: 100px;
        }
      }
    }
  }
}
</style>
