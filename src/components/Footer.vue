<style scoped lang="scss">
#app {
  .footer {
    height: 250px;
    .footer-inner-cont {
      padding: 48px 15px;
      .logo-cont {
        width: 380px;
        img {
          margin-bottom: 24px;
        }
        .address {
          margin-bottom: 6px;
        }
      }
      .headline {
        margin: 25px 0 30px 0;
      }
      a {
        text-decoration: none;
        margin-bottom: 6px;
        width: fit-content;
      }
      .copyrights {
        margin-top: 50px;
      }
      .social-links-cont {
        width: 110px;
        .social-fb {
          margin-top: -1px;
        }
        .social-twitter {
          margin-top: 2px;
        }
        .social-linkedin {
          margin-top: -2px;
        }
      }
    }
  }
}

/* MEDIA STYLES BELOW */
@media only screen and (max-width: 1199px) {
  #app {
    .footer {
      .footer-inner-cont {
        .logo-cont {
          width: 300px;
        }
      }
    }
  }
}
@media only screen and (max-width: 991px) {
  #app {
    .footer {
      .footer-inner-cont {
        .logo-cont {
          width: 200px;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  #app {
    .footer {
      height: auto;
      .footer-inner-cont {
        padding: 24px 15px;
        .headline {
          margin: 15px 0 10px 0;
        }
        .footer-links {
          flex-direction: column;
        }
        .logo-cont {
          img {
            width: 120px;
            margin-bottom: 16px;
          }
        }
        .copyrights {
          margin-top: 25px;
          text-align: center;
        }
      }
    }
  }
}
</style>
<template>
  <div class="footer bg-blue-1">
    <div class="container-wrapper footer-inner-cont">
      <div class="footer-links horizontal layout">
        <div class="logo-cont">
          <img src="../assets/images/logo-white.svg" />
          <p class="address m-0 ft-neutral-white ft-size-14">
            3B, Yaser Sabaaneh St.
          </p>
          <p class="m-0 ft-neutral-white ft-size-14">Amman Jordan</p>
		  <p class="copyrights m-0 ft-neutral-white ft-size-14">
          Copyright © Mawdoo3.com {{ get_year() }}
        </p>
        </div>
        <div class="vertical layout flex">        </div>
		<div class="vertical layout flex">        </div>
		<div class="vertical layout flex">        </div>
        <div class="vertical layout flex">
          <p class="m-0 ft-neutral-white ft-size-18 ft-w-700 headline">
            About Us
          </p>
          <a v-on:click="goPrivacy" href="" class="ft-neutral-white"
            >Privacy Policy</a
          >

          <a v-on:click="goTerms" href="" class="ft-neutral-white"
            >Terms & Conditions</a
          >
          <a
            class="ft-neutral-white m-0 pointer"
            href="mailto:hello@alue.org"
            target="_blank"
            >Contact Us</a
          >
        </div>
        <!-- <div class="vertical layout flex">
          <p class="m-0 ft-neutral-white ft-size-18 ft-w-700 headline">
            Learn & Grow
          </p>
          <a
            href="https://www.linkedin.com/jobs/search?locationId=OTHERS%2Eworldwide&amp;f_C=9464944&trk=top-card_top-card-primary-button-top-card-primary-cta"
            class="ft-neutral-white"
            target="_blank"
            >Careers</a
          >
        </div> -->
        <!-- <div class="vertical layout flex">
						<p class="m-0 ft-neutral-white ft-size-18 ft-w-700 headline">Social Media</p>
						<div class="social-links-cont horizontal layout d-flex space-around">
							<a href="https://www.facebook.com/SalmaAIapp" target="_blank"><img class="social-fb" src="../assets/images/social-media/social-fb.svg" alt="facebook URL"></a>
							<a href="https://twitter.com/SalmaAIapp" target="_blank"><img class="social-twitter" src="../assets/images/social-media/social-twitter.svg" alt="twitter URL"></a>
							<a href="https://www.linkedin.com/in/salma-ai-82b900179/" target="_blank"><img class="social-linkedin" src="../assets/images/social-media/social-linkedin.svg" alt="linkedin URL"></a>
						</div>
					</div> -->
      </div>
      <!-- <div>
        <p class="copyrights m-0 ft-neutral-white ft-size-14">
          Copyright © Mawdoo3.com 2020
        </p>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "alue-footer",
  data() {
    return {};
  },
  methods: {
    get_year: function () {
      return new Date().getFullYear()
    },
    dialogVisible: function () {
      this.$parent.dialogVisible = true;
    },
    goTerms: function () {
      this.$router.push({ path: "/terms_and_conditions" });
    },
    goPrivacy: function () {
      this.$router.push({ path: "/privacy_policy" });
    },
  },
};
</script>