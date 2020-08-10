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
          <div class="row" align="right">
            <div class="col-12 q-col-gutter-md text-white" align="right">
              <q-icon class="cursor-pointer" size="30px" name="fab fa-twitter"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-facebook-f"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-youtube"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-instagram"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-flickr"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-invision"></q-icon>
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
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
  methods: {
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
