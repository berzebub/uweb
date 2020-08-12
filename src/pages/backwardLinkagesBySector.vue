<template>
  <q-page class="container bg-white" style="padding-bottom:120px">
    <app-bar :isShowLogo="false"></app-bar>
    <header-menu :activeMenu="3"></header-menu>
    <importing-select></importing-select>

    <div class="q-px-md">
      <div class="q-pa-md" style="border-radius:5px;border:2px solid">
        <p class="font-graph" align="center">Where does imported content come from?</p>
        <p
          class="font-content"
          align="center"
        >Some part of Thailand’s gross exports consist of imported inputs that originate in other source economies.</p>
        <p class="font-content" align="center">
          <span class="q-pr-lg">Source economy</span>

          <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
          <span class="q-px-lg">Exporting economy (Thailand)</span>
          <span class="q-px-lg text-weight-bold">:</span>
          <span class="q-pr-lg">Sector</span>
          <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
          <span class="q-pl-lg">Importing economy</span>
        </p>
      </div>

      <p align="center" class="font-graph q-py-lg">Key policy questions</p>
      <p class="font-content q-px-sm">
        1.
        <u>Which sectors in Thailand rely the most on imported content for exports to a selected imported?</u>
      </p>
      <p class="font-content q-px-sm">
        2.
        <u>Which sectors in South-East Asian economies rely the most on imported content for exports to a selected importer?</u>
      </p>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";

import importingSelect from "../components/importEconomySelect";

export default {
  components: {
    appBar,
    headerMenu,
    importingSelect,
  },
};
</script>

<style lang="scss" scoped>
</style>