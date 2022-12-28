<template>
  <div class="tasks-cont">
    <p class="page-title ft-blue-1 ft-size-20">ALUE Tasks</p>
    <div class="page-body bg-neutral-white border-radius-6">
      <el-table v-bind:data="tableData" stripe style="width: 100%">
        <el-table-column
          prop="acr"
          label="Task"
          width="85"
        ></el-table-column>
        <el-table-column prop="name" label="Full Name"></el-table-column>
        <el-table-column prop="license" label="License" width="75">
          <template slot-scope="scope">
            <img
              src="../assets/images/icons/license.svg"
              class="license pointer"
              v-on:click="openLink(scope.row.license)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="metric"
          label="Metric"
          width="180"
        ></el-table-column>
        <el-table-column prop="citation" label="Cite" width="80">
          <template slot-scope="scope">
            <img
              src="../assets/images/icons/cite.svg"
              width="20px"
              class="license pointer"
              v-on:click="showCite(scope.row.cite)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="dataset" label="Dataset" width="80">
          <template slot-scope="scope">
            <img
              src="../assets/images/icons/data.png"
              class="license pointer"
              v-on:click="showData(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="info" label="Source" width="90">
          <template slot-scope="scope">
            <img
              src="../assets/images/icons/link.svg"
              class="info pointer"
              v-on:click="openLink(scope.row.info)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="info" label="Jupyter notebook" width="90">
          <template slot-scope="scope">
            <img
              src="../assets/images/icons/jupyter.png"
              class="info pointer"
              v-on:click="openLink(scope.row.notebook)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Cite" width="55%" :visible.sync="citeDialog">
        <div class="code-cont border-radius-4 relative">
          <span
            class="copy-icon el-icon-document-copy ft-size-20 ft-blue-1 pointer absolute"
            title="copy to clipboard"
            v-on:click="copyCitation"
          ></span>
          <pre class="ft-size-14 m-0">
          <code id="code" v-html="selectedCite">
          </code>
        </pre>
        </div>
      </el-dialog>
      <el-dialog title="Dataset" width="55%" :visible.sync="dataDialog">
        <h4>{{ task_title }}</h4>
        <el-tabs type="card" @tab-click="handleClick">
          <el-tab-pane v-if="full_dataset" label="Dataset">
            <el-button
              type="primary"
              v-on:click="download_training_data($event)"
              :disabled="!accept_licence"
              >Download dataset <i class="el-icon-download el-icon-right"></i
            ></el-button>
          </el-tab-pane>
          <el-tab-pane v-if="training_data" label="Training data">
            <el-button
              type="primary"
              v-on:click="download_training_data($event)"
              :disabled="!accept_licence"
              >Download training data
              <i class="el-icon-download el-icon-right"></i
            ></el-button>
          </el-tab-pane>
          <el-tab-pane v-if="val_data" label="Validation data"
            ><el-button
              type="primary"
              v-on:click="download_training_data($event)"
              :disabled="!accept_licence"
              >Download validation data
              <i class="el-icon-download el-icon-right"></i></el-button
          ></el-tab-pane>
          <el-tab-pane v-if="private_data" label="Private data"
            ><el-button
              type="primary"
              v-on:click="download_training_data($event)"
              :disabled="!accept_licence"
              >Download private data
              <i class="el-icon-download el-icon-right"></i></el-button
          ></el-tab-pane>
        </el-tabs>
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <br />
              <el-checkbox v-model="accept_licence">Accept license</el-checkbox> &#9;
              <span>&#9;
              <a style="margin-left:6px" v-bind:href="license_link" target="_blank"> Link</a>
              </span>
              <br />
              <br /><br />
              <el-alert v-bind:title="data_note" type="info" show-icon>
              </el-alert></div
          ></el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "tasks",
  mounted() {},
  data() {
    return {
      selectedCite: null,
      citeDialog: false,
      dataDialog: false,
      full_dataset: null,
      training_data: null,
      val_data: null,
      private_data: null,
      accept_licence: false,
      data_note: "",
      task_title: "",
      license_link: "",
      tableData: [
        {
          acr: "MQ2Q",
          name: "NSURL-2019 Shared Task 8 (Question to Question Semantic Similarity)",
          license:
            "https://s3-eu-west-1.amazonaws.com/nsurlworkshop/mawdoo3_nslru_license.txt",
          info: "https://www.kaggle.com/c/nsurl-2019-task8/data",
          metric: "F1-score",
          cite:
            "<br>@inproceedings{seelawi2019nsurl, <br/>&emsp; title={NSURL-2019 task 8: Semantic question similarity in arabic}, <br/>&emsp; author={Seelawi, Haitham and Mustafa, Ahmad and Al-Bataineh, Hesham and Farhan, Wael and Al-Natsheh, Hussein T}, <br/>&emsp; booktitle={Proceedings of The First International Workshop on NLP Solutions for Under Resourced Languages (NSURL 2019) co-located with ICNLSP 2019-Short Papers}, <br/>&emsp; pages={1--8}, <br/>&emsp; year={2019}<br/>}&emsp; ",
          train_data:
            "https://s3-eu-west-1.amazonaws.com/nsurlworkshop/q2q_similarity_workshop_v2.1.tsv",
          val_data: null,
          private_data:
            "https://drive.google.com/file/d/1oJQbfLINgfZ7KUd0yFP3nqDlaLdg2vej/view?usp=sharing",
          full_dataset: null,
          note: "Private data is used to calculate the final score",
          notebook:
            "https://github.com/Alue-Benchmark/alue_baselines/blob/master/notebooks/USE/NSURL-2019-Task-8.ipynb",
        },
        {
          acr: "OOLD",
          name: "OSACT4 Shared Task-A: offensive",
          license: "https://edinburghnlp.inf.ed.ac.uk/workshops/OSACT4/",
          info: "https://edinburghnlp.inf.ed.ac.uk/workshops/OSACT4/",
          metric: "F1-score",
          cite:
            "<br>@inproceedings{mubarak2020overview, <br/>&emsp; title={Overview of osact4 arabic offensive language detection shared task}, <br/>&emsp; author={Mubarak, Hamdy and Darwish, Kareem and Magdy, Walid and Elsayed, Tamer and Al-Khalifa, Hend}, <br/>&emsp; booktitle={Proceedings of the 4th Workshop on Open-Source Arabic Corpora and Processing Tools, with a Shared Task on Offensive Language Detection}, <br/>&emsp; pages={48--52}, <br/>&emsp; year={2020}<br/>}&emsp; ",
          train_data:
            "https://edinburghnlp.inf.ed.ac.uk/workshops/OSACT4/datasets/OSACT2020-sharedTask-train.txt",
          val_data:
            "https://edinburghnlp.inf.ed.ac.uk/workshops/OSACT4/datasets/OSACT2020-sharedTask-dev.txt",
          private_data:
            "https://drive.google.com/file/d/18DBWWS8oiFzMVDChJW60nLSWh7-fPeiT/view?usp=sharing",
          full_dataset: null,
          note:
            "The dataset is labled for both tasks (offensive and hatespeech).Private data is used to calculate the final score",
          notebook:
            "https://github.com/Alue-Benchmark/alue_baselines/blob/master/notebooks/USE/OSACT4-Task-A.ipynb",
        },
        {
          acr: "OHSD",
          name: "OSACT4 Shared Task-B: hatespeech detection",
          license: "https://edinburghnlp.inf.ed.ac.uk/workshops/OSACT4/",
          info: "https://edinburghnlp.inf.ed.ac.uk/workshops/OSACT4/",
          metric: "F1-score",
          cite:
            "<br>@inproceedings{mubarak2020overview, <br/>&emsp; title={Overview of osact4 arabic offensive language detection shared task}, <br/>&emsp; author={Mubarak, Hamdy and Darwish, Kareem and Magdy, Walid and Elsayed, Tamer and Al-Khalifa, Hend}, <br/>&emsp; booktitle={Proceedings of the 4th Workshop on Open-Source Arabic Corpora and Processing Tools, with a Shared Task on Offensive Language Detection}, <br/>&emsp; pages={48--52}, <br/>&emsp; year={2020}<br/>}&emsp; ",
          train_data:
            "https://edinburghnlp.inf.ed.ac.uk/workshops/OSACT4/datasets/OSACT2020-sharedTask-train.txt",
          val_data:
            "https://edinburghnlp.inf.ed.ac.uk/workshops/OSACT4/datasets/OSACT2020-sharedTask-dev.txt",
          private_data:
            "https://drive.google.com/file/d/18DBWWS8oiFzMVDChJW60nLSWh7-fPeiT/view?usp=sharing",
          full_dataset: null,
          note:
            "The dataset is labled for both tasks (hatespeech and offensive). Private data is used to calculate the final score",
          notebook:
            "https://github.com/Alue-Benchmark/alue_baselines/blob/master/notebooks/USE/OSACT4-Task-B.ipynb",
        },

        {
          acr: "SVREG",
          name:
            "SemEval-2018 Task 1 - Affect in Tweets: Sentiment Intensity Regression task",
          license:
            "https://competitions.codalab.org/competitions/17751#learn_the_details-terms_and_conditions",
          info:
            "https://competitions.codalab.org/competitions/17751#learn_the_details-datasets",
          metric: "Pearson correlation coefficient",
          cite:
            "<br>@inproceedings{mohammad2018semeval, <br/>&emsp; title={Semeval-2018 task 1: Affect in tweets}, <br/>&emsp; author={Mohammad, Saif and Bravo-Marquez, Felipe and Salameh, Mohammad and Kiritchenko, Svetlana}, <br/>&emsp; booktitle={Proceedings of the 12th international workshop on semantic evaluation}, <br/>&emsp; pages={1--17}, <br/>&emsp; year={2018}<br/>}&emsp; ",
          train_data:
            "http://saifmohammad.com/WebDocs/AIT-2018/AIT2018-DATA/V-reg/Arabic/2018-Valence-reg-Ar-train.zip",
          val_data:
            "http://saifmohammad.com/WebDocs/AIT-2018/AIT2018-DATA/V-reg/Arabic/2018-Valence-reg-Ar-dev.zip",
          private_data:
            "https://drive.google.com/file/d/1bd-BttwkaHJqdaZYwLNuO9jXv9RLQMCt/view?usp=sharing",
          full_dataset: null,
          note: "Private data is used to calculate the final score",
          notebook:
            "https://github.com/Alue-Benchmark/alue_baselines/blob/master/notebooks/USE/V-reg.ipynb",
        },
        {
          acr: "SEC",
          name:
            "SemEval-2018 Task 1 - Affect in Tweets: Emotion Classification task",
          license:
            "https://competitions.codalab.org/competitions/17751#learn_the_details-terms_and_conditions",
          info:
            "https://competitions.codalab.org/competitions/17751#learn_the_details-datasets",
          metric: "Jaccard  similarity score",
          cite:
            "<br>@inproceedings{mohammad2018semeval, <br/>&emsp; title={Semeval-2018 task 1: Affect in tweets}, <br/>&emsp; author={Mohammad, Saif and Bravo-Marquez, Felipe and Salameh, Mohammad and Kiritchenko, Svetlana}, <br/>&emsp; booktitle={Proceedings of the 12th international workshop on semantic evaluation}, <br/>&emsp; pages={1--17}, <br/>&emsp; year={2018}<br/>}&emsp; ",
          train_data:
            "http://saifmohammad.com/WebDocs/AIT-2018/AIT2018-DATA/E-c/Arabic/2018-E-c-Ar-train.zip",
          val_data:
            "http://saifmohammad.com/WebDocs/AIT-2018/AIT2018-DATA/E-c/Arabic/2018-E-c-Ar-dev.zip",
          private_data:
            "https://drive.google.com/file/d/1ecRWtGKwUHluB5rE_ISZbssGEpHWrH_y/view?usp=sharing",
          full_dataset: null,
          note: "Private data is used to calculate the final score",
          notebook:
            "https://github.com/Alue-Benchmark/alue_baselines/blob/master/notebooks/USE/E-c.ipynb",
        },
        {
          acr: "FID",
          name: "IDAT@FIRE2019 Irony Detection Task",
          license: "https://www.irit.fr/IDAT2019/annotation-guidelines/",
          info: "https://www.irit.fr/IDAT2019/data-and-evaluation-metrics/",
          metric: "F1-score",
          cite:
            "<br>@inproceedings{ghanem2019idat, <br/>&emsp; title={Idat at fire2019: Overview of the track on irony detection in arabic tweets}, <br/>&emsp; author={Ghanem, Bilal and Karoui, Jihen and Benamara, Farah and Moriceau, V{'e}ronique and Rosso, Paolo}, <br/>&emsp; booktitle={Proceedings of the 11th Forum for Information Retrieval Evaluation}, <br/>&emsp; pages={10--13}, <br/>&emsp; year={2019}<br/>}&emsp; ",
          train_data: null,
          val_data: null,
          private_data: null,
          full_dataset:
            "https://docs.google.com/forms/d/e/1FAIpQLSc83K4F7xEU6xNRYgTy-cyRjbRp3qpd-eK7uWnegU5U2tOibQ/viewform",
          note:
            "Contact information for IDAT corpus. IDAT testing data is used to calculate the final score",
          notebook:
            "https://github.com/Alue-Benchmark/alue_baselines/blob/master/notebooks/USE/IDAT-irony-detection.ipynb",
        },
        {
          acr: "XNLI",
          name: "Cross-lingual Sentence Representations",
          license: "https://www.anc.org/OANC/license.txt",
          info: "https://www.nyu.edu/projects/bowman/xnli/",
          metric: "Accuracy",
          cite:
            "<br>@article{conneau2018xnli, <br/>&emsp; title={XNLI: Evaluating cross-lingual sentence representations}, <br/>&emsp; author={Conneau, Alexis and Lample, Guillaume and Rinott, Ruty and Williams, Adina and Bowman, Samuel R and Schwenk, Holger and Stoyanov, Veselin}, <br/>&emsp; journal={arXiv preprint arXiv:1809.05053}, <br/>&emsp; year={2018}<br/>}&emsp; ",
          train_data:
            "https://drive.google.com/file/d/1znoaEHyqojRkBX6LcYXnaAuKXt_rNVnV/view?usp=sharing",
          val_data:
            "https://drive.google.com/file/d/1KN6yJJwrAHbtLKHI7NyReut8dkG1opam/view?usp=sharing",
          private_data: null,
          full_dataset: null,
          note: "Validation data is used to calculate the final score",
          notebook:
            "https://github.com/Alue-Benchmark/alue_baselines/blob/master/notebooks/USE/XNLI_and_diagnostic.ipynb",
        },
        {
          acr: "MDD",
          name: "MADAR Shared Task Subtask 1 (Dialect Detection)",
          license: "https://sites.google.com/view/madar-shared-task/home",
          info: "https://sites.google.com/view/madar-shared-task/home",
          metric: "F1-score",
          cite:
            "<br>@inproceedings{bouamor2019madar, <br/>&emsp; title={The MADAR shared task on Arabic fine-grained dialect identification}, <br/>&emsp; author={Bouamor, Houda and Hassan, Sabit and Habash, Nizar}, <br/>&emsp; booktitle={Proceedings of the Fourth Arabic Natural Language Processing Workshop}, <br/>&emsp; pages={199--207}, <br/>&emsp; year={2019}<br/>}&emsp; ",
          full_dataset:
            "https://docs.google.com/forms/d/e/1FAIpQLSfQqhxslVSkBN5ScQ2bvvM0xUVCUnjXxtvkAjupvxm3SSeZGw/viewform",
          val_data: null,
          train_data: null,
          private_data: null,
          note:
            'CAMeL Lab Registration Form: "MADAR Parallel Corpus".     MADAR testing data is used to calculate the final score',
          notebook:
            "https://github.com/Alue-Benchmark/alue_baselines/blob/master/notebooks/USE/Madar-Task-1.ipynb",
        },
        {
          acr: "DIAG",
          name: "Diagnostic dataset",
          license:
            "https://s3-eu-west-1.amazonaws.com/nsurlworkshop/mawdoo3_nslru_license.txt",
          info: "https://alue.org/diagnostics",
          metric: "F1-score",
          cite: "", //TODO
          train_data: null,
          val_data: null,
          private_data:
            "https://drive.google.com/file/d/1DOonofvdza9mBuVsboV7my8DGqbyU6Md/view?usp=sharing",
          full_dataset: null,
          note:
            "Use training data from XNLI. Private data is used to calculate the final score",
          notebook:
            "https://github.com/Alue-Benchmark/alue_baselines/blob/master/notebooks/USE/XNLI_and_diagnostic.ipynb",
        },
      ],
    };
  },
  methods: {
    download_training_data(e) {
      var element = e.srcElement.innerText;
      console.log(element);
      if (element.trim() == "Download training data") {
        this.openLink(this.training_data);
      } else if (element.trim() == "Download validation data") {
        this.openLink(this.val_data);
      } else if (element.trim() == "Download private data") {
        this.openLink(this.private_data);
      } else if (element.trim() == "Download dataset") {
        this.openLink(this.full_dataset);
      }
    },
    showCite(cite) {
      this.selectedCite = cite;
      this.citeDialog = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    showData(row) {
      // this.selectedCite = cite;
      this.accept_licence = false;
      this.task_title = row.name;
      this.training_data = row.train_data;
      this.val_data = row.val_data;
      this.private_data = row.private_data;
      this.full_dataset = row.full_dataset;
      this.data_note = row.note;
      this.dataDialog = true;
      this.license_link = row.license;
    },
    openLink: function (link) {
      window.open(link, "_blank");
    },
    copyCitation: function () {
      let copyText = $("#code")[0].textContent;
      copyText = copyText.replaceAll("   ", "\n   ");
      copyText = copyText.replaceAll("}  ", "\n}");
      let textArea = document.createElement("textarea");
      textArea.textContent = copyText;
      document.body.append(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();

      this.$notify({
        title: "Success",
        message: "Copied to clipboard",
        type: "success",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.tasks-cont {
  .page-title {
    margin: 40px 0 20px 10px;
  }
  .page-body {
    box-shadow: 0px 4px 16px rgba(185, 185, 185, 0.25);
    padding: 18px 30px;
    min-height: 350px;
    .el-table {
      .license {
        height: 30px;
      }
      .info {
        height: 25px;
      }
    }
    .code-cont {
      line-height: 1.45;
      background-color: #eff7ff;
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
