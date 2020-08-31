<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <!-- App Bar -->
    <app-bar :isShowLogo="false" @countrySelected="getEmitData"></app-bar>
    <header-menu></header-menu>

    <!-- @importingEconomy="importingEconomyChanged" -->
    <!-- <importing-select @sectorSelected="getEmitImportData"></importing-select> -->

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

    <!-- Error Page -->
    <error-page
      v-show="isShowErrorWarning"
      displayText="The exporting economy cannot be the same as the 
importing economy"
    ></error-page>

    <!-- Show Content -->
    <div v-show="!isShowErrorWarning">
      <!-- table of content -->
      <div class="row" style="margin:auto; max-width:1050px;width:95%;">
        <div class="divLeft col">
          <div class="font-graph q-pt-md" align="center">Table of contents:</div>
          <div class="q-pa-md font-content">
            <div v-scroll-to="'#key'" class="cursor-pointer">
              1.
              <u>Key policy question</u>
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

      <!-- Key policy question -->
      <div class="q-py-lg" style="width:90%;margin:auto;max-width:1200px" id="key">
        <p align="center" class="q-pb-md" style="font-size:24px">Key policy questions</p>
        <div class="q-px-md font-content">
          <div v-scroll-to="'#structure'" class="cursor-pointer">
            1.
            <u>What happens to {{displayExportingEconomy}}’s exports to a selected importer?</u>
          </div>
          <div class="cursor-pointer" v-scroll-to="'#comparison'">
            2.
            <!-- TODO SOUTH EAST ASIAN เขียนฟังชันหาทวีป FIND -->
            <u>What happens to {{continent}} economics’s exports to a selected imported?</u>
          </div>
          <div class="cursor-pointer" v-scroll-to="'#measuring'">
            3.
            <u>How does {{displayExportingEconomy}}’s domestic value-added and gross trade balance with the selected imported differ?</u>
          </div>
        </div>
      </div>
      <hr />

      <!-- What happends to ... exports to ...? -->
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

      <!-- What happens to ... econmics' exports to...? -->
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

      <!-- How does ... gross and domestic value-added trade balance with ... differ? -->
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
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import importingSelect from "../components/importEconomySelect";
import Axios from "axios";
import errorPage from "../components/error-page";
export default {
  components: {
    appBar,
    headerMenu,
    importingSelect,
    errorPage,
  },
  data() {
    return {
      countryOptions: [],
      importingEconomy: "",

      sectorOptions: [],
      sectorSelected: "",

      continent: "",

      displayYear: "",

      displayImportingEconomy: "",
      imp_country: "",

      displayExportingEconomy: "",
      exp_country: "",

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
    // Get Emit Data
    getEmitData(val) {
      // Exporting Economy
      this.displayExportingEconomy = val.name;
      this.exp_country = val.iso;
      this.continent = val.region;
      this.displayYear = val.year;

      this.getStructureOfValue();
    },

    // Get Structure Of Value
    async getStructureOfValue() {
      // Importing Economy
      let countryData = this.countryOptions.filter(
        (x) => x.value == this.importingEconomy
      )[0];

      let sectorData = this.sectorOptions.filter(
        (x) => x.value == this.sectorSelected
      )[0];

      this.displayImportingEconomy = countryData.label;
      this.imp_country = countryData.iso;
      this.displaySector = sectorData.label;
      this.sector = sectorData.value;

      this.$q.sessionStorage.set("impEcId", this.importingEconomy);

      this.$q.sessionStorage.set("secId", sectorData.value);

      if (this.displayImportingEconomy == this.displayExportingEconomy) {
        this.isShowErrorWarning = true;
        return;
      }

      this.isShowErrorWarning = false;

      this.renderGraph(); // Render Graph
    },

    // Render Graph
    renderGraph() {
      this.setStackChart();
      this.setStackChart2();
      this.setStackChart3();
    },

    async setStackChart() {
      this.isStructureChart = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_structure_1.php?exp_country=${this.exp_country}&imp_country=${this.imp_country}&year=${this.displayYear}&sector=${this.sector}`;

      let getData = await Axios.get(urlLink);

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
                label: `Used in ${this.displayImportingEconomy}’s export production`,
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

      let urlLink = `https://api.winner-english.com/u_api/cal_structure_2.php?exp_country=${this.exp_country}&imp_country=${this.imp_country}&year=${this.displayYear}&sector=${this.sector}`;

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
          title: {
            text: `% of gross exports to ${this.displayImportingEconomy}`,
          },
          stackLabels: {
            enabled: true,
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
            name: `Used in ${this.displayImportingEconomy}'s comsumption`,
            data: imp_cons,
            color: "#2381B8",
          },
          {
            name: `Used in ${this.displayImportingEconomy}'s export production`,
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
              menuItems: [
                "printChart",
                "separator",
                // "downloadPNG",
                // "downloadJPEG",
                "downloadPDF",
                // "downloadSVG",
                // "separator",
                "downloadCSV",
                // "downloadXLS",
                //"viewData",
                // "openInCloud",
              ],
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

      let urlLink = `https://api.winner-english.com/u_api/cal_structure_3.php?exp_country=${this.exp_country}&imp_country=${this.imp_country}&year=${this.displayYear}&sector=${this.sector}`;

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
      });
    },
  },
  async mounted() {
    await this.getCountryList();
    await this.getSectorList();
  },
};
</script>

<style >
.divLeft {
  /* height: 300px; */
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px 0px;
}
.divRight {
  margin-left: 20px;
  width: 750px;
  /* height: 300px; */
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px 0px;
}
.bracketLeft {
  margin-left: 30px;
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
  margin-left: 80px;
  width: 200px;
  text-align: center;
}
.textRight {
  margin-top: -30px;
  margin-left: 400px;
  width: 200px;
  text-align: center;
}
</style>