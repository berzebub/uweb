<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <app-bar :isShowLogo="false"></app-bar>
    <header-menu></header-menu>
    <importing-select></importing-select>

    <div class="row" style="margin:auto; width:1050px;">
      <div class="divLeft col">
        <div class="font-graph q-pt-md" align="center">Table of contents:</div>
        <div class="q-pa-md font-content">
          <div>
            1.
            <u>Key policy question</u>
          </div>
          <div class="q-pt-md">
            2.
            <u>Structure of value-added</u>
          </div>
          <div class="q-pt-md">
            3.
            <u>Comparison with partners</u>
          </div>
          <div class="q-pt-md">
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
        >Thailand's gross exports can be divided into five major parts:</div>
        <div class="row q-pt-md" style="width:95%; margin:auto;">
          <div style="width:20%" align="center">Used in importer's comsumption</div>
          <div style="width:20%" align="center">Used in domestic comsumption</div>
          <div style="width:20%" align="center">Used in importer's export production</div>
          <div style="width:20%" align="center">Imported content</div>
          <div style="width:20%" align="center">Double counted exports from repeated border crossing</div>
        </div>
        <div class="bracketLeft"></div>
        <div class="bracketRight"></div>
        <div class="textLeft font-content">Thailand's valued-added in exports</div>
        <div class="textRight font-content">GVC releated exports</div>
      </div>
    </div>
    <!-- POLICY -->
    <div class="q-py-lg" style="width:90%;margin:auto;max-width:1200px">
      <p align="center" class="q-pb-md" style="font-size:24px">Key policy questions</p>
      <div class="q-px-md font-content">
        <div>
          1.
          <u>What happens to Thailand’s exports to a selected importer?</u>
        </div>
        <div class="q-py-md">
          2.
          <u>What happens to South-East Asian economics’s exports to a selected imported?</u>
        </div>
        <div>
          3.
          <u>How does Thailand’s domestic value-added and gross trade balance with the selected imported differ?</u>
        </div>
      </div>
    </div>
    <hr />
    <div style="height:30px"></div>
    <div style="width:90%;margin:auto;max-width:1200px">
      <div id="container"></div>
    </div>

    <hr />
    <div style="height:30px"></div>
    <div style="width:90%;margin:auto;max-width:1200px">
      <div id="container1"></div>
    </div>
    <hr />
    <div style="height:30px"></div>
    <div style="width:90%;margin:auto;max-width:1200px">
      <div id="container2"></div>
    </div>
    <div style="height:30px"></div>
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
          label: "Used in China's comsumption",
        },
        {
          color: "bg6",
          label: "Used in China's export production",
        },
        {
          color: "bg7",
          label: "Used in Thailand’s domestic comsumption",
        },
        {
          color: "bg8",
          label: "Double counted exports fromrepeated border crossings",
        },
        {
          color: "bg9",
          label: "Imported content",
        },
      ],
      test: "xxx",
    };
  },
  methods: {
    async setData() {
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
                name: "Imp. cons. (60%)",
                value: 60,
                color: "#2381B8",
                label: "Used in China’s comsumption",
              },
              {
                name: "imp. exp. (15%)",
                value: 5,
                color: "#EB1E63",
                label: "Used in China’s export production",
              },
              {
                name: "Dom. cons (5%)",
                value: 5,
                color: "#F99704",
                label: "Used in Thailand’s domestic <br>comsumption",
              },
              {
                name: "Double (5%)",
                value: 5,
                color: "#2D9687",
                label:
                  "Double counted exports <br>from repeated border crossings",
              },
              {
                name: "Imp. cont. (15%)",
                value: 15,
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
          text: "What happens to Thailand's exports to China?",
        },
        subtitle: {
          text: "Gross exports to China: $10B / Gross exports to World: $40B",
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
    setStackChart() {
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
          text: "What happens to South-East Asian economies’ exports to China?",
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
            text: "% of gross exports to China",
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
            name: "Used in China's comsumption",
            data: [18, 25, 20, 16, 12, 10, 14, 31],
            color: "#2381B8",
          },
          {
            name: "Used in China's export production",
            data: [8, 3, 5, 10, 9, 10, 10, 3],
            color: "#EB1E63",
          },
          {
            name: "Used in Thailand's domestic <br>comsumption",
            data: [5, 10, 5, 8, 4, 10, 8, 3],
            color: "#f99704",
          },
          {
            name: "Double counted exports from <br>repeated border crossings",
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            color: "#2D9687",
          },
          {
            name: "Imported content",
            data: [9, 2, 10, 6, 15, 10, 8, 3],
            color: "#9C26B3",
          },
        ],
        exporting: {
          // buttons: {
          //   contextButton: {
          //     menuItems: [
          //       "printChart",
          //       "separator",
          //       // "downloadPNG",
          //       // "downloadJPEG",
          //       "downloadPDF",
          //       // "downloadSVG",
          //       // "separator",
          //       "downloadCSV",
          //       // "downloadXLS",
          //       //"viewData",
          //       // "openInCloud",
          //     ],
          //   },
          // },
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
    setStackChart2() {
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
          text:
            "How does Thailand's gross and domestic value-added trade balance with China differ?",
        },
        xAxis: {
          max: 0,
          categories: ["", ""],
        },
        yAxis: {
          max: 10,
          title: {
            text: "% of gross exports to China",
          },
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "Domestic value-added trade balance",
            data: [-3],
            color: "#2381B8",
          },
          {
            name: "Gross trade balance",
            data: [-9],
            color: "#EB1E63",
          },
        ],
      });
    },
  },
  mounted() {
    this.setData();
    this.setStackChart();
    this.setStackChart2();
  },
};
</script>

<style >
.divLeft {
  height: 300px;
  border: 2px solid black;
  border-radius: 10px;
}
.divRight {
  margin-left: 20px;
  width: 750px;
  height: 300px;
  border: 2px solid black;
  border-radius: 10px;
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