<template>
  <q-page class="container bg-white" style="padding-bottom:120px">
    <app-bar
      :isShowLogo="false"
      @countrySelected="exportingEconomyChanged"
      @yearSelected="(val) => displayYear = val "
    ></app-bar>
    <header-menu :activeMenu="3"></header-menu>
    <importing-select @importingEconomy="importingEconomyChanged" @sectorSelected="sectorChanged"></importing-select>

    <error-page
      v-show="isShowErrorWarning"
      displayText="The exporting economy must not be the same as the importing economy."
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
            <span class="q-px-lg">Exporting economy ({{displayCountry}})</span>
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
          <u>Where does {{displayCountry}}’s imported content come from in exports to a selected importer ?</u>
        </p>
        <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedregion'">
          2.
          <u>Where do {{continent}} economies’ imported content come from in exports to a selected importer ?</u>
        </p>
      </div>

      <div style="height:30px"></div>
      <hr />
      <div style="height:30px"></div>

      <!-- Where does Thailand's imported content -->
      <div style="width:90%;margin:auto;max-width:1200px" id="importedcountry">
        <div id="container"></div>
      </div>

      <div style="height:30px"></div>
      <hr />
      <!-- Where does South-East Asian imported content -->
      <div style="height:30px" id="importedregion"></div>

      <div style="width:90%;margin:auto;max-width:1200px">
        <div id="container1"></div>
      </div>
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
      continent: "",
      displayCountry: "",
      displaySector: "",
      displayImportingEconomy: "",
      displayYear: "",
      isShowErrorWarning: false,
    };
  },
  methods: {
    renderGraph() {
      this.setData();
      this.setStackChart();
    },
    sectorChanged(val) {
      this.displaySector = val;
    },
    exportingEconomyChanged(val) {
      this.displayCountry = val.name;
      this.continent = val.region;
      this.renderGraph();
      if (val == this.displayImportingEconomy) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;
      }
    },
    importingEconomyChanged(val) {
      this.displayImportingEconomy = val;
      this.renderGraph();

      if (val == this.displayCountry) {
        this.isShowErrorWarning = true;
      } else {
        this.isShowErrorWarning = false;
      }
    },
    async setData() {
      let chart = Highcharts.chart("container", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
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
                dataLabels: {
                  enabled: true,
                  align: "left",
                  verticalAlign: "top",
                  style: {
                    fontSize: "15px",
                    fontWeight: "bold",
                  },
                },
              },
            ],

            data: [
              {
                id: "A",
                name: "Asia-Pacific",
                color: "#2381B8",
                showInLegend: true,
              },
              {
                id: "B",
                name: "Europe",
                color: "#EB1E63",
              },
              {
                id: "C",
                name: "North America",
                color: "#F99704",
              },
              {
                id: "D",
                name: "Latin America",
                color: "#2D9687",
              },
              {
                id: "E",
                name: "Rest of the world",
                color: "#9C26B3",
              },
              {
                name: "Bhutan",
                parent: "A",
                value: 1.3,
              },
              {
                name: "Hongkong",
                parent: "A",
                value: 10.9,
              },
              {
                name: "Japan",
                parent: "A",
                value: 5.61,
              },
              {
                name: "Bangladesh",
                parent: "A",
                value: 3.21,
              },
              {
                name: "Brunei Darussalam",
                parent: "A",
                value: 1.21,
              },
              {
                name: "Cambodia",
                parent: "A",
                value: 0.21,
              },
              {
                name: "Cyprus",
                parent: "A",
                value: 0.31,
              },
              {
                name: "India",
                parent: "A",
                value: 3.31,
              },
              {
                name: "Indonesia",
                parent: "A",
                value: 2.31,
              },
              {
                name: "Kazakhstan",
                parent: "A",
                value: 1.51,
              },
              {
                name: "Kyrgyz Republic",
                parent: "A",
                value: 0.51,
              },
              {
                name: "Republic of Korea",
                parent: "A",
                value: 2.51,
              },
              {
                name: "Malaysia",
                parent: "A",
                value: 1.51,
              },
              {
                name: "Maldives",
                parent: "A",
                value: 1.01,
              },
              {
                name: "Mongolia",
                parent: "A",
                value: 0.81,
              },
              {
                name: "Nepal",
                parent: "A",
                value: 0.81,
              },
              {
                name: "Pakistan",
                parent: "A",
                value: 0.81,
              },
              {
                name: "Philippines",
                parent: "A",
                value: 2.81,
              },
              {
                name: "People's Republic of China",
                parent: "A",
                value: 8.81,
              },
              {
                name: "Singapore",
                parent: "A",
                value: 2.81,
              },
              {
                name: "Sri Lanka",
                parent: "A",
                value: 0.81,
              },
              {
                name: "Austria",
                parent: "B",
                value: 1.8,
              },
              {
                name: "Belgium",
                parent: "B",
                value: 2.5,
              },
              {
                name: "Bulgaria",
                parent: "B",
                value: 1,
              },
              {
                name: "Czech Republic",
                parent: "B",
                value: 1.4,
              },
              {
                name: "Denmark",
                parent: "B",
                value: 1.6,
              },
              {
                name: "Estonia",
                parent: "B",
                value: 0.3,
              },
              {
                name: "Finland",
                parent: "B",
                value: 1.3,
              },
              {
                name: "France",
                parent: "B",
                value: 1.4,
              },
              {
                name: "Germany",
                parent: "B",
                value: 4.3,
              },
              {
                name: "Greece",
                parent: "B",
                value: 0.3,
              },
              {
                name: "Croatia",
                parent: "B",
                value: 0,
              },
              {
                name: "Hungary",
                parent: "B",
                value: 1.1,
              },
              {
                name: "Ireland",
                parent: "B",
                value: 0,
              },
              {
                name: "Italy",
                parent: "B",
                value: 2.1,
              },
              {
                name: "Lithuania",
                parent: "B",
                value: 0,
              },
              {
                name: "Luxembourg",
                parent: "B",
                value: 0,
              },
              {
                name: "Latvia",
                parent: "B",
                value: 0,
              },
              {
                name: "Malta",
                parent: "B",
                value: 0.1,
              },
              {
                name: "Netherlands",
                parent: "B",
                value: 2.1,
              },
              {
                name: "Norway",
                parent: "B",
                value: 1.1,
              },
              {
                name: "Poland",
                parent: "B",
                value: 0,
              },
              {
                name: "Portugal",
                parent: "B",
                value: 2,
              },
              {
                name: "Romania",
                parent: "B",
                value: 2.3,
              },
              {
                name: "Russia",
                parent: "B",
                value: 1.4,
              },
              {
                name: "Spain",
                parent: "B",
                value: 3.2,
              },
              {
                name: "Slovak Republic",
                parent: "B",
                value: 0,
              },
              {
                name: "Slovenia",
                parent: "B",
                value: 0.1,
              },
              {
                name: "Sweden",
                parent: "B",
                value: 1.1,
              },
              {
                name: "Switzerland",
                parent: "B",
                value: 0.3,
              },
              {
                name: "United States",
                parent: "C",
                value: 3.8,
              },
              {
                name: "Canada",
                parent: "C",
                value: 2.7,
              },
              {
                name: "Argentina",
                parent: "D",
                value: 1.8,
              },
              {
                name: "Bolivia",
                parent: "D",
                value: 0.9,
              },
              {
                name: "Brazil",
                parent: "D",
                value: 2.9,
              },
              {
                name: "Bolivia",
                parent: "D",
                value: 0.9,
              },
              {
                name: "Chile",
                parent: "D",
                value: 1.9,
              },
              {
                name: "Colombia",
                parent: "D",
                value: 0.3,
              },
              {
                name: "Ecuador",
                parent: "D",
                value: 0,
              },
              {
                name: "Maxico",
                parent: "D",
                value: 0.8,
              },
              {
                name: "Paraguay",
                parent: "D",
                value: 0.3,
              },
              {
                name: "Peru",
                parent: "D",
                value: 0.7,
              },
              {
                name: "Uruguay",
                parent: "D",
                value: 0.9,
              },
              {
                name: "Venezuela",
                parent: "D",
                value: 0,
              },
              {
                name: "Rest of the Latin America",
                parent: "D",
                value: 0.1,
              },
              {
                name: "Australia",
                parent: "E",
                value: 2.4,
              },
              {
                name: "Others",
                parent: "E",
                value: 0.4,
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
          width: "200",
          // symbolPadding: 200,
          symbolWidth: 0.1,
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function () {
            // return "<div>" + this.name + "</div>";
            if (this.name == "Europe") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #eb1e63;"></div></td><td style="padding-left:20px;">Euroupe</td></tr></table></div>';
            } else if (this.name == "Latin America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #2D9687;"></div></td><td style="padding-left:20px;">Latin America</td></tr></table></div>';
            } else if (this.name == "North America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #F99704;"></div></td><td style="padding-left:20px;">North America</td></tr></table></div>';
            } else if (this.name == "Asia-Pacific") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #2381B8;"></div></td><td style="padding-left:20px;">Asia-Pacific</td></tr></table></div>';
            } else if (this.name == "Rest of the world") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #9C26B3;"></div></td><td style="padding-left:20px;">Rest of the world</td></tr></table></div>';
            }
          },
        },
        // legend: {
        //   labelFormatter: function () {
        //     return this.name;
        //   },
        // },
        title: {
          style: {
            fontSize: "24px",
          },
          text: `Where does ${this.displayCountry}'s imported content in exports to ${this.displayImportingEconomy} come from?`,
        },
        credits: {
          enabled: false,
        },
        subtitle: {
          style: {
            fontSize: "14px",
          },
          text: `Gross exports of ${this.displayCountry} in ${this.displaySector} sector(s) to ${this.displayImportingEconomy} amount to *$40* billion in *year*. Of these exports, *$8* billion is imported content that comes from other economies, mainly United States of America (*19.05*%), Hong Kong (*10.9*%), Japan (*5.61*%), Rep. of Korea (*3.98*%) and Germany (*4.39*%). <br>imported content in exports to ${this.displayImportingEconomy}: $8B / Gross exports to ${this.displayImportingEconomy}: $40B`,
          align: "center",
        },
      });
    },
    setStackChart() {
      Highcharts.chart("container1", {
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" },
        },

        xAxis: {
          labels: {
            rotation: -90,
          },
          type: "category",
          // categories: [
          //   "Brunei Darussalam",
          //   "Cambodia",
          //   "Indonesia",
          //   "Lao PDR",
          //   "Malaysia",
          //   "Philippines",
          //   "Singapore",
          //   "Thailand",
          //   "Vietnam",
          // ],
        },
        credits: {
          enabled: false,
        },
        yAxis: {
          min: 0,
          title: {
            text: "% of gross exports to world",
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
          width: 200,
          itemMarginTop: 25,
          symbolHeight: 15,
          symbolWidth: 50,
          symbolRadius: 0,
        },

        tooltip: {
          headerFormat: "<b>{point.x}</pimported><br/>",
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
            name: "Asia-Pacific",
            data: [
              {
                name: "Brunei Darussalam",
                y: 18,
                drilldown: "Brunei Darussalam - Asia Pacific",
              },
              {
                name: "Cambodia",
                y: 3,
                drilldown: "Cambodia - Asia Pacific",
              },
              {
                name: "Indonesia",
                y: 1.6,
                drilldown: "Indonesia - Asia Pacific",
              },
              {
                name: "Lao PDR",
                y: 12,
                drilldown: "Lao PDR - Asia Pacific",
              },
              {
                name: "Malaysia",
                y: 10,
                drilldown: "Malaysia - Asia Pacific",
              },
              {
                name: "Philippines",
                y: 10,
                drilldown: "Philippines - Asia Pacific",
              },
              {
                name: "Singapore",
                y: 14,
                drilldown: "Singapore - Asia Pacific",
              },
              {
                name: "Thailand",
                y: 14,
                drilldown: "Thailand - Asia Pacific",
              },
              {
                name: "Viet Nam",
                y: 14,
                drilldown: "Viet Nam - Asia Pacific",
              },
            ],
            color: "#2381B8",
          },
          {
            name: "Europe",
            data: [
              {
                name: "Brunei Darussalam",
                y: 5,
                drilldown: "Brunei Darussalam - Europe",
              },
              {
                name: "Cambodia",
                y: 4,
                drilldown: "Cambodia - Europe",
              },
              {
                name: "Indonesia",
                y: 3,
                drilldown: "Indonesia - Europe",
              },
              {
                name: "Lao PDR",
                y: 2,
                drilldown: "Lao PDR - Europe",
              },
              {
                name: "Malaysia",
                y: 4,
                drilldown: "Malaysia - Europe",
              },
              {
                name: "Philippines",
                y: 3,
                drilldown: "Philippines - Europe",
              },
              {
                name: "Singapore",
                y: 2.4,
                drilldown: "Singapore - Europe",
              },
              {
                name: "Thailand",
                y: 6,
                drilldown: "Thailand - Europe",
              },
              {
                name: "Viet Nam",
                y: 3,
                drilldown: "Viet Nam - Europe",
              },
            ],
            color: "#EB1E63",
          },
          {
            name: "North America",
            data: [
              {
                name: "Brunei Darussalam",
                y: 5,
                drilldown: "Brunei Darussalam - North America",
              },
              {
                name: "Cambodia",
                y: 10,
                drilldown: "Cambodia - North America",
              },
              {
                name: "Indonesia",
                y: 5,
                drilldown: "Indonesia - North America",
              },
              {
                name: "Lao PDR",
                y: 8,
                drilldown: "Lao PDR - North America",
              },
              {
                name: "Malaysia",
                y: 4,
                drilldown: "Malaysia - North America",
              },
              {
                name: "Philippines",
                y: 10,
                drilldown: "Philippines - North America",
              },
              {
                name: "Singapore",
                y: 8,
                drilldown: "Singapore - North America",
              },
              {
                name: "Thailand",
                y: 3,
                drilldown: "Thailand - North America",
              },
              {
                name: "Viet Nam",
                y: 5,
                drilldown: "Viet Nam - North America",
              },
            ],
            color: "#f99704",
          },
          {
            name: "Latin America",
            data: [
              {
                name: "Brunei Darussalam",
                y: 5,
                drilldown: "Brunei Darussalam - Latin America",
              },
              {
                name: "Cambodia",
                y: 2,
                drilldown: "Cambodia - Latin America",
              },
              {
                name: "Indonesia",
                y: 5,
                drilldown: "Indonesia - Latin America",
              },
              {
                name: "Lao PDR",
                y: 3,
                drilldown: "Lao PDR - Latin America",
              },
              {
                name: "Malaysia",
                y: 4,
                drilldown: "Malaysia - Latin America",
              },
              {
                name: "Philippines",
                y: 6,
                drilldown: "Philippines - Latin America",
              },
              {
                name: "Singapore",
                y: 2,
                drilldown: "Singapore - Latin America",
              },
              {
                name: "Thailand",
                y: 3,
                drilldown: "Thailand - Latin America",
              },
              {
                name: "Viet Nam",
                y: 5,
                drilldown: "Viet Nam - Latin America",
              },
            ],
            color: "#2D9687",
          },
          {
            name: "Rest of the world",
            data: [
              {
                name: "Brunei Darussalam",
                y: 3,
                drilldown: "Brunei Darussalam - Rest of the world",
              },
              {
                name: "Cambodia",
                y: 4,
                drilldown: "Cambodia - Rest of the world",
              },
              {
                name: "Indonesia",
                y: 1,
                drilldown: "Indonesia - Rest of the world",
              },
              {
                name: "Lao PDR",
                y: 2,
                drilldown: "Lao PDR - Rest of the world",
              },
              {
                name: "Malaysia",
                y: 5,
                drilldown: "Malaysia - Rest of the world",
              },
              {
                name: "Philippines",
                y: 3.5,
                drilldown: "Philippines - Rest of the world",
              },
              {
                name: "Singapore",
                y: 2,
                drilldown: "Singapore - Rest of the world",
              },
              {
                name: "Thailand",
                y: 4,
                drilldown: "Thailand - Rest of the world",
              },
              {
                name: "Viet Nam",
                y: 1,
                drilldown: "Viet Nam - Rest of the world",
              },
            ],
            // data: [5, 10, 5, 8, 4, 10, 8, 3, 5],
            color: "#9C26B3",
          },
        ],
        drilldown: {
          activeDataLabelStyle: {
            color: "white",
            textShadow: "0 0 2px black, 0 0 2px black",
          },
          showInLegend: false,
          series: [
            {
              id: "Brunei Darussalam - Asia Pacific",
              name: "Brunei Darussalam <br> Asia-Pacific",
              data: [
                ["Japan", 8],
                ["Taiwan", 3],
                ["Viet Nam", 2.1],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.4],
              ],
            },
            {
              id: "Cambodia - Asia Pacific",
              name: "Cambodia <br> Asia-Pacific",
              data: [
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Indonesia - Asia Pacific",
              name: "Indonesia <br> Asia-Pacific",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Lao PDR - Asia Pacific",
              name: "Lao PDR <br> Asia-Pacific",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Malaysia - Asia Pacific",
              name: "Malaysia <br> Asia-Pacific",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Philippines - Asia Pacific",
              name: "Philippines <br> Asia-Pacific",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Singapore - Asia Pacific",
              name: "Singapore <br> Asia-Pacific",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Thailand - Asia Pacific",
              name: "Thailand <br> Asia-Pacific",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Viet Nam - Asia Pacific",
              name: "Viet Nam <br> Asia-Pacific",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Brunei Darussalam - Europe",
              name: "Brunei Darussalam <br> Europe",
              data: [
                ["Japan", 8],
                ["Taiwan", 3],
                ["Viet Nam", 2.1],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.4],
              ],
            },
            {
              id: "Cambodia - Europe",
              name: "Cambodia <br> Europe",
              data: [
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Indonesia - Europe",
              name: "Indonesia <br> Europe",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Lao PDR - Europe",
              name: "Lao PDR <br> Europe",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Malaysia - Europe",
              name: "Malaysia <br> Europe",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Philippines - Europe",
              name: "Philippines <br> Europe",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Singapore - Europe",
              name: "Singapore <br> Europe",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Thailand - Europe",
              name: "Thailand <br> Europe",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Viet Nam - Europe",
              name: "Viet Nam <br> Europe",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Brunei Darussalam - North America",
              name: "Brunei Darussalam <br> North America",
              data: [
                ["Japan", 8],
                ["Taiwan", 3],
                ["Viet Nam", 2.1],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.4],
              ],
            },
            {
              id: "Cambodia - North America",
              name: "Cambodia <br> North America",
              data: [
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Indonesia - North America",
              name: "Indonesia <br> North America",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Lao PDR - North America",
              name: "Lao PDR <br> North America",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Malaysia - North America",
              name: "Malaysia <br> North America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Philippines - North America",
              name: "Philippines <br> North America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Singapore - North America",
              name: "Singapore <br> North America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Thailand - North America",
              name: "Thailand <br> North America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Viet Nam - North America",
              name: "Viet Nam <br> North America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Brunei Darussalam - Latin America",
              name: "Brunei Darussalam <br> Latin America",
              data: [
                ["Japan", 8],
                ["Taiwan", 3],
                ["Viet Nam", 2.1],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.4],
              ],
            },
            {
              id: "Cambodia - Latin America",
              name: "Cambodia <br> Latin America",
              data: [
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Indonesia - Latin America",
              name: "Indonesia <br> Latin America",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Lao PDR - Latin America",
              name: "Lao PDR <br> Latin America",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Malaysia - Latin America",
              name: "Malaysia <br> Latin America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Philippines - Latin America",
              name: "Philippines <br> Latin America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Singapore - Latin America",
              name: "Singapore <br> Latin America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Thailand - Latin America",
              name: "Thailand <br> Latin America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Viet Nam - Latin America",
              name: "Viet Nam <br> Latin America",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Brunei Darussalam - Rest of the world",
              name: "Brunei Darussalam <br> Rest of the world",
              data: [
                ["Japan", 8],
                ["Taiwan", 3],
                ["Viet Nam", 2.1],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.4],
              ],
            },
            {
              id: "Cambodia - Rest of the world",
              name: "Cambodia <br> Rest of the world",
              data: [
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Indonesia - Rest of the world",
              name: "Indonesia <br> Rest of the world",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 1.2],
                ["Sri Lanka", 0.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Lao PDR - Rest of the world",
              name: "Lao PDR <br> Rest of the world",
              data: [
                ["Taiwan", 3],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Malaysia - Rest of the world",
              name: "Malaysia <br> Rest of the world",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Philippines - Rest of the world",
              name: "Philippines <br> Rest of the world",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Singapore - Rest of the world",
              name: "Singapore <br> Rest of the world",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Thailand - Rest of the world",
              name: "Thailand <br> Rest of the world",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
            {
              id: "Viet Nam - Rest of the world",
              name: "Viet Nam <br> Rest of the world",
              data: [
                ["Japan", 8],
                ["Taiwan", 5],
                ["Bhutan", 2.2],
                ["Sri Lanka", 1.7],
                ["Nepal", 0.6],
                ["Cambodia", 0.5],
              ],
            },
          ],
        },
        title: {
          style: {
            fontSize: "24px",
          },
          text: `Where do ${this.continent} economies contribute the most towards export production?`,
        },
      });
    },
  },
  mounted() {
    // this.setData();
    // this.setStackChart();
  },
};
</script>

<style  scoped>
.boxcolor1 {
  width: 15px;
  height: 15px;
  background-color: #eb1e63;
}
.legend1 {
  width: 300px;
}
</style>