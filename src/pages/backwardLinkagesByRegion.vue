<template>
  <q-page class="container bg-white" style="padding-bottom:120px">
    <app-bar :isShowLogo="false"></app-bar>
    <header-menu :activeMenu="3"></header-menu>
    <importing-select></importing-select>

    <!-- Title box -->
    <div class="q-px-md" style="margin:auto; max-width:1050px;width:95%;">
      <div class="q-pa-md" style="border-radius:5px;border:2px solid">
        <p class="font-graph" align="center">Where does imported content come from?</p>
        <p
          class="font-content"
          align="center"
        >Some part of Thailand’s gross exports consist of imported inputs that originate in other source economies.</p>
        <p class="font-content" align="center">
          <span class="q-pr-lg">Source economy</span>

          <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
          <span class="q-px-lg">Exporting economy (Thailand)</span>
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
        <u>Where does Thailand’s imported content come from in exports to a selected importer ?</u>
      </p>
      <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedregion'">
        2.
        <u>Where do South-East Asian economies’ imported content come from in exports to a selected importer ?</u>
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
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import importingSelect from "../components/importEconomySelect";
import Axios from "axios";

export default {
  components: {
    appBar,
    headerMenu,
    importingSelect,
  },
  data() {
    return {
      colorListWithLabel: [
        {
          color: "bg5",
          label: "Asia-Pacific",
        },
        {
          color: "bg6",
          label: "Europe",
        },
        {
          color: "bg7",
          label: "North America",
        },
        {
          color: "bg8",
          label: "Latin America",
        },
        {
          color: "bg9",
          label: "Rest of the world",
        },
      ],
    };
  },
  methods: {
    async setData() {
      let chart = Highcharts.chart(
        "container",
        {
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
            text:
              "Where does Thailand's imported content in exports to China come from?",
          },
          credits: {
            enabled: false,
          },
          subtitle: {
            style: {
              fontSize: "14px",
            },
            text:
              "Gross exports of Thailand in All sector(s) to China amount to *$40* billion in *year*. Of these exports, *$8* billion is imported content that comes from other economies, mainly United States of America (*19.05*%), Hong Kong (*10.9*%), Japan (*5.61*%), Rep. of Korea (*3.98*%) and Germany (*4.39*%). <br>imported content in exports to China: $8B / Gross exports to China: $40B",
            align: "center",
          },
        }

        // function (chart) {
        //   chart.renderer
        //     .text(
        //       'This text is <span style="color: red">styled</span> and <a href="http://example.com">linked</a>',
        //       150,
        //       80
        //     )
        //     .css({
        //       color: "#4572A7",
        //       fontSize: "16px",
        //     })
        //     .add();
        // }
      );
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
          categories: [
            "Brunei Darussalam",
            "Cambodia",
            "Indonesia",
            "Lao PDR",
            "Malaysia",
            "Philippines",
            "Singapore",
            "Thailand",
            "Vietnam",
          ],
        },
        credits: {
          enabled: false,
        },
        yAxis: {
          min: 0,
          title: {
            text: "% of gross exports to China",
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
            data: [18, 25, 20, 16, 12, 10, 14, 31, 5],
            color: "#2381B8",
          },
          {
            name: "Europe",
            data: [8, 3, 5, 10, 9, 10, 10, 3, 5],
            color: "#EB1E63",
          },
          {
            name: "North America",
            data: [5, 10, 5, 8, 4, 10, 8, 3, 5],
            color: "#f99704",
          },
          {
            name: "Latin America",
            data: [5, 10, 5, 8, 4, 10, 8, 3, 5],
            color: "#2D9687",
          },
          {
            name: "Rest of the world",
            data: [5, 10, 5, 8, 4, 10, 8, 3, 5],
            color: "#9C26B3",
          },
        ],
        title: {
          style: {
            fontSize: "24px",
          },
          text:
            "Where do South-East Asian economies’ imported content in exports to China come from  ?",
        },
      });
    },
  },
  mounted() {
    this.setData();
    this.setStackChart();
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