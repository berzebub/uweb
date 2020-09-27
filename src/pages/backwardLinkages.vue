<template>
  <div>
    <q-page>
      <global-value-chains-header></global-value-chains-header>

      <global-value-chains-menu :activeMenu="3"></global-value-chains-menu>

      <!-- DROPDOWN SELECTION -->
      <div class="bg12" style="height:290px">
        <div class="row q-pt-md justify-center">
          <div class="col-3 q-px-md">
            <div>Exporting economy</div>
            <div>
              <q-select
                v-model="exportingSelected"
                :options="countryOptionsShow"
                outlined
                bg-color="white"
                class="q-mt-xs"
                dense
                use-input
                fill-input
                hide-selected
                @filter="filterCountry"
                @input="selectedExporting()"
              >
                <template v-slot:prepend v-if="exportingSelected.code">
                  <gb-flag :code="exportingSelected.code" size="small" />
                </template>

                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section avatar>
                      <gb-flag v-if="scope.opt.code" :code="scope.opt.code" size="small" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-html="scope.opt.label" />
                      <q-item-label caption>
                        {{
                        scope.opt.description
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div class="col-3 q-px-md">
            <div>Year</div>
            <div>
              <q-select
                outlined
                bg-color="white"
                v-model="year"
                dense
                :options="dataYearList"
                map-options
                emit-value
                @input="changeYear()"
              ></q-select>
            </div>
          </div>
        </div>

        <div class="row q-pt-md justify-center">
          <div class="col-3 q-px-md">
            <div>Importing economy</div>
            <div>
              <q-select
                bg-color="white"
                v-model="importingSelected"
                :options="countryOptionsShow"
                outlined
                class="q-mt-xs"
                dense
                use-input
                fill-input
                hide-selected
                @filter="filterCountry"
                @input="selectedImporting()"
              >
                <template v-slot:prepend v-if="importingSelected.code">
                  <gb-flag
                    v-if="importingSelected.code"
                    :code="importingSelected.code"
                    size="small"
                  />
                </template>

                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section avatar>
                      <gb-flag v-if="scope.opt.code" :code="scope.opt.code" size="small" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-html="scope.opt.label" />
                      <q-item-label caption>
                        {{
                        scope.opt.description
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div class="col-3 q-px-md" v-if="activeSelect == 1">
            <div>Exporting sector</div>
            <div>
              <q-select
                bg-color="white"
                v-model="sectorSelected"
                dense
                :options="sectorOptions"
                outlined
                map-options
                emit-value
                @input="selectedSector()"
              ></q-select>
            </div>
          </div>
          <div class="col-3 q-px-md" v-else>
            <div>Source economy</div>
            <q-select
              bg-color="white"
              v-model="sourceEconomySelected"
              :options="countryOptionsShow"
              outlined
              class="q-mt-xs"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterCountry"
              @input="selectedSourceEconomy()"
            >
              <template v-slot:prepend v-if="sourceEconomySelected.code">
                <gb-flag
                  v-if="sourceEconomySelected.code"
                  :code="sourceEconomySelected.code"
                  size="small"
                />
              </template>

              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <gb-flag v-if="scope.opt.code" :code="scope.opt.code" size="small" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption>
                      {{
                      scope.opt.description
                      }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>

        <div class="q-pt-md row justify-center">
          <div class="col-3 q-px-md" align="center">
            <q-btn
              no-caps
              style="background-color:#2C2F30"
              class="fit font-20"
              :class="activeSelect == 1 ? 'text-yellow' : 'text-white'"
              @click="activeSelect = 1"
            >
              select by Exporting
              <br />sector
            </q-btn>
          </div>
          <div class="col-3 q-px-md">
            <q-btn
              :class="activeSelect == 2 ? 'text-yellow' : 'text-white'"
              no-caps
              style="background-color:#2C2F30"
              class="text-white fit font-20"
              @click="activeSelect = 2"
            >
              select by Source
              <br />economy
            </q-btn>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="row">
        <div class="col-3 full-height">
          <q-img class="fit" src="../../public/images/image-56.png"></q-img>
        </div>
        <div class="col" style="background-color:#E5E1E1;padding:80px 0px">
          <p align="center" class="font-24">Where does imported content come from?</p>
          <div align="center" class="q-px-lg">
            <p align="center">
              Some part of {{ exportingSelected.label }}’s gross exports consist
              of imported inputs that originate in other source economies.
            </p>

            <div class="row justify-around q-pt-md" style="max-width:750px">
              <div>
                Source economy
                <div v-if="activeSelect == 2">{{ importingSelected.label }}</div>
              </div>

              <div>
                <q-img style="width:60px" src="../../public/arrow-right.png"></q-img>
              </div>
              <div>
                Exporting economy
                <div>{{ exportingSelected.label }}</div>
              </div>
              <div>:</div>
              <div style="color:#283891;width:200px" class="text-weight-bold">
                Exporting sector
                <div v-if="activeSelect == 1">{{ displaySector }}</div>
                <div v-else>All</div>
              </div>
              <div>
                <q-img style="width:60px" src="../../public/arrow-right.png"></q-img>
              </div>
              <div>
                Importing economy
                <div>Australia</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white" v-show="activeSelect == 1">
        <!-- KEY POLICY QUESTION -->
        <div class="q-px-xl bg-white">
          <!-- Key policy questions -->
          <p align="center" class="font-graph q-py-lg">Key policy questions</p>
          <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedcountry'">
            1.
            <u>
              Where does {{ exportingSelected.label }}’s imported content come
              from in exports to a selected importer?
            </u>
          </p>
          <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedregion'">
            2.
            <u>
              Where do {{ continent }} economies’ imported content come from in
              exports to a selected importer?
            </u>
          </p>
        </div>

        <div class="q-py-lg">
          <q-separator></q-separator>
        </div>

        <!-- GRAPH -->
        <div style="height:30px"></div>
        <div style="width:90%;margin:auto;max-width:1200px" id="importedcountry">
          <div align="center" class="q-pa-lg" v-if="!isChart">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isChart">
            <div id="container"></div>
          </div>
        </div>
        <div style="height:30px"></div>
        <div style="width:90%;margin:auto;max-width:1200px" id="importedregion">
          <div align="center" class="q-pa-lg" v-if="!isChart1">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-show="isChart1">
            <div id="container1"></div>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <my-footer></my-footer>
    </q-page>
  </div>
</template>

<script>
// new
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import myFooter from "../components/footer";
import Axios from "axios";
export default {
  components: {
    globalValueChainsHeader,
    globalValueChainsMenu,
    myFooter,
  },
  data() {
    return {
      // NEW
      sourceEconomySelected: "",
      displaySector: "",
      activeSelect: 1,
      dataYearList: [],
      displayYear: "",
      exportingOptions: [
        {
          label: "Argentina",
          value: "ARG",
          flag:
            "https://www.iconfinder.com/data/icons/ensign-11/512/16_Ensign_Flag_Nation_Argentina-512.png",
        },

        {
          label: "United State",
          value: "USA",
          flag:
            "https://www.iconfinder.com/data/icons/ensign-11/512/274_Ensign_Flag_Nation_states-512.png",
        },
      ],
      exportingSelected: "",
      yearSelected: "",
      importingSelected: "",
      sectorSelected: "",
      sectorOptions: [],
      countryOptions: [],
      countryOptionsShow: [],
      year: "",
      isChart: false,

      isChart1: false,
      chart2DrillDown: [],
      chart2RawData: [],
      chart2AsiaPacific: [],
      chart2Europe: [],
      chart2LatinAmerica: [],
      chart2RestOfTheWorld: [],
      chart2NorthAmerica: [],
      continent: "",
    };
  },
  methods: {
    validateSelected() {
      if (
        this.sectorSelected &&
        this.year &&
        this.exportingSelected &&
        this.importingSelected
      ) {
        if (this.exportAvailable.includes(this.exportingSelected.iso)) {
          this.isDisableTinaLink = false;
        }

        this.isDisableShare = false;

        return true;
      } else {
        return false;
      }
    },
    filterCountry(val, update) {
      update(async () => {
        this.countryOptionsShow = this.countryOptions.filter(
          (x) => x.label.indexOf(val) > -1
        );
      });
    },
    async getYear() {
      let url = "https://api.winner-english.com/u_api/get_year_active.php";
      let data = await Axios.get(url);
      let temp = [];
      data.data.forEach((element) => {
        temp.push({ index: Number(element), label: element });
      });
      this.dataYearList = temp;
    },

    changeYear() {
      this.$q.sessionStorage.set("year", this.year.label);
      this.displayYear = this.year.label;
      if (this.validateSelected()) this.renderGraphSector();
    },
    selectedExporting() {
      this.$q.sessionStorage.set("expe", this.exportingSelected.iso);

      this.continent = this.exportingSelected.region;

      if (this.validateSelected()) this.renderGraphSector();
    },
    selectedImporting() {
      this.$q.sessionStorage.set("impe", this.importingSelected.iso);

      if (this.validateSelected()) this.renderGraphSector();
    },
    selectedSector() {
      this.$q.sessionStorage.set("esec", this.sectorSelected);
      this.displaySector = this.sectorOptions.filter(
        (x) => x.value == this.sectorSelected
      )[0].label;
      if (this.validateSelected()) this.renderGraphSector();
    },
    selectedSourceEconomy() {},

    renderGraphSector() {
      this.setData();
      this.setStackChart();
    },

    async setData() {
      this.isChart = false;

      let urlLink = `https://api.winner-english.com/u_api/cal_back_country_1.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&sector=${this.sectorSelected}`;

      let getData = await Axios.get(urlLink);

      console.log(getData.data);

      let summaryValue = getData.data.map((x) => x.value);
      summaryValue = summaryValue.filter((x) => x);

      summaryValue = summaryValue.reduce((a, b) => a + b, 0);

      getData.data.forEach((element, index) => {
        if (index > 5) {
          element.name = `${element.name}(${(
            (element.value / summaryValue) *
            100
          ).toFixed(2)})% `;
          element.percent = ((element.value / summaryValue) * 100).toFixed(2);
        }
      });

      let urlLinkSub = `https://api.winner-english.com/u_api/cal_back_country_1a.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&sector=${this.sectorSelected}`;

      let getDataSub = await Axios.get(urlLinkSub);

      console.log(getDataSub.data);

      getDataSub = getDataSub.data;

      let temp = [...getData.data];

      temp = temp.splice(5);

      temp.sort((a, b) => {
        return b.value - a.value;
      });

      let getValue = temp.map((x) => {
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
            sum: ((x.value / sumOfValue) * 100).toFixed(2),
          };

          graphOneDetailsList.push(newData);
        }
      });

      this.isChart = true;

      Highcharts.chart("container", {
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

            data: getData.data,
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

        title: {
          style: {
            fontSize: "24px",
          },
          text: `Where does ${this.exportingSelected.label}'s imported content in exports to ${this.importingSelected.label} come from?`,
        },
        credits: {
          enabled: false,
        },
        subtitle: {
          useHTML: true,
          style: {
            fontSize: "14px",
          },
          text: `Gross exports of ${this.exportingSelected.label} in ${
            this.displaySector
          } sector(s) to ${this.importingSelected.label} amount to *$${(
            getDataSub.grossExport / 1000
          ).toFixed(2)}* billion in *year*. Of these exports, *$${(
            getDataSub.ImportedContent / 1000
          ).toFixed(
            2
          )}* billion is imported content that comes from other economies, mainly ${
            graphOneDetailsList[0].name
          } (*${graphOneDetailsList[0].sum}*%), ${
            graphOneDetailsList[1].name
          } (*${graphOneDetailsList[1].sum}*%), ${
            graphOneDetailsList[2].name
          } (*${graphOneDetailsList[2].sum}*%), ${
            graphOneDetailsList[3].name
          } (*${graphOneDetailsList[3].sum}*%) and ${
            graphOneDetailsList[4].name
          } (*${
            graphOneDetailsList[4].sum
          }*%). <br><br><br>imported content in exports to ${
            this.importingSelected.label
          }: $${(getDataSub.ImportedContent / 1000).toFixed(
            2
          )}B / Gross exports to ${this.importingSelected.label}: $${(
            getDataSub.grossExport / 1000
          ).toFixed(2)}B`,
          align: "left",
        },
        exporting: {
          buttons: {
            contextButton: {
              menuItems: [
                "downloadPNG",
                "downloadJPEG",
                "separator",
                "downloadCSV",
                "downloadXLS",
              ],
            },
          },
          width: "1280px",
          chartOptions: {
            title: {
              style: { fontSize: "12px" },
            },
            subtitle: {
              style: { fontSize: "8px" },
            },
            legend: {
              useHTML: true,
              itemStyle: {
                fontSize: "7px",
                fontWeight: "medium",
                fontFamily: "roboto",
                color: "#00000",
              },

              align: "right",
              verticalAlign: "middle",
              width: "100",
              symbolWidth: 0.1,
              symbolHeight: 0.1,
              symbolRadius: 0,
              useHTML: true,
              symbolWidth: 0,
            },
          },
        },
        tooltip: {
          useHTML: true,
          pointFormatter: function () {
            return (
              "<div> <span class='text-bold'>" +
              this.name +
              "</span>" +
              "<br>" +
              "Value: $" +
              this.value +
              " million" +
              "</div>"
            );
          },
        },
      });
    },
    // Graph Two
    async setStackChart() {
      this.isChart1 = false;
      this.chart2DrillDown = [];
      this.chart2RawData = [];
      this.chart2AsiaPacific = [];
      this.chart2Europe = [];
      this.chart2LatinAmerica = [];
      this.chart2RestOfTheWorld = [];
      this.chart2NorthAmerica = [];
      let urlLink = `https://api.winner-english.com/u_api/cal_back_country_2.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&sector=${this.sectorSelected}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;

      let countryList = [];

      getData.map((x) => {
        countryList.push(x[0].exp_country);
      });

      let rawData = [];
      getData.map((x) => {
        let temp = x.filter((y) => y.value != 0);
        rawData.push(temp);
      });
      rawData.map((x) => {
        x.forEach((y) => {
          this.chart2RawData.push(y);
        });
      });

      //สร้าง Drill down สำหรับ Asia pacific
      let asiaRawData = this.chart2RawData.filter(
        (x) => x.area == "Asia-Pacific"
      );
      countryList.forEach((x) => {
        let data = asiaRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });

        let tempData = {
          type: "pie",
          id: x + " - " + "Asia Pacific",
          name: x + " <br> " + "Asia-Pacific",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Asia Pacific",
        };
        this.chart2AsiaPacific.push(tempData);
      });

      //สร้าง Drill down สำหรับ Europe
      let europeRawData = this.chart2RawData.filter((x) => x.area == "Europe");
      countryList.forEach((x) => {
        let data = europeRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Europe",
          name: x + " <br> " + "Europe",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Europe",
        };
        this.chart2Europe.push(tempData);
      });

      //สร้าง Drill down สำหรับ North America
      let northAmericaRawData = this.chart2RawData.filter(
        (x) => x.area == "North America"
      );
      countryList.forEach((x) => {
        let data = northAmericaRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "North America",
          name: x + " <br> " + "North America",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "North America",
        };
        this.chart2NorthAmerica.push(tempData);
      });

      //สร้าง Drill down สำหรับ Latin America
      let latinAmericaRawData = this.chart2RawData.filter(
        (x) => x.area == "Latin America"
      );
      countryList.forEach((x) => {
        let data = latinAmericaRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Latin America",
          name: x + " <br> " + "Latin America",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Latin America",
        };
        this.chart2LatinAmerica.push(tempData);
      });

      //สร้าง Drill down สำหรับ Rest of the world
      let restRawData = this.chart2RawData.filter(
        (x) => x.area == "Rest of the world"
      );
      countryList.forEach((x) => {
        let data = restRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Rest of the world",
          name: x + " <br> " + "Rest of the world",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Rest of the world",
        };
        this.chart2RestOfTheWorld.push(tempData);
      });

      this.isChart1 = true;

      Highcharts.chart(
        "container1",
        {
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
            useHTML: true,
            headerFormat: "<div class='text-weight-bold'>{point.key}</div>",
            pointFormat:
              "<div class=''>{series.name}</div><div> Value : {point.y}%</div>" +
              this.total,
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
              data: this.chart2AsiaPacific,
              color: "#2381B8",
            },
            {
              name: "Europe",
              data: this.chart2Europe,
              color: "#EB1E63",
            },
            {
              name: "North America",
              data: this.chart2NorthAmerica,
              color: "#f99704",
            },
            {
              name: "Latin America",
              data: this.chart2LatinAmerica,
              color: "#2D9687",
            },
            {
              name: "Rest of the world",
              data: this.chart2RestOfTheWorld,
              color: "#9C26B3",
            },
          ],
          drilldown: {
            activeDataLabelStyle: {
              color: "white",
              textShadow: "0 0 2px black, 0 0 2px black",
            },
            showInLegend: false,
            series: this.chart2DrillDown,
          },
          title: {
            style: {
              fontSize: "24px",
            },
            text: `Where do ${this.continent} economies' imported content in exports to ${this.importingSelected.label} come from?`,
          },
          exporting: {
            buttons: {
              contextButton: {
                menuItems: [
                  "downloadPNG",
                  "downloadJPEG",
                  "separator",
                  "downloadCSV",
                  "downloadXLS",
                ],
              },
            },
            width: "1280px",
            chartOptions: {
              title: {
                style: { fontSize: "12px" },
              },
              subtitle: {
                style: { fontSize: "8px" },
              },
              legend: {
                useHTML: true,
                itemStyle: {
                  fontSize: "7px",
                  fontWeight: "medium",
                  fontFamily: "roboto",
                  color: "#00000",
                },

                align: "right",
                verticalAlign: "middle",
                width: "100",
                symbolWidth: 0.1,
                symbolHeight: 0.1,
                symbolRadius: 0,
                useHTML: true,
                symbolWidth: 0,
              },
              xAxis: [
                {
                  type: "category",
                },
              ],
            },
          },
        },
        (Highcharts.Tick.prototype.drillable = function () {})
      );
    },
  },
  async mounted() {
    this.$q.sessionStorage.remove("shareLink");
    await this.getSectorList();
    await this.getYear();
    this.getCountryList();

    if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
      this.year = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.getItem("year");

      this.displayYear = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.getItem("year");
    }

    // Check Session and Params Exporting
    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      this.exportingSelected = this.$route.params.expe
        ? this.countryOptions.filter((x) => x.iso == this.$route.params.expe)[0]
        : this.countryOptions.filter(
            (x) => x.iso == this.$q.sessionStorage.getItem("expe")
          )[0];
      this.countryOptionsShow = this.countryOptions;
      this.continent = this.exportingSelected.region;
      this.exportingSelected.label;
    }

    if (this.$q.sessionStorage.has("impe") || this.$route.params.impe) {
      this.importingSelected = this.$route.params.impe
        ? this.countryOptions.filter((x) => x.iso == this.$route.params.impe)[0]
        : this.countryOptions.filter(
            (x) => x.iso == this.$q.sessionStorage.getItem("impe")
          )[0];
      this.countryOptionsShow = this.countryOptions;
    }

    if (this.$q.sessionStorage.has("esec") || this.$route.params.sector) {
      this.sectorSelected = this.$route.params.sector
        ? this.$route.params.sector
        : this.$q.sessionStorage.getItem("esec");

      this.displaySector = this.sectorOptions.filter(
        (x) => x.value == this.sectorSelected
      )[0].label;
    }

    if (this.validateSelected()) {
      this.renderGraphSector();
    }
  },
};
</script>

<style lang="scss" scoped></style>
