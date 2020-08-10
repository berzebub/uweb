<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <app-bar :isShowLogo="true" class="shadow-2"></app-bar>
    <div class="relative-position q-my-md">
      <p class="font-page" align="center">Thailand's key GVC relationships</p>
      <q-btn
        to="/involvement"
        no-caps
        class="bg4 absolute"
        style="right:10px;top:0px;width:190px"
        label="Continue"
      ></q-btn>
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
      <div style="width:90%;margin:auto" class="q-py-md" align="center">
        <q-img style="max-width:900px" src="../../public/getStarted1.png"></q-img>
      </div>
    </div>

    <hr />

    <div class="row q-pa-md">
      <div class="col-5">
        <div class="color4">
          <b>Backward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of foreign value-added in sectoral gross exports (%)
          Foreign value-added (billions)
        </p>
      </div>
      <div class="col-5 offset-2">
        <div class="color4">
          <b>Forward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of contribution to partner exports, in sectoral gross exports (%)
          Contribution to partner exports (billions)
        </p>
      </div>
    </div>

    <p class="font-graph q-py-md" align="center">key GVC relationships byt sector</p>

    <div align="center">
      <q-img style="width:90%;max-width:900px" src="../../public/getStarted2.png"></q-img>
    </div>
    <div style="height:20px"></div>
    <hr />
    <div style="height:20px"></div>

    <!-- *********** -->
    <p class="font-graph q-py-md" align="center">key GVC relationships by economy</p>

    <div class="row q-pa-md">
      <div class="col-5">
        <div class="color4">
          <b>Backward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of foreign value-added in sectoral gross exports (%)
          Foreign value-added (billions)
        </p>
      </div>
      <div class="col-5 offset-2">
        <div class="color4">
          <b>Forward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of contribution to partner exports, in sectoral gross exports (%)
          Contribution to partner exports (billions)
        </p>
      </div>
    </div>
    <div align="center">
      <q-img style="width:90%;max-width:900px" src="../../public/getStarted2.png"></q-img>
    </div>
    <div style="height:20px"></div>
    <div class="q-px-md" align="right">
      <q-btn to="/involvement" no-caps class="bg4" style="width:190px" label="Continue"></q-btn>
    </div>
    <hr />
    <div style="height:20px"></div>
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