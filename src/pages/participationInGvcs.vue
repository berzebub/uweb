<template>
  <!-- <q-page
    class="container"
    :class="!isShowPage || isShowErrorWarning ? 'bg-loading' : 'bg-white'"
    style="padding-bottom:100px"
  >
    <app-bar :isShowLogo="false" @countrySelected="getEmitData"></app-bar>
    <div class="bg-white">
      <header-menu :activeMenu="2"></header-menu>
     

      <div class="row q-py-xl" style="width:50%;min-width:320px;margin:auto">
        <div class="col-6 q-px-md">
          <span>Importing economy</span>
          <q-select
            @input="getStructureOfValue()"
            dense
            outlined
            :options="exp_options"
            v-model="importingEconomy"
            emit-value
            map-options
          ></q-select>
        </div>

        <div class="col-6 q-px-md">
          <span>Exporting sector</span>
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
    >Please choose your importing economy and exporting sector.</div>

    <div v-if="isShowPage" class="relative-position">
     
      <error-page
        class="q-pt-md"
        v-show="isShowErrorWarning"
        displayText="The exporting economy must not be the same as the 
importing economy."
      ></error-page>

     
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
  </q-page>-->

  <q-page>
    <global-value-chains-header></global-value-chains-header>

    <global-value-chains-menu :activeMenu="2"></global-value-chains-menu>

    <!-- DROPDOWN SELECTION -->
    <div class="bg12 q-pa-md q-pb-lg">
      <div class="row justify-center">
        <div class="col-3 q-pa-sm">
          <span>Exporting economy</span>
          <div>
            <q-select
              v-model="exp_country"
              :options="exp_optionsShow"
              outlined
              bg-color="white"
              class="q-mt-xs"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterExpCountry"
              @input="selectedData()"
            >
              <template v-slot:prepend v-if="expCountry">
                <gb-flag
                  class="q-mr-sm"
                  v-if="expCountry.code"
                  :code="expCountry.code"
                  size="small"
                />
              </template>

              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <gb-flag v-if="scope.opt.code" :code="scope.opt.code" size="small" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption>
                      {{
                      scope.opt.description
                      }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="col-3 q-pa-sm">
          <span>Year</span>
          <div>
            <q-select
              v-model="year"
              :options="yearOptions"
              outlined
              bg-color="white"
              class="q-mt-xs"
              dense
              @input="selectedData()"
            ></q-select>
          </div>
        </div>
      </div>

      <div class="row justify-center">
        <div class="col-3 q-pa-sm">
          <span>Importing economy</span>
          <div>
            <q-select
              v-model="imp_country"
              :options="imp_optionsShow"
              outlined
              bg-color="white"
              class="q-mt-xs q-mb-xs"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterImpCountry"
              @input="selectedData()"
            >
              <template v-slot:prepend v-if="impCountry">
                <gb-flag
                  class="q-mr-sm"
                  v-if="impCountry.code"
                  :code="impCountry.code"
                  size="small"
                />
              </template>

              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <gb-flag v-if="scope.opt.code" :code="scope.opt.code" size="small" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption>
                      {{
                      scope.opt.description
                      }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="col-3 q-pa-sm">
          <span>Exporting sector</span>
          <div>
            <q-select
              bg-color="white"
              class="q-mt-xs q-mb-xs"
              v-model="sector"
              emit-value
              map-options
              dense
              :options="sectorOptions"
              outlined
              @input="selectedData()"
            ></q-select>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Details -->
    <div v-if="exp_country && year && imp_country && sector">
      <!-- Sorry Duplicates -->
      <div v-if="exp_country == imp_country">
        <sorry-duplicate
          text="Please choose exporting economy, importing economy, exporting sector and year from the drop down menus above"
        ></sorry-duplicate>
      </div>

      <!-- Details -->
      <div class="bg-white" v-else>
        <div class="row">
          <div class="col-3">
            <q-img src="../../public/images/image-55.png"></q-img>
          </div>
          <div class="col q-py-lg" style="background-color:#E5E1E1">
            <div class="q-mt-md">
              <p align="center" class="font-graph text-bold">Why does GVC participation matter?</p>
            </div>
            <div align="center" class="q-px-lg">
              <p
                align="left"
              >GVC participation matters for development. GVCs support efficient production and technology diffusion, and access to capital and inputs thereby increasing productivity and income growth, and reducing poverty.</p>
              <p
                align="left"
              >In addition, recent developments in digital technology are set to support integration of SMEs into GVCs, further amplifying sustainable outcomes from participation.</p>
            </div>
          </div>
        </div>
        <!-- GRAPH -->
        <div style="height:30px"></div>
        <div class="q-py-xl" style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isChart">
            <q-spinner-pie color="primary" size="100px" />
          </div>

          <!-- Graph -->
          <div v-show="isChart">
            <div id="container"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Waiting -->
    <div v-else>
      <data-waiting
        text="Please choose exporting economy, importing economy, exporting sector and year from the drop down menus above"
      ></data-waiting>
    </div>

    <!-- FOOTER -->
    <my-footer></my-footer>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import importingSelect from "../components/importEconomySelect";
import errorPage from "../components/error-page";
import Axios from "axios";

// new
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import dataWaiting from "../components/dataWaiting.vue";
import sorryDuplicate from "../components/sorryDuplicate.vue";
import myFooter from "../components/footer";

let CancelToken = Axios.CancelToken;
let source = CancelToken.source();
let cancelGraph;

export default {
  components: {
    appBar,
    headerMenu,
    importingSelect,
    errorPage,
    globalValueChainsHeader,
    globalValueChainsMenu,
    myFooter,
    dataWaiting,
    sorryDuplicate,
  },
  data() {
    return {
      // NEW
      // Country List
      countryOptions: [],

      // Show Country when filter for Exporting
      exp_optionsShow: [],
      exp_country: "",

      // Show Country when filter for Importing
      imp_optionsShow: [],
      imp_country: "",

      // Year List
      yearOptions: [],
      year: "",

      // OLD
      isShowPage: false,
      importingEconomy: "",

      sectorOptions: [],
      sector: "",

      continent: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").region
        : "",

      // displayYear: this.$q.sessionStorage.has("cselec")
      //   ? this.$q.sessionStorage.getItem("cselec").year
      //   : "",

      // displayImportingEconomy: "",
      // // exp_country: this.$q.sessionStorage.has("cselec")
      // //   ? this.$q.sessionStorage.getItem("cselec").iso
      // //   : "",

      // displayExportingEconomy: this.$q.sessionStorage.has("cselec")
      //   ? this.$q.sessionStorage.getItem("cselec").name
      //   : "",

      // imp_country: "",

      displaySector: "",
      sector: "",

      isShowErrorWarning: false,

      isChart: false,
    };
  },
  computed: {
    expCountry() {
      if (this.exp_country) {
        let res = this.countryOptions.filter(
          (x) => x.value == this.exp_country.value
        )[0];

        return res;
      }
    },

    impCountry() {
      if (this.imp_country) {
        let res = this.countryOptions.filter(
          (x) => x.value == this.imp_country.value
        )[0];

        return res;
      }
    },
  },
  methods: {
    filterExpCountry(val, update) {
      update(async () => {
        this.exp_optionsShow = this.countryOptions.filter(
          (x) => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },
    filterImpCountry(val, update) {
      update(async () => {
        this.imp_optionsShow = this.countryOptions.filter(
          (x) => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },

    selectedData() {
      if (this.exp_country && this.imp_country && this.year && this.sector) {
        this.renderGraph();
      }
    },

    // checkShowPage() {
    //   if (
    //     this.displayExportingEconomy != "" &&
    //     this.displayYear != "" &&
    //     this.displayImportingEconomy != "" &&
    //     this.displaySector != ""
    //   ) {
    //     this.isShowPage = true;
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    // // Get Emit Data
    // getEmitData(val) {
    //   // Exporting Economy
    //   this.displayExportingEconomy = val.name;
    //   this.exp_country = val.iso;
    //   this.continent = val.region;
    //   this.displayYear = val.year;
    //   this.checkShowPage();
    //   this.getStructureOfValue();
    // },

    // Get Structure Of Value
    // getStructureOfValue() {
    //   // Importing Economy
    //   let countryData = this.exp_options.filter(
    //     (x) => x.value == this.importingEconomy
    //   )[0];

    //   let sectorData = this.sectorOptions.filter(
    //     (x) => x.value == this.sectorSelected
    //   )[0];

    //   if (countryData) {
    //     this.displayImportingEconomy = countryData.label;
    //     this.imp_country = countryData.iso;
    //   }

    //   if (sectorData) {
    //     this.displaySector = sectorData.label;
    //     this.sector = sectorData.value;
    //   }

    //   let check = this.checkShowPage();
    //   if (check) {
    //     if (this.displayImportingEconomy == this.displayExportingEconomy) {
    //       this.isShowErrorWarning = true;
    //       return;
    //     }

    //     this.isShowErrorWarning = false;

    //     this.renderGraph(); // Render Graph
    //   }
    // },
    // ------------------------------------------------------------

    renderGraph() {
      this.setStackChart();
    },

    async setStackChart() {
      this.isChart = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_participation.php?exp_country=${this.exp_country.iso}&imp_country=${this.imp_country.iso}&year=${this.year}&sector=${this.sector}`;

      if (cancelGraph !== undefined) {
        cancelGraph();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph = c;
        }),
      });

      getData = getData.data;

      console.log(getData);

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

      console.log(countryList);
      console.log(forwardList);
      console.log(backwardList);
      console.log(doubleList);

      this.isChart = true;

      Highcharts.chart("container", {
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
            text: `% of gross exports to ${this.imp_country.label}`,
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
            name: `Used in ${this.imp_country.label}'s export production <br>(forward linkages)`,
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

          text: `How much of ${this.exp_country.label}’s exports to ${this.imp_country.label} are GVC related <br>compared to other ${this.continent} economies?`,
        },
        exporting: {
          buttons: {
            contextButton: {
              menuItems: ["downloadCSV", "downloadXLS"],
            },
          },
        },
      });
    },

    async getYear() {
      let url = "https://api.winner-english.com/u_api/get_year_active.php";
      let data = await Axios.get(url);
      let temp = [];
      data.data.forEach((element) => {
        temp.push(element);
      });
      this.yearOptions = temp;
    },
  },
  async mounted() {
    await this.getCountryList();
    await this.getSectorList();
    await this.getYear();

    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      this.exp_country = this.$route.params.expe
        ? this.countryOptions.filter((x) => x.iso == this.$route.params.expe)[0]
        : this.countryOptions.filter(
            (x) => x.iso == this.$q.sessionStorage.getItem("expe")
          )[0];

      this.exp_optionsShow = this.countryOptions;
    }

    if (this.$q.sessionStorage.has("impe") || this.$route.params.impe) {
      this.imp_country = this.$route.params.impe
        ? this.countryOptions.filter((x) => x.iso == this.$route.params.impe)[0]
        : this.countryOptions.filter(
            (x) => x.iso == this.$q.sessionStorage.getItem("impe")
          )[0];
      this.imp_optionsShow = this.countryOptions;
    }

    if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
      this.year = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.getItem("year");
    }

    if (this.$q.sessionStorage.has("sector") || this.$route.params.sector) {
      this.sector = this.$route.params.sector
        ? this.$route.params.sector
        : this.$q.sessionStorage.getItem("sector");
    }

    this.validateSelected();
  },
};
</script>

<style lang="scss" scoped>
</style>