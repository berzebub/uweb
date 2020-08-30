<template>
  <q-page class="container bg-white" style="padding-bottom:120px">
    <app-bar :isShowLogo="false" @countrySelected="getEmitData"></app-bar>
    <header-menu :activeMenu="3"></header-menu>

    <!-- <source-select @importingEconomy="importingEconomyChanged" @sourcingEconomy="sourceChanged"></source-select> -->

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
        <span>Source economy</span>
        <q-select
          @input="getStructureOfValue()"
          dense
          outlined
          :options="countryOptions"
          v-model="sourceEconomy"
          emit-value
          map-options
        ></q-select>
      </div>
    </div>

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
          >Some part of {{ displayExportingEconomy }}’s gross exports consist of imported inputs that originate in other source economies.</p>
          <p class="font-content" align="center">
            <span class="q-pr-lg">Source economy</span>

            <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
            <span class="q-px-lg">Exporting economy ({{ displayExportingEconomy }})</span>
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
          <u>Which sectors in {{ displayExportingEconomy }} rely the most on imported content for exports to a selected importer?</u>
        </p>
        <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedregion'">
          2.
          <u>Which sectors in {{ continent }} economies rely the most on imported content for exports to a selected importer?</u>
        </p>
      </div>

      <div style="height:30px"></div>
      <hr />

      <!-- <div align="center" id="importedcountry" style="height:30px"></div>
      <div align="center" style="width:900px; margin:auto;">
        <div align="center" style="width:900px; margin:auto;">
          <div id="container"></div>
        </div>
      </div>
      <div style="height:30px"></div>
      <hr />-->

      <!-- กราฟ -->
      <div id="importedcountry" style="height:30px"></div>
      <div style="width:90%;margin:auto;max-width:1200px">
        <div align="center" class="q-pa-lg" v-if="!isChart">
          <q-spinner-pie color="primary" size="100px" />
        </div>
        <div v-show="isChart">
          <div id="container"></div>
        </div>
      </div>
      <div style="height:30px"></div>
      <hr />

      <div style="height:30px"></div>
      <div
        class="font-graph"
        align="center"
        id="importedregion"
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
import errorPage from "../components/error-page";
import Axios from "axios";

export default {
  components: {
    appBar,
    headerMenu,
    errorPage,
  },
  data() {
    return {
      countryOptions: [],
      importingEconomy: "",

      sourceEconomy: "",

      continent: "",

      displayYear: "",

      displayExportingEconomy: "",
      exp_country: "",

      displaySourceEconomy: "",
      source_country: "",

      displayImportingEconomy: "",
      imp_country: "",

      isShowErrorWarning: false,

      isChart: false,
      isChart1: false,
    };
  },
  methods: {
    // Function Test
    getEmitData(val) {
      // Exporting Economy
      this.displayExportingEconomy = val.name;
      this.exp_country = val.iso;
      this.continent = val.region;
      this.displayYear = val.year;

      this.getStructureOfValue();
    },

    // Get Structure Of Value
    getStructureOfValue() {
      // Importing Economy
      let countryData = this.countryOptions.filter(
        (x) => x.value == this.importingEconomy
      )[0];

      let sourceData = this.countryOptions.filter(
        (x) => x.value == this.sourceEconomy
      )[0];

      this.displayImportingEconomy = countryData.label;
      this.imp_country = countryData.iso;

      this.displaySourceEconomy = sourceData.label;
      this.source_country = sourceData.iso;

      this.$q.sessionStorage.set("impEcId", countryData.value);

      this.$q.sessionStorage.set("sourcEcId", sourceData.value);

      if (
        this.displayImportingEconomy == this.displayExportingEconomy ||
        this.displayImportingEconomy == this.displaySourceEconomy ||
        this.displaySourceEconomy == this.displayExportingEconomy
      ) {
        this.isShowErrorWarning = true;
        return;
      }

      this.isShowErrorWarning = false;

      this.renderGraph(); // Render Graph
    },

    renderGraph() {
      this.setData();
      // this.setStackChart();
    },

    async setData() {
      this.isChart = false;
      let urlLink = `https://api.winner-english.com/u_api/cal_back_sector_1.php?exp_country=${this.exp_country}&imp_country=${this.imp_country}&year=${this.displayYear}&source_country=${this.source_country}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;

      let urlLinkSub = `https://api.winner-english.com/u_api/cal_back_sector_1a.php?exp_country=${this.exp_country}&imp_country=${this.imp_country}&year=${this.displayYear}&source_country=${this.source_country}`;

      let getDataSub = await Axios.get(urlLinkSub);

      getDataSub = getDataSub.data;

      this.isChart = true;

      Highcharts.chart("container", {
        chart: {
          height: (3 / 4) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" },
        },
        series: [
          {
            legendType: "point",
            type: "treemap",
            layoutAlgorithm: "squarified",
            alternateStartingDirection: true,
            levels: [
              {
                level: 1,
                // layoutAlgorithm: "sliceAndDice",
                layoutAlgorithm: "squarified",
                dataLabels: {
                  enabled: true,
                  align: "left",
                  verticalAlign: "top",
                  style: {
                    fontSize: "15px",
                    // fontWeight: "bold",
                  },
                },
              },
            ],

            data: [...getData],
            showInLegend: true,
            legendType: "point",
          },
        ],
        legend: {
          useHTML: true,
          layout: "horizontal",
          align: "right",
          verticalAlign: "bottom",

          floating: false,
          borderWidth: 0,
          // useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
          },

          // align: "left",
          // verticalAlign: "bottom",
          width: "870",

          symbolWidth: 0.1,
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function () {
            // return "<div>" + this.name + "</div>";
            if (this.name == "Agriculture") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #2F978B;"></div></td><td style="padding-left:12px;">Agriculture</td></tr></table></div>';
            } else if (this.name == "Mining") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #9A25B1;"></div></td><td style="padding-left:12px;">Mining</td></tr></table></div>';
            } else if (this.name == "Construction") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #8D243B;"></div></td><td style="padding-left:12px;">Construction</td></tr></table></div>';
            } else if (this.name == "Utilities") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #FA9908;"></div></td><td style="padding-left:12px;">Utilities</td></tr></table></div>';
            } else if (this.name == "Low tech") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #F34336;"></div></td><td style="padding-left:12px;"><div>Manufacturing</div>Low tech </td></tr></table></div>';
            } else if (this.name == "High and medium tech") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #C3165B;"></div></td><td style="padding-left:12px;"><div>Manufacturing</div>High and medium tech</td></tr></table></div>';
            } else if (this.name == "Trade and repair service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #5E6DC1;"></div></td><td style="padding-left:12px;"><div>Service</div>Trade and repair </td></tr></table></div>';
            } else if (this.name == "Tourism") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #3F50B8;"></div></td><td style="padding-left:12px;"><div>Service</div>Tourism</td></tr></table></div>';
            } else if (this.name == "Transport service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #3949AB;"></div></td><td style="padding-left:12px;"><div>Service</div>Transport </td></tr></table></div>';
            } else if (this.name == "ICT service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #1565C0;"></div></td><td style="padding-left:12px;"><div>Service</div>ICT </td></tr></table></div>';
            } else if (this.name == "Property service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #19227D;"></div></td><td style="padding-left:12px;"><div>Service</div>Property </td></tr></table></div>';
            } else if (this.name == "Financial service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #43A7F5;"></div></td><td style="padding-left:12px;"><div>Service</div>Financial </td></tr></table></div>';
            } else if (this.name == "Public and welfare service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #2088E7;"></div></td><td style="padding-left:12px;"><div>Service</div>Publice and welfare </td></tr></table></div>';
            } else if (this.name == "Private household service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #1564C0;"></div></td><td style="padding-left:12px;"><div>Service</div>Private household </td></tr></table></div>';
            }
          },
        },
        title: {
          style: {
            fontSize: "24px",
          },
          text: `Which sectors in ${this.displayExportingEconomy} rely the most on imported content from ${this.displaySourceEconomy} in exports to ${this.displayImportingEconomy}?`,
        },
        credits: {
          enabled: false,
        },
        subtitle: {
          style: {
            fontSize: "14px",
          },
          text: `Imported content from ${this.displaySourceEconomy} in exports to ${this.displayImportingEconomy} : $${getDataSub.fromsource}B / Gross exports to ${this.displayImportingEconomy}: $${getDataSub.exportto}B`,
          align: "left",
        },
      });
    },
  },

  async mounted() {
    await this.getCountryList();
  },
};
</script>

<style  scoped>
</style>