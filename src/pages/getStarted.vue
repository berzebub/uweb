<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <!-- @yearSelected="getEmitYear" -->

    <app-bar @countrySelected="getEmitData" :isShowLogo="true" class="shadow-2"></app-bar>

    <div v-if="isShowContent">
      <div class="relative-position q-my-md">
        <p
          class="font-page"
          align="center"
          id="keyGVC"
        >{{ displayCountry.name }}'s key GVC relationships</p>
      </div>

      <div align="center" class="q-pa-lg" v-if="!isGraphGVC">
        <q-spinner-pie color="primary" size="100px" />
      </div>

      <!-- Country's key GVC relationships -->
      <div
        class="font-content q-px-xl q-pt-md"
        style="width:90%; margin:auto; max-width:1200px;"
        v-show="isGraphGVC"
      >
        <!-- <q-btn-group style="width:100%" class="row justify-between"> -->
        <!-- <q-btn label="Overview" />
          <q-btn label="By exporting sector" />
          <q-btn label="By partnet economy" />
        </q-btn-group>
        <div style="height:20px"></div>-->
        <div class="row justify-center q-py-md">
          <div class="col-4">
            <q-btn v-scroll-to="'#keyGVC'" style="width:90%;margin:auto" label="Overview" no-caps></q-btn>
          </div>
          <div class="col-4">
            <q-btn
              v-scroll-to="'#exportingSector'"
              style="width:90%;margin:auto"
              label="By exporting sector"
              no-caps
            ></q-btn>
          </div>
          <div class="col-4">
            <q-btn
              v-scroll-to="'#byEconomy'"
              style="width:90%;margin:auto"
              label="By partner economy"
              no-caps
            ></q-btn>
          </div>
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
                <td style="font-size:24px; width:290px;" align="center">{{ displayCountry.name }}</td>
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

      <!-- Key GVC relationships by sector -->
      <div style="height:20px;"></div>
      <p
        id="exportingSector"
        class="font-graph q-py-md"
        align="center"
      >key GVC relationships by sector</p>
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
      <div class="row items-center" style="width:1200px;margin:auto;">
        <div>
          <q-img src="../../public/images/getStarted01.jpg" style="width:450px;"></q-img>
        </div>
        <div
          align="center"
          class="font-graph"
          style="width:250px; left: 15px;position:relative; top:-10px;"
        >{{ displayCountry.name }}</div>
        <div>
          <q-img src="../../public/images/getStarted02.jpg" style="width:450px;"></q-img>
        </div>
      </div>

      <div style="height:50px"></div>
      <hr />
      <div style="height:20px"></div>

      <!-- Key GVC relationships by economy -->
      <p class="font-graph q-py-md" id="byEconomy" align="center">key GVC relationships by economy</p>

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

      <div class="row items-center" style="width:1200px;margin:auto;">
        <div>
          <q-img src="../../public/images/getStarted03.jpg" style="width:450px;"></q-img>
        </div>
        <div
          align="center"
          class="font-graph"
          style=" left: 15px;position:relative; top:-10px;width:250px;"
        >{{ displayCountry.name }}</div>
        <div>
          <q-img src="../../public/images/getStarted04.jpg" style="width:450px;"></q-img>
        </div>
      </div>

      <div style="height:20px"></div>
      <div class="q-px-md" align="right">
        <q-btn
          to="/involvement"
          no-caps
          class="bg4 font-content"
          style="border-radius:10px;width:200px;"
          label="Continue"
        ></q-btn>
      </div>

      <div style="height:20px"></div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import Axios from "axios";
export default {
  components: {
    appBar,
  },
  data() {
    return {
      displayCountry: "",
      displayYear: "",
      graphGVC: {},

      isGraphGVC: false,
      isShowContent: false,
    };
  },

  methods: {
    goToOverview() {},
    goToSector() {},
    getEmitData(val) {
      this.displayCountry = val;
      this.displayYear = val.year;
      if (this.displayCountry != "" && this.displayYear != "") {
        this.isShowContent = true;
        this.loadGVCGraph();
      }
    },
    // -----------------------------------------

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
  },

  mounted() {
    this.checkPlatform();
  },
};
</script>

<style lang="scss" scoped>
</style>