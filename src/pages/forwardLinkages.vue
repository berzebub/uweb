<template>
  <div>
    <q-page>
      <global-value-chains-header></global-value-chains-header>

      <global-value-chains-menu :activeMenu="4"></global-value-chains-menu>

      <!-- DROPDOWN SELECTION -->
      <div class="bg12 q-pt-md ">
        <div class="row justify-center">
          <div class="col-6  row">
            <div class="col q-px-md">
              <div>Exporting economy</div>
              <div>
                <q-select
                  bg-color="white"
                  v-model="exp_country"
                  dense
                  use-input
                  fill-input
                  hide-selected
                  :options="exportingOptions"
                  outlined
                  @filter="filterExportingCountry"
                  @input="selectedExporting"
                >
                  <template v-slot:prepend v-if="showExportingCountry">
                    <gb-flag
                      v-if="showExportingCountry.code"
                      :code="showExportingCountry.code"
                      size="small"
                    />
                  </template>

                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section avatar>
                        <gb-flag
                          v-if="scope.opt.code"
                          :code="scope.opt.code"
                          size="small"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="scope.opt.label" />
                        <q-item-label caption>
                          {{ scope.opt.description }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="col q-px-md">
              <div>Year</div>
              <div>
                <q-select
                  outlined
                  bg-color="white"
                  v-model="year"
                  dense
                  :options="yearOptions"
                  @input="selectedYear"
                ></q-select>
              </div>
            </div>
          </div>
        </div>

        <div class="row q-pt-md justify-center">
          <div class="col-6 row">
            <div class="col q-px-md" v-if="selectedBy == 'Exporting'">
              <div>Exporting sector</div>
              <div>
                <q-select
                  bg-color="white"
                  v-model="sector"
                  dense
                  :options="sectorOptions"
                  emit-value=""
                  map-options=""
                  outlined
                  @input="selectedSector"
                >
                </q-select>
              </div>
            </div>
            <div class="col-6 q-px-md" v-if="selectedBy == 'Economy'">
              <div>Importing economy</div>
              <div>
                <q-select
                  bg-color="white"
                  v-model="imp_country"
                  dense
                  use-input
                  fill-input
                  hide-selected
                  :options="importingOptions"
                  outlined
                  @filter="filterImportingCountry"
                  @input="selectedImporting"
                >
                  <template v-slot:prepend v-if="showimportingCountry">
                    <gb-flag
                      v-if="showimportingCountry.code"
                      :code="showimportingCountry.code"
                      size="small"
                    />
                  </template>

                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section avatar>
                        <gb-flag
                          v-if="scope.opt.code"
                          :code="scope.opt.code"
                          size="small"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="scope.opt.label" />
                        <q-item-label caption>
                          {{ scope.opt.description }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </div>
        </div>

        <div class="q-py-xl row justify-center">
          <div class="col-3 q-px-md" align="center">
            <q-btn
              :class="
                selectedBy == 'Exporting' ? 'text-amber-12' : 'text-white '
              "
              no-caps
              style="background-color:#2C2F30"
              class="fit font-20"
              @click="selectedBy = 'Exporting'"
            >
              select by Exporting
              <br />sector
            </q-btn>
          </div>
          <div class="col-3 q-px-md">
            <q-btn
              :class="selectedBy == 'Economy' ? 'text-amber-12' : 'text-white '"
              no-caps
              style="background-color:#2C2F30"
              class="fit font-20"
              @click="selectedBy = 'Economy'"
            >
              select by Source
              <br />economy
            </q-btn>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="row" style="background-color:#E5E1E1;">
        <div class="col-3 full-height">
          <q-img class src="../../public/forwardlinks.png"></q-img>
        </div>
        <div class="col self-center">
          <p align="center" class="font-24 ">
            Where does {{ exp_country.label }} contribute towards export
            production?
          </p>
          <div align="center" class="q-px-lg ">
            <div align="center" class="q-px-lg">
              <p align="left">
                Some part of {{ exp_country.label }}’s gross exports consist of
                intermediate inputs that are used by the direct importer to
                produce exports for third economy
              </p>

              <div class="row justify-center ">
                <div class="q-mx-sm">
                  Exporting economy <br />
                  {{ exp_country.label }}
                </div>
                <div class="q-mx-sm">:</div>

                <div
                  class="q-mx-sm"
                  style="width:200px;"
                  :class="{ 'c-blue text-bold': selectedBy == 'Exporting' }"
                >
                  Exporting economy
                  <br />
                  <div>
                    <span v-if="selectedBy == 'Exporting'">
                      {{ showSector.label }}
                    </span>
                    <span v-else>
                      All
                    </span>
                  </div>
                </div>

                <div class="q-mx-sm">
                  <q-img
                    style="width:60px"
                    src="../../public/arrow-right.png"
                  ></q-img>
                </div>

                <div
                  class="q-mx-sm"
                  :class="{ 'c-blue text-bold': selectedBy == 'Economy' }"
                >
                  Importing economy
                  <br />
                  <span v-if="selectedBy == 'Economy'">
                    {{ imp_country.label }}
                  </span>
                  <span v-else>
                    All
                  </span>
                </div>
                <div class="q-mx-sm">
                  <q-img
                    style="width:60px"
                    src="../../public/arrow-right.png"
                  ></q-img>
                </div>
                <div class="q-mx-sm">
                  Third economies
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white q-pa-xl">
        <div align="center" class="q-mb-xl">
          <span class="font-24">Key policy questions</span>
        </div>
        <div class="q-mt-lg q-px-lg">
          <p>
            1. Where doesThailand contribute the most towards export production?
          </p>
          <p>
            2. Where do South-East Asian economies contribute the most towards
            export production?
          </p>
        </div>
      </div>

      <q-separator class="no-margin bg-grey-5 shadow-1" />

      <!-- GRAPH -->

      <div class="bg-white q-py-xl">
        <div style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isChart1">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isChart1">
            <div id="container1"></div>
          </div>
        </div>
      </div>

      <q-separator class="no-margin bg-grey-5 shadow-1" />

      <div class="bg-white q-py-xl">
        <div style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isChart2">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isChart2">
            <div id="container2"></div>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <my-footer></my-footer>
    </q-page>
  </div>
</template>

<script>
import Axios from "axios";

// new
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import myFooter from "../components/footer";

export default {
  components: {
    globalValueChainsHeader,
    globalValueChainsMenu,
    myFooter
  },
  data() {
    return {
      // NEW
      countryOptions: [],

      exportingOptions: [],
      exp_country: "",

      importingOptions: [],
      imp_country: "",

      yearOptions: [],
      year: "",

      sectorOptions: [],
      sector: "",

      selectedBy: "Exporting",

      isChart1: true,
      isChart2: true
    };
  },
  computed: {
    showExportingCountry() {
      if (this.exp_country) {
        let res = this.countryOptions.filter(
          x => x.value == this.exp_country.value
        )[0];

        return res;
      } else {
        return "";
      }
    },
    showimportingCountry() {
      if (this.imp_country) {
        let res = this.countryOptions.filter(
          x => x.value == this.imp_country.value
        )[0];

        return res;
      } else {
        return "";
      }
    },
    showSector() {
      if (this.sector) {
        let res = this.sectorOptions.filter(x => x.value == this.sector)[0];

        return res;
      } else {
        return "";
      }
    }
  },

  methods: {
    filterExportingCountry(val, update) {
      update(async () => {
        this.exportingOptions = this.countryOptions.filter(
          x => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },

    filterImportingCountry(val, update) {
      update(async () => {
        this.importingOptions = this.countryOptions.filter(
          x => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },

    selectedExporting() {
      this.$q.sessionStorage.set("expe", this.exp_country.iso);

      if (this.validateSelected()) {
        if (this.selectedBy == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    },
    selectedImporting() {
      this.$q.sessionStorage.set("impe", this.imp_country.iso);
      if (this.validateSelected()) {
        if (this.selectedBy == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    },
    selectedYear() {
      this.$q.sessionStorage.set("year", this.year);
      if (this.validateSelected()) {
        if (this.selectedBy == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    },
    selectedSector() {
      this.$q.sessionStorage.set("esec", this.sector);
      if (this.validateSelected()) {
        if (this.selectedBy == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    },

    validateSelected() {
      if (this.selectedBy == "Exporting") {
        if (this.exp_country && this.year && this.sector) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.exp_country && this.year && this.imp_country) {
          return true;
        } else {
          return false;
        }
      }
    },

    renderOne() {
      this.chart1();
      this.chart2();
    },

    async chart1() {
      this.isChart1 = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_forward_country_1.php?exp_country=${this.exp_country.iso}&year=${this.year}&sector=${this.sector}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;

      let summaryValue = getData.map(x => x.value);
      summaryValue = summaryValue.filter(x => x);

      summaryValue = summaryValue.reduce((a, b) => a + b, 0);

      getData.forEach((element, index) => {
        if (index > 5) {
          element.name = `${element.name} (${(
            (element.value / summaryValue) *
            100
          ).toFixed(2)})% `;
          element.percent = ((element.value / summaryValue) * 100).toFixed(2);
        }
      });

      let temp = [...getData];

      temp = temp.splice(5);

      temp.sort((a, b) => {
        return b.value - a.value;
      });

      let getValue = temp.map(x => {
        return x.value;
      });

      let sumOfValue = getValue.reduce((a, b) => {
        return a + b;
      }, 0);

      let graphOneDetailsList = [];

      let getFirstFive = temp.map((x, index) => {
        if (index < 5) {
          let newData = {
            name: x.name,
            sum: ((x.value / sumOfValue) * 100).toFixed(2)
          };

          graphOneDetailsList.push(newData);
        }
      });

      let urlLinkSub = `https://api.winner-english.com/u_api/cal_forward_country_1a.php?exp_country=${this.exp_country.iso}&year=${this.year}&sector=${this.sector}`;

      let getDataSub = await Axios.get(urlLinkSub);

      getDataSub = getDataSub.data;

      this.isChart1 = true;

      Highcharts.chart("container1", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" }
        },
        series: [
          {
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
                    fontWeight: "bold"
                  }
                }
              }
            ],

            data: getData,
            showInLegend: true,
            legendType: "point"
          }
        ],
        title: {
          style: {
            fontSize: "24px"
          },
          text: `Where does ${this.exp_country.label} contribute the most towards export production?`
        },
        credits: {
          enabled: false
        },

        legend: {
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000"
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
          labelFormatter: function() {
            // return "<div>" + this.name + "</div>";
            if (this.name == "Europe") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #eb1e63;"></div></td><td style="padding-left:20px;">Euroupe</td></tr></table></div>';
            } else if (this.name == "Latin America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #2D9687;"></div></td><td style="padding-left:20px;">Latin America</td></tr></table></div>';
            } else if (this.name == "North America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #F99704;"></div></td><td style="padding-left:20px;">North America</td></tr></table></div>';
            } else if (this.name == "Asia-Pacific") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #2381B8;"></div></td><td style="padding-left:20px;">Asia-Pacific</td></tr></table></div>';
            } else if (this.name == "Rest of the world") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #9C26B3;"></div></td><td style="padding-left:20px;">Rest of the world</td></tr></table></div>';
            }
          }
        },
        tooltip: {
          useHTML: true,
          pointFormatter: function() {
            return (
              "<div> <span class='text-bold'>" +
              this.name +
              "</span>" +
              "<br> Share: " +
              this.percent +
              "% <br>" +
              "Value: $" +
              this.value +
              " million" +
              "</div>"
            );
          }
        },
        subtitle: {
          style: {
            fontSize: "14px"
          },
          text: `Gross exports of ${this.exp_country.label} in ${this.sector} sector(s) to World amount to *$${getDataSub.grossExport}* billion in *year*. Of these exports, *$${getDataSub.contribution}* billion is ${this.exp_country.label}'s contribution to export production in other economies, mainly  ${graphOneDetailsList[0].name} (*${graphOneDetailsList[0].sum}*%), ${graphOneDetailsList[1].name} (*${graphOneDetailsList[1].sum}*%), ${graphOneDetailsList[2].name} (*${graphOneDetailsList[2].sum}*%), ${graphOneDetailsList[3].name} (*${graphOneDetailsList[3].sum}*%) and ${graphOneDetailsList[4].name} (*${graphOneDetailsList[4].sum}*%). <br/>Contribution to export production: $${getDataSub.contribution}B / Gross exports to World: $${getDataSub.grossExport}B`,
          align: "left"
        },
        exporting: this.exportingGraphOptions
      });
    },

    async chart2() {
      this.isChart2 = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_forward_country_2.php?exp_country=${this.exp_country.iso}&year=${this.year}&sector=${this.sector}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;
      let countryList = [];

      getData.map(x => {
        countryList.push(x[0].exp_country);
      });

      let region = this.sectorOptions.filter(x => x.value == this.sector)[0]
        .label;

      let rawData = [];

      let chart2RawData = [];
      let chart2DrillDown = [];
      let chart2AsiaPacific = [];
      let chart2Europe = [];
      let chart2NorthAmerica = [];
      let chart2LatinAmerica = [];
      let chart2RestOfTheWorld = [];

      getData.map(x => {
        let temp = x.filter(y => y.value != 0);
        rawData.push(temp);
      });
      rawData.map(x => {
        x.forEach(y => {
          chart2RawData.push(y);
        });
      });

      //สร้าง Drill down สำหรับ Asia pacific
      let asiaRawData = chart2RawData.filter(x => x.area == "Asia-Pacific");
      countryList.forEach(x => {
        let data = asiaRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: z.value
          };
          sum += z.value;
          dataFinal.push(temp);
        });

        let tempData = {
          type: "pie",
          id: x + " - " + "Asia Pacific",
          name: x + " <br> " + "Asia-Pacific",
          data: dataFinal
        };
        chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Asia Pacific"
        };
        chart2AsiaPacific.push(tempData);
      });

      //สร้าง Drill down สำหรับ Europe
      let europeRawData = chart2RawData.filter(x => x.area == "Europe");
      countryList.forEach(x => {
        let data = europeRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: z.value
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Europe",
          name: x + " <br> " + "Europe",
          data: dataFinal
        };
        chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Europe"
        };
        chart2Europe.push(tempData);
      });

      //สร้าง Drill down สำหรับ North America
      let northAmericaRawData = chart2RawData.filter(
        x => x.area == "North America"
      );
      countryList.forEach(x => {
        let data = northAmericaRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: z.value
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "North America",
          name: x + " <br> " + "North America",
          data: dataFinal
        };
        chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "North America"
        };
        chart2NorthAmerica.push(tempData);
      });

      //สร้าง Drill down สำหรับ Latin America
      let latinAmericaRawData = chart2RawData.filter(
        x => x.area == "Latin America"
      );
      countryList.forEach(x => {
        let data = latinAmericaRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: z.value
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Latin America",
          name: x + " <br> " + "Latin America",
          data: dataFinal
        };
        chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Latin America"
        };
        chart2LatinAmerica.push(tempData);
      });

      //สร้าง Drill down สำหรับ Rest of the world
      let restRawData = chart2RawData.filter(
        x => x.area == "Rest of the world"
      );
      countryList.forEach(x => {
        let data = restRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: z.value
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Rest of the world",
          name: x + " <br> " + "Rest of the world",
          data: dataFinal
        };
        chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Rest of the world"
        };
        chart2RestOfTheWorld.push(tempData);
      });

      this.isChart2 = true;

      Highcharts.chart(
        "container2",
        {
          chart: {
            type: "column",
            height: (9 / 16) * 100 + "%", // 16:9 ratio
            style: { fontFamily: "roboto" }
          },

          xAxis: {
            labels: {
              rotation: -90
            },
            type: "category"
          },
          credits: {
            enabled: false
          },
          yAxis: {
            min: 0,
            title: {
              text: "% of gross exports to world"
            },
            stackLabels: {
              enabled: false,
              style: {
                fontWeight: "bold",
                color:
                  // theme
                  (Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color) ||
                  "gray"
              }
            }
          },
          legend: {
            useHTML: true,
            itemStyle: {
              fontSize: "14px",
              fontWeight: "medium",
              fontFamily: "roboto",
              color: "#00000"
            },
            align: "right",
            verticalAlign: "middle",
            width: 200,
            symbolWidth: 0.1,
            symbolHeight: 0.1,
            symbolRadius: 0,
            symbolWidth: 0,
            labelFormatter: function() {
              // return "<div>" + this.name + "</div>";
              if (this.name == "Europe") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #eb1e63;"></div></td><td style="padding-left:20px;">Euroupe</td></tr></table></div>';
              } else if (this.name == "Latin America") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #2D9687;"></div></td><td style="padding-left:20px;">Latin America</td></tr></table></div>';
              } else if (this.name == "North America") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #F99704;"></div></td><td style="padding-left:20px;">North America</td></tr></table></div>';
              } else if (this.name == "Asia-Pacific") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #2381B8;"></div></td><td style="padding-left:20px;">Asia-Pacific</td></tr></table></div>';
              } else if (this.name == "Rest of the world") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #9C26B3;"></div></td><td style="padding-left:20px;">Rest of the world</td></tr></table></div>';
              }
            }
          },

          tooltip: {
            pointFormat:
              "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
          },
          plotOptions: {
            column: {
              stacking: "normal",
              dataLabels: {
                enabled: false
              }
            }
          },

          series: [
            {
              name: "Asia-Pacific",
              data: chart2AsiaPacific,
              color: "#2381B8"
            },
            {
              name: "Europe",
              data: chart2Europe,
              color: "#EB1E63"
            },
            {
              name: "North America",
              data: chart2NorthAmerica,
              color: "#f99704"
            },
            {
              name: "Latin America",
              data: chart2LatinAmerica,
              color: "#2D9687"
            },
            {
              name: "Rest of the world",
              data: chart2RestOfTheWorld,
              color: "#9C26B3"
            }
          ],
          drilldown: {
            activeDataLabelStyle: {
              color: "white",
              textShadow: "0 0 2px black, 0 0 2px black"
            },
            showInLegend: false,
            series: chart2DrillDown
          },
          title: {
            style: {
              fontSize: "24px"
            },
            text: `Where do ${region} economies contribute the most towards export production? `
          },
          exporting: this.exportingGraphOptions
        },
        (Highcharts.Tick.prototype.drillable = function() {})
      );
    },

    async getYear() {
      let url = "https://api.winner-english.com/u_api/get_year_active.php";
      let data = await Axios.get(url);
      let temp = [];
      data.data.forEach(element => {
        temp.push(element);
      });
      this.yearOptions = temp;
    }
  },
  async mounted() {
    await this.getCountryList();
    await this.getYear();
    await this.getSectorList();

    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      this.exp_country = this.$route.params.expe
        ? this.countryOptions.filter(x => x.iso == this.$route.params.expe)[0]
        : this.$q.sessionStorage.has("expe")
        ? this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("expe")
          )[0]
        : "";
    }

    if (this.$q.sessionStorage.has("impe") || this.$route.params.impe) {
      this.imp_country = this.$route.params.impe
        ? this.countryOptions.filter(x => x.iso == this.$route.params.impe)[0]
        : this.$q.sessionStorage.has("impe")
        ? this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("impe")
          )[0]
        : "";
    }

    if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
      this.year = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.has("year")
        ? this.$q.sessionStorage.getItem("year")
        : "";
    }

    if (this.$q.sessionStorage.has("esec") || this.$route.params.esec) {
      this.sector = this.$route.params.esec
        ? this.$route.params.esec
        : this.$q.sessionStorage.has("esec")
        ? this.$q.sessionStorage.getItem("esec")
        : "";
    }

    if (this.validateSelected()) {
      if (this.selectedBy == "Exporting") {
        this.renderOne();
      } else {
        this.renderTwo();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.c-blue {
  color: #283891;
}

.c-red {
  color: #8d273d;
}
</style>
