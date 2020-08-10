<template>
  <q-page class="container bg-white">
    <app-bar :isShowLogo="false"></app-bar>
    <header-menu></header-menu>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";

export default {
  components: {
    appBar,
    headerMenu,
  },
};
</script>

<style lang="scss" scoped>
</style>