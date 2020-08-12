<template>
  <q-page class="container bg-white" style="padding-bottom:120px">
    <app-bar :isShowLogo="false"></app-bar>
    <header-menu :activeMenu="3"></header-menu>
    <importing-select></importing-select>

    <div class="q-px-md">
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

      <p align="center" class="font-graph q-py-lg">Key policy questions</p>
      <p class="font-content q-px-sm">
        1.
        <u>Where does Thailand’s imported content come from in exports to a selected importer ?</u>
      </p>
      <p class="font-content q-px-sm">
        2.
        <u>Where do South-East Asian economies’ imported content come from in exports to a selected importer ?</u>
      </p>
    </div>

    <div style="height:30px"></div>
    <hr />
    <div style="height:30px"></div>

    <p
      class="font-graph"
      align="center"
    >Where does Thailand’s imported content in exports to China come from?</p>
    <p
      class="font-content q-px-lg"
    >Gross exports of Thailand in All sector(s) to China amount to *$40* billion in *year*. Of these exports, *$8* billion is imported content that comes from other economies, mainly United States of America (*19.05*%), Hong Kong (*10.9*%), Japan (*5.61*%), Rep. of Korea (*3.98*%) and Germany (*4.39*%).</p>

    <div class="row items-center">
      <div class="col">
        <div id="container"></div>
        <div align="left" class="font-footer q-px-md">Gross exports to China : $40 B</div>
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

    <div style="height:30px"></div>
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
        >
          <div style="width:45px;height:30px" :class="items.color"></div>
          <div class="col q-pl-sm">{{ items.label }}</div>
        </div>
      </div>
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
      let getData = await Axios.get(
        "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-mortality.json"
      );

      let data = getData.data;
      var points = [],
        regionP,
        regionVal,
        regionI = 0,
        countryP,
        countryI,
        causeP,
        causeI,
        region,
        country,
        cause,
        causeName = {
          "Communicable & other Group I": "Communicable diseases",
          "Noncommunicable diseases": "Non-communicable diseases",
          Injuries: "Injuries",
        };

      for (region in data) {
        if (data.hasOwnProperty(region)) {
          regionVal = 0;
          regionP = {
            id: "id_" + regionI,
            name: region,
            color: Highcharts.getOptions().colors[regionI],
          };
          countryI = 0;
          for (country in data[region]) {
            if (data[region].hasOwnProperty(country)) {
              countryP = {
                id: regionP.id + "_" + countryI,
                name: country,
                parent: regionP.id,
              };
              points.push(countryP);
              causeI = 0;
              for (cause in data[region][country]) {
                if (data[region][country].hasOwnProperty(cause)) {
                  causeP = {
                    id: countryP.id + "_" + causeI,
                    name: causeName[cause],
                    parent: countryP.id,
                    value: Math.round(+data[region][country][cause]),
                  };
                  regionVal += causeP.value;
                  points.push(causeP);
                  causeI = causeI + 1;
                }
              }
              countryI = countryI + 1;
            }
          }
          regionP.value = Math.round(regionVal / countryI);
          points.push(regionP);
          regionI = regionI + 1;
        }
      }
      Highcharts.chart("container", {
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
              enabled: false,
            },
            levelIsConstant: false,
            levels: [
              {
                level: 1,
                dataLabels: {
                  enabled: true,
                },
                borderWidth: 3,
              },
            ],
            data: points,
          },
        ],
        subtitle: {
          text: "Imported content in exports to China : $8B",
          align: "left",
        },
        title: {
          text: "",
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
          text: "What happens to South-East Asian economies’ exports to China?",
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
            name: "Rest of the world",
            data: [5, 10, 5, 8, 4, 10, 8, 3, 5],
            color: "#9C26B3",
          },
          {
            name: "North America",
            data: [5, 10, 5, 8, 4, 10, 8, 3, 5],
            color: "#f99704",
          },

          {
            name: "Europe",
            data: [8, 3, 5, 10, 9, 10, 10, 3, 5],
            color: "#EB1E63",
          },
          {
            name: "Latin America",
            data: [5, 10, 5, 8, 4, 10, 8, 3, 5],
            color: "#2D9687",
          },
          {
            name: "Asia-Pacific",
            data: [18, 25, 20, 16, 12, 10, 14, 31, 5],
            color: "#2381B8",
          },
        ],
        title: {
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

<style lang="scss" scoped>
</style>