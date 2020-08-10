<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="relative-position">
      <router-view class="container shadow-10" />

      <div style="background-color:#020B3B;" class="container q-py-md absolute-bottom">
        <q-toolbar class="q-px-sm items-center">
          <div class="q-mx-lg" style="max-width:180px">
            <q-img style="width:162px" src="../../public/logo.png"></q-img>
          </div>
          <div class="q-mx-lg" style="max-width:180px">
            <q-img style="width:162px" src="../../public/fealac.png"></q-img>
          </div>
          <q-space />
          <div class="row full-width" align="right">
            <div class="col-12 q-col-gutter-md text-white" align="right">
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-twitter"
                @click="twitterLink()"
              ></q-icon>
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-facebook-f"
                @click="facebookLink()"
              ></q-icon>
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-youtube"
                @click="youtubeLink()"
              ></q-icon>
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-instagram"
                @click="instragramLink()"
              ></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-flickr" @click="flickrLink()"></q-icon>
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-invision"
                @click="linkedinLink()"
              ></q-icon>
            </div>
            <div class="col-12 q-py-sm q-px-md">
              <q-separator color="white"></q-separator>
            </div>
            <div class="col-12 q-px-md">
              <div class="row justify-between">
                <router-link to="/about" class="text-white" style="text-decoration:none;">
                  <span>About</span>
                </router-link>
                <div
                  to="/"
                  @click="toTradeEtools()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>Trade-etools</span>
                </div>
                <div
                  @click="toEscapTrade()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>ESCAP Trade</span>
                </div>
                <div
                  @click="toTradeEtoolsPolicy()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>ESCAP Trade Policy</span>
                </div>
                <router-link to="/termOfUse" class="text-white" style="text-decoration:none;">
                  <span>Terms of use</span>
                </router-link>
              </div>
            </div>
          </div>
        </q-toolbar>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  data() {
    return {};
  },
  methods: {
    twitterLink() {
      window.open("https://twitter.com/unescap", "_blank");
    },
    facebookLink() {
      window.open("https://www.facebook.com/UNESCAP", "_blank");
    },
    youtubeLink() {
      window.open("https://www.youtube.com/user/unescap", "_blank");
    },
    instragramLink() {
      window.open("https://www.instagram.com/unitednationsescap/", "_blank");
    },
    flickrLink() {
      window.open("https://www.flickr.com/photos/unitednationsescap", "_blank");
    },
    linkedinLink() {
      window.open(
        "https://www.linkedin.com/company/united-nations-escap/",
        "_blank"
      );
    },
    toEscapTrade() {
      window.open("https://artnet.unescap.org/databases", "_blank");
    },
    toTradeEtools() {
      window.open(
        "https://www.unescap.org/our-work/trade-investment-innovation",
        "_blank"
      );
    },
    toTradeEtoolsPolicy() {
      window.open(
        "https://www.unescap.org/our-work/trade-investment-innovation",
        "_blank"
      );
    },
  },
};
</script>

<style >
.brx {
  border: 1px solid red;
}
</style>
