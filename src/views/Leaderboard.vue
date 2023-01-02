<template>
  <div class="leaderboard-cont" v-loading="isLoading">
    <slideout-panel></slideout-panel>
    <p class="page-title ft-blue-1 ft-size-20">Leaderboard</p>
    <div class="page-body bg-neutral-white border-radius-6">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="rank" label="Rank" width="65"></el-table-column>
        <el-table-column prop="name" label="Name" width="100"></el-table-column>
        <el-table-column prop="model_name" label="Model"></el-table-column>

        <el-table-column
          prop="code_link"
          style="display: table; margin: auto"
          label="Details"
          width="75"
        >
          <template slot-scope="scope">
            <img
              src="../assets/images/icons/info.png"
              class="url pointer"
              style="display: table; margin: auto"
              v-on:click="rowClicked(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column
          prop="overall_score"
          label="Score"
          width="65"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="q2q"
          label="MQ2Q"
          width="65"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="madar"
          label="MDD"
          width="80"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="v_reg"
          label="SVREG"
          width="70"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="E_c"
          label="SEC"
          width="65"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="irony"
          label="FID"
          width="65"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="offensive"
          label="OOLD"
          width="65"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="xnli"
          label="XNLI"
          width="65"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="hate"
          label="OHSD"
          width="65"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="diagnostic"
          label="DIAG"
          width="65"
          :render-header="handleHelp"
        ></el-table-column>
        <el-table-column
          prop="public"
          label="Public"
          :render-header="handleHelp"
          v-if="has_user_submissions"
          width="70"
        >
          <template slot-scope="scope">
            <el-switch
              width="50"
              v-show="scope.row.related_to_user"
              v-model="scope.row.public"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="make_private(scope.row.id, scope.row.public)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueSlideoutPanel from "vue2-slideout-panel";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import Slide from "../components/Slide.vue";
import config from "../assets/config.json";
import GoogleLogin from "vue-google-login";
import OnoffToggle from "vue-onoff-toggle";

Vue.use(VueSlideoutPanel);

export default {
  name: "leaderboard",
  components: {
    Slide,
    Loading,
    GoogleLogin,
    OnoffToggle
  },
  mounted() {
    this.isLoading = true;
    let leaderboard_data = null;
    let self = this;
    axios
      .get(config.base_url + "/api/submissions")
      .then(function(response) {
        leaderboard_data = response.data.data;

        for (var i = 0; i < leaderboard_data.length; i++) {
          leaderboard_data[i].rank = i + 1;

          leaderboard_data[i].overall_score = parseFloat(
            leaderboard_data[i].overall_score * 100
          ).toFixed(1);
          leaderboard_data[i].q2q = parseFloat(
            leaderboard_data[i].q2q * 100
          ).toFixed(1);
          leaderboard_data[i].madar = parseFloat(
            leaderboard_data[i].madar * 100
          ).toFixed(1);
          leaderboard_data[i].v_reg = parseFloat(
            leaderboard_data[i].v_reg * 100
          ).toFixed(1);
          leaderboard_data[i].E_c = parseFloat(
            leaderboard_data[i].E_c * 100
          ).toFixed(1);
          leaderboard_data[i].irony = parseFloat(
            leaderboard_data[i].irony * 100
          ).toFixed(1);
          leaderboard_data[i].offensive = parseFloat(
            leaderboard_data[i].offensive * 100
          ).toFixed(1);
          leaderboard_data[i].xnli = parseFloat(
            leaderboard_data[i].xnli * 100
          ).toFixed(1);
          leaderboard_data[i].hate = parseFloat(
            leaderboard_data[i].hate * 100
          ).toFixed(1);
          leaderboard_data[i].diagnostic = parseFloat(
            leaderboard_data[i].diagnostic * 100
          ).toFixed(1);
          if (leaderboard_data[i].related_to_user) {
            self.has_user_submissions = true;
          }
        }

        let json_return = leaderboard_data;
        self.tableData = json_return;
        self.isLoading = false;
      })
      .catch(function(error) {
        self.isLoading = false;
      });
  },
  data() {
    return {
      tableData: [],
      isLoading: false,
      fullPage: true,
      checked: false,
      has_user_submissions: false
    };
  },
  methods: {
    rowClicked: function(row) {},
    openLink: function(link) {
      window.open(link, "_blank");
    },
    handleHelp(h, { column }) {
      let label = column.label;
      let message = "Accuracy";

      switch (label) {
        case "MDD":
          message = "MADAR Shared Task Subtask 1 / F1-score";
          break;
        case "FID":
          message = "IDAT@FIRE2019 Irony Detection Task	/ F1-score";
          break;
        case "SEC":
          message =
            "SemEval-2018 Task 1 - Affect in Tweets: Emotion Classification task / Jaccard  similarity score";
          break;
        case "MQ2Q":
          message = "NSURL-2019 Shared Task 8 / F1-score";
          break;
        case "OHSD":
          message = "OSACT4 Shared Task: hatespeech	/ F1-score";
          break;
        case "OOLD":
          message = "OSACT4 Shared Task: offensive	/ F1-score";
          break;
        case "SVREG":
          message =
            "SemEval-2018 Task 1 - Affect in Tweets: Sentiment Intensity Regression task / Pearson correlation coefficient";
          break;
        case "XNLI":
          message = "Cross-lingual Sentence Representations	/ Accuarcy";
          break;
        case "DIAG":
          message = "Diagnostic dataset	/ F1-score";
          break;
        case "Public":
          message = "Make your submission Public/Priavte";
          break;

        default:
          message = "";
      }

      return (
        <el-tooltip
          class="item"
          effect="dark"
          content={message}
          placement="top"
        >
          <div> {label} </div>
        </el-tooltip>
      );
    },
    make_private: function(id, value) {
      //TODO:
      // API Request to make private/public
      const token = "Bearer " + this.$store.state.token;

      var body_data = { public: value };
      let self = this;
      self.isLoading = true;

      axios
        .put(config.base_url + "/api/submissions/" + id, body_data, {
          headers: { Authorization: token }
        })
        .then(function(response) {
          self.isLoading = false;

          self.$notify({
            title: "Update",
            message: "Updated successfully",
            type: "success"
          });
          self.$router.go(0);
        })
        .catch(function(error) {
          self.isLoading = false;
        });
    },
    make_private_text: function(row_is_private) {
      if (row_is_private) {
        return "Make Public";
      }
      return "Make Private";
    },
    rowClicked: function(row) {
      const panel1Handle = this.$showPanel({
        component: Slide,
        openOn: "right",
        width: 375,
        props: {
          model_name: row.model_name,
          code_link: row.code_link,
          model_description: row.model_description, //TODO
          param_description: row.param_description,
          shared_param: row.shared_param,
          total_param: row.total_param
          //any data you want passed to your component
        }
      });

      panel1Handle.promise.then(result => {});
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.related_to_user == true) {
        return "warning-row";
      }
      if (row.is_baseline) {
        return "baseline-row";
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
.leaderboard-cont {
  .page-title {
    margin: 40px 0 20px 10px;
  }

  .page-body {
    box-shadow: 0px 4px 16px rgba(185, 185, 185, 0.25);
    padding: 18px 30px;
    min-height: 350px;

    .el-table .warning-row {
      background: #f0f9eb;
    }

    .el-table .baseline-row {
      background: #e1e1e1;
    }

    .el-table .url {
      height: 20px;
    }
    .el-table .info {
      height: 25px;
    }

    .el-switch {
      height: 30px;
    }
  }
}
</style>
