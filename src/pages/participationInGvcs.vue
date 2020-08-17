<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <app-bar
      :isShowLogo="false"
      @countrySelected="exportingEconomyChanged"
      @yearSelected="(val) => displayYear = val "
    ></app-bar>
    <header-menu :activeMenu="2"></header-menu>
    <importing-select @importingEconomy="importingEconomyChanged" @sectorSelected="sectorChanged"></importing-select>
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
  data() {
    return {
      displayImportingEconomy: "",
      displayYear: "",
      displayCountry: "",
      continent: "",
      displaySector: "",
    };
  },
  methods: {
    sectorChanged(val) {
      this.displaySector = val;
      this.renderGraph();
    },
    renderGraph() {
      this.setStackChart();
    },
    exportingEconomyChanged(val) {
      this.displayCountry = val.name;
      this.continent = val.region;
      this.renderGraph();
    },
    importingEconomyChanged(val) {
      this.displayImportingEconomy = val;
      this.renderGraph();
    },
    setStackChart() {
      Highcharts.chart("container1", {
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%", // 16:9 ratio
        },

        xAxis: {
          labels: {
            rotation: -90,
          },
          categories: [
            "Thailand",
            "Vietname",
            "Malaysia",
            "Singapore",
            "Indonesia",
            "Lao PDR",
            "Cambodia",
            "Brunei Darussalam",
          ],
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
            data: [18, 25, 20, 16, 12, 10, 14, 31],
            color: "#2381B8",
          },
          {
            name: "Imported content (backward linkages)",
            data: [8, 3, 5, 10, 9, 10, 10, 3],
            color: "#EB1E63",
          },
          {
            name: "Double counted exports from <br>repeated border crossings",
            data: [5, 10, 5, 8, 4, 10, 8, 3],
            color: "#f99704",
          },
        ],
        title: {
          style: {
            fontSize: "24px",
            fontFamily: "roboto",
          },
          text: `How much of ${this.displayCountry}’s exports to ${this.displayImportingEconomy} are GVC related <br>compared to other ${this.continent} economies?`,
        },
      });
    },
  },
  mounted() {
    this.setStackChart();
  },
};
</script>

<style lang="scss" scoped>
</style>