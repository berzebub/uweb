<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <app-bar :isShowLogo="false" @countrySelected="getEmitExportData"></app-bar>
    <header-menu :activeMenu="2"></header-menu>
    <importing-select @sectorSelected="getEmitImportData"></importing-select>

    <error-page
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
        <div id="container1"></div>
      </div>
      <div style="height:30px"></div>
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
      displayImportingEconomy: "",
      exp_country: "",
      displayYear: "",
      displayExportingEconomy: "",
      imp_country: "",
      continent: "",
      displaySector: "",
      sector: "",
      isShowErrorWarning: false,
    };
  },
  methods: {
    // Function Test
    getEmitExportData(val) {
      this.isRenderGraph = false;

      this.displayYear = val.year;

      this.displayExportingEconomy = val.name;
      this.exp_country = val.iso;
      this.continent = val.region;

      if (val.name == this.displayImportingEconomy) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;

        this.renderGraph();
      }
    },
    getEmitImportData(val) {
      this.isRenderGraph = false;

      let countryData = val.countryData;
      let sectorData = val.sectorData;

      this.displayImportingEconomy = countryData.label;
      this.imp_country = countryData.iso;

      this.displaySector = sectorData.label;
      this.sector = sectorData.value;

      if (countryData.label == this.displayExportingEconomy) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;

        this.renderGraph();
      }
    },
    // ------------------------------------------------------------

    renderGraph() {
      this.setStackChart();
    },

    // sectorChanged(val) {
    //   this.displaySector = val;
    //   this.renderGraph();
    // },
    // exportingEconomyChanged(val) {
    //   this.displayExportingEconomy = val.name;
    //   this.continent = val.region;
    //   this.renderGraph();
    //   if (val == this.displayImportingEconomy) {
    //     this.isShowErrorWarning = true;
    //   } else {
    //     this.isShowErrorWarning = false;
    //   }
    // },
    // importingEconomyChanged(val) {
    //   this.displayImportingEconomy = val;
    //   this.renderGraph();
    //   if (val == this.displayExportingEconomy) {
    //     this.isShowErrorWarning = true;
    //   } else {
    //     this.isShowErrorWarning = false;
    //   }
    // },
    async setStackChart() {
      this.loadingShow();

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

      this.loadingHide();
    },
  },
  mounted() {
    // this.setStackChart();
  },
};
</script>

<style lang="scss" scoped>
</style>