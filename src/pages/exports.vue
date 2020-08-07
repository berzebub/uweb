<template>
  <q-page class="container bg-white">
    <!-- HEADER BAR -->
    <div class="row q-pa-md">
      <div style="width:80px">
        <q-icon style="color:#283891" name="home" size="65px"></q-icon>
      </div>
      <div class="col self-center">
        <div class="row justify-end">
          <div style="width:200px">
            <span>Exporting economy</span>
            <q-select dense outlined :options="countryList" v-model="countrySelected"></q-select>
          </div>
          <div style="width:20px"></div>
          <div style="width:130px">
            <span>Year</span>
            <q-select v-model="yearSelected" dense outlined :options="yearList"></q-select>
          </div>
        </div>
      </div>
    </div>

    <!-- MENU -->
    <div class="row" style="border:1px solid">
      <div
        :class="menuSelected == 1 ? 'bg4 text-white' : null"
        @click="menuSelected = 1"
        class="col-3 brr q-py-md"
        align="center"
      >Structure of value added</div>
      <div
        :class="menuSelected == 2 ? 'bg4 text-white' : null"
        @click="menuSelected = 2"
        class="col-3 brr q-py-md"
        align="center"
      >Participation in GVCs</div>
      <div
        :class="menuSelected == 3 ? 'bg4 text-white' : null"
        @click="menuSelected = 3"
        class="col-3 brr q-py-md"
        align="center"
      >
        Backward linkages
        <q-icon name="fas fa-caret-down"></q-icon>
        <q-menu fit max-height="200px" style="width:100%" class="brx">
          <q-list>
            <q-item clickable>
              <q-item-section>Menu#1</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Menu#2</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Menu#3</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
      <div
        :class="menuSelected == 4 ? 'bg4 text-white' : null"
        @click="menuSelected = 4"
        class="col-3 q-py-md"
        align="center"
      >
        Forward linkages
        <q-icon name="fas fa-caret-down"></q-icon>
        <q-menu fit max-height="200px" style="width:100%" class="brx">
          <q-list>
            <q-item clickable>
              <q-item-section>Menu#1</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Menu#2</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Menu#3</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>

    <!-- Selection -->
    <div class="row q-py-xl" style="width:50%;min-width:320px;margin:auto">
      <div class="col-6 q-px-md">
        <span>Importing economy</span>
        <q-select dense outlined :options="countryList" v-model="importCountrySelected"></q-select>
      </div>

      <div class="col-6 q-px-md">
        <span>Sector</span>
        <q-select dense outlined :options="sectorOptions" v-model="sectorSelected"></q-select>
      </div>
    </div>

    <!-- COLUMN -->
    <div class="q-pb-xl">
      <div class="row">
        <div class="col-3 q-pa-sm">
          <div class="br-radius q-px-md">
            <div align="center" style="font-size:24px">Table of contents:</div>
            <div style="height:10px"></div>
            <div style="font-size:18px ">
              1.
              <u>Key polycy questions</u>
            </div>
            <div style="font-size:18px " class="q-pt-xs">
              2.
              <u>Structure of value-added</u>
            </div>
            <div style="font-size:18px " class="q-pt-xs">
              3.
              <u>Comparison with partnerns</u>
            </div>
            <div style="font-size:18px " class="q-pt-xs">
              4.
              <u>Measuring trade balance</u>
            </div>
          </div>
        </div>
        <div class="col q-pa-sm">
          <div class="br-radius fit q-px-md">
            <div
              style="font-size:24px"
              align="center"
            >How do you disaggregate value-added in gross exports?</div>
            <div align="center">Thailand’s gross exports can be divided into five major parts :</div>
          </div>
        </div>
      </div>
    </div>

    <!-- POLICY -->
    <div class="q-pb-md">
      <div align="center" class="q-pb-md" style="font-size:24px">Key policy questions</div>
      <div class="q-px-md" style="font-size:18px">
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

    <q-separator></q-separator>
    <div class="q-py-xl">
      <div
        class="q-pb-md"
        style="font-size:24px"
        align="center"
      >What happens to Thailand's exports to China?</div>

      <div style="width:85%;margin:auto" id="container"></div>
    </div>
    <q-separator></q-separator>

    <div class="q-py-xl">
      <div
        class="q-pb-md"
        style="font-size:24px"
        align="center"
      >What happens to South-East Asian economies’ exports to China?</div>
      <div style="width:85%;margin:auto" id="stackChart"></div>
    </div>
  </q-page>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      countryList: ["Thailand", "China"],
      countrySelected: "Thailand",
      yearList: [2017, 2018, 2019, 2020],
      yearSelected: 2020,
      importCountrySelected: "Thailand",
      sectorSelected: "All",
      sectorOptions: ["All", "Sector #1", "Sector #2"],
      menuSelected: 1,
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
          text:
            'Click points to drill down. Source: <a href="http://apps.who.int/gho/data/node.main.12?lang=en">WHO</a>.',
        },
        title: {
          text: "Global Mortality Rate 2012, per 100 000 population",
        },
      });
    },
    setStackChart() {
      Highcharts.chart("stackChart", {
        chart: {
          type: "column",
        },
        title: {
          text: "Stacked column chart",
        },
        xAxis: {
          categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
        },
        yAxis: {
          min: 0,
          title: {
            text: "Total fruit consumption",
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true,
        },
        plotOptions: {
          column: {
            stacking: "percent",
          },
        },
        series: [
          {
            name: "John",
            data: [5, 3, 4, 7, 2],
          },
          {
            name: "Jane",
            data: [2, 2, 3, 2, 1],
          },
          {
            name: "Joe",
            data: [3, 4, 4, 2, 5],
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
.brr {
  border-right: 1px solid;
}
.br-radius {
  border: 1px solid;
  border-radius: 8px;
}
</style>