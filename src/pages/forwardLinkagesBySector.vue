<template>
  <q-page
    class="container"
    :class="!isShowPage  || isShowErrorWarning ? 'bg-loading' : 'bg-white'"
    style="padding-bottom:120px"
  >
    <app-bar :isShowLogo="false" @countrySelected="getEmitData"></app-bar>
    <div class="bg-white">
      <header-menu :activeMenu="4"></header-menu>
      <!-- Importing Economy -->
      <div class="q-px-md q-py-lg" style="width:500px;margin:auto">
        <span>Importing economy</span>
        <q-select
          @input="loadEconomy()"
          dense
          outlined
          :options="countryOptions"
          v-model="importingEconomy"
          emit-value
          map-options
        ></q-select>
      </div>
    </div>

    <error-page
      v-show="isShowErrorWarning"
      class="q-pt-md"
      displayText="The exporting economy must not be the same as the importing economy."
    ></error-page>

    <div v-if="isShowPage">
      <div v-show="!isShowErrorWarning">
        <!-- Title box -->
        <div class="q-px-md" style="margin:auto; max-width:1050px;width:95%;">
          <div class="q-pa-md" style="border-radius:5px;border:2px solid">
            <p
              class="font-graph"
              align="center"
            >Where does {{ displayExportingEconomy }} contribute towards export production?</p>
            <p
              class="font-content"
              align="center"
            >Some part of {{ displayExportingEconomy }}’s gross exports consist of intermediate inputs that are used by the direct importer to produce exports for third economies.</p>
            <div class="font-content" align="center">
              <span class="q-px-lg">Exporting economy ({{displayExportingEconomy }})</span>
              <span class="q-px-lg text-weight-bold">:</span>
              <span class="q-pr-lg">Sector</span>
              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-px-lg color4">Importing economy</span>
              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-pl-lg">Third economies</span>
            </div>
          </div>

          <!-- Key policy questions -->
          <p align="center" class="font-graph q-py-lg">Key policy questions</p>
          <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedcountry'">
            1.
            <u>Which sectors in {{ displayExportingEconomy }} are most reliant on export production in a selected importer?</u>
          </p>
          <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedregion'">
            2.
            <u>Which sectors in {{ continent }} economies are most reliant on export production in a selected importer?</u>
          </p>
        </div>

        <div style="height:30px"></div>
        <hr />
        <div style="height:30px"></div>
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

        <!-- จบกราฟแรก -->
        <hr />
        <div style="height:30px"></div>
        <div style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isChart1">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isChart1" id="importedregion">
            <div id="container1"></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import importcountry from "../components/importcountry";
import errorPage from "../components/error-page";
import Axios from "axios";

export default {
  components: {
    appBar,
    headerMenu,
    importcountry,
    errorPage,
  },
  data() {
    return {
      isShowPage: false,
      countryOptions: [],
      displayExportingEconomy: "", //ชื่อเต็มประเทศส่งออก
      exp_country: "", //ชื่อ 3 ตัวประเทศส่งออก
      continent: "", //กลุ่มประเทศ
      displayYear: "", //ปี
      imp_country: "", //ชื่อ 3 ตัวประเทศนำเข้า
      importingEconomy: "",
      displayImportingEconomy: "", //ชื่อเต็มประเทศนำเข้า
      isShowErrorWarning: false,
      isChart: false,
      isChart1: false,
    };
  },
  methods: {
    checkShowPage() {
      if (
        this.displayExportingEconomy != "" &&
        this.displayYear != "" &&
        this.displayImportingEconomy != ""
      ) {
        this.isShowPage = true;
        return true;
      } else {
        return false;
      }
    },
    getEmitData(val) {
      // Exporting Economy
      this.displayExportingEconomy = val.name;
      this.exp_country = val.iso;
      this.continent = val.region;
      this.displayYear = val.year;

      this.loadEconomy();
    },
    // โหลดชื่อประเทศให้เรียบร้อย
    loadEconomy() {
      // Importing Economy
      let countryData = this.countryOptions.filter(
        (x) => x.value == this.importingEconomy
      )[0];

      if (countryData) {
        this.displayImportingEconomy = countryData.label;
        this.imp_country = countryData.iso;
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

    renderGraph() {
      this.setData();
      this.setStackChart();
    },

    async setData() {
      this.isChart = false;
      let urlLink = `https://api.winner-english.com/u_api/cal_forward_sector_1.php?exp_country=${this.exp_country}&imp_country=${this.imp_country}&year=${this.displayYear}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;

      let urlLinkSub = `https://api.winner-english.com/u_api/cal_forward_sector_1a.php?exp_country=${this.exp_country}&imp_country=${this.imp_country}&year=${this.displayYear}`;

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
          text: `Which sectors in ${this.displayExportingEconomy} are most reliant on export production in ${this.displayImportingEconomy}?`,
        },
        credits: {
          enabled: false,
        },
        subtitle: {
          style: {
            fontSize: "14px",
          },
          text: `Contribution to ${this.displayImportingEconomy}'s export production: $${getDataSub.contributionto}B / Gross exports to ${this.displayImportingEconomy}: $${getDataSub.exportto}B`,
          align: "left",
        },
      });
    },
    // Graph Two
    async setStackChart() {
      this.isChart1 = false;
      this.chart2RawData = [];
      this.countryList = [];

      let urlLink = `https://api.winner-english.com/u_api/cal_forward_sector_2.php?exp_country=${this.exp_country}&imp_country=${this.imp_country}&year=${this.displayYear}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;
      let countryTemp = getData.map((x) => x.exp_country);
      this.countryList = [...new Set(countryTemp)];
      this.countryList.sort();

      //Agiculture
      let agriculture = getData.filter((x) => x.grouping == "Agriculture");
      agriculture.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      agriculture = agriculture.map((x) => x.value);

      //Mining
      let mining = getData.filter((x) => x.grouping == "Mining");
      mining.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      mining = mining.map((x) => x.value);

      //construction
      let construction = getData.filter((x) => x.grouping == "Construction");
      construction.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      construction = construction.map((x) => x.value);

      //utilities
      let utilities = getData.filter((x) => x.grouping == "Utilities");
      utilities.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      utilities = utilities.map((x) => x.value);

      //Manufacturing-Low tech
      let lowtech = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let lowtechTemp = getData.filter(
          (x) =>
            x.grouping == "Low tech" && x.exp_country == this.countryList[i]
        );
        let temp = lowtechTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        lowtech.push(Number(temp));
      }

      //Manufacturing-hign and medium tech
      let hitech = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let hitechTemp = getData.filter(
          (x) =>
            x.grouping == "High and medium tech" &&
            x.exp_country == this.countryList[i]
        );
        let temp = hitechTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        hitech.push(Number(temp));
      }

      //Service Trade and repair
      let tradeRepair = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let tradeRepairTemp = getData.filter(
          (x) =>
            x.grouping == "Trade and repair service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = tradeRepairTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        tradeRepair.push(Number(temp));
      }

      //Service Tourism
      let tourism = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let tourismTemp = getData.filter(
          (x) => x.grouping == "Tourism" && x.exp_country == this.countryList[i]
        );
        let temp = tourismTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        tourism.push(Number(temp));
      }

      //Service Transport
      let transport = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let transportTemp = getData.filter(
          (x) =>
            x.grouping == "Transport service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = transportTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        transport.push(Number(temp));
      }
      //Service ICT
      let ict = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let ictTemp = getData.filter(
          (x) =>
            x.grouping == "ICT service" && x.exp_country == this.countryList[i]
        );
        let temp = ictTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        ict.push(Number(temp));
      }

      //Service property
      let property = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let propertyTemp = getData.filter(
          (x) =>
            x.grouping == "Property service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = propertyTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        property.push(Number(temp));
      }

      //Service Financial
      let financial = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let financialTemp = getData.filter(
          (x) =>
            x.grouping == "Financial service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = financialTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        financial.push(Number(temp));
      }
      //Service public
      let publicw = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let publicwTemp = getData.filter(
          (x) =>
            x.grouping == "Public and welfare service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = publicwTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        publicw.push(Number(temp));
      }

      //Service private household
      let privatew = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let privatewTemp = getData.filter(
          (x) =>
            x.grouping == "Private household service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = privatewTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        privatew.push(Number(temp));
      }

      this.isChart1 = true;

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
          text: `Which sectors in ${this.continent} economies are most reliant <br>on export production in ${this.displayImportingEconomy}?`,
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          labels: {
            rotation: -90,
          },
          categories: this.countryList,
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
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: false,
            },
          },
        },
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

        series: [
          {
            name: "Agriculture",
            data: agriculture,
            color: "#2F978B",
          },
          {
            name: "Mining",
            data: mining,
            color: "#9A25B1",
          },
          {
            name: "Construction",
            data: construction,
            color: "#8D243B",
          },
          {
            name: "Utilities",
            data: utilities,
            color: "#FA9908",
          },
          {
            name: "Manufacturing-Low tech",
            data: lowtech,
            color: "#F34336",
          },
          {
            name: "Manufacturing-High and medium tech",
            data: hitech,
            color: "#C3165B",
          },
          {
            name: "Service-Trade and repair",
            data: tradeRepair,
            color: "#5E6DC1",
          },
          {
            name: "Service-Tourism",
            data: tourism,
            color: "#3F50B8",
          },
          {
            name: "Service-Transport",
            data: transport,
            color: "#3949AB",
          },
          {
            name: "Service-ICT",
            data: ict,
            color: "#1565C0",
          },
          {
            name: "Service-Property",
            data: property,
            color: "#19227D",
          },
          {
            name: "Service-Financial",
            data: financial,
            color: "#43A7F5",
          },
          {
            name: "Service-Public and welfare",
            data: publicw,
            color: "#2088E7",
          },
          {
            name: "Service-Private household",
            data: privatew,
            color: "#1564C0",
          },
        ],
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