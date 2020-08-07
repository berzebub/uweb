<template>
  <q-layout view="lHh Lpr lFf">
    <q-footer style="background-color:#020B3B" class="q-py-md">
      <div
        class="row justify-between q-px-sm items-center"
        style="max-width:1024px;margin:auto;width:100%"
      >
        <div style="max-width:180px">
          <q-img style="width:162px" src="../../public/logo.png"></q-img>
        </div>
        <div class="q-pl-md" style="max-width:180px">
          <q-img style="width:162px" src="../../public/fealac.png"></q-img>
        </div>
        <div class="row col" style="max-width:600px">
          <div class="col-12 q-col-gutter-md" align="right">
            <q-icon size="30px" name="fab fa-twitter"></q-icon>
            <q-icon size="30px" name="fab fa-facebook-f"></q-icon>
            <q-icon size="30px" name="fab fa-youtube"></q-icon>
            <q-icon size="30px" name="fab fa-instagram"></q-icon>
            <q-icon size="30px" name="fab fa-flickr"></q-icon>
            <q-icon size="30px" name="fab fa-invision"></q-icon>
          </div>
          <div class="col-12 q-py-sm q-px-md">
            <q-separator color="white"></q-separator>
          </div>
          <div class="col-12 q-px-md">
            <div class="row justify-between">
              <router-link to="/about" class="text-white" style="text-decoration:none;">
                <span>About</span>
              </router-link>
              <router-link to="/" class="text-white" style="text-decoration:none;">
                <span>Trade-etools</span>
              </router-link>
              <router-link to="/" class="text-white" style="text-decoration:none;">
                <span>ESCAP Trade</span>
              </router-link>
              <router-link to="/" class="text-white" style="text-decoration:none;">
                <span>ESCAP Trade Policy</span>
              </router-link>
              <router-link to="/teamofus" class="text-white" style="text-decoration:none;">
                <span>Terms of use</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
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
};
</script>

<style >
.brx {
  border: 1px solid red;
}
</style>
