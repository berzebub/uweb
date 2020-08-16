<template>
  <q-page class="container bg-white" style="padding-bottom:120px">
    <app-bar :isShowLogo="false"></app-bar>
    <header-menu :activeMenu="4"></header-menu>
    <importcountry></importcountry>

    <!-- Title box -->
    <div class="q-px-md" style="margin:auto; max-width:1050px;width:95%;">
      <div class="q-pa-md" style="border-radius:5px;border:2px solid">
        <p
          class="font-graph"
          align="center"
        >Where does Thailand contribute towards export production?</p>
        <p
          class="font-content"
          align="center"
        >Some part of Thailand’s gross exports consist of intermediate inputs that are used by the direct importer to produce exports for third economies.</p>
        <p class="font-content" align="center">
        
<span class="q-px-lg">Exporting economy (Thailand)</span>
          <span class="q-px-lg text-weight-bold">:</span>
          <span class="q-pr-lg">Sector</span
          <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
            <span class="q-pr-lg">Importing economy</span>
          <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
          <span class="q-pl-lg">Third economies</span>
        </p>
      </div>

      <!-- Key policy questions -->
      <p align="center" class="font-graph q-py-lg">Key policy questions</p>
      <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedcountry'">
        1.
        <u>Which sectors in Thailand are most reliant on export production in a selected importer?</u>
      </p>
      <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedregion'">
        2.
        <u>Which sectors in South-East Asian economies are most reliant on export production in a selected importer?</u>
      </p>
    </div>

    <div style="height:30px"></div>
    <hr />
    <div style="height:30px"></div>
    <div
      class="font-graph"
      align="center"
    >Which sectors in Thailand are most reliant on export production in China?</div>
    <div align="center">
      <img src="../../public/images/forwardsector01.jpg" alt width="900px;" />
    </div>
    <div style="height:30px"></div>
    <hr />
    <div style="height:30px"></div>
    <div
      class="font-graph"
      align="center"
    >Which sectors in South-East Asian economies are most reliant on export production in China?</div>
    <div align="center">
      <img src="../../public/images/backsector02.jpg" alt width="900px;" />
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import importcountry from "../components/importcountry";

export default {
  components: {
    appBar,
    headerMenu,
    importcountry,
  },
};
</script>

<style  scoped>
</style>