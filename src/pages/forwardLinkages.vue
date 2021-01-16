<template>
  <div>
    <q-page>
      <global-value-chains-header
        :isShowTinaLink="true"
        :isDisableShare="isDisableShare"
        :isDisableTina="isDisableTinaLink"
      ></global-value-chains-header>

      <global-value-chains-menu :activeMenu="4"></global-value-chains-menu>

      <!-- DROPDOWN SELECTION -->
      <div class="bg12 q-py-md">
        <div class="row justify-center">
          <div class="col-6 row">
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
                      v-if="showExportingCountry.code && showExportingCountry.code!='TW'"
                      :code="showExportingCountry.code"
                      size="small"
                    />
                  </template>

                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section avatar>
                        <gb-flag
                          v-if="scope.opt.code && scope.opt.code !='TW'"
                          :code="scope.opt.code"
                          size="small"
                        />
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
            <div class="col q-px-md" v-if="activeBy == 'Exporting'">
              <div>Exporting sector</div>
              <div>
                <q-select
                  bg-color="white"
                  v-model="sector"
                  dense
                  :options="sectorOptions"
                  emit-value
                  map-options
                  outlined
                  @input="selectedSector"
                ></q-select>
              </div>
            </div>
            <div class="col-6 q-px-md" v-if="activeBy == 'Economy'">
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
                      v-if="showimportingCountry.code && showimportingCountry.code!='TW'"
                      :code="showimportingCountry.code"
                      size="small"
                    />
                  </template>

                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section avatar>
                        <gb-flag
                          v-if="scope.opt.code && scope.opt.code !='TW'"
                          :code="scope.opt.code"
                          size="small"
                        />
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
          </div>
        </div>

        <div class="q-pt-md q-pb-md row justify-center">
          <div class="col-3 q-px-md" align="center">
            <q-btn
              :class="activeBy == 'Exporting' ? 'text-amber-12' : 'text-white '"
              no-caps
              style="background-color:#2C2F30"
              class="fit font-20"
              @click="selectedActiveBy('Exporting')"
            >
              select by Exporting
              <br />sector
            </q-btn>
          </div>
          <div class="col-3 q-px-md">
            <q-btn
              :class="activeBy == 'Economy' ? 'text-amber-12' : 'text-white '"
              no-caps
              style="background-color:#2C2F30"
              class="fit font-20"
              @click="selectedActiveBy('Economy')"
            >
              select by Importing
              <br />economy
            </q-btn>
          </div>
        </div>
      </div>

      <sorry-duplicate v-show="exp_country.iso == imp_country.iso && activeBy == 'Economy'"></sorry-duplicate>

      <!--  -->

      <div
        class="row"
        style="background-color:#E5E1E1;"
        v-if="
          (activeBy == 'Exporting' && exp_country && sector && year) ||
            (activeBy == 'Economy' && exp_country && imp_country && year)
        "
      >
        <div class="row col-12 bg-white">
          <div class="col-6">
            <div class="font-content q-pt-md" align="center">
              <b>Key policy question (Select by exporting sector)</b>
            </div>
            <div>
              <ul>
                <li>Where does {{exp_country.label !=null? exp_country.label: 'an economy'}}'s contribute the most towards export production?</li>
                <li>How does this compare across economies in the same region?</li>
              </ul>
            </div>
          </div>
          <div class="col-6">
            <div class="font-content q-pt-md" align="center">
              <b>Key policy question (Select by importing economy)</b>
            </div>
            <div>
              <ul>
                <li>Which sectors in {{exp_country.label !=null? exp_country.label: 'an economy'}}'s are most reliant on export production?</li>
                <li>How does this compare across economies in the same region?</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="row col-12"
          v-if="
            (activeBy == 'Economy' && exp_country.iso != imp_country.iso) ||
              activeBy == 'Exporting'
          "
        >
          <div class="col-3 full-height">
            <q-img class src="../../public/forwardlinks.png"></q-img>
          </div>
          <div class="col-12 self-center" style="max-width:1000px;width:100%;margin:auto;">
            <p align="center" class="font-24">
              Where does {{ exp_country.label }} contribute towards export
              production?
            </p>
            <div align="center" class="q-px-lg">
              <div align="center" class="q-px-xs font-content">
                <p align="left">
                  Some part of {{ exp_country.label }}’s gross exports consist
                  of intermediate inputs that are used by the direct importer to
                  produce exports for third economy
                </p>
              </div>

              <div>
                <div class="row justify-center">
                  <div class="col q-px-xs" style="width:170px;">
                    Exporting economy &nbsp;:
                    <br />
                    {{ exp_country.label }}
                  </div>
                  <!-- <div class="col-1 q-px-xs" style="width:10px;">:</div> -->

                  <div class="col q-px-xs" style="width:170px;">
                    Exporting sector
                    <br />
                    <div class>
                      <span v-if="activeBy == 'Exporting'">
                        {{
                        showSector.label
                        }}
                      </span>
                      <span v-else>All</span>
                    </div>
                  </div>

                  <div class="col-1 q-px-xs" style="width:65px">
                    <q-img style="width:60px;" src="../../public/arrow-right.png"></q-img>
                  </div>

                  <div class="col q-px-xs" style="width:170px;">
                    Importing economy
                    <br />
                    <span v-if="activeBy == 'Economy'">
                      {{
                      imp_country.label
                      }}
                    </span>
                    <span v-else>All</span>
                  </div>
                  <div class="col-1 q-px-xs" style="width:65px">
                    <q-img style="width:60px" src="../../public/arrow-right.png"></q-img>
                  </div>
                  <div class="col q-mx-sm">Third economies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Exporting Data -->
      <div v-if="this.activeBy == 'Exporting'">
        <div v-if="exp_country && sector && year">
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

          <q-separator class="no-margin bg-grey-5 shadow-1" id="exportingEconomies" />

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
        </div>

        <div v-else>
          <div class="row">
            <div class="col-6">
              <div class="font-content q-pt-md" align="center">
                <b>Key policy question (Select by exporting sector)</b>
              </div>
              <div>
                <ul>
                  <li>Where does {{exp_country.label !=null? exp_country.label: 'an economy'}}'s contribute the most towards export production?</li>
                  <li>How does this compare across economies in the same region?</li>
                </ul>
              </div>
            </div>
            <div class="col-6">
              <div class="font-content q-pt-md" align="center">
                <b>Key policy question (Select by importing economy)</b>
              </div>
              <div>
                <ul>
                  <li>Which sectors in {{exp_country.label !=null? exp_country.label: 'an economy'}}'s are most reliant on export production?</li>
                  <li>How does this compare across economies in the same region?</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row" style="background-color:#E5E1E1;">
            <div class="col-3 full-height">
              <q-img class src="../../public/forwardlinks.png"></q-img>
            </div>
            <div class="col-9 self-center">
              <p align="center" class="font-24">
                Where does {{exp_country.label !=null? exp_country.label: 'an economy'}} contribute towards export
                production?
              </p>
              <div align="center" class="q-px-lg">
                <div align="center" class="q-px-xs font-content">
                  <p align="center">
                    Some part of {{exp_country.label !=null? exp_country.label: 'an economy'}}’s gross exports consist
                    of intermediate inputs that are used by the direct importer to
                    produce exports for third economy
                  </p>
                </div>

                <div>
                  <div class="row justify-center">
                    <div class="col q-px-xs" style="width:170px;">
                      Exporting economy &nbsp;:
                      <br />
                      {{ exp_country.label }}
                    </div>
                    <!-- <div class="col-1 q-px-xs" style="width:10px;">:</div> -->

                    <div class="col q-px-xs" style="width:170px;">
                      Exporting sector
                      <br />
                      <div class>
                        <span v-if="activeBy == 'Exporting'">
                          {{
                          showSector.label
                          }}
                        </span>
                        <span v-else>All</span>
                      </div>
                    </div>

                    <div class="col-1 q-px-xs" style="width:65px">
                      <q-img style="width:60px;" src="../../public/arrow-right.png"></q-img>
                    </div>

                    <div class="col q-px-xs" style="width:170px;">
                      Importing economy
                      <br />
                      <span v-if="activeBy == 'Economy'">
                        {{
                        imp_country.label
                        }}
                      </span>
                      <span v-else>All</span>
                    </div>
                    <div class="col-1 q-px-xs" style="width:65px">
                      <q-img style="width:60px" src="../../public/arrow-right.png"></q-img>
                    </div>
                    <div class="col q-mx-sm">Third economies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="font-graph q-py-lg"
            align="center"
          >Please choose exporting economy, exporting sector and year from the drop down menus above</div>
        </div>
      </div>

      <!-- Economy Data -->
      <div v-if="this.activeBy == 'Economy' && exp_country.iso != imp_country.iso">
        <div v-if="exp_country && imp_country && year">
          <div class="bg-white q-pa-xl">
            <div class="q-px-xl bg-white">
              <!-- Key policy questions -->
              <p align="center" class="font-graph q-py-lg">Key policy questions</p>
              <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#exportingMost'">
                1.
                <u>
                  Which sectors in {{ exp_country.label }} are most reliant on
                  export production in a selected importer?
                </u>
              </p>
              <p
                class="font-content q-px-sm cursor-pointer"
                v-scroll-to="'#exportingEconomiesMost'"
              >
                2.
                <u>
                  Which sectors in {{ exp_country.region }} economies are most
                  reliant on export production in a selected importer?
                </u>
              </p>
            </div>
          </div>

          <q-separator class="no-margin bg-grey-5 shadow-1" id="exportingMost" />

          <div class="bg-white q-py-xl">
            <div style="width:90%;margin:auto;max-width:1200px">
              <div align="center" class="q-pa-lg" v-if="!isChart3">
                <q-spinner-pie color="primary" size="100px" />
              </div>
              <div v-show="isChart3">
                <div id="container3"></div>
              </div>
            </div>
          </div>

          <q-separator class="no-margin bg-grey-5 shadow-1" id="exportingEconomiesMost" />

          <div class="bg-white q-py-xl">
            <div style="width:90%;margin:auto;max-width:1200px">
              <div align="center" class="q-pa-lg" v-if="!isChart4">
                <q-spinner-pie color="primary" size="100px" />
              </div>
              <div v-show="isChart4">
                <div id="container4"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <data-waiting
            text="Please choose exporting economy, exporting sector
 and year from the drop down menus above"
          ></data-waiting>
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
import dataWaiting from "../components/dataWaiting.vue";
import sorryDuplicate from "../components/sorryDuplicate.vue";

let CancelToken = Axios.CancelToken;
let source = CancelToken.source();
let cancelGraph1;
let cancelGraph2;
let cancelGraph3;
let cancelGraph4;
let cancelGraph5;
let cancelGraph6;

export default {
  components: {
    globalValueChainsHeader,
    globalValueChainsMenu,
    myFooter,
    dataWaiting,
    sorryDuplicate,
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

      activeBy: "Exporting",

      isChart1: false,
      isChart2: false,
      isChart3: false,
      isChart4: false,

      // DrillDown Chart 1
      chart2RawData: [],
      chart2DrillDown: [],
      chart2AsiaPacific: [],
      chart2Europe: [],
      chart2NorthAmerica: [],
      chart2LatinAmerica: [],
      chart2RestOfTheWorld: [],

      // DrillDown Chart 2
      countryList: [],
      agricultureData: [],
      miningData: [],
      constructionData: [],
      utilitiesData: [],
      lowtechData: [],
      drilldownData: [],
      hightechData: [],
      tradeRepairData: [],
      tourismData: [],
      transportData: [],
      ictData: [],
      propertyData: [],
      financialData: [],
      publicwData: [],
      privatewData: [],

      isDisableTinaLink: true,
      isDisableShare: true,
    };
  },
  computed: {
    showExportingCountry() {
      if (this.exp_country) {
        let res = this.countryOptions.filter(
          (x) => x.value == this.exp_country.value
        )[0];

        return res;
      } else {
        return "";
      }
    },
    showimportingCountry() {
      if (this.imp_country) {
        let res = this.countryOptions.filter(
          (x) => x.value == this.imp_country.value
        )[0];

        return res;
      } else {
        return "";
      }
    },
    showSector() {
      if (this.sector) {
        let res = this.sectorOptions.filter((x) => x.value == this.sector)[0];

        return res;
      } else {
        return "";
      }
    },
  },

  methods: {
    selectedActiveBy(type) {
      this.activeBy = type;

      if (cancelGraph1 != undefined) {
        cancelGraph1();
      }

      if (cancelGraph2 != undefined) {
        cancelGraph2();
      }

      if (cancelGraph3 != undefined) {
        cancelGraph3();
      }

      if (cancelGraph4 != undefined) {
        cancelGraph4();
      }
      if (cancelGraph5 != undefined) {
        cancelGraph5();
      }

      if (cancelGraph6 != undefined) {
        cancelGraph6();
      }

      if (this.validateSelected()) {
        if (type == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    },
    filterExportingCountry(val, update) {
      update(async () => {
        this.exportingOptions = this.countryOptions.filter(
          (x) => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },

    filterImportingCountry(val, update) {
      update(async () => {
        this.importingOptions = this.countryOptions.filter(
          (x) => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },

    selectedExporting() {
      this.$q.sessionStorage.set("expe", this.exp_country.iso);

      if (this.validateSelected()) {
        if (this.activeBy == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    },
    selectedImporting() {
      this.$q.sessionStorage.set("impe", this.imp_country.iso);
      if (this.validateSelected()) {
        if (this.activeBy == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    },
    selectedYear() {
      this.$q.sessionStorage.set("year", this.year);
      if (this.validateSelected()) {
        if (this.activeBy == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    },
    selectedSector() {
      this.$q.sessionStorage.set("esec", this.sector);
      if (this.validateSelected()) {
        if (this.activeBy == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    },

    validateSelected() {
      this.isDisableTinaLink = true;
      this.isDisableShare = true;

      if (this.activeBy == "Exporting") {
        if (this.exp_country && this.year && this.sector) {
          this.isDisableShare = false;
          let link =
            "riva.negotiatetrade.org/#/forward-linkages" +
            "/" +
            this.exp_country.iso +
            "/" +
            this.year +
            "/" +
            this.sector +
            "/" +
            this.activeBy;

          this.$q.sessionStorage.set("shareLink", link);

          if (this.exportAvailable.includes(this.exp_country.iso)) {
            this.isDisableTinaLink = false;
          }

          return true;
        } else {
          return false;
        }
      } else {
        if (this.exp_country && this.year && this.imp_country) {
          this.isDisableShare = false;
          if (this.exportAvailable.includes(this.exp_country.iso)) {
            this.isDisableTinaLink = false;
          }
          let link =
            "riva.negotiatetrade.org/#/forward-linkages" +
            "/" +
            this.exp_country.iso +
            "/" +
            this.year +
            "/" +
            this.imp_country.iso +
            "/" +
            this.activeBy;

          this.$q.sessionStorage.set("shareLink", link);
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

    renderTwo() {
      this.chart3();
      this.chart4();
    },

    async chart1() {
      this.isChart1 = false;
      let showSectorName = this.sectorOptions.filter(
        (x) => x.value == this.sector
      )[0].label;
      let urlLink =
        this.path_api +
        `/cal_forward_country_1.php?exp_country=${this.exp_country.iso}&year=${this.year}&sector=${this.sector}`;

      if (cancelGraph1 !== undefined) {
        cancelGraph1();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph1 = c;
        }),
      });

      getData = getData.data;

      let summaryValue = getData.map((x) => x.value);
      summaryValue = summaryValue.filter((x) => x);

      summaryValue = summaryValue.reduce((a, b) => a + b, 0);

      getData.forEach((element, index) => {
        if (index > 5) {
          element.name = `${element.name} (${(
            (element.value / summaryValue) *
            100
          ).toFixed(2)}%) `;
          element.percent = ((element.value / summaryValue) * 100).toFixed(2);
        }
      });

      let temp = [...getData];

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

      let urlLinkSub =
        this.path_api +
        `/cal_forward_country_1a.php?exp_country=${this.exp_country.iso}&year=${this.year}&sector=${this.sector}`;

      if (cancelGraph2 !== undefined) {
        cancelGraph2();
      }

      let getDataSub = await Axios.get(urlLinkSub, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph2 = c;
        }),
      });

      getDataSub = getDataSub.data;

      this.isChart1 = true;

      Highcharts.chart("container1", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" },
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
                  enabled: false,
                  align: "left",
                  verticalAlign: "top",
                  style: {
                    fontSize: "15px",
                    fontWeight: "bold",
                  },
                },
              },
            ],

            data: getData,
            showInLegend: true,
            legendType: "point",
          },
        ],
        title: {
          style: {
            fontSize: "24px",
          },
          text: `Where does ${this.exp_country.label} contribute the most towards export production?`,
        },
        credits: {
          enabled: false,
        },

        legend: {
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
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function () {
            // return "<div>" + this.name + "</div>";
            if (this.name == "Europe") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #eb1e63;"></div></td><td style="padding-left:20px;">Europe</td></tr></table></div>';
            } else if (this.name == "Latin America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #2D9687;"></div></td><td style="padding-left:20px;">Latin America</td></tr></table></div>';
            } else if (this.name == "North America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #F99704;"></div></td><td style="padding-left:20px;">North America</td></tr></table></div>';
            } else if (this.name == "Asia-Pacific") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #2381B8;"></div></td><td style="padding-left:20px;">Asia-Pacific</td></tr></table></div>';
            } else if (this.name == "Rest of the world") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #9C26B3;"></div></td><td style="padding-left:20px;">Rest of the world</td></tr></table></div>';
            }
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
        subtitle: {
          style: {
            fontSize: "14px",
          },
          useHTML: true,
          text: `Gross exports of ${
            this.exp_country.label
          } in ${showSectorName} sector(s) to World amount to $${
            getDataSub.grossExport < 1000
              ? getDataSub.grossExport + " million"
              : (getDataSub.grossExport / 1000).toFixed(2) + " billion"
          } in ${this.year}. Of these exports, $
          ${
            getDataSub.contribution < 1000
              ? getDataSub.contribution + " million"
              : (getDataSub.contribution / 1000).toFixed(2) + " billion"
          } is ${
            this.exp_country.label
          }'s contribution to export production in other economies, mainly  ${
            graphOneDetailsList[0].name
          }, ${graphOneDetailsList[1].name} , ${
            graphOneDetailsList[2].name
          } , ${graphOneDetailsList[3].name} and ${
            graphOneDetailsList[4].name
          }. <br/> <br/>${
            this.exp_country.label
          }'s contribution to export production: $
          ${
            getDataSub.contribution < 1000
              ? getDataSub.contribution + " million"
              : (getDataSub.contribution / 1000).toFixed(2) + " billion"
          } / ${this.exp_country.label}'s gross exports to World: $${
            getDataSub.grossExport < 1000
              ? getDataSub.grossExport + " million"
              : (getDataSub.grossExport / 1000).toFixed(2) + " billion"
          }`,
          align: "left",
        },
        exporting: {
          allowHTML: true,
          useHTML: true,
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
          width: "1920px",
          chartOptions: {
            chart: {
              events: {
                load: function () {
                  this.legend.update({
                    width: 120,
                    labelFormatter: function () {
                      if (this.name == "Europe") {
                        return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #eb1e63;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">Europe</td></tr></table></div>';
                      } else if (this.name == "Latin America") {
                        return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #2D9687;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">Latin America</td></tr></table></div>';
                      } else if (this.name == "North America") {
                        return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #F99704;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">North America</td></tr></table></div>';
                      } else if (this.name == "Asia-Pacific") {
                        return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #2381B8;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">Asia-Pacific</td></tr></table></div>';
                      } else if (this.name == "Rest of the world") {
                        return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #9C26B3;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">Rest of the world</td></tr></table></div>';
                      }
                    },
                  });
                },
              },
            },

            series: [
              {
                dataLabels: {
                  style: { fontSize: "6px" },
                },
              },
            ],

            title: {
              style: { fontSize: "12px" },
            },
            subtitle: {
              style: { fontSize: "8px" },
            },
          },
        },
      });
    },

    async chart2() {
      this.isChart2 = false;

      let urlLink =
        this.path_api +
        `/cal_forward_country_2.php?exp_country=${this.exp_country.iso}&year=${this.year}&sector=${this.sector}`;

      if (cancelGraph3 !== undefined) {
        cancelGraph3();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph3 = c;
        }),
      });

      getData = getData.data;

      let countryList = [];

      getData.map((x) => {
        countryList.push(x[0].exp_country);
      });

      let region = this.sectorOptions.filter((x) => x.value == this.sector)[0]
        .label;

      let rawData = [];

      this.chart2RawData = [];
      this.chart2DrillDown = [];
      this.chart2AsiaPacific = [];
      this.chart2Europe = [];
      this.chart2NorthAmerica = [];
      this.chart2LatinAmerica = [];
      this.chart2RestOfTheWorld = [];

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
        let valueM = 0;
        let sumValueM = 0;

        data.forEach((z) => {
          valueM = z.valueM;
          sumValueM += z.valueM;

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
          sumValueM: sumValueM.toFixed(2),
          valueM: valueM,
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
        let valueM = 0;
        let sumValueM = 0;
        data.forEach((z) => {
          valueM = z.valueM;
          sumValueM += z.valueM;
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
          sumValueM: sumValueM.toFixed(2),
          valueM: valueM,
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
        let valueM = 0;
        let sumValueM = 0;
        data.forEach((z) => {
          valueM = z.valueM;
          sumValueM += z.valueM;
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
          sumValueM: sumValueM.toFixed(2),
          valueM: valueM,
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
        let valueM = 0;
        let sumValueM = 0;
        data.forEach((z) => {
          valueM = z.valueM;
          sumValueM += z.valueM;
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
          sumValueM: sumValueM.toFixed(2),
          valueM: valueM,
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
        let valueM = 0;
        let sumValueM = 0;
        data.forEach((z) => {
          valueM = z.valueM;
          sumValueM += z.valueM;
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
          sumValueM: sumValueM.toFixed(2),
          valueM: valueM,
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Rest of the world",
        };
        this.chart2RestOfTheWorld.push(tempData);
      });

      this.isChart2 = true;

      Highcharts.chart(
        "container2",
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
            symbolWidth: 0.1,
            symbolHeight: 0.1,
            symbolRadius: 0,
            symbolWidth: 0,
            labelFormatter: function () {
              // return "<div>" + this.name + "</div>";
              if (this.name == "Europe") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #eb1e63;"></div></td><td style="padding-left:20px;">Europe</td></tr></table></div>';
              } else if (this.name == "Latin America") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #2D9687;"></div></td><td style="padding-left:20px;">Latin America</td></tr></table></div>';
              } else if (this.name == "North America") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #F99704;"></div></td><td style="padding-left:20px;">North America</td></tr></table></div>';
              } else if (this.name == "Asia-Pacific") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #2381B8;"></div></td><td style="padding-left:20px;">Asia-Pacific</td></tr></table></div>';
              } else if (this.name == "Rest of the world") {
                return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 45px;height: 30px;background-color: #9C26B3;"></div></td><td style="padding-left:20px;">Rest of the world</td></tr></table></div>';
              }
            },
          },

          tooltip: {
            useHTML: true,
            headerFormat: "",
            pointFormatter: function () {
              return (
                "<div class='text-bold'>" +
                this.name +
                "</div>" +
                "<div> " +
                this.series.name +
                " share: " +
                this.y +
                "% </div>" +
                "<div> " +
                this.series.name +
                " value: $" +
                this.options.valueM +
                " million </div>" +
                "<div> Total value: $" +
                this.options.sumValueM +
                " million" +
                "</div>"
              );
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
            text: `Where do ${this.exp_country.region} economies contribute the most towards export production? `,
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
            width: "1920px",
            chartOptions: {
              legend: {
                width: 120,
                symbolWidth: 10,
                symbolHeight: 10,
                itemMarginTop: 5,
                symbolRadius: 0,
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
                itemStyle: {
                  fontSize: "7px",
                  fontWeight: "medium",
                  fontFamily: "roboto",
                  color: "#00000",
                },
              },
              title: {
                style: { fontSize: "12px" },
              },
              subtitle: {
                style: { fontSize: "8px" },
              },
              yAxis: [
                {
                  title: {
                    text: "% of gross exports to world",
                    style: { fontSize: "6px" },
                  },
                  labels: {
                    style: { fontSize: "6px" },
                  },
                },
              ],
              xAxis: [
                {
                  labels: {
                    style: { fontSize: "6px" },
                  },
                  type: "category",
                },
              ],
            },
          },
        },
        (Highcharts.Tick.prototype.drillable = function () {})
      );
    },

    async chart3() {
      this.isChart3 = false;

      let urlLink =
        this.path_api +
        `/cal_forward_sector_1.php?exp_country=${this.exp_country.iso}&imp_country=${this.imp_country.iso}&year=${this.year}`;

      if (cancelGraph4 !== undefined) {
        cancelGraph4();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph4 = c;
        }),
      });

      getData = getData.data;

      let summaryValue = getData.map((x) => x.value);
      summaryValue = summaryValue.filter((x) => x);

      summaryValue = summaryValue.reduce((a, b) => a + b, 0);

      getData.forEach((element, index) => {
        if (index > 13) {
          element.name = `${element.name} (${(
            (element.value / summaryValue) *
            100
          ).toFixed(2)}%) `;
          element.percent = ((element.value / summaryValue) * 100).toFixed(2);
        }
      });

      let urlLinkSub =
        this.path_api +
        `/cal_forward_sector_1a.php?exp_country=${this.exp_country.iso}&imp_country=${this.imp_country.iso}&year=${this.year}`;

      if (cancelGraph5 !== undefined) {
        cancelGraph5();
      }

      let getDataSub = await Axios.get(urlLinkSub, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph5 = c;
        }),
      });

      getDataSub = getDataSub.data;

      this.isChart3 = true;

      Highcharts.chart("container3", {
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
                layoutAlgorithm: "squarified",
                dataLabels: {
                  enabled: false,
                  align: "left",
                  verticalAlign: "top",
                  style: {
                    fontSize: "15px",
                    // fontWeight: "bold",
                  },
                },
              },
            ],

            data: [...getData],
            showInLegend: true,
            legendType: "point",
          },
        ],
        legend: {
          useHTML: true,
          layout: "horizontal",
          align: "right",
          verticalAlign: "bottom",

          floating: false,
          borderWidth: 0,
          // useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
          },

          // align: "left",
          // verticalAlign: "bottom",
          width: "870",

          symbolWidth: 0.1,
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function () {
            // return "<div>" + this.name + "</div>";
            if (this.name == "Agriculture") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #2F978B;"></div></td><td style="padding-left:12px;">Agriculture</td></tr></table></div>';
            } else if (this.name == "Mining") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #9A25B1;"></div></td><td style="padding-left:12px;">Mining</td></tr></table></div>';
            } else if (this.name == "Construction") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #8D243B;"></div></td><td style="padding-left:12px;">Construction</td></tr></table></div>';
            } else if (this.name == "Utilities") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #FA9908;"></div></td><td style="padding-left:12px;">Utilities</td></tr></table></div>';
            } else if (this.name == "Low tech") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #F34336;"></div></td><td style="padding-left:12px;"><div>Manufacturing</div>Low tech </td></tr></table></div>';
            } else if (this.name == "High and medium tech") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #C3165B;"></div></td><td style="padding-left:12px;"><div>Manufacturing</div>High and medium tech</td></tr></table></div>';
            } else if (this.name == "Trade and repair service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #5E6DC1;"></div></td><td style="padding-left:12px;"><div>Servicess</div>Trade and repair </td></tr></table></div>';
            } else if (this.name == "Tourism") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #3F50B8;"></div></td><td style="padding-left:12px;"><div>Services</div>Tourism</td></tr></table></div>';
            } else if (this.name == "Transport service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #3949AB;"></div></td><td style="padding-left:12px;"><div>Services</div>Transport </td></tr></table></div>';
            } else if (this.name == "ICT service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #1565C0;"></div></td><td style="padding-left:12px;"><div>Services</div>ICT </td></tr></table></div>';
            } else if (this.name == "Property service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #19227D;"></div></td><td style="padding-left:12px;"><div>Services</div>Property </td></tr></table></div>';
            } else if (this.name == "Financial service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #43A7F5;"></div></td><td style="padding-left:12px;"><div>Services</div>Financial </td></tr></table></div>';
            } else if (this.name == "Public and welfare service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #2088E7;"></div></td><td style="padding-left:12px;"><div>Services</div>Publice and welfare </td></tr></table></div>';
            } else if (this.name == "Private household service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #1564C0;"></div></td><td style="padding-left:12px;"><div>Services</div>Private household </td></tr></table></div>';
            }
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
        title: {
          style: {
            fontSize: "24px",
          },
          text: `Which sectors in ${this.exp_country.label} are most reliant on export production in ${this.imp_country.label}?`,
        },
        credits: {
          enabled: false,
        },
        subtitle: {
          style: {
            fontSize: "14px",
          },
          useHTML: true,
          text: `<br/>Contribution to ${
            this.imp_country.label
          }'s export production: $${
            getDataSub.contributionto < 1000
              ? getDataSub.contributionto + " million"
              : (getDataSub.contributionto / 1000).toFixed(2) + " billion"
          } / Gross exports to ${this.imp_country.label}: $${
            getDataSub.exportto < 1000
              ? getDataSub.exportto + " million"
              : (getDataSub.exportto / 1000).toFixed(2) + " billion"
          }`,
          align: "left",
        },
        exporting: {
          allowHTML: true,
          useHTML: true,
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
          width: "1920px",
          chartOptions: {
            chart: {
              events: {
                load: function () {
                  this.legend.update({
                    verticalAlign: "middle",
                    align: "right",
                    width: 150,
                    labelFormatter: function () {
                      if (this.name == "Agriculture") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #2F978B;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Agriculture</td></tr></table></div>';
                      } else if (this.name == "Mining") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #9A25B1;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Mining</td></tr></table></div>';
                      } else if (this.name == "Construction") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #8D243B;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Construction</td></tr></table></div>';
                      } else if (this.name == "Utilities") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #FA9908;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Utilities</td></tr></table></div>';
                      } else if (this.name == "Low tech") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #F34336;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Manufacturing Low tech </td></tr></table></div>';
                      } else if (this.name == "High and medium tech") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #C3165B;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Manufacturing High and medium tech</td></tr></table></div>';
                      } else if (this.name == "Trade and repair service") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #5E6DC1;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Servicess Trade and repair </td></tr></table></div>';
                      } else if (this.name == "Tourism") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #3F50B8;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Services Tourism</td></tr></table></div>';
                      } else if (this.name == "Transport service") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #3949AB;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Services Transport </td></tr></table></div>';
                      } else if (this.name == "ICT service") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #1565C0;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Services ICT </td></tr></table></div>';
                      } else if (this.name == "Property service") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #19227D;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Services Property </td></tr></table></div>';
                      } else if (this.name == "Financial service") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #43A7F5;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Services Financial </td></tr></table></div>';
                      } else if (this.name == "Public and welfare service") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #2088E7;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Services Publice and welfare </td></tr></table></div>';
                      } else if (this.name == "Private household service") {
                        return '<div style="padding:3px;font-size:8px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 10px;height: 10px;background-color: #1564C0;"></div></td><td style="padding-left:5px;font-size:6px;white-space:nowrap">Services Private household </td></tr></table></div>';
                      }
                    },
                  });
                },
              },
            },

            series: [
              {
                dataLabels: {
                  style: { fontSize: "6px" },
                },
              },
            ],

            title: {
              style: { fontSize: "12px" },
            },
            subtitle: {
              style: { fontSize: "8px" },
            },
          },
        },
      });
    },

    async chart4() {
      this.isChart4 = false;
      this.chart2RawData = [];
      this.countryList = [];

      let urlLink =
        this.path_api +
        `/cal_forward_sector_2.php?exp_country=${this.exp_country.iso}&imp_country=${this.imp_country.iso}&year=${this.year}`;

      if (cancelGraph6 !== undefined) {
        cancelGraph6();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph6 = c;
        }),
      });

      getData = getData.data;
      let countryTemp = getData.map((x) => x.exp_country);
      this.countryList = [...new Set(countryTemp)];
      this.countryList.sort();

      //Agiculture
      this.agricultureData = [];
      let agriculture = getData.filter((x) => x.grouping == "Agriculture");
      agriculture.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      agriculture = agriculture.map((x) => x.value);
      for (let i = 0; i < agriculture.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: agriculture[i],
        };
        this.agricultureData.push(temp);
      }

      //Mining
      this.miningData = [];
      let mining = getData.filter((x) => x.grouping == "Mining");
      mining.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      mining = mining.map((x) => x.value);
      for (let i = 0; i < mining.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: mining[i],
        };
        this.miningData.push(temp);
      }

      //construction
      this.constructionData = [];
      let construction = getData.filter((x) => x.grouping == "Construction");
      construction.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      construction = construction.map((x) => x.value);
      for (let i = 0; i < construction.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: construction[i],
        };
        this.constructionData.push(temp);
      }

      //utilities
      this.utilitiesData = [];
      let utilities = getData.filter((x) => x.grouping == "Utilities");
      utilities.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      utilities = utilities.map((x) => x.value);
      for (let i = 0; i < utilities.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: utilities[i],
        };
        this.utilitiesData.push(temp);
      }

      //Manufacturing-Low tech
      this.lowtechData = [];
      let lowtech = [];
      let lowtechTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        lowtechTemp = getData.filter(
          (x) =>
            x.grouping == "Low tech" && x.exp_country == this.countryList[i]
        );

        let temp = lowtechTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        lowtech.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < lowtechTemp.length; i++) {
          let temp2 = {
            name: lowtechTemp[i].sector,
            y: lowtechTemp[i].value,
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Low tech",
          type: "pie",
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < lowtech.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Low tech",
          name: this.countryList[i],
          y: lowtech[i],
        };
        this.lowtechData.push(temp);
      }

      //Manufacturing-high and medium tech
      this.hightechData = [];
      let hitech = [];
      let hitechTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        hitechTemp = getData.filter(
          (x) =>
            x.grouping == "High and medium tech" &&
            x.exp_country == this.countryList[i]
        );
        let temp = hitechTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        hitech.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < hitechTemp.length; i++) {
          let temp2 = {
            name: hitechTemp[i].sector,
            y: hitechTemp[i].value,
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-High tech",
          type: "pie",
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < hitech.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-High tech",
          name: this.countryList[i],
          y: hitech[i],
        };
        this.hightechData.push(temp);
      }

      //Service Trade and repair
      this.tradeRepairData = [];
      let tradeRepair = [];
      let tradeRepairTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        tradeRepairTemp = getData.filter(
          (x) =>
            x.grouping == "Trade and repair service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = tradeRepairTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        tradeRepair.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < tradeRepairTemp.length; i++) {
          let temp2 = {
            name: tradeRepairTemp[i].sector,
            y: tradeRepairTemp[i].value,
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Trade and repair",
          type: "pie",
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < tradeRepair.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Trade and repair",
          name: this.countryList[i],
          y: tradeRepair[i],
        };
        this.tradeRepairData.push(temp);
      }

      //Service Tourism
      this.tourismData = [];
      let tourism = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let tourismTemp = getData.filter(
          (x) => x.grouping == "Tourism" && x.exp_country == this.countryList[i]
        );
        let temp = tourismTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        tourism.push(Number(temp));
      }
      for (let i = 0; i < tourism.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: tourism[i],
        };
        this.tourismData.push(temp);
      }

      //Service Transport
      this.transportData = [];
      let transport = [];
      let transportTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        transportTemp = getData.filter(
          (x) =>
            x.grouping == "Transport service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = transportTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        transport.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < transportTemp.length; i++) {
          let temp2 = {
            name: transportTemp[i].sector,
            y: transportTemp[i].value,
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Transport",
          type: "pie",
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < transport.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Transport",
          name: this.countryList[i],
          y: transport[i],
        };
        this.transportData.push(temp);
      }
      //Service ICT
      this.ictData = [];
      let ict = [];

      for (let i = 0; i < this.countryList.length; i++) {
        let ictTemp = getData.filter(
          (x) =>
            x.grouping == "ICT service" && x.exp_country == this.countryList[i]
        );
        let temp = ictTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        ict.push(Number(temp));
      }
      for (let i = 0; i < ict.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: ict[i],
        };
        this.ictData.push(temp);
      }

      //Service property
      this.propertyData = [];
      let property = [];
      let propertyTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        propertyTemp = getData.filter(
          (x) =>
            x.grouping == "Property service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = propertyTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        property.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < propertyTemp.length; i++) {
          let temp2 = {
            name: propertyTemp[i].sector,
            y: propertyTemp[i].value,
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Property",
          type: "pie",
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < property.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Property",
          name: this.countryList[i],
          y: property[i],
        };
        this.propertyData.push(temp);
      }

      //Service Financial
      this.financialData = [];
      let financial = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let financialTemp = getData.filter(
          (x) =>
            x.grouping == "Financial service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = financialTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        financial.push(Number(temp));
      }
      for (let i = 0; i < financial.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: financial[i],
        };
        this.financialData.push(temp);
      }
      //Service public
      this.publicwData = [];
      let publicw = [];
      let publicwTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        publicwTemp = getData.filter(
          (x) =>
            x.grouping == "Public and welfare service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = publicwTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        publicw.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < publicwTemp.length; i++) {
          let temp2 = {
            name: publicwTemp[i].sector,
            y: publicwTemp[i].value,
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Public",
          type: "pie",
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < publicw.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Public",
          name: this.countryList[i],
          y: publicw[i],
        };
        this.publicwData.push(temp);
      }

      //Service private household
      this.privatewData = [];
      let privatew = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let privatewTemp = getData.filter(
          (x) =>
            x.grouping == "Private household service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = privatewTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        privatew.push(Number(temp));
      }
      for (let i = 0; i < privatew.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: privatew[i],
        };
        this.privatewData.push(temp);
      }

      this.isChart4 = true;

      Highcharts.chart(
        "container4",
        {
          chart: {
            type: "column",
            height: (9 / 16) * 100 + "%", // 16:9 ratio
          },
          title: {
            style: {
              fontSize: "24px",
              fontFamily: "roboto",
            },
            text: `Which sectors in ${this.exp_country.label} economies are most reliant <br>on export production in ${this.imp_country.label}?`,
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
              text: `% of gross exports to ${this.imp_country.label}`,
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
            height: 500,
            itemMarginTop: 15,
            symbolHeight: 15,
            symbolWidth: 50,
            symbolRadius: 0,
          },

          tooltip: {
            useHTML: true,
            headerFormat: "",
            pointFormatter: function () {
              return (
                "<div> <span class='text-bold'>" +
                this.name +
                "</span>" +
                "<br>" +
                "<div style='display:inline-block;width:8px;height:8px;border-radius:50%;background-color:" +
                this.color +
                "'></div>  " +
                this.series.name +
                ": " +
                this.y +
                "%" +
                "</div>"
              );
            },
          },
          series: [
            {
              name: "Agriculture",
              data: this.agricultureData,
              color: "#2F978B",
            },
            {
              name: "Mining",
              data: this.miningData,
              color: "#9A25B1",
            },
            {
              name: "Construction",
              data: this.constructionData,
              color: "#8D243B",
            },
            {
              name: "Utilities",
              data: this.utilitiesData,
              color: "#FA9908",
            },
            {
              name: "Manufacturing-Low tech",
              data: this.lowtechData,
              color: "#F34336",
            },
            {
              name: "Manufacturing-High and medium tech",
              data: this.hightechData,
              color: "#C3165B",
            },
            {
              name: "Services-Trade and repair",
              data: this.tradeRepairData,
              color: "#5E6DC1",
            },
            {
              name: "Services-Tourism",
              data: this.tourismData,
              color: "#3F50B8",
            },
            {
              name: "Services-Transport",
              data: this.transportData,
              color: "#3949AB",
            },
            {
              name: "Services-ICT",
              data: this.ictData,
              color: "#1565C0",
            },
            {
              name: "Services-Property",
              data: this.propertyData,
              color: "#19227D",
            },
            {
              name: "Services-Financial",
              data: this.financialData,
              color: "#43A7F5",
            },
            {
              name: "Services-Public and welfare",
              data: this.publicwData,
              color: "#2088E7",
            },
            {
              name: "Services-Private household",
              data: this.privatewData,
              color: "#1564C0",
            },
          ],
          drilldown: {
            activeDataLabelStyle: {
              color: "white",
              textShadow: "0 0 2px black, 0 0 2px black",
            },
            showInLegend: false,
            series: this.drilldownData,
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
            width: "1920px",
            chartOptions: {
              legend: {
                useHTML: true,
                itemStyle: {
                  fontSize: "6px",
                  fontWeight: "medium",
                  fontFamily: "roboto",
                  color: "#00000",
                },
                align: "right",
                verticalAlign: "middle",
                layout: "vertical",
                width: 120,
                itemMarginTop: 2,
                symbolWidth: 10,
                symbolHeight: 5,
                symbolRadius: 0,
              },
              title: {
                style: { fontSize: "12px" },
              },
              subtitle: {
                style: { fontSize: "8px" },
              },
              yAxis: [
                {
                  title: {
                    text: `% of gross exports to ${this.imp_country.label}`,
                    style: { fontSize: "6px" },
                  },
                  labels: {
                    style: { fontSize: "6px" },
                  },
                },
              ],
              xAxis: [
                {
                  type: "category",
                  labels: {
                    rotation: -90,
                    style: { fontSize: "6px" },
                  },
                },
              ],
            },
          },
        },
        (Highcharts.Tick.prototype.drillable = function () {})
      );
    },

    async getYear() {
      let url = this.path_api + "/get_year_active.php";
      let data = await Axios.get(url);
      let temp = [];
      data.data.forEach((element) => {
        temp.push(element);
      });
      this.yearOptions = temp;
    },
  },
  async mounted() {
    await this.getCountryList();
    await this.getYear();
    await this.getSectorList();

    //  path: "/forward-linkages/:expe?/:year?/:sectorOrImpe?/:menu?",

    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      this.exp_country = this.$route.params.expe
        ? this.countryOptions.filter((x) => x.iso == this.$route.params.expe)[0]
        : this.$q.sessionStorage.has("expe")
        ? this.countryOptions.filter(
            (x) => x.iso == this.$q.sessionStorage.getItem("expe")
          )[0]
        : "";
    }

    if (this.$q.sessionStorage.has("impe")) {
      this.imp_country = this.$route.params.sectorOrImpe
        ? this.countryOptions.filter(
            (x) => x.iso == this.$route.params.sectorOrImpe
          )[0]
        : this.$q.sessionStorage.has("impe")
        ? this.countryOptions.filter(
            (x) => x.iso == this.$q.sessionStorage.getItem("impe")
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
    if (this.year == "") {
      this.year = "2017";
    }

    if (this.$q.sessionStorage.has("esec")) {
      this.sector = this.$route.params.sectorOrImpe
        ? this.$route.params.sectorOrImpe
        : this.$q.sessionStorage.has("esec")
        ? this.$q.sessionStorage.getItem("esec")
        : "";
    }
    if (this.sector == "") {
      this.sector = "0";
    }

    // if (this.$route.params.menu) {
    //   this.activeBy = this.$route.params.menu;
    // }

    if (this.$route.params.menu) {
      this.activeBy = this.$route.params.menu;

      if (this.activeBy == "Exporting") {
        // select by exporting sector
        this.sector = this.$route.params.sectorOrImpe;
        if (this.validateSelected()) {
          this.renderOne();
        }
      } else {
        // select by source economy
        this.imp_country = this.countryOptions.filter(
          (x) => x.iso == this.$route.params.sectorOrImpe
        )[0];
        if (this.validateSelected()) {
          this.renderTwo();
        }
      }
    } else {
      if (this.validateSelected()) {
        if (this.activeBy == "Exporting") {
          this.renderOne();
        } else {
          this.renderTwo();
        }
      }
    }

    // if (this.validateSelected()) {
    // if (this.activeBy == "Exporting") {
    //   this.renderOne();
    // } else {
    //   this.renderTwo();
    // }
    // }
  },
  beforeDestroy() {
    if (cancelGraph1 != undefined) {
      cancelGraph1();
    }

    if (cancelGraph2 != undefined) {
      cancelGraph2();
    }

    if (cancelGraph3 != undefined) {
      cancelGraph3();
    }

    if (cancelGraph4 != undefined) {
      cancelGraph4();
    }
    if (cancelGraph5 != undefined) {
      cancelGraph5();
    }

    if (cancelGraph6 != undefined) {
      cancelGraph6();
    }
  },
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
