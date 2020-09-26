<template>
  <q-page>
    <global-value-chains-header></global-value-chains-header>

    <global-value-chains-menu :activeMenu="1"></global-value-chains-menu>

    <!-- DROPDOWN SELECTION -->
    <div class="bg12" style="height:180px">
      <div class="row q-pt-md justify-center">
        <div class="col-3 q-px-md">
          <div>Exporting economy</div>
          <div>
            <q-select
              v-model="exportingSelected"
              :options="countryOptionsShow"
              outlined
              bg-color="white"
              class="q-mt-xs"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterCountry"
              @input="selectedExporting()"
            >
              <template v-slot:prepend v-if="exportingSelected.code">
                <gb-flag :code="exportingSelected.code" size="small" />
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
        <div class="col-3 q-px-md">
          <div>Year</div>
          <div>
            <q-select
              outlined
              bg-color="white"
              v-model="year"
              dense
              :options="dataYearList"
              map-options
              emit-value
              @input="changeYear()"
            ></q-select>
          </div>
        </div>
      </div>

      <div class="row q-pt-md justify-center">
        <div class="col-3 q-px-md">
          <div>Importing economy</div>
          <div>
            <q-select
              bg-color="white"
              v-model="importingSelected"
              :options="countryOptionsShow"
              outlined
              class="q-mt-xs"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterCountry"
              @input="selectedImporting()"
            >
              <template v-slot:prepend v-if="importingSelected.code">
                <gb-flag v-if="importingSelected.code" :code="importingSelected.code" size="small" />
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
        <div class="col-3 q-px-md">
          <div>Exporting sector</div>
          <div>
            <q-select
              bg-color="white"
              v-model="sectorSelected"
              dense
              :options="sectorOptions"
              outlined
              map-options
              emit-value
              @input="selectedSector()"
            ></q-select>
          </div>
        </div>
      </div>
    </div>
    <!--  -->

    <div v-if="exportingSelected && year && importingSelected && sectorSelected">
      <sorry-duplicate v-if="checkDuplicateSelected"></sorry-duplicate>

      <div class="bg-white" v-else>
        <div class="row q-px-md q-py-lg font-content">
          <div class="col q-px-md" align="center">
            <div
              style="border:1px solid;height:60px"
              class="flex flex-center cursor-pointer relative-position"
              v-scroll-to="'#keypolicy'"
              v-ripple
            >Key policy questions</div>
          </div>
          <div class="col q-px-md" align="center">
            <div
              style="border:1px solid;height:60px"
              class="flex flex-center cursor-pointer relative-position"
              v-scroll-to="'#structure'"
              v-ripple
            >Structure of value-added</div>
          </div>
          <div class="col q-px-md" align="center">
            <div
              style="border:1px solid;height:60px"
              class="flex flex-center cursor-pointer relative-position"
              v-scroll-to="'#measuring'"
              v-ripple
            >Measuring trade balance</div>
          </div>
          <div class="col q-px-md" align="center">
            <div
              style="border:1px solid;height:60px"
              class="flex flex-center cursor-pointer relative-position"
              v-ripple
              v-scroll-to="'#comparison'"
            >Comparison with sub-regional partners</div>
          </div>
        </div>
        <!--  -->
        <div class="row" style="height:340px">
          <div class="col-3">
            <q-img src="../../public/images/image-58.png"></q-img>
          </div>
          <div class="col flex flex-center" align="center" style="background-color:#E5E1E1">
            <div class="divRight">
              <p
                class="font-24"
                align="center"
              >How do you disaggregate value-added in gross exports?</p>

              <div
                class="font-content q-pb-sm"
                align="center"
              >Argentina's gross exports can be divided into five major parts:</div>
              <div class="row q-pt-md" style="width:95%; margin:auto;">
                <div style="width:20%" align="center">Used in importer's comsumption</div>
                <div style="width:20%" align="center">Used in domestic comsumption</div>
                <div style="width:20%" align="center">Used in importer's export production</div>
                <div style="width:20%" align="center">Imported content</div>
                <div
                  style="width:20%"
                  align="center"
                >Double counted exports from repeated border crossing</div>
              </div>
              <div class="bracketLeft"></div>
              <div class="bracketRight"></div>
              <div class="textLeft font-content">Argentina's valued-added in exports</div>
              <div class="textRight font-content">GVC releated exports</div>
            </div>
          </div>
        </div>
        <!--  -->
        <div style="padding-top:90px;padding-bottom:50px">
          <p align="center" class="font-24" id="keypolicy">Key policy questions</p>

          <div class="font-content" style="padding :0px 60px">
            <div v-scroll-to="'#structure'" class="cursor-pointer">
              1.
              <u>
                What happens to {{ exportingSelected.label }}’s exports to a
                selected importer?
              </u>
            </div>
            <div class="cursor-pointer" v-scroll-to="'#measuring'">
              2.
              <u>
                How does {{ exportingSelected.label }}’s domestic value-added and
                gross trade balance with the selected imported differ?
              </u>
            </div>
            <div class="cursor-pointer q-py-sm" v-scroll-to="'#comparison'">
              3.
              <u>
                What happens to {{ continent }} economics’ exports to a selected
                imported?
              </u>
            </div>
          </div>
        </div>
        <!-- GRAPH1 -->
        <div style="height:30px" id="structure"></div>
        <div style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isStructureChart">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isStructureChart">
            <div id="container"></div>
          </div>
        </div>
        <hr />
        <!-- GRAPH2 -->
        <div id="measuring" style="height:30px"></div>

        <div style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isMeasuringChart">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isMeasuringChart">
            <div id="container2"></div>
          </div>
        </div>

        <hr />

        <!--GRAPH3  -->
        <div id="comparison" style="height:30px"></div>

        <div style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isComparisonChart">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isComparisonChart">
            <div id="container1"></div>
          </div>
        </div>
      </div>
    </div>

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
import Axios from "axios";
import errorPage from "../components/error-page";
// new
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import myFooter from "../components/footer";
import dataWaiting from "../components/dataWaiting.vue";
import sorryDuplicate from "../components/sorryDuplicate.vue";
let CancelToken = Axios.CancelToken;
let source = CancelToken.source();
let cancelGraph1;
let cancelGraph2;
let cancelGraph3;
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

      CancelToken: "",
      source: "",

      exportingOptions: [
        {
          label: "Argentina",
          value: "ARG",
          flag:
            "https://www.iconfinder.com/data/icons/ensign-11/512/16_Ensign_Flag_Nation_Argentina-512.png",
        },

        {
          label: "United State",
          value: "USA",
          flag:
            "https://www.iconfinder.com/data/icons/ensign-11/512/274_Ensign_Flag_Nation_states-512.png",
        },
      ],
      exportingSelected: "",
      year: "",
      importingSelected: "",
      sectorSelected: "",
      countryOptionsShow: [],
      dataYearList: [],

      // OLD
      isShowPage: false,
      countryOptions: [],
      importingEconomy: "",

      sectorOptions: [],
      sectorSelected: "",

      continent: "",

      displayYear: "",

      exp_country: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").iso
        : "",

      displaySector: "",
      sector: "",

      dataChart1Percent: {
        imp_cons: 0,
        imp_exp: 0,
        dom_cons: 0,
        double: 0,
        imp_cont: 0,
      },
      isStructureChart: false,
      isComparisonChart: false,
      isMeasuringChart: false,

      isShowErrorWarning: false,
    };
  },
  methods: {
    changeYear() {
      this.$q.sessionStorage.set("year", this.year.label);
      this.displayYear = this.year.label;
      if (this.validateSelected()) this.renderGraph();
    },
    selectedExporting() {
      this.$q.sessionStorage.set("expe", this.exportingSelected.iso);

      this.continent = exportingEconomy.region;

      if (this.validateSelected()) this.renderGraph();
    },
    selectedImporting() {
      this.$q.sessionStorage.set("impe", this.importingSelected.iso);

      if (this.validateSelected()) this.renderGraph();
    },
    selectedSector() {
      this.$q.sessionStorage.set("esec", this.sectorSelected);
      if (this.validateSelected()) this.renderGraph();
    },

    validateSelected() {
      if (
        this.sectorSelected &&
        this.year &&
        this.exportingSelected &&
        this.importingSelected
      ) {
        return true;
      } else {
        return false;
      }
    },

    // Render Graph
    renderGraph() {
      // this.source.cancel("Operation canceled by the user.");

      this.setStackChart();
      this.setStackChart2();
      this.setStackChart3();
    },

    async setStackChart() {
      this.isStructureChart = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_structure_1.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.year}&sector=${this.sectorSelected}`;
      console.log(urlLink);

      if (cancelGraph1 !== undefined) {
        cancelGraph1();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph1 = c;
        }),
      });

      console.log("graph1", getData.data);

      getData = getData.data;
      this.dataChart1Percent.imp_cons = (
        (getData.imp_cons /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont)) *
        100
      ).toFixed(2);

      this.dataChart1Percent.imp_exp = (
        (getData.imp_exp /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont)) *
        100
      ).toFixed(2);

      this.dataChart1Percent.dom_cons = (
        (getData.dom_cons /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont)) *
        100
      ).toFixed(2);

      this.dataChart1Percent.double = (
        (getData.double /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont)) *
        100
      ).toFixed(2);

      this.dataChart1Percent.imp_cont = (
        (getData.imp_cont /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont)) *
        100
      ).toFixed(2);

      this.isStructureChart = true;

      Highcharts.chart("container", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" },
        },
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "strip",

            data: [
              {
                name: `Directly consumed (${this.dataChart1Percent.imp_cons}%)`,
                value: getData.imp_cons,
                color: "#2381B8",
                label: `Used in ${this.importingSelected.label}’s comsumption`,
              },
              {
                name: `Imported content (${this.dataChart1Percent.imp_exp}%)`,
                value: getData.imp_exp,
                color: "#EB1E63",
                label: `Used in ${this.importingSelected.label}’s export <br>production`,
              },
              {
                name: `Domestic consumed (${this.dataChart1Percent.dom_cons}%)`,
                value: getData.dom_cons,
                color: "#F99704",
                label: `Used in ${this.exportingSelected.label}’s domestic <br>comsumption`,
              },
              {
                name: `Double counted (${this.dataChart1Percent.double}%)`,
                value: getData.double,
                color: "#2D9687",
                label:
                  "Double counted exports <br>from repeated border crossings",
              },
              {
                name: `Used in exports (${this.dataChart1Percent.imp_cont}%)`,
                value: getData.imp_cont,
                color: "#9C26B3",
                label: "Imported content",
              },
            ],
            showInLegend: true,
            legendType: "point",
          },
        ],
        legend: {
          useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
          },

          align: "right",
          verticalAlign: "middle",
          width: 300,
          itemMarginTop: 20,
          symbolWidth: 50,
          symbolHeight: 15,
          symbolRadius: 0,

          labelFormatter: function () {
            return this.label;
          },
        },
        title: {
          style: {
            fontSize: "24px",
          },
          text:
            "What happens to " +
            this.exportingSelected.label +
            "'s exports to " +
            this.importingSelected.label +
            "?",
        },
        subtitle: {
          text: `Gross exports to ${this.importingSelected.label}: $${
            getData.text_export_to_import_country > 1000
              ? (getData.text_export_to_import_country / 1000).toFixed(2) + "B"
              : getData.text_export_to_import_country + "M"
          } / Gross exports to World: $${
            getData.text_export_to_world > 1000
              ? (getData.text_export_to_world / 1000).toFixed(2) + "B"
              : getData.text_export_to_world + "M"
          }`,
          align: "left",
        },
        credits: {
          enabled: false,
        },

        exporting: this.exportingGraphOptions,
      });
    },
    async setStackChart2() {
      this.isComparisonChart = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_structure_2.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.year}&sector=${this.sectorSelected}`;

      if (cancelGraph2 !== undefined) {
        cancelGraph2();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph2 = c;
        }),
      });

      getData = getData.data;
      console.log("graph2", getData);

      let country = [];
      let imp_cons = [];
      let imp_exp = [];
      let imp_cont = [];
      let dom_cons = [];
      let double = [];

      getData.map((x) => {
        country.push(x.imp_country);
        imp_cons.push(x.imp_cons);
        imp_exp.push(x.imp_exp);
        imp_cont.push(x.imp_cont);
        dom_cons.push(x.dom_cons);
        double.push(x.double);
      });

      this.isComparisonChart = true;

      Highcharts.chart("container1", {
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%", // 16:9 ratio
        },
        title: {
          style: {
            fontSize: "24px",
            fontFamily: "roboto",
          },
          text: `What happens to ${this.continent} economies’ exports to selected imported?`,
        },
        xAxis: {
          labels: {
            rotation: -90,
          },
          categories: country,
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: `% of gross exports to ${this.importingSelected.label}`,
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
          pointFormat: "{series.name}: {point.y}%",
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
            name: `Used in ${this.importingSelected.label}'s comsumption`,
            data: imp_cons,
            color: "#2381B8",
          },
          {
            name: `Used in ${this.importingSelected.label}'s export <br> production`,
            data: imp_exp,
            color: "#EB1E63",
          },
          {
            name: `Used in ${this.exportingSelected.label}'s domestic <br>comsumption`,
            data: dom_cons,
            color: "#f99704",
          },
          {
            name: "Double counted exports from <br>repeated border crossings",
            data: double,
            color: "#2D9687",
          },
          {
            name: "Imported content",
            data: imp_cont,
            color: "#9C26B3",
          },
        ],
        exporting: {
          buttons: {
            contextButton: {
              menuItems: [
                "downloadPNG",
                "downloadJPEG",
                "separator",
                "downloadCSV",
                "downloadXLS",
              ],
            },
          },
          width: "1280px",
          chartOptions: {
            legend: {
              width: 180,
              itemStyle: {
                fontSize: "7px",
                fontWeight: "medium",
                fontFamily: "roboto",
                color: "#00000",
              },
            },
            title: {
              style: { fontSize: "12px" },
            },
            subtitle: {
              style: { fontSize: "8px" },
            },
            yAxis: [
              {
                title: {
                  style: { fontSize: "7px" },
                },
              },
            ],
          },
        },
      });
    },
    async setStackChart3() {
      this.isMeasuringChart = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_structure_3.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.year}&sector=${this.sectorSelected}`;

      if (cancelGraph3 !== undefined) {
        cancelGraph3();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph3 = c;
        }),
      });

      getData = getData.data;

      console.log("graph3", getData);
      this.isMeasuringChart = true;

      Highcharts.chart("container2", {
        legend: {
          useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
          },
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          itemDistance: 10,
          width: 300,
          itemMarginTop: 25,
          symbolHeight: 15,
          symbolWidth: 50,
          symbolRadius: 0,
        },
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%", // 16:9 ratio
        },

        title: {
          style: {
            fontSize: "24px",
            fontFamily: "roboto",
          },
          text: `How does ${this.exportingSelected.label}'s gross and domestic value-added trade balance with ${this.importingSelected.label} differ?`,
        },
        xAxis: {
          categories: ["", ""],
        },
        yAxis: {
          title: {
            text: `% of gross exports to ${this.importingSelected.label}`,
          },
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "Domestic value-added trade balance",
            data: [getData.blue],
            color: "#2381B8",
          },
          {
            name: "Gross trade balance",
            data: [getData.red],
            color: "#EB1E63",
          },
        ],
        exporting: this.exportingGraphOptions,
      });
    },

    filterCountry(val, update) {
      update(async () => {
        this.countryOptionsShow = this.countryOptions.filter(
          (x) => x.label.indexOf(val) > -1
        );
      });
    },

    async getYear() {
      let url = "https://api.winner-english.com/u_api/get_year_active.php";
      let data = await Axios.get(url);
      let temp = [];
      data.data.forEach((element) => {
        temp.push({ index: Number(element), label: element });
      });
      this.dataYearList = temp;
    },
  },
  async mounted() {
    await this.getSectorList();
    await this.getYear();
    this.getCountryList();

    if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
      this.year = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.getItem("year");
    }

    // Check Session and Params Exporting
    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      this.exportingSelected = this.$route.params.expe
        ? this.countryOptions.filter((x) => x.iso == this.$route.params.expe)[0]
        : this.countryOptions.filter(
            (x) => x.iso == this.$q.sessionStorage.getItem("expe")
          )[0];
      this.countryOptionsShow = this.countryOptions;
      this.continent = this.exportingSelected.region;
      this.exportingSelected.label;
    }

    if (this.$q.sessionStorage.has("impe") || this.$route.params.impe) {
      this.importingSelected = this.$route.params.impe
        ? this.countryOptions.filter((x) => x.iso == this.$route.params.impe)[0]
        : this.countryOptions.filter(
            (x) => x.iso == this.$q.sessionStorage.getItem("impe")
          )[0];
      this.countryOptionsShow = this.countryOptions;
    }

    if (this.$q.sessionStorage.has("esec") || this.$route.params.sector) {
      this.sectorSelected = this.$route.params.sector
        ? this.$route.params.sector
        : this.$q.sessionStorage.getItem("esec");
    }

    if (this.validateSelected()) {
      this.renderGraph();
    }
  },
  computed: {
    checkDuplicateSelected() {
      return this.exportingSelected.iso == this.importingSelected.iso;
    },
  },
};
</script>

<style>
.divLeft {
  /* height: 300px; */
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px 0px;
}
.divRight {
  margin-left: 20px;
  width: 750px;
}
.bracketLeft {
  margin-left: -270px;
  width: 400px;
  height: 10px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.bracketRight {
  margin-top: 15px;
  margin-left: 300px;
  width: 400px;
  height: 10px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.textLeft {
  margin-top: 20px;
  margin-left: -470px;
  width: 200px;
  text-align: center;
}
.textRight {
  margin-top: -50px;
  margin-left: 400px;
  width: 200px;
  text-align: center;
}
</style>
