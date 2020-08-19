<template>
  <q-page class="container bg-white" style="padding-bottom:120px">
    <app-bar
      :isShowLogo="false"
      @countrySelected="exportingEconomyChanged"
      @yearSelected="(val) => displayYear = val "
    ></app-bar>
    <header-menu :activeMenu="4"></header-menu>
    <importcountry @importingEconomy="importingEconomyChanged"></importcountry>

    <error-page
      v-show="isShowErrorWarning"
      displayText="The exporting economy must not be the same as the importing economy."
    ></error-page>

    <div v-show="!isShowErrorWarning">
      <!-- Title box -->
      <div class="q-px-md" style="margin:auto; max-width:1050px;width:95%;">
        <div class="q-pa-md" style="border-radius:5px;border:2px solid">
          <p
            class="font-graph"
            align="center"
          >Where does {{ displayCountry }} contribute towards export production?</p>
          <p
            class="font-content"
            align="center"
          >Some part of {{ displayCountry }}’s gross exports consist of intermediate inputs that are used by the direct importer to produce exports for third economies.</p>
          <div class="font-content" align="center">
            <span class="q-px-lg">Exporting economy ({{displayCountry}})</span>
            <span class="q-px-lg text-weight-bold">:</span>
            <span class="q-pr-lg">Sector</span>
            <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
            <span class="q-px-lg">Importing economy</span>
            <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
            <span class="q-pl-lg">Third economies</span>
          </div>
        </div>

        <!-- Key policy questions -->
        <p align="center" class="font-graph q-py-lg">Key policy questions</p>
        <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedcountry'">
          1.
          <u>Which sectors in {{ displayCountry }} are most reliant on export production in a selected importer?</u>
        </p>
        <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedregion'">
          2.
          <u>Which sectors in {{ continent }} economies are most reliant on export production in a selected importer?</u>
        </p>
      </div>

      <div style="height:30px"></div>
      <hr />
      <div style="height:30px"></div>
      <div
        class="font-graph"
        align="center"
      >Which sectors in {{ displayCountry }} are most reliant on export production in {{ displayImportingEconomy }}?</div>
      <div align="center">
        <div style="max-width:900px;width:100%;margin:auto" class>
          <div style="height:15px"></div>
          <p
            align="left"
            class="q-px-xl"
          >Contribution to {{ displayImportingEconomy }} export production :$8B</p>
          <img class src="../../public/images/forwardsector01-1.jpg" alt />
          <p align="left" class="q-px-xl">Gross exports to {{ displayImportingEconomy }}: $40B</p>

          <img class src="../../public/images/forwardsector01-legend.jpg" alt />
        </div>
      </div>
      <div style="height:30px"></div>
      <hr />
      <div style="height:30px"></div>
      <div
        class="font-graph"
        align="center"
      >Which sectors in {{ continent }} economies are most reliant on export production in {{ displayImportingEconomy }}?</div>
      <div align="center">
        <img src="../../public/images/backsector02.jpg" alt width="900px;" />
      </div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import importcountry from "../components/importcountry";
import errorPage from "../components/error-page";

export default {
  components: {
    appBar,
    headerMenu,
    importcountry,
    errorPage,
  },
  data() {
    return {
      displayCountry: "",
      displayYear: "",
      continent: "",
      displayImportingEconomy: "",
      isShowErrorWarning: false,
    };
  },
  methods: {
    importingEconomyChanged(val) {
      this.displayImportingEconomy = val;
      if (val == this.displayCountry) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;
      }
    },
    exportingEconomyChanged(val) {
      this.displayCountry = val.name;
      this.continent = val.region;
      if (val == this.displayImportingEconomy) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;
      }
    },
  },
};
</script>

<style  scoped>
</style>