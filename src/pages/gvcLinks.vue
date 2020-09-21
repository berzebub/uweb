<template>
  <!-- <q-page
    class="container"
    :class="!isShowContent ? 'bg-loading' : 'bg-white'"
    style="padding-bottom:100px"
  >
    
    <div
      v-if="!isShowContent"
      class="absolute-center font-graph"
    >Please choose your exporting economy and year of interest.</div>

    <app-bar
      :isShowKeyGVCBtn="false"
      :isShowTitle="true"
      @countrySelected="getEmitData"
      :isShowLogo="true"
      class="shadow-2"
    ></app-bar>

    <div v-if="isShowContent">
      <div align="center" class="q-pa-lg" v-if="!isGraphGVC">
        <q-spinner-pie color="primary" size="100px" />
      </div>

      
      <div
        class="font-content q-px-xl q-pt-md"
        style="width:90%; margin:auto; max-width:1200px;"
        v-show="isGraphGVC"
      >
        <div class="row justify-center q-py-md">
          <div class="col-4">
            <q-btn
              v-scroll-to="'#keyGVC'"
              outline
              style="width:90%;margin:auto"
              no-caps
              color="indigo-10"
            >
              <span class="indigo-10 font-content">Overview</span>
            </q-btn>
          </div>
          <div class="col-4">
            <q-btn
              v-scroll-to="'#exportingSector'"
              outline
              color="indigo-10"
              style="width:90%;margin:auto"
              no-caps
            >
              <span class="indigo-10 font-content">By exporting sector</span>
            </q-btn>
          </div>
          <div class="col-4">
            <q-btn
              v-scroll-to="'#byEconomy'"
              outline
              color="indigo-10"
              style="width:90%;margin:auto"
              no-caps
            >
              <span class="indigo-10 font-content">By partner economy</span>
            </q-btn>
          </div>
        </div>

        <div class="relative-position q-my-md">
          <p
            class="font-page"
            align="center"
            id="keyGVC"
          >{{ displayCountry.name }}'s key GVC relationships: Overview</p>
        </div>
        <p>
          <b>
            {{ displayCountry.name }}’s GVC exports amount to
            <span
              class="text-red"
            >{{graphGVC.total_percent}}% (${{graphGVC.total_value}} billion)</span>
            of its gross exports in {{displayYear}}
          </b>
        </p>
        <p>
          Imported content comprising
          <span
            class="text-red"
          >{{graphGVC.export_percent}}% (${{graphGVC.export_value}} billion)</span> of gross exports
        </p>
        <p>
          Export of intermediates used in further export production comprising
          <span
            class="text-red"
          >{{graphGVC.import_percent}}% (${{graphGVC.import_value}} billion)</span> of gross exports
        </p>

        <div style="height:50px;"></div>
        <div style="max-width:1200px;margin:auto" class>
          <div class="row items-start">
            <div style="width:300px" align="center">
              <div class="color1">
                <b>
                  Imported content used in exports
                  (Backward linkages)
                </b>
                <br />
                Share: {{graphGVC.import_percent}}% of gross exports
                <br />
                Value: ${{graphGVC.import_value}} billion
              </div>
            </div>
            <div class="col"></div>
            <div class style="width:300px" align="center">
              <div class="color2">
                <b>
                  Export of intermediates used in
                  export production
                  (Forward linkages)
                </b>
                <br />
                Share: {{graphGVC.export_percent}}% of gross exports
                <br />
                Value: ${{graphGVC.export_value}} billion
              </div>
            </div>
          </div>

          <div>
            <table style="max-width:1200px;margin:auto;" class>
              <tr>
                <td style="width:120px;">
                  <div
                    :style="{width:graphGVC.redsize + 'px',height:graphGVC.redsize + 'px'}"
                    style="border-radius:50%;"
                    class="bg1"
                    v-if="graphGVC.redsize"
                  ></div>
                </td>
                <td align="center" style="width:160px;">
                  <q-img src="../../public/arrow-right-red.png" v-if="graphGVC.redsize"></q-img>
                </td>
                <td style="font-size:24px; width:290px;" class="text-black" align="center">
                  <b>{{ displayCountry.name }}</b>
                </td>
                <td align="center" style="width:160px;">
                  <q-img
                    v-if="graphGVC.greensize"
                    style="width:150px"
                    src="../../public/arrow-right-green.png"
                  ></q-img>
                </td>
                <td style="width:120px;">
                  <div
                    v-if="graphGVC.greensize"
                    :style="{width:graphGVC.greensize + 'px',height:graphGVC.greensize + 'px'}"
                    style="border-radius:50%;"
                    class="bg2"
                  ></div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div style="height:50px;"></div>
      <hr />

      
      <div style="height:20px;"></div>
      <p id="exportingSector" class="font-graph q-py-md" align="center">
        <b>key GVC relationships: by exporting sector</b>
      </p>
      <div class="row q-pa-md" style="width:90%; margin:auto; max-width:1200px;">
        <div class="col-5">
          <div class="color4 font-content">
            <b>Backward linkages</b>
          </div>
          <span class="no-padding">
            <b>Sector</b>
          </span>
          <p>
            Share of foreign value-added in sectoral gross exports (%)
            <br />Foreign value-added (billions)
          </p>
        </div>
        <div class="col-5 offset-2">
          <div class="color4 font-content">
            <b>Forward linkages</b>
          </div>
          <span class="no-padding">
            <b>Sector</b>
          </span>
          <p>
            Share of contribution to partner exports, in sectoral gross exports (%)
            <br />Contribution to partner exports (billions)
          </p>
        </div>
      </div>
      <div class="row justify-center items-center" style="width:1200px;margin:auto;">
        <div class="col">
          <div align="center" class="q-pa-lg" v-if="!isGraphGVCSector">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-if="isGraphGVCSector">
            <backward-graph-gvc :data="graphBackwardGVCSector"></backward-graph-gvc>
          </div>
        </div>
        <div align="center" class="font-graph col-2" style="width:300px;">
          <b>{{ displayCountry.name }}</b>
        </div>
        <div class="col">
          <div align="center" class="q-pa-lg" v-if="!isGraphGVCSector">
            <q-spinner-pie color="primary" size="100px" />
          </div>

          <div class v-if="isGraphGVCSector">
            <forward-graph-gvc :data="graphForwardGVCSector"></forward-graph-gvc>
          </div>
        </div>
      </div>

      <div style="height:50px"></div>
      <hr />
      <div style="height:20px"></div>

      
      <p class="font-graph q-py-md" id="byEconomy" align="center">
        <b>key GVC relationships: by partner economy</b>
      </p>

      <div class="row q-pa-md" style="width:90%; margin:auto; max-width:1200px;">
        <div class="col-5">
          <div class="color4 font-content">
            <b>Backward linkages</b>
          </div>
          <span class="no-padding">
            <b>Source economy</b>
          </span>
          <p>
            Share of foreign value-added in sectoral gross exports (%)
            <br />Foreign value-added (billions)
          </p>
        </div>
        <div class="col-5 offset-2">
          <div class="color4 font-content">
            <b>Forward linkages</b>
          </div>
          <span class="no-padding">
            <b>Importing economy</b>
          </span>
          <p>
            Share of contribution to partner exports, in sectoral gross exports (%)
            <br />Contribution to partner exports (billions)
          </p>
        </div>
      </div>

      <div class="row items-center justify-center" style="width:1200px;margin:auto;">
        <div class="col">
          <div align="center" class="q-pa-lg" v-if="!isGraphGVCEconomy">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-if="isGraphGVCEconomy">
            <backward-graph-gvc :data="graphBackwardGVCEconomy"></backward-graph-gvc>
          </div>
        </div>
        <div align="center" class="font-graph col-2" style="width:300px;">
          <b>{{ displayCountry.name }}</b>
        </div>
        <div class="col">
          <div align="center" class="q-pa-lg" v-if="!isGraphGVCEconomy">
            <q-spinner-pie color="primary" size="100px" />
          </div>
          <div v-if="isGraphGVCEconomy">
            
            <forward-graph-gvc :data="graphForwardGVCEconomy"></forward-graph-gvc>
          </div>
        </div>
      </div>

      <div style="height:20px"></div>
      <div class="q-px-md" align="right">
        <q-btn
          @click="toInvolvement()"
          no-caps
          class="bg4 font-content"
          style="border-radius:10px;width:200px;"
          label="Continue"
        ></q-btn>
      </div>

      <div style="height:20px"></div>
    </div>
  </q-page>-->

  <q-page>
    <global-value-chains-header></global-value-chains-header>
    <!-- MENU -->
    <global-value-chains-menu :activeMenu="0"></global-value-chains-menu>

    <div class="row justify-center bg12 q-pa-md">
      <div class="col-6 row" style="width:400px;">
        <div class="col q-pa-sm">
          <span>Exporting economy</span>
          <q-select
            v-model="exporting"
            :options="exportingOptions"
            outlined
            bg-color="white"
            class="q-mt-xs"
            dense
            emit-value
            map-options
            @input="selectedExporting"
          >
            <template v-slot:selected-item="props">
              <q-img :src="props.opt.flag" width="30px" />
              <span class="q-mx-sm">{{props.opt.label}}</span>
            </template>
          </q-select>
        </div>

        <div class="col-5 q-pa-sm">
          <span>Year</span>
          <q-select
            v-model="year"
            :options="yearOptions"
            outlined
            bg-color="white"
            class="q-mt-xs"
            dense
            @input="selectedYear"
          ></q-select>
        </div>
      </div>
    </div>

    <div class="row justify-center q-pa-md">
      <div class="col-12 row font-content" style="width:900px;" align="center">
        <div class="col q-pr-lg">
          <q-btn class="q-py-md fit" outline no-caps style="border-radius:0px;">
            <span class="font-content">Overview</span>
          </q-btn>
        </div>
        <div class="col q-mx-lg q-px-lg">
          <q-btn class="q-py-md fit" outline no-caps style="border-radius:0px;">
            <span class="font-content" no-caps>By exporting sector</span>
          </q-btn>
        </div>
        <div class="col q-pl-lg">
          <q-btn class="q-py-md fit" outline no-caps style="border-radius:0px;">
            <span class="font-content">By partner economy</span>
          </q-btn>
        </div>
      </div>
    </div>

    <q-separator class="no-margin bg-grey-5 shadow-1" />

    <div class="q-pa-md">
      <div align="center" class="q-my-lg">
        <span class="font-title">{{overviewCountry.label}}'s key GVC relationships: Overview</span>
      </div>

      <div class="q-mt-xl">
        <div class="row justify-center">
          <div class="col-10">
            <p
              class="font-content"
            >{{overviewCountry.label}}’s GVC exports amount to 22% ($4 billion) of its gross exports in 2017</p>
            <p class="font-content">Imported content comprising 14% ($2 billion) of gross exports</p>
            <p
              class="font-content"
            >Export of intermediates used in further export production comprising 8% ($1 billion) of gross exports</p>
          </div>

          <div class="col-10 row q-my-xl q-pb-xl">
            <!-- Imported Content  -->
            <div class="col row font-content" align="center">
              <div class="col-12 self-start c-blue">
                <div>
                  Imported content used in exports
                  <br />(Backward linkages)
                </div>

                <div class="q-mt-sm" align="center">
                  Share: 8% of gross exports
                  <br />Value: $1 billion
                </div>
              </div>

              <div class="col-12 self-end">
                <div class="q-py-lg q-mt-md relative-position" style="height:120px;">
                  <q-img
                    class="absolute-center"
                    width="200px"
                    :src="require('../../public/arrow/arrow-blue-big.png')"
                  ></q-img>
                </div>
              </div>
            </div>

            <!-- Country Content -->
            <div class="col-3 self-end" align="center">
              <div>
                <q-img :src="overviewCountry.flag" width="80px" />
              </div>
              <div class="relative-position q-mt-md">
                <span class="absolute-center font-title text-no-wrap">{{overviewCountry.label}}</span>
              </div>
            </div>

            <!-- Export Content  -->
            <div class="col font-content" align="center">
              <div class="col-12 self-start c-red">
                <div>
                  <span>Export of intermediates used in</span>
                  <br />
                  <span class="text-no-wrap">export production (Forward linkages)</span>
                </div>

                <div class="q-mt-sm" align="center">
                  <span>Share: 8% of gross exports</span>
                  <br />
                  <span>Value: $1 billion</span>
                </div>
              </div>

              <div class="col-12 self-end">
                <div class="q-py-lg q-mt-md relative-position" style="height:120px;">
                  <q-img
                    class="absolute-center"
                    width="200px"
                    :src="require('../../public/arrow/arrow-red-small.png')"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-separator class="no-margin bg-grey-5 shadow-1" />

    <div class="q-pa-md">
      <div align="center" class="q-my-lg">
        <span class="font-title">key GVC relationships: by exporting sector</span>
      </div>

      <div class="row justify-center">
        <div class="col-10 row">
          <div class="col q-pa-md">
            <div class="c-blue font-footer">
              <span class="font-content text-bold">Backward linkages</span>
              <br />
              <span class="text-bold">Sector</span>
              <br />
              <span>Share of foreign value-added in sectoral gross exports (%)</span>
              <br />
              <span>Foreign value-added ($)</span>
            </div>
          </div>
          <!-- Country Content -->
          <div class="col-3 self-center" align="center"></div>
          <div class="col q-pa-md">
            <div class="c-red font-footer">
              <span class="font-content text-bold">Forward linkages</span>
              <br />
              <span class="text-bold">Sector</span>
              <br />
              <span>Share of contribution to partner exports, in sectoral gross exports (%)</span>
              <br />
              <span>Contribution to partner exports ($)</span>
            </div>
          </div>
        </div>

        <div class="col-10 row q-py-xl">
          <div class="col q-pa-md"></div>
          <!-- Country Content -->
          <div class="col-3 self-center" align="center">
            <div>
              <q-img :src="overviewCountry.flag" width="80px" />
            </div>
            <div class="relative-position">
              <span class="font-title">{{overviewCountry.label }}</span>
            </div>
          </div>
          <div class="col q-pa-md"></div>
        </div>
      </div>
    </div>

    <q-separator class="no-margin bg-grey-5 shadow-1" />

    <div class="q-pa-md">
      <div align="center" class="q-my-lg">
        <span class="font-title">key GVC relationships: by partner economy</span>
      </div>

      <div class="row justify-center">
        <div class="col-10 row">
          <div class="col q-pa-md">
            <div class="c-blue font-footer">
              <span class="font-content text-bold">Backward linkages</span>
              <br />
              <span class="text-bold">Source economy</span>
              <br />
              <span>Share of foreign value-added in gross exports (%)</span>
              <br />
              <span>Foreign value-added ($)</span>
            </div>
          </div>
          <!-- Country Content -->
          <div class="col-3 self-center" align="center"></div>
          <div class="col q-pa-md">
            <div class="c-red font-footer">
              <span class="font-content text-bold">Forward linkages</span>
              <br />
              <span class="text-bold">Improting economy</span>
              <br />
              <span>Share of contribution to partner exports, in gross exports (%)</span>
              <br />
              <span>Contribution to partner exports ($)</span>
            </div>
          </div>
        </div>

        <div class="col-10 row q-py-xl">
          <div class="col q-pa-md"></div>
          <!-- Country Content -->
          <div class="col-3 self-center" align="center">
            <div>
              <q-img :src="overviewCountry.flag" width="80px" />
            </div>
            <div class="relative-position">
              <span class="font-title">{{overviewCountry.label }}</span>
            </div>
          </div>
          <div class="col q-pa-md"></div>
        </div>
      </div>
    </div>

    <q-separator class="no-margin bg-grey-5 shadow-1" />

    <div class="q-py-xl" align="center">
      <q-btn
        no-caps
        outline
        class="q-pa-sm"
        style="width:250px;border-radius:0px;"
        label="Continue"
      ></q-btn>
    </div>

    <footer-menu></footer-menu>
  </q-page>
</template>

<script>
import backwardGraphGvc from "../components/backwardGVC.vue";
import forwardGraphGvc from "../components/forwardGVC.vue";
import appBar from "../components/appBarWithLogo";
import Axios from "axios";

// NEW
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import footerMenu from "../components/footer";

export default {
  components: {
    appBar,
    backwardGraphGvc,
    forwardGraphGvc,
    globalValueChainsHeader,
    globalValueChainsMenu,
    footerMenu,
  },
  data() {
    return {
      // ------------------- New Pattern -------------------
      exporting: "",
      year: "",

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
      yearOptions: [
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
      ],

      // ------------------- End Pattern -------------------

      displayCountry: "",
      displayYear: "",
      graphGVC: {},

      graphBackwardGVCSector: [],
      graphForwardGVCSector: [],

      graphBackwardGVCEconomy: [],
      graphForwardGVCEconomy: [],

      isGraphGVC: false,
      isGraphGVCSector: false,
      isGraphGVCEconomy: false,

      isShowContent: false,

      test: [],
    };
  },

  computed: {
    overviewCountry() {
      let res = this.exportingOptions.filter(
        (x) => x.value == this.exporting
      )[0];

      return res;
    },
  },
  methods: {
    selectedExporting(val) {
      let year = this.year || "NONE";

      this.$q.sessionStorage.set("expe", val);

      this.$router.push("/gvc-links/" + val + "/" + year);
    },

    selectedYear(val) {
      let expe = this.exporting || "NONE";

      this.$q.sessionStorage.set("year", val);

      this.$router.push("/gvc-links/" + expe + "/" + val);
    },

    // ------------------------- END -------------------------

    toInvolvement() {
      this.$router.push("/involvement");
      // cselec  = country and year that user selected
      this.$q.sessionStorage.set("cselec", this.displayCountry);
    },

    getEmitData(val) {
      this.displayCountry = val;
      this.displayYear = val.year;
      if (this.displayCountry != "" && this.displayYear != "") {
        this.isShowContent = true;
        this.loadGVCGraph();

        this.loadGVCGraphSector();
        this.loadGVCGraphEconomy();
      }
    },

    async loadGVCGraph() {
      this.isGraphGVC = false;

      let url = `https://api.winner-english.com/u_api/cal_gvc_title.php?country=${this.displayCountry.iso}&year=${this.displayYear}`;

      let formatData = {
        total_percent: 0,
        total_value: 0,
        import_percent: 0,
        import_value: 0,
        export_percent: 0,
        export_value: 0,
        redsize: 0,
        greensize: 0,
      };

      let getData = await Axios.get(url);

      this.graphGVC = getData.data == "" ? formatData : getData.data;

      this.isGraphGVC = true;
    },

    async loadGVCGraphSector() {
      this.isGraphGVCSector = false;

      let urlLinkBackward = `https://api.winner-english.com/u_api/cal_gvc_graph1_back.php?exp_country=${this.displayCountry.iso}&year=${this.displayYear}`;

      let urlLinkForward = `https://api.winner-english.com/u_api/cal_gvc_graph1_forward.php?exp_country=${this.displayCountry.iso}&year=${this.displayYear}`;

      let getDataBackward = await Axios.get(urlLinkBackward);

      let getDataForward = await Axios.get(urlLinkForward);

      let backwardData = getDataBackward.data;
      let forwardData = getDataForward.data;

      let valueArr = [];
      let valArr = [];

      let resultVal = "";
      let resultValue = "";

      backwardData.forEach((x) => {
        valueArr.push(x.value);
        valArr.push(Math.max(...[x.val1, x.val2, x.val3, x.val4, x.val5]));
      });

      forwardData.forEach((x) => {
        valueArr.push(x.value);
        valArr.push(Math.max(...[x.val1, x.val2, x.val3, x.val4, x.val5]));
      });

      resultValue = Math.max(...valueArr);

      resultVal = Math.max(...valArr);

      backwardData.forEach((x) => {
        x.valuepx =
          (x.value * 25) / resultValue < 10
            ? "10"
            : ((x.value * 25) / resultValue).toFixed(0);
        x.val1px =
          (x.val1 * 17) / resultVal < 7
            ? "7"
            : ((x.val1 * 17) / resultVal).toFixed(0);
        x.val2px =
          (x.val2 * 17) / resultVal < 7
            ? "7"
            : ((x.val2 * 17) / resultVal).toFixed(0);
        x.val3px =
          (x.val3 * 17) / resultVal < 7
            ? "7"
            : ((x.val3 * 17) / resultVal).toFixed(0);
        x.val4px =
          (x.val4 * 17) / resultVal < 7
            ? "7"
            : ((x.val4 * 17) / resultVal).toFixed(0);
        x.val5px =
          (x.val5 * 17) / resultVal < 7
            ? "7"
            : ((x.val5 * 17) / resultVal).toFixed(0);
      });

      forwardData.forEach((x) => {
        x.valuepx =
          (x.value * 25) / resultValue < 10
            ? "10"
            : ((x.value * 25) / resultValue).toFixed(0);
        x.val1px =
          (x.val1 * 17) / resultVal < 7
            ? "7"
            : ((x.val1 * 17) / resultVal).toFixed(0);
        x.val2px =
          (x.val2 * 17) / resultVal < 7
            ? "7"
            : ((x.val2 * 17) / resultVal).toFixed(0);
        x.val3px =
          (x.val3 * 17) / resultVal < 7
            ? "7"
            : ((x.val3 * 17) / resultVal).toFixed(0);
        x.val4px =
          (x.val4 * 17) / resultVal < 7
            ? "7"
            : ((x.val4 * 17) / resultVal).toFixed(0);
        x.val5px =
          (x.val5 * 17) / resultVal < 7
            ? "7"
            : ((x.val5 * 17) / resultVal).toFixed(0);
      });

      this.graphBackwardGVCSector = backwardData;
      this.graphForwardGVCSector = forwardData;

      this.isGraphGVCSector = true;
    },

    async loadGVCGraphEconomy() {
      this.isGraphGVCEconomy = false;

      let urlLinkBackward = `https://api.winner-english.com/u_api/cal_gvc_graph2_back.php?exp_country=${this.displayCountry.iso}&year=${this.displayYear}`;

      let urlLinkForward = `https://api.winner-english.com/u_api/cal_gvc_graph2_forward.php?exp_country=${this.displayCountry.iso}&year=${this.displayYear}`;

      let getDataBackward = await Axios.get(urlLinkBackward);

      let getDataForward = await Axios.get(urlLinkForward);

      let backwardData = getDataBackward.data;
      let forwardData = getDataForward.data;

      let valueArr = [];
      let valArr = [];

      let resultVal = "";
      let resultValue = "";

      backwardData.forEach((x) => {
        valueArr.push(x.value);
        valArr.push(Math.max(...[x.val1, x.val2, x.val3, x.val4, x.val5]));
      });

      forwardData.forEach((x) => {
        valueArr.push(x.value);
        valArr.push(Math.max(...[x.val1, x.val2, x.val3, x.val4, x.val5]));
      });

      resultValue = Math.max(...valueArr);

      resultVal = Math.max(...valArr);

      backwardData.forEach((x) => {
        // x.exp_country1 = x.exp_sector1;
        // x.exp_country2 = x.exp_sector2;
        // x.exp_country3 = x.exp_sector3;
        // x.exp_country4 = x.exp_sector4;
        // x.exp_country5 = x.exp_sector5;

        x.sector = x.source_country;

        x.valuepx =
          (x.value * 25) / resultValue < 10
            ? "10"
            : ((x.value * 25) / resultValue).toFixed(0);
        x.val1px =
          (x.val1 * 17) / resultVal < 7
            ? "7"
            : ((x.val1 * 17) / resultVal).toFixed(0);
        x.val2px =
          (x.val2 * 17) / resultVal < 7
            ? "7"
            : ((x.val2 * 17) / resultVal).toFixed(0);
        x.val3px =
          (x.val3 * 17) / resultVal < 7
            ? "7"
            : ((x.val3 * 17) / resultVal).toFixed(0);
        x.val4px =
          (x.val4 * 17) / resultVal < 7
            ? "7"
            : ((x.val4 * 17) / resultVal).toFixed(0);
        x.val5px =
          (x.val5 * 17) / resultVal < 7
            ? "7"
            : ((x.val5 * 17) / resultVal).toFixed(0);
      });

      forwardData.forEach((x) => {
        // x.exp_country1 = x.exp_sector1;
        // x.exp_country2 = x.exp_sector2;
        // x.exp_country3 = x.exp_sector3;
        // x.exp_country4 = x.exp_sector4;
        // x.exp_country5 = x.exp_sector5;

        x.sector = x.source_country;

        x.valuepx =
          (x.value * 25) / resultValue < 10
            ? "10"
            : ((x.value * 25) / resultValue).toFixed(0);
        x.val1px =
          (x.val1 * 17) / resultVal < 7
            ? "7"
            : ((x.val1 * 17) / resultVal).toFixed(0);
        x.val2px =
          (x.val2 * 17) / resultVal < 7
            ? "7"
            : ((x.val2 * 17) / resultVal).toFixed(0);
        x.val3px =
          (x.val3 * 17) / resultVal < 7
            ? "7"
            : ((x.val3 * 17) / resultVal).toFixed(0);
        x.val4px =
          (x.val4 * 17) / resultVal < 7
            ? "7"
            : ((x.val4 * 17) / resultVal).toFixed(0);
        x.val5px =
          (x.val5 * 17) / resultVal < 7
            ? "7"
            : ((x.val5 * 17) / resultVal).toFixed(0);
      });

      this.graphBackwardGVCEconomy = backwardData;
      this.graphForwardGVCEconomy = forwardData;

      this.isGraphGVCEconomy = true;
    },
  },

  mounted() {
    // Check Session and Params Year
    if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
      let year =
        this.$route.params.year != "NONE"
          ? this.$route.params.year
          : this.$q.sessionStorage.has("year")
          ? this.$q.sessionStorage.getItem("year")
          : "";

      this.year = year;
    }

    // Check Session and Params Exporting
    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      let expe =
        this.$route.params.expe != "NONE"
          ? this.$route.params.expe
          : this.$q.sessionStorage.has("expe")
          ? this.$q.sessionStorage.getItem("expe")
          : "";

      this.exporting = expe;
    }

    // this.checkPlatform();
  },
};
</script>

<style lang="scss" scoped>
.box-border {
  border: 1px solid;
}

.c-blue {
  color: #283891;
}

.c-red {
  color: #8d273d;
}
</style>