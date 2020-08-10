<template>
  <q-page class="container">
    <app-bar :isShowLogo="true" class="shadow-2"></app-bar>
    <div class="relative-position q-my-md">
      <p class="font-page" align="center">Thailand's key GVC relationships</p>
      <q-btn class="bg4 absolute" style="right:10px;top:0px;width:190px" label="Continue"></q-btn>
    </div>

    <div class="font-content q-px-xl q-pt-md">
      <p>
        Thailand’s GVC exports amount to
        <span class="text-red">33% ($85 billion)</span> of its gross exports in 2017
      </p>
      <p>
        Imported content comprising
        <span class="text-red">26% ($67 billion)</span> of gross exports
      </p>
      <p>
        Export of intermediates used in further export production comprising
        <span
          class="text-red"
        >7% ($18 billion)</span> of gross exports
      </p>
      <div style="width:90%;margin:auto" class="q-py-md">
        <q-img style="max-width:1000px" src="../../public/getStarted1.png"></q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
export default {
  components: {
    appBar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>