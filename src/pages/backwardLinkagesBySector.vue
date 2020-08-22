<template>
  <q-page class="container bg-white" style="padding-bottom:120px">
    <app-bar
      :isShowLogo="false"
      @countrySelected="exportingEconomyChanged"
      @yearSelected="(val) => displayYear = val "
    ></app-bar>
    <header-menu :activeMenu="3"></header-menu>
    <source-select @importingEconomy="importingEconomyChanged" @sourcingEconomy="sourceChanged"></source-select>

    <error-page
      v-show="isShowErrorWarning"
      displayText="The exporting economy, the importing economy and the source economy cannot be the same."
    ></error-page>

    <div v-show="!isShowErrorWarning">
      <!-- Title box -->
      <div class="q-px-md" style="margin:auto; max-width:1050px;width:95%;">
        <div class="q-pa-md" style="border-radius:5px;border:2px solid">
          <p class="font-graph" align="center">Where does imported content come from?</p>
          <p
            class="font-content"
            align="center"
          >Some part of {{ displayCountry }}’s gross exports consist of imported inputs that originate in other source economies.</p>
          <p class="font-content" align="center">
            <span class="q-pr-lg">Source economy</span>

            <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
            <span class="q-px-lg">Exporting economy ({{ displayCountry }})</span>
            <span class="q-px-lg text-weight-bold">:</span>
            <span class="q-pr-lg">Sector</span>
            <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
            <span class="q-pl-lg">Importing economy</span>
          </p>
        </div>

        <!-- Key policy questions -->
        <p align="center" class="font-graph q-py-lg">Key policy questions</p>
        <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedcountry'">
          1.
          <u>Which sectors in {{ displayCountry }} rely the most on imported content for exports to a selected importer?</u>
        </p>
        <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedregion'">
          2.
          <u>Which sectors in {{ continent }} economies rely the most on imported content for exports to a selected importer?</u>
        </p>
      </div>

      <div style="height:30px"></div>
      <hr />
      <div style="height:30px"></div>
      <div
        class="font-graph"
        align="center"
      >Which sectors in {{ displayCountry }} rely the most on imported content from {{displaySourceEconomy}} in exports to {{ displayImportingEconomy }}?</div>
      <div align="center" style="width:900px; margin:auto;">
        <p
          align="left"
        >Imported content from {{ displaySourceEconomy }} in exports to {{ displayImportingEconomy }} : $8B</p>
        <q-img src="../../public/images/backsector01-1.jpg" />
        <p align="left">Gross exports to {{ displayImportingEconomy }} :$40 B</p>
        <q-img src="../../public/images/backsector01-legend.jpg" />
      </div>
      <div style="height:30px"></div>
      <hr />
      <div style="height:30px"></div>
      <div
        class="font-graph"
        align="center"
      >Which sectors in {{ continent }} economies rely the most on imported content from {{ displaySourceEconomy }} in exports to {{ displayImportingEconomy }}?</div>
      <div align="center" style="width:900px; margin:auto;">
        <q-img src="../../public/images/backsector02.jpg" />
      </div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import sourceSelect from "../components/importsource";
import errorPage from "../components/error-page";

export default {
  components: {
    appBar,
    headerMenu,
    sourceSelect,
    errorPage,
  },
  data() {
    return {
      continent: "",
      displayCountry: "",
      displayYear: "",
      displaySourceEconomy: "",
      displayImportingEconomy: "",
      isShowErrorWarning: false,
    };
  },
  methods: {
    renderGraph() {},
    importingEconomyChanged(val) {
      this.displayImportingEconomy = val;
      if (val == this.displayCountry || val == this.displaySourceEconomy) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;
      }
    },
    sourceChanged(val) {
      this.displaySourceEconomy = val;
      if (val == this.displayCountry || val == this.displayImportingEconomy) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;
      }
    },
    exportingEconomyChanged(val) {
      this.displayCountry = val.name;
      this.continent = val.region;

      if (
        val == this.displayImportingEconomy ||
        val == this.displaySourceEconomy
      ) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;
      }
      // this.renderGraph();
    },
  },
};
</script>

<style  scoped>
</style>