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

      <!-- กราฟ -->
      <div class="q-py-xl">
        <div align="center" style="width:900px; margin:auto;">
          <div id="container"></div>
        </div>
      </div>

      <!-- กราฟ -->
      <div
        class="font-graph"
        align="center"
        id="importedcountry"
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
    renderGraph() {
      this.setData();
      this.setStackChart();
    },
    importingEconomyChanged(val) {
      this.displayImportingEconomy = val;
      if (val == this.displayCountry || val == this.displaySourceEconomy) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;
      }
      this.renderGraph();
    },
    sourceChanged(val) {
      this.displaySourceEconomy = val;
      if (val == this.displayCountry || val == this.displayImportingEconomy) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;
      }
      this.renderGraph();
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
      this.renderGraph();
    },
    async setData() {
      let chart = Highcharts.chart("container", {
        chart: {
          height: (3 / 3) * 100 + "%", // 16:9 ratio
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

            data: [
              {
                id: "A",
                name: "Agriculture",
                color: "#2F978B",
                showInLegend: true,
              },
              {
                id: "B",
                name: "Mining",
                color: "#9A25B1",
              },
              {
                id: "C",
                name: "Construction",
                color: "#8D243B",
              },
              {
                id: "D",
                name: "Utilities",
                color: "#FA9908",
              },
              {
                id: "E",
                name: "Low tech",
                color: "#F34336",
              },
              {
                id: "F",
                name: "High and medium tech",
                color: "#C3165B",
              },
              {
                id: "G",
                name: "Trade and repair service",
                color: "#5E6DC1",
              },
              {
                id: "H",
                name: "Tourism",
                color: "#3F50B8",
              },
              {
                id: "I",
                name: "Transport service",
                color: "#3949AB",
              },
              {
                id: "J",
                name: "ICT service",
                color: "#1565C0",
              },
              {
                id: "K",
                name: "Property service",
                color: "#19227D",
              },
              {
                id: "L",
                name: "Financial service",
                color: "#43A7F5",
              },
              {
                id: "M",
                name: "Publice and welfare service",
                color: "#2088E7",
              },
              {
                id: "N",
                name: "Private household service",
                color: "#1564C0",
              },
              // End
              {
                name: "agriculture hunting forestry and fishing",
                parent: "A",
                value: 1.3,
              },
              {
                name: "mining and quarrying",
                parent: "B",
                value: 10.9,
              },
              {
                name: "construction",
                parent: "C",
                value: 4.61,
              },
              {
                name: "electricity gas and water supply",
                parent: "D",
                value: 1.61,
              },

              {
                name: "food beverages and tobacco",
                parent: "E",
                value: 5.61,
              },
              {
                name: "textiles and textile products",
                parent: "E",
                value: 3.61,
              },
              {
                name: "leather leather products and footwear",
                parent: "E",
                value: 2.61,
              },
              {
                name: "wood and products of wood and cork",
                parent: "E",
                value: 4.21,
              },
              {
                name: "pulp paper paper products printing and publishing",
                parent: "E",
                value: 2.21,
              },
              {
                name: "rubber and plastics",
                parent: "E",
                value: 2.41,
              },
              {
                name: "manufacturing nec recycling",
                parent: "E",
                value: 2.41,
              },
              {
                name: "coke refined petroleum and nuclear fuel",
                parent: "F",
                value: 2.61,
              },
              {
                name: "chemicals and chemical products",
                parent: "F",
                value: 3.61,
              },

              {
                name: "other nonmetallic minerals",
                parent: "F",
                value: 1.61,
              },
              {
                name: "basic metals and fabricated metal",
                parent: "F",
                value: 0.71,
              },
              {
                name: "machinery nec",
                parent: "F",
                value: 4.71,
              },
              {
                name: "electrical and optical equipment",
                parent: "F",
                value: 2.71,
              },
              {
                name: "transport equipment",
                parent: "F",
                value: 1.81,
              },

              {
                name:
                  "sale maintenance and repair of motor vehicles and motorcycles retail sale of fuel",
                parent: "G",
                value: 1.61,
              },
              {
                name:
                  "wholesale trade and commission trade except of motor vehicles and motorcycles",
                parent: "G",
                value: 2.11,
              },
              {
                name:
                  "retail trade except of motor vehicles and motorcycles repair of household goods",
                parent: "G",
                value: 1.55,
              },
              {
                name: "hotels and restaurants",
                parent: "H",
                value: 2.35,
              },
              {
                name: "inland transport",
                parent: "I",
                value: 4.35,
              },
              {
                name: "water transport",
                parent: "I",
                value: 1.35,
              },
              {
                name: "air transport",
                parent: "I",
                value: 3.35,
              },
              {
                name:
                  "other supporting and auxiliary transport activities activities of travel agencies",
                parent: "I",
                value: 1.45,
              },
              {
                name: "post and telecommunications",
                parent: "J",
                value: 3.45,
              },
              {
                name: "financial intermediation",
                parent: "L",
                value: 5.45,
              },
              {
                name: "real estate activities",
                parent: "K",
                value: 1.45,
              },
              {
                name: "renting of m&eq and other business activities",
                parent: "K",
                value: 2.45,
              },
              {
                name:
                  "public administration and defense compulsory social security",
                parent: "M",
                value: 3.45,
              },
              {
                name: "education",
                parent: "M",
                value: 5.45,
              },
              {
                name: "health and social work",
                parent: "M",
                value: 1.45,
              },
              {
                name: "other community social and personal services",
                parent: "M",
                value: 2.45,
              },
              {
                name: "private households with employed persons",
                parent: "N",
                value: 2.45,
              },
            ],
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
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #F34336;"></div></td><td style="padding-left:12px;"><div>Manufacturtoring</div>Low tech </td></tr></table></div>';
            } else if (this.name == "High and medium tech") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #C3165B;"></div></td><td style="padding-left:12px;"><div>Manufacturtoring</div>High and medium tech</td></tr></table></div>';
            } else if (this.name == "Trade and repair service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #5E6DC1;"></div></td><td style="padding-left:12px;"><div>Service</div>Trade and repair service</td></tr></table></div>';
            } else if (this.name == "Tourism") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #3F50B8;"></div></td><td style="padding-left:12px;"><div>Service</div>Tourism</td></tr></table></div>';
            } else if (this.name == "Transport service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #3949AB;"></div></td><td style="padding-left:12px;"><div>Service</div>Transport service</td></tr></table></div>';
            } else if (this.name == "ICT service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #1565C0;"></div></td><td style="padding-left:12px;"><div>Service</div>ICT service</td></tr></table></div>';
            } else if (this.name == "Property service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #19227D;"></div></td><td style="padding-left:12px;"><div>Service</div>Property service</td></tr></table></div>';
            } else if (this.name == "Financial service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #43A7F5;"></div></td><td style="padding-left:12px;"><div>Service</div>Financial service</td></tr></table></div>';
            } else if (this.name == "Publice and welfare service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #2088E7;"></div></td><td style="padding-left:12px;"><div>Service</div>Publice and welfare service</td></tr></table></div>';
            } else if (this.name == "Private household service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #1564C0;"></div></td><td style="padding-left:12px;"><div>Service</div>Private household service</td></tr></table></div>';
            }
          },
        },
        title: {
          style: {
            fontSize: "24px",
          },
          text: `Which sectors in ${this.displayCountry} rely the most on imported content from ${this.displaySourceEconomy} in exports to ${this.displayImportingEconomy}?`,
        },
        credits: {
          enabled: false,
        },
        subtitle: {
          style: {
            fontSize: "14px",
          },
          text: `Imported content from ${this.displaySourceEconomy} in exports to ${this.displayImportingEconomy} : $8B / Gross exports to ${this.displayImportingEconomy}: $40B`,
          align: "left",
        },
      });
    },
  },
};
</script>

<style  scoped>
</style>