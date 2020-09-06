<template>
  <q-page
    class="container"
    :class="!isShowPage || isShowErrorWarning ? 'bg-loading' : 'bg-white'"
    style="padding-bottom:100px"
  >
    <app-bar :isShowLogo="false" @countrySelected="getEmitData"></app-bar>
    <div class="bg-white">
      <header-menu :activeMenu="2"></header-menu>
      <!-- Importing Economy -->

      <div class="row q-py-xl" style="width:50%;min-width:320px;margin:auto">
        <div class="col-6 q-px-md">
          <span>Importing economy</span>
          <q-select
            @input="getStructureOfValue()"
            dense
            outlined
            :options="countryOptions"
            v-model="importingEconomy"
            emit-value
            map-options
          ></q-select>
        </div>

        <div class="col-6 q-px-md">
          <span>Sector</span>
          <q-select
            @input="getStructureOfValue()"
            dense
            outlined
            :options="sectorOptions"
            v-model="sectorSelected"
            emit-value
            map-options
          ></q-select>
        </div>
      </div>
    </div>

    <div
      class="absolute-center font-graph"
      v-if="!isShowPage"
      style="width:90%; margin:auto; max-width:700px; text-align:center "
    >Please choose your exporting economy, year of interest, importing economy and sector.</div>

    <div v-if="isShowPage" class="relative-position">
      <!-- Error Page -->
      <error-page
        class="q-pt-md"
        v-show="isShowErrorWarning"
        displayText="The exporting economy must not be the same as the 
importing economy."
      ></error-page>

      <!-- Show Content -->
      <div v-show="!isShowErrorWarning">
        <div class="q-px-md">
          <div
            style="border-radius:10px;border:2px solid; width:90%;margin:auto;max-width:1200px"
            class="q-pa-md"
          >
            <p class="font-graph" align="center">Why does GVC participation matter?</p>
            <p
              class="font-content"
            >GVC participation matters for development. GVCs support efficient production and technology diffusion, and access to capital and inputs thereby increasing productivity and income growth, and reducing poverty.</p>
            <p
              class="font-content"
            >In addition, recent developments in digital technology are set to support integration of SMEs into GVCs, further amplifying sustainable outcomes from participation.</p>
          </div>
        </div>

        <div style="height:30px"></div>
        <div style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isChart">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isChart">
            <div id="container1"></div>
          </div>
        </div>
        <div style="height:30px"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import importingSelect from "../components/importEconomySelect";
import errorPage from "../components/error-page";
import Axios from "axios";
export default {
  components: {
    appBar,
    headerMenu,
    importingSelect,
    errorPage,
  },
  data() {
    return {
      isShowPage: false,
      countryOptions: [],
      importingEconomy: "",

      sectorOptions: [],
      sectorSelected: "",

      continent: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").region
        : "",

      displayYear: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").year
        : "",

      displayImportingEconomy: "",
      exp_country: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").iso
        : "",

      displayExportingEconomy: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").name
        : "",
      imp_country: "",

      displaySector: "",
      sector: "",

      isShowErrorWarning: false,

      isChart: false,
    };
  },
  methods: {
    checkShowPage() {
      if (
        this.displayExportingEconomy != "" &&
        this.displayYear != "" &&
        this.displayImportingEconomy != "" &&
        this.displaySector != ""
      ) {
        this.isShowPage = true;
        return true;
      } else {
        return false;
      }
    },
    // Get Emit Data
    getEmitData(val) {
      // Exporting Economy
      this.displayExportingEconomy = val.name;
      this.exp_country = val.iso;
      this.continent = val.region;
      this.displayYear = val.year;
      this.checkShowPage();
      this.getStructureOfValue();
    },

    // Get Structure Of Value
    getStructureOfValue() {
      // Importing Economy
      let countryData = this.countryOptions.filter(
        (x) => x.value == this.importingEconomy
      )[0];

      let sectorData = this.sectorOptions.filter(
        (x) => x.value == this.sectorSelected
      )[0];

      if (countryData) {
        this.displayImportingEconomy = countryData.label;
        this.imp_country = countryData.iso;
      }

      if (sectorData) {
        this.displaySector = sectorData.label;
        this.sector = sectorData.value;
      }

      let check = this.checkShowPage();
      if (check) {
        if (this.displayImportingEconomy == this.displayExportingEconomy) {
          this.isShowErrorWarning = true;
          return;
        }

        this.isShowErrorWarning = false;

        this.renderGraph(); // Render Graph
      }
    },
    // ------------------------------------------------------------

    renderGraph() {
      this.setStackChart();
    },

    async setStackChart() {
      this.isChart = false;
      let urlLink = `https://api.winner-english.com/u_api/cal_participation.php?exp_country=${this.exp_country}&imp_country=${this.imp_country}&year=${this.displayYear}&sector=${this.sector}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;

      let countryList = [];
      let forwardList = [];
      let backwardList = [];
      let doubleList = [];

      getData.map((x) => {
        countryList.push(x.country);
        forwardList.push(x.forward);
        backwardList.push(x.backward);
        doubleList.push(x.double);
      });

      this.isChart = true;

      Highcharts.chart("container1", {
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%", // 16:9 ratio
        },

        xAxis: {
          labels: {
            rotation: -90,
          },
          categories: countryList,
        },
        yAxis: {
          min: 0,
          title: {
            text: `% of gross exports to ${this.displayImportingEconomy}`,
          },
          stackLabels: {
            enabled: false,
            style: {
              fontWeight: "bold",
              color:
                // theme
                (Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "gray",
            },
          },
        },
        credits: {
          enabled: false,
        },
        legend: {
          useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
          },
          width: 300,
          layout: "vertical",
          enabled: true,
          align: "right",
          verticalAlign: "middle",
          itemMarginTop: 25,
          symbolHeight: 15,
          symbolWidth: 50,
          symbolRadius: 0,
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: false,
            },
          },
        },
        series: [
          {
            name: `Used in ${this.displayImportingEconomy}'s export production <br>(forward linkages)`,
            data: forwardList,
            color: "#2381B8",
          },
          {
            name: "Imported content (backward linkages)",
            data: backwardList,
            color: "#EB1E63",
          },
          {
            name: "Double counted exports from <br>repeated border crossings",
            data: doubleList,
            color: "#f99704",
          },
        ],
        title: {
          style: {
            fontSize: "24px",
            fontFamily: "roboto",
          },
          text: `How much of ${this.displayExportingEconomy}’s exports to ${this.displayImportingEconomy} are GVC related <br>compared to other ${this.continent} economies?`,
        },
      });
    },
  },
  async mounted() {
    await this.getCountryList();
    await this.getSectorList();
  },
};
</script>

<style lang="scss" scoped>
</style>