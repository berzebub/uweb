<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <div align="center" class="q-pa-lg">
      <q-btn-group push>
        <q-btn
          color="yellow"
          @click="showType = 1"
          glossy
          text-color="black"
          push
          label="First"
          icon="verified_user"
        />
        <q-btn color="amber" @click="showType = 2" glossy text-color="black" push label="Second" />
        <q-btn color="orange" @click="showType = 3" glossy text-color="black" push label="Third" />
      </q-btn-group>
    </div>
    <div style="height:50px"></div>
    <div class="q-px-md">
      <p>ช่วยเลือกแบบ Legend ให้หน่อยครับไม่สามารถปรับตามแบบ figma ได้ 100% เรื่องความกว้างและความสูงของ legend symbol เนื่องจาก label บางตัว สองบรรทัด</p>
      <p>
        หากปรับความกว้าง และสูงให้กับ symbol ให้ตรง figma จะเป็นแบบนี้
        <q-btn label="click เพื่อดู" @click="showType = 4"></q-btn>
      </p>
    </div>

    <p class="q-px-lg font-graph">รูปแบบที่ {{ showType }}</p>
    <div style="width:90%;margin:auto;max-width:1200px">
      <div v-show="showType == 1" id="container"></div>
      <div v-show="showType == 2" id="container2"></div>
      <div v-show="showType == 3" id="container3"></div>
      <div v-show="showType == 4" id="container4"></div>
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
      showType: 4,
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
                label: "Used in Thailand’s domestic comsumption",
              },
              {
                name: "Double (5%)",
                value: 5,
                color: "#2D9687",
                label: "Double counted exports from repeated border crossings",
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
            fontSize: "12px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
          },

          align: "right",
          verticalAlign: "middle",
          width: 360,
          itemMarginTop: 20,
          symbolWidth: 30,
          symbolHeight: 25,
          symbolRadius: 0,

          labelFormatter: function () {
            return this.label;
          },
        },
        title: {
          text: "What happens to Thailand's exports to China?",
        },
        subtitle: {
          text: "Gross exports to China: $10 B",
          align: "left",
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
    async setData2() {
      Highcharts.chart("container2", {
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
                label: "Used in Thailand’s domestic comsumption",
              },
              {
                name: "Double (5%)",
                value: 5,
                color: "#2D9687",
                label: "Double counted exports from repeated border crossings",
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
            fontSize: "16px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
            textOverflow: "",
          },

          align: "right",
          verticalAlign: "middle",
          width: 300,
          itemMarginTop: 20,
          symbolWidth: 30,
          symbolRadius: 0,

          labelFormatter: function () {
            return this.label;
          },
        },
        title: {
          text: "What happens to Thailand's exports to China?",
        },
        subtitle: {
          text: "Gross exports to China: $10 B",
          align: "left",
        },

        exporting: {
          width: "1280px",
          chartOptions: {
            legend: {
              width: 120,
              itemStyle: {
                fontSize: "7px",
                fontWeight: "medium",
                fontFamily: "roboto",
                color: "#00000",
              },
              symbolWidth: 10,
            },
          },
        },
      });
    },
    async setData3() {
      Highcharts.chart("container3", {
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
                label: "Used in China’s export<br> production",
              },
              {
                name: "Dom. cons (5%)",
                value: 5,
                color: "#F99704",
                label: "Used in Thailand’s domestic<br> comsumption",
              },
              {
                name: "Double (5%)",
                value: 5,
                color: "#2D9687",
                label:
                  "Double counted exports from<br> repeated border crossings",
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
            fontSize: "16px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
          },

          align: "right",
          verticalAlign: "middle",
          width: 300,
          itemMarginTop: 20,

          labelFormatter: function () {
            return this.label;
          },
        },
        title: {
          text: "What happens to Thailand's exports to China?",
        },
        subtitle: {
          text: "Gross exports to China: $10 B",
          align: "left",
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
    async setData4() {
      Highcharts.chart("container4", {
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
                label: "Used in Thailand’s domestic comsumption",
              },
              {
                name: "Double (5%)",
                value: 5,
                color: "#2D9687",
                label: "Double counted exports from repeated border crossings",
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
          // layout: "vertical",
          // useHTML: true,
          // itemStyle: {
          //   fontSize: "16px",
          //   fontWeight: "medium",
          //   fontFamily: "roboto",
          //   color: "#00000",
          //   textOverflow: "",
          //   border: "1px solid red",
          //   verticalAlign: "top",
          // },
          // align: "right",
          // verticalAlign: "middle",
          width: 300,
          // itemMarginBottom: 10,
          // itemMarginTop: 10,
          // symbolHeight: 30,
          // symbolWidth: 45,
          // symbolRadius: 0,
          // squareSymbol: true,
          labelFormatter: function () {
            return this.label;
          },
          useHTML: true,
          layout: "vertical",
          itemMarginTop: 20,
          itemMarginBottom: 20,
          symbolHeight: 5,
          symbolWidth: 5,
          itemStyle: {
            // lineHeight: "25px",
            color: "black",
            fontFamily: "roboto",
            fontSize: "16px",
            fontWeight: "normal",
            display: "inline-block",
            verticalalign: "top",
            textOverflow: "",
          },
          align: "right",
          verticalAlign: "middle",
          floating: false,
          x: 0,
          y: 0,
          symbolRadius: 0,
          symbolHeight: 30,
          symbolWidth: 30,
          squareSymbol: true,
        },
        title: {
          text: "What happens to Thailand's exports to China?",
        },
        subtitle: {
          text: "Gross exports to China: $10 B",
          align: "left",
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
  },
  mounted() {
    this.setData();
    this.setData2();
    this.setData3();
    this.setData4();
  },
};
</script>

<style lang="scss" scoped>
</style>