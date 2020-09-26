<template>
  <q-page class="container bg-white">
    <q-select @input="(val) => changeFlag(val)" outlined v-model="model" :options="options">
      <template v-slot:prepend>
        <!-- <img style="width:30px" :src="activeFlag" alt=""> -->
      </template>
    </q-select>
    <div id="container"></div>
  </q-page>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      model: "Argentina",
      activeFlag: "/public/test/flag1.png",
      options: [
        {
          value: "Argentina",
          label: "Argentina",
          flag:
            "https://teerapornclinic.com/wp-content/uploads/2017/07/usa-flag.jpg",
        },
        {
          value: "Australia",
          label: "Australia",
          flag:
            "https://static.dezeen.com/uploads/2020/06/mississippi-state-flag-design-dezeen-2364-hero.jpg",
        },
      ],
    };
  },
  methods: {
    changeFlag(val) {
      console.log(val);
      this.activeFlag = val.flag;
    },
    loadGraph() {
      let agriculture = [
        [
          {
            name: "Argentina",
            y: 2.7,
          },
          {
            name: "Bolivia",
            y: 1.7,
          },
        ],
      ];
      Highcharts.chart("container", {
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
          type: "category",
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
            data: [
              {
                name: "Argentina",
                y: 2.7,
              },
              {
                name: "Bolivia",
                y: 1.7,
              },
            ],
            color: "#2F978B",
          },
          {
            name: "Mining",
            data: [
              {
                drilldown: "Argentina-Mining",
                name: "Argentina",
                y: 2.7,
              },
              {
                drilldown: "Bolivia-Mining",
                name: "Bolivia",
                y: 1.7,
              },
            ],
            color: "#9A25B1",
          },
          // {
          //   name: "lowtech",
          //   data: lowtech,
          //   color: "#AA25B1",
          // },
        ],
        drilldown: {
          activeDataLabelStyle: {
            color: "white",
            textShadow: "0 0 2px black, 0 0 2px black",
          },
          showInLegend: false,
          series: [
            {
              id: "Argentina-Mining",
              name: "Argentina :: Mining",
              type: "pie",
              data: [
                {
                  name: "L1",
                  y: 10,
                },
                {
                  name: "L2",
                  y: 20,
                },
              ],
            },
            {
              id: "Bolivia-Mining",
              name: "Bolivia :: Mining",
              type: "pie",
              data: [
                {
                  name: "L3",
                  y: 20,
                },
                {
                  name: "L4",
                  y: 20,
                },
              ],
            },
          ],
        },
        exporting: {
          buttons: {
            contextButton: {
              menuItems: ["downloadCSV", "downloadXLS"],
            },
          },
        },
      });
    },
  },
  mounted() {
    this.loadGraph();
  },
};
</script>

<style lang="scss" scoped>
</style>