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
    <div class="row q-px-md q-py-lg font-content">
      <div class="col q-px-md" align="center">
        <div
          style="border:1px solid;height:60px"
          class="flex flex-center cursor-pointer relative-position"
          v-ripple
        >Key policy questions</div>
      </div>
      <div class="col q-px-md" align="center">
        <div
          style="border:1px solid;height:60px"
          class="flex flex-center cursor-pointer relative-position"
          v-ripple
        >Structure of value-added</div>
      </div>
      <div class="col q-px-md" align="center">
        <div
          style="border:1px solid;height:60px"
          class="flex flex-center cursor-pointer relative-position"
          v-ripple
        >Measuring trade balance</div>
      </div>
      <div class="col q-px-md" align="center">
        <div
          style="border:1px solid;height:60px"
          class="flex flex-center cursor-pointer relative-position"
          v-ripple
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
          <p class="font-24" align="center">How do you disaggregate value-added in gross exports?</p>

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
      <p align="center" class="font-24">Key policy questions</p>

      <div class="font-content" style="padding :0px 60px">
        <div v-scroll-to="'#structure'" class="cursor-pointer">
          1.
          <u>
            What happens to {{ displayExportingEconomy }}’s exports to a
            selected importer?
          </u>
        </div>
        <div class="cursor-pointer q-py-sm" v-scroll-to="'#comparison'">
          2.
          <u>
            What happens to {{ continent }} economics’ exports to a selected
            imported?
          </u>
        </div>
        <div class="cursor-pointer" v-scroll-to="'#measuring'">
          3.
          <u>
            How does {{ displayExportingEconomy }}’s domestic value-added and
            gross trade balance with the selected imported differ?
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

    <div id="comparison" style="height:30px"></div>
    <div style="width:90%;margin:auto;max-width:1200px">
      <div align="center" class="q-pa-lg" v-if="!isComparisonChart">
        <q-spinner-pie color="primary" size="100px" />
      </div>
      <div v-show="isComparisonChart">
        <div id="container1"></div>
      </div>
    </div>
    <hr />

    <!--GRAPH3  -->
    <div id="measuring" style="height:30px"></div>
    <div style="width:90%;margin:auto;max-width:1200px">
      <div align="center" class="q-pa-lg" v-if="!isMeasuringChart">
        <q-spinner-pie color="primary" size="100px" />
      </div>
      <div v-show="isMeasuringChart">
        <div id="container2"></div>
      </div>
    </div>
    <!-- FOOTER -->
    <my-footer></my-footer>
  </q-page>
  <!-- <q-page
    class="container"
    :class="!isShowPage || isShowErrorWarning ? 'bg-loading' : 'bg-white'"
    style="padding-bottom:100px"
  >
   
    <app-bar :isShowLogo="false" @countrySelected="getEmitData"></app-bar>

    <div class="bg-white">
      <header-menu></header-menu>
     
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
          <span>Exporting Sector</span>
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
    >Please choose your Importing economy and Exporting sector.</div>

   
    <error-page
      class="q-pt-md"
      v-show="isShowErrorWarning"
      displayText="The exporting economy cannot be the same as the 
importing economy"
    ></error-page>
    <div v-if="isShowPage">
     
      <div v-show="!isShowErrorWarning">
       
        <div class="row" style="margin:auto; max-width:1050px;width:95%;">
          <div class="divLeft col">
            <div class="font-graph q-pt-md" align="center">Table of contents:</div>
            <div class="q-pa-md font-content">
              <div v-scroll-to="'#key'" class="cursor-pointer">
                1.
                <u>Key policy questions</u>
              </div>
              <div class="q-pt-md cursor-pointer" v-scroll-to="'#structure'">
                2.
                <u>Structure of value-added</u>
              </div>
              <div class="q-pt-md cursor-pointer" v-scroll-to="'#comparison'">
                3.
                <u>Comparison with partners</u>
              </div>
              <div class="q-pt-md cursor-pointer" v-scroll-to="'#measuring'">
                4.
                <u>Measuring trade balance</u>
              </div>
            </div>
          </div>
          <div class="divRight">
            <div
              class="font-graph q-pt-md"
              align="center"
            >How do you disaggregate value-added in gross exports?</div>
            <div
              class="font-content q-pt-md"
              align="center"
            >{{displayExportingEconomy}}'s gross exports can be divided into five major parts:</div>
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
            <div class="textLeft font-content">{{displayExportingEconomy}}'s valued-added in exports</div>
            <div class="textRight font-content">GVC releated exports</div>
          </div>
        </div>

       
        <div class="q-py-lg" style="width:90%;margin:auto;max-width:1200px" id="key">
          <p align="center" class="q-pb-md" style="font-size:24px">Key policy questions</p>
          <div class="q-px-md font-content">
            <div v-scroll-to="'#structure'" class="cursor-pointer">
              1.
              <u>What happens to {{displayExportingEconomy}}’s exports to a selected importer?</u>
            </div>
            <div class="cursor-pointer" v-scroll-to="'#comparison'">
              2.
             
              <u>What happens to {{continent}} economics’ exports to a selected imported?</u>
            </div>
            <div class="cursor-pointer" v-scroll-to="'#measuring'">
              3.
              <u>How does {{displayExportingEconomy}}’s domestic value-added and gross trade balance with the selected imported differ?</u>
            </div>
          </div>
        </div>
        <hr />

       
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

       
        <div id="comparison" style="height:30px"></div>
        <div style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isComparisonChart">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isComparisonChart">
            <div id="container1"></div>
          </div>
        </div>
        <hr />

       
        <div id="measuring" style="height:30px"></div>
        <div style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isMeasuringChart">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isMeasuringChart">
            <div id="container2"></div>
          </div>
        </div>

        <div style="height:30px"></div>
      </div>
    </div>
  </q-page>-->
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
export default {
  components: {
    appBar,
    headerMenu,
    importingSelect,
    errorPage,
    globalValueChainsHeader,
    globalValueChainsMenu,
    myFooter,
  },
  data() {
    return {
      // NEW
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

      continent: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").region
        : "",

      displayYear: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").year
        : "",

      displayImportingEconomy: "",
      imp_country: "",

      displayExportingEconomy: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").name
        : "",
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
      this.$q.sessionStorage.set("year", this.year);
      this.getStructureOfValue();
    },
    selectedExporting() {
      this.$q.sessionStorage.set("expe", this.exportingSelected);
      this.getStructureOfValue();
    },
    selectedImporting() {
      this.getStructureOfValue();
    },
    selectedSector() {
      this.getStructureOfValue();
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
    // Get Emit Data
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
    async getStructureOfValue() {
      // Importing Economy
      let countryData = this.countryOptions.filter(
        (x) => x.value == this.importingEconomy
      )[0];

      let sectorData = this.sectorOptions.filter(
        (x) => x.value == this.sectorSelected
      )[0];

      // if (countryData) {
      //   this.displayImportingEconomy = countryData.label;
      //   this.imp_country = countryData.iso;
      // }

      // if (sectorData) {
      //   this.displaySector = sectorData.label;
      //   this.sector = sectorData.value;
      // }
      // let check = this.checkShowPage();
      // if (check) {
      //   if (this.displayImportingEconomy == this.displayExportingEconomy) {
      //     this.isShowErrorWarning = true;
      //     return;
      //   }
      //   this.isShowErrorWarning = false;

      this.renderGraph(); // Render Graph
      // }
    },

    // Render Graph
    renderGraph() {
      this.setStackChart();
      this.setStackChart2();
      this.setStackChart3();
    },

    async setStackChart() {
      this.isStructureChart = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_structure_1.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.year.label}&sector=${this.sectorSelected}`;

      console.log(urlLink);

      let getData = await Axios.get(urlLink);

      console.log(getData.data);

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
                name: `Imp. cons. (${this.dataChart1Percent.imp_cons}%)`,
                value: getData.imp_cons,
                color: "#2381B8",
                label: `Used in ${this.displayImportingEconomy}’s comsumption`,
              },
              {
                name: `imp. exp. (${this.dataChart1Percent.imp_exp}%)`,
                value: getData.imp_exp,
                color: "#EB1E63",
                label: `Used in ${this.displayImportingEconomy}’s export <br>production`,
              },
              {
                name: `Dom. cons (${this.dataChart1Percent.dom_cons}%)`,
                value: getData.dom_cons,
                color: "#F99704",
                label: `Used in ${this.displayExportingEconomy}’s domestic <br>comsumption`,
              },
              {
                name: `Double (${this.dataChart1Percent.double}%)`,
                value: getData.double,
                color: "#2D9687",
                label:
                  "Double counted exports <br>from repeated border crossings",
              },
              {
                name: `Imp. cont. (${this.dataChart1Percent.imp_cont}%)`,
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
            this.displayExportingEconomy +
            "'s exports to " +
            this.displayImportingEconomy +
            "?",
        },
        subtitle: {
          text: `Gross exports to ${this.displayImportingEconomy}: $${getData.text_export_to_import_country}B / Gross exports to World: $${getData.text_export_to_world}B`,
          align: "left",
        },
        credits: {
          enabled: false,
        },

        exporting: {
          buttons: {
            contextButton: {
              menuItems: ["downloadCSV", "downloadXLS"],
            },
          },
          width: "1280px",
          chartOptions: {
            legend: {
              width: 200,
              itemStyle: {
                fontSize: "7px",
                fontWeight: "medium",
                fontFamily: "roboto",
                color: "#00000",
              },
            },
          },
        },
      });
    },
    async setStackChart2() {
      this.isComparisonChart = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_structure_2.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.year.label}&sector=${this.sectorSelected}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;

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
          text: `What happens to ${this.continent} economies’ exports to ${this.displayImportingEconomy}?`,
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
          pointFormat:
            "{series.name}: {point.y}%<br/>Total: {point.stackTotal}%",
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
            name: `Used in ${this.displayImportingEconomy}'s comsumption`,
            data: imp_cons,
            color: "#2381B8",
          },
          {
            name: `Used in ${this.displayImportingEconomy}'s export <br> production`,
            data: imp_exp,
            color: "#EB1E63",
          },
          {
            name: `Used in ${this.displayExportingEconomy}'s domestic <br>comsumption`,
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
              menuItems: ["downloadCSV", "downloadXLS"],
            },
          },
          width: "1280px",
          chartOptions: {
            legend: {
              width: 200,
              itemStyle: {
                fontSize: "7px",
                fontWeight: "medium",
                fontFamily: "roboto",
                color: "#00000",
              },
            },
          },
        },
      });
    },
    async setStackChart3() {
      this.isMeasuringChart = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_structure_3.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.year.label}&sector=${this.sectorSelected}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;

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
          text: `How does ${this.displayExportingEconomy}'s gross and domestic value-added trade balance with ${this.displayImportingEconomy} differ?`,
        },
        xAxis: {
          categories: ["", ""],
        },
        yAxis: {
          title: {
            text: `% of gross exports to ${this.displayImportingEconomy}`,
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
        exporting: {
          buttons: {
            contextButton: {
              menuItems: ["downloadCSV", "downloadXLS"],
            },
          },
        },
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
        : this.$q.sessionStorage.getItem("expe");
      this.countryOptionsShow = this.countryOptions;
    }
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
