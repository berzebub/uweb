<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <app-bar :isShowLogo="false"></app-bar>
    <header-menu></header-menu>
    <importing-select></importing-select>

    <div style="width:90%;margin:auto;max-width:1000px">
      <q-img src="../../public/structure-1.png"></q-img>
    </div>

    <!-- POLICY -->
    <div class="q-pa-lg">
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
    <div class="row items-center">
      <div class="col">
        <div id="container"></div>
        <div align="left" class="q-pl-sm text-grey text-subtitle3">Gross exports to World: $40 B</div>
      </div>
      <div style="width:300px" class="q-px-sm">
        <div
          class="row items-center q-pt-md"
          v-for="(items,index) in colorListWithLabel"
          :key="index"
        >
          <div style="width:45px;height:30px" :class="items.color"></div>
          <div class="col q-pl-sm">{{ items.label }}</div>
        </div>
      </div>
    </div>
    <hr />
    <div style="height:30px"></div>
    <div class="row items-center">
      <div class="col">
        <div id="container1"></div>
      </div>
      <div style="width:300px" class="q-px-sm">
        <div
          class="row items-center q-pt-md"
          v-for="(items,index) in colorListWithLabel"
          :key="index"
          v-show="items.color != 'bg8'"
        >
          <div style="width:45px;height:30px" :class="items.color"></div>
          <div class="col q-pl-sm">{{ items.label }}</div>
        </div>
      </div>
    </div>

    <div style="height:30px"></div>
    <div style="width:90%;margin:auto">
      <q-img src="../../public/graphDown.png"></q-img>
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
    };
  },
  methods: {
    async setData() {
      Highcharts.chart("container", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
        },
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",
            data: [
              {
                name: "Imp. cons. (60%)",
                value: 60,
                color: "#2381B8",
              },
              {
                name: "imp. exp. (15%)",
                value: 5,
                color: "#EB1E63",
              },
              {
                name: "Dom. cons (5%)",
                value: 5,
                color: "#F99704",
              },
              {
                name: "Double (5%)",
                value: 5,
                color: "#2D9687",
              },
              {
                name: "Imp. cont. (15%)",
                value: 15,
                color: "#9C26B3",
              },
            ],
          },
        ],
        title: {
          text: "What happens to Thailand's exports to China?",
        },
        subtitle: {
          text: "Gross exports to China: $10 B",
          align: "left",
        },
      });
    },
    setStackChart() {
      Highcharts.chart("container1", {
        chart: {
          type: "column",
        },
        title: {
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
        legend: {
          // align: "right",
          // verticalAlign: "right",
          // floating: true,
          // backgroundColor:
          //   Highcharts.defaultOptions.legend.backgroundColor || "white",
          // borderColor: "#CCC",
          // borderWidth: 1,
          // shadow: false,
          enabled: false,
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
            name: "Used in Thailand's domestic comsumption",
            data: [5, 10, 5, 8, 4, 10, 8, 3],
            color: "#f99704",
          },
          {
            name: "Imported content",
            data: [9, 2, 10, 6, 15, 10, 8, 3],
            color: "#9C26B3",
          },
          {
            name: "Used in China's export production",
            data: [8, 3, 5, 10, 9, 10, 10, 3],
            color: "#EB1E63",
          },
          {
            name: "Used in China's comsumption",
            data: [18, 25, 20, 16, 12, 10, 14, 31],
            color: "#2381B8",
          },
        ],
      });
    },
  },
  mounted() {
    this.setData();
    this.setStackChart();
  },
};
</script>

<style lang="scss" scoped>
</style>