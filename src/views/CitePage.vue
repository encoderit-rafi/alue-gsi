<style scoped lang="scss">
.cite-cont {
  .page-title {
    margin: 40px 0 20px 10px;
  }
  .page-body {
    box-shadow: 0px 4px 16px rgba(185, 185, 185, 0.25);
    padding: 18px 30px;
    min-height: 350px;
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

<template>
  <div class="cite-cont">
    <p class="page-title ft-blue-1 ft-size-20">Citation</p>
    <div class="page-body bg-neutral-white border-radius-6">
      <p class="ft-size-18 ft-blue-1">
        If you extend or use ALUE work, please cite the paper where it was
        introduced:
      </p>
      <div class="code-cont border-radius-4 relative">
        <span
          class="copy-icon el-icon-document-copy ft-size-20 ft-blue-1 pointer absolute"
          title="copy to clipboard"
          v-on:click="copyCitation"
        ></span>
        <pre class="ft-size-14 m-0">
          <code id="code">
            @inproceedings{seelawi-etal-2021-alue,
              &emsp;author = {Seelawi, Haitham and Tuffaha, Ibraheem and Gzawi, Mahmoud and Farhan, Wael and Talafha, Bashar and Badawi, Riham and Sober, Zyad and Al-Dweik, Oday and Freihat, Abed Alhakim and Al-Natsheh, Hussein},
              &emsp;title = {ALUE}: {A}rabic Language Understanding Evaluation,
              &emsp;booktitle = "Proceedings of the Sixth Arabic Natural Language Processing Workshop",
              &emsp;month = apr,
              &emsp;year = "2021",
              &emsp;address = "Kyiv, Ukraine (Virtual)",
              &emsp;publisher = "Association for Computational Linguistics",
              &emsp;url = "https://www.aclweb.org/anthology/2021.wanlp-1.18",
              &emsp;pages = "173--184",
            }
          </code>
        </pre>
      </div>
      <br />
      <el-alert
        title="Please make sure to cite the eight tasks of the ALUE benchmark, as per the Bibtex provided in the Tasks page"
        type="info"
        description=" "
        show-icon
      >
      </el-alert>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "cite-page",
  mounted() {},
  data() {
    return {};
  },
  methods: {
    copyCitation: function () {
      let copyText = $("#code")[0].textContent;
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
