<style scoped lang="scss">
.home-cont {
  .logo-cont {
    width: 300px;
    margin: 0 auto;
    height: 150px;
    span {
      margin-top: 6px;
    }
    img {
      flex-grow: 0;
      max-width: 66.666667%;
      flex-basis: 66.666667%;
    }
  }
  .intro-cont {
    max-width: 50vw;
    margin: 0 auto;
    .intro {
      text-align: justify;
      line-height: 1.3;
      a {
        text-decoration: none;
      }
    }
  }
}

/* MEDIA STYLES BELOW */
@media only screen and (max-width: 767px) {
  .home-cont {
    .logo-cont {
      height: 150px;
      span {
        font-size: 40px;
        margin-top: 0px;
      }
      p {
        font-size: 50px;
      }
    }
    .intro-cont {
      max-width: 92vw;
    }
  }
}
</style>

<template>
  <div class="home-cont">
    <meta name="viewport" content="width=1024" />

    <div class="logo-cont horizontal layout align-center justify-center">
      <div class="grid-content bg-purple-dark">
            <p class="ft-size-86 ft-blue-3 m-0">
              <span class="logo-icon el-icon-phone ft-blue-3 ft-size-68"></span
              >ALUE
            </p>
          </div>
    </div>
    <div class="horizontal layout align-center justify-center">
      <p style="position: absolute; font-size: larger; color: #00c2c3">
        <b>A</b>rabic <b>L</b>anguage <b>U</b>nderstanding <b>E</b>valuation
      </p>
    </div>
    <br/><br/><br/><br/><br/><br/>
    <div
      class="intro ft-size-18 ft-blue-1 logo-cont horizontal flex layout align-center justify-center"
    >
      <img src="../assets/images/aub.png" />
      <img src="../assets/images/mind.png" />
      <img src="../assets/images/mawdoo3.png" />
      <img src="../assets/images/camel.png" />
      <img src="../assets/images/nyu.png" />
      <br />
    </div>

    <div class="intro-cont flex">
      <p class="intro ft-size-18 ft-blue-1">
        The goal of this project is to create an Arabic benchmark for multi-task
        learning, similar to the
        <a class="ft-blue-3" href="https://gluebenchmark.com/" target="_blank"
          >GLUE benchmark</a
        >. But where GLUE’s main focus is core and challenging NLP/NLU tasks, a
        major focus of our benchmark will be on dialectical tasks. The datasets
        comprising the benchmark will not necessarily be owned by
        <a class="ft-blue-3" href="https://ai.mawdoo3.com/" target="_blank"
          >mawdoo3</a
        >. As a matter of fact, out of the eight proposed datasets for inclusion
        in the benchmark, two of them are owned by mawdoo3. A list of all the
        proposed datasets, along with a link to their online sources where
        applicable are available in
        <span class="ft-blue-3 ft-w-bold pointer" v-on:click="goTasks"
          >Tasks</span
        >.
      </p>
      <h3>Authors</h3>
      <p class="intro ft-size-17 ft-blue-1" style="width: 100%">
        Haitham Seelawi, Ibraheem Tuffaha, Mahmoud Gzawi, Wael Farhan, Bashar
        Talafha, Riham Badawi, Zyad Sober, Oday Al-Dweik, Abed Alhakim Freihat,
        and Hussein T. Al-Natsheh
      </p>
      <!-- <ul>
        <li>Nizar Habash</li>
        <li>Hazem Hajj</li>
        <li>Wassim El Hajj</li>
      </ul> -->

      <h3>Steering Committee</h3>
      <ul>
        <li>Nizar Habash</li>
        <li>Hazem Hajj</li>
        <li>Wassim El Hajj</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "home",
  mounted() {},
  data() {
    return {};
  },
  methods: {
    goTasks: function () {
      this.$router.push({ path: "/tasks" });
    },
  },
};
</script>
