<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <app-bar :isShowLogo="false"></app-bar>
    <header-menu :activeMenu="2"></header-menu>
    <importing-select></importing-select>
    <div class="q-px-md">
      <div style="border-radius:10px;border:2px solid" class="q-pa-md">
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
      colorListWithLabel: [
        {
          color: "bg5",
          label: "Used in China's export production (forward linkages)",
        },
        {
          color: "bg6",
          label: "Imported content (backward linkages)",
        },
        {
          color: "bg7",
          label: "Double counted exports from repeated border crossings",
        },
      ],
    };
  },
  methods: {
    setStackChart() {
      Highcharts.chart("container1", {
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%", // 16:9 ratio
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
            name: "Double counted exports from repeated border crossings",
            data: [5, 10, 5, 8, 4, 10, 8, 3],
            color: "#f99704",
          },

          {
            name: "Imported content (backward linkages)",
            data: [8, 3, 5, 10, 9, 10, 10, 3],
            color: "#EB1E63",
          },
          {
            name: "Used in China's export production (forward linkages)",
            data: [18, 25, 20, 16, 12, 10, 14, 31],
            color: "#2381B8",
          },
        ],
        title: {
          text:
            "How much of Thailand’s exports to China are GVC related compared to other South-East Asian economies?",
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