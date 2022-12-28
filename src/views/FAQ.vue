<style scoped lang="scss">
.faq-cont {
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

<template>
  <div class="faq-cont">
    <p class="page-title ft-blue-1 ft-size-20">Frequently asked questions</p>
    <div class="page-body bg-neutral-white border-radius-6">
      <div>
        <el-collapse accordion>
          <pre>
        <el-collapse-item style="" v-for="(item, index) in items" :key="item.title" :title="'Q'+(index+1)+': '+item.title">
          <div style="font-size: initial; white-space: normal; max-width:1000px">{{item.answer}}</div>
        </el-collapse-item>
        </pre>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "faq",
  mounted() {},
  data() {
    return {
      items: [
        {
          title: "What is ALUE?",
          answer:
            "ALUE is a benchmark that can be used to assess models on their ability to perform on a wide range of NLP problems in Arabic (both MSA and dialects).\n Our tasks were carefully selected to reflect some of the most interesting problems in the field, as measured by the volume of published research for each. ALUE itself doesn’t provide any new datasets or tasks, but is rather a collection of already existing tasks. You can think of ALUE as a platform that helps researchers understand the strengths and weaknesses of their respective models against others. We also hope that ALUE will provide an impetus for multi-task learning research in Arabic.",
        },
        {
          title: "What is ALUE used for?",
          answer:
            "You can use ALUE by downloading the required data for each of the tasks, training your models on them, producing submission files as requested, and then submitting the full set of predictions to our automated evaluation program. If you report on your results in a publication, please make sure to properly cite ALUE.",
        },
        {
          title: "Are there any regulations for submission?",
          answer:
            "The only rule for the participants is that the training and/or fine tuning should not be carried on the test sets, private or otherwise, for any of the primary tasks.  Labelling a publicly available test set that was originally with no labels for training usage is considered as breaking the rules. Moreover, participants are not allowed to submit or publish any analysis about the test sets for the tasks. Systems related to such work will be removed from the leaderboard. With the above in mind, participants can submit results from any kind of system that produces the same labels of the five required tasks and the analysis tasks. This includes systems that do not share any components across tasks or systems not based on machine learning.",
        },
        {
          title: "Is there a predefined deadline for submission?",
          answer:
            "There are no deadlines for ALUE as it is a benchmark and not a competition. However, we expect that other iterations will follow in the future with a different collection of tasks, as we believe that the field of NLP is constantly evolving.",
        },
        {
          title: "How can I acquire the data for ALUE tasks?",
          answer:
            "Each dataset needs to be obtained from its original source as outlined in the Datasets page. Furthermore, given that many of these datasets were built using the Twitter feed, some of them might require that you fill in a form to ensure compliance with the General Data Protection Regulation (GDPR), before you can obtain the data.",
        },
        {
          title: "What is the type of license for ALUE data?",
          answer:
            "Each dataset has its own license as specified by its respective source. ALUE’s terms and conditions stipulate that failure to comply with the original license for any of the datasets used in ALUE is in direct violation of ALUE’s terms and conditions themselves. For information on the type of license for any dataset, we strongly recommend that you familiarize yourself with the type and requirements of the license used from the original source of the dataset itself.",
        },
        {
          title: "How were ALUE datasets generated?",
          answer:
            "ALUE is a collection of previously published tasks. We don’t claim ownership of any of these datasets, and they stay the property of their original curators. For more information on how each dataset was generated, kindly refer to the original source for each in Tasks page",
        },
        {
          title: "What is the leaderboard and how does it work?",
          answer:
            "The leaderboard shows the performance of a given model per task. Different tasks have different metrics, each identical to its original organizer’s choice. The final ranking of the model is calculated based on the unweighted average of its performance on all the tasks. For teams with multiple submissions, only the highest scoring submission is shown.",
        },
        {
          title:
            "I am trying to submit the results, but it is not appearing on the leaderboard. How do I fix it?",
          answer:
            "If your submission is not appearing on the leaderboard, please get in touch with at hello@alue.org",
        },
        {
          title:
            "What is the required information to be added along with my submission?",
          answer:
            "A detailed explanation of your model, how the pre-training data was obtained - if any - and any tricks used to achieve your final score are required at a minimum. Participants are generally encouraged to publish their experiments in appropriate academic avenues too.",
        },
        {
          title: "Can I make an anonymous submissions?",
          answer:
            "No. Anonymous submissions are not allowed. This is because one of the goals we strive to achieve by creating ALUE is to provide the Arabic NLP research community with an avenue where they can learn about the latest in the field and to form highly productive collaborations, that will ultimately benefit the community as a whole, and expedite and facilitate its achievements.",
        },
        {
          title: "How can I see more information about a submission?",
          answer:
            "On the leaderboard, go to the required submission under name, click on 'Details' icon to view the submission details.",
        },
        {
          title: "Is there a discussion group or any other contact info?",
          answer:
            "Yes. You can join the ALUE mailing list here \n ( https://groups.google.com/g/aluebenchmark ).",
        },
        {
          title: "How should I cite ALUE?",
          answer:
            "If you use ALUE in your work, please make sure to use the following bibtext to cite (to be decided later)." +
            "\n Also, please make sure you cite each and every task as a separate paper than ALUE’s.",
        },
        {
          title:
            "How can I reach you to discuss bugs, suggestions or just for a general chat?",
          answer:
            "There is a discussion group through which we can be reached. Please join ALUE boards mailing list here ( https://groups.google.com/g/aluebenchmark )",
        },
        {
          title: "Is partial participation accepted?",
          answer:
            "No. ALUE is meant to be used as a test of the performance of a given model on a variety of tasks. The ranking on the leaderboard takes into consideration all the tasks with equal weighting. In addition, technically speaking, the evaluation program will throw an error if any of the submissions is missing or is not properly formatted. Therefore, partial submissions are not accepted.",
        },
        {
          title: "Can one team have more than one submission?",
          answer:
            "Multiple submissions can be allowed if there was a reasonable justification behind them. This will be treated on a case by case basis, as we need to ensure that overfitting to the leaderboard is minimized as much as possible. If you want to make more than one submission, please get in touch with as at hello@alue.org",
        },
        {
          title: "Can I be part of more than one team?",
          answer:
            "Yes. As long as intellectual property is protected for the different teams, a participant can be part of multiple teams. In addition, all participants should keep in mind that plagiarism is strictly prohibited.",
        },
        {
          title: "What is the purpose of the diagnostic dataset?",
          answer:
            "The diagnostic data is meant to help probe the inner workings of your models and which signals in the data are they detecting or otherwise. Your model’s prediction on the diagnostic dataset should be part of the leaderboard. For that, you need to run your model for the XNLI task to predict the labels for the diagnostic dataset. For more information please refer to the diagnostic dataset section on the website and in the paper.",
        },
        {
          title: "Can I use the data for commercial purposes?",
          answer:
            "Each dataset has its own license as stipulated by the original owners of the data. Failure to comply with the license of any is in direct violation of the ALUE benchmark terms and conditions. For more information on the license of each, kindly refer to the original source for each dataset.",
        },
      ],
    };
  },
  methods: {},
};
</script>
