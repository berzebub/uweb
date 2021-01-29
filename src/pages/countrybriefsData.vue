<template>
  <q-page class="bg-white q-pb-md" style="width:209mm;height:fit-content;">
    <div class="q-pa-md" id="printSection" align="right">
      <q-btn
        :disable="!isPrint"
        no-caps
        text-color="white"
        @click="printBtn()"
        style="background-color:#2C2F30;"
      >
        <div>
          <q-icon class="q-mr-sm" name="fas fa-print" size="14px"></q-icon>
          <span>print</span>
        </div>
      </q-btn>
      <q-btn class="q-mx-md" no-caps text-color="white" style="background-color:#2C2F30;">
        <div>
          <q-icon class="q-mr-sm" name="fas fa-upload" size="14px"></q-icon>
          <span>PDF</span>
        </div>
      </q-btn>
      <q-btn
        no-caps
        text-color="white"
        style="background-color:#2C2F30;"
        @click="isShowShare = true"
      >
        <div>
          <q-icon class="q-mr-sm" name="fas fa-share-alt" size="14px"></q-icon>
          <span>Share</span>
        </div>
      </q-btn>
    </div>

    <div align="center" class="q-pa-md text-white bg-bar">
      <span style="font-size:26px;">
        RIVA Global Value Chain (GVC) Country Briefs:
        <br />
        {{ country }}, {{ year }}
      </span>
    </div>

    <!-- Structure of value-added in gross exports1-5 ^ (link to relevant page
    on RIVA)-->
    <div
      class="q-py-sm text-bold bg-bar"
      style="width:1000px;margin: 30px auto 10px auto;font-size:20px;border-radius:5px;"
      align="center"
    >
      <div>
        <span class="text-white">Value-added structure of gross exports to the world by exporter</span>
        <span
          class="relative-position text-white"
          style="display:inline-block;top:-10px;font-size:12px;"
        >1-5</span>
        <span style="font-size:15px;"></span>
      </div>
    </div>

    <div class="q-mt-sm row justify-center q-px-md">
      <div class="col q-px-sm" align="center">
        <div align="center" class="q-px-sm" style="height:40px;">
          <span class="text-h6 text-bold">{{ fullRegion }}</span>
        </div>
        <div align="center" class>
          <i style="font-size:16px;">(% of gross exports)</i>
        </div>
        <div id="container2"></div>
      </div>
      <div class="col q-px-sm" align="center">
        <div align="center" class="q-px-sm" style="height:40px;">
          <span class="text-h6 text-bold">{{ country }}</span>
        </div>
        <div align="center" class>
          <i style="font-size:16px;">(% of gross exports)</i>
        </div>
        <div id="container1"></div>
      </div>
      <div class="col q-px-sm" align="center">
        <div align="center" class="q-px-sm" style="height:40px;">
          <span class="text-h6 text-bold">All economies</span>
        </div>
        <div align="center" class>
          <i style="font-size:16px;">(% of gross exports)</i>
        </div>
        <div id="container3"></div>
      </div>
    </div>
    <div
      class="q-py-sm"
      style="width:1000px;margin: 30px auto 10px auto;font-size:18px;border-radius:5px;"
      align="left"
    >For more details on these indicators, please refer to the Notes section at the bottom of the page</div>
    <!-- Value-added and gross trade balance ^ (link to relevant page on
    RIVA)-->
    <div
      class="q-py-sm text-bold bg-bar"
      style="width:1000px;margin: 0px auto 20px auto;font-size:22px;border-radius:5px;"
      align="center"
    >
      <span class="text-white">
        {{ country }}'s gross and value-added trade balance with the world
        <span
          style="font-size:15px"
        ></span>
      </span>
    </div>

    <div class="q-px-xl">
      <div class="row justify-center">
        <div class="col q-pa-xs q-mb-md" v-if="year != '2007'">
          <div class="q-pl-xl">
            <div
              class="row q-mt-sm"
              style="font-size:18px;"
              v-for="(item, index) in contentYellowList"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5" style="width:500px;">
          <div align="center" class="q-pa-xs">
            <span class="text-bold">{{country}}'s gross and value-added trade balance with the world</span>
          </div>
          <div align="right" class="q-px-md">
            <i style="font-size:12px;">(% of {{country}}'s gross exports)</i>
          </div>
          <div class id="container4"></div>
        </div>
      </div>
    </div>

    <!-- Key global value chain relationships6-7 ^ (link to relevant page on
    RIVA)-->
    <div
      class="q-py-sm text-bold bg-bar"
      style="width:1000px;margin: 0px auto 10px auto;font-size:22px;border-radius:5px;"
      align="center"
    >
      <span class="text-white">
        Global value chain relationships
        <span
          class="relative-position"
          style="display:inline-block;top:-10px;font-size:12px;"
        >6-7</span>
        <span style="font-size:15px;"></span>
      </span>
    </div>

    <div class="q-mt-sm">
      <div class="row">
        <div class="col-6 q-pa-sm">
          <div align="center" class="q-px-md">
            <span style="font-size:18px;" class="text-bold">{{ country }}'s top 10 GVC partners</span>
          </div>
          <div align="right" class="q-px-md" style="margin-top:0px;">
            <i style="font-size:12px;">(US$, % of {{country}}'s gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container5" style="border:1px solid grey"></div>
          </div>
        </div>
        <div class="col-6 q-pa-sm" style="width:580px;">
          <div align="center" class="q-px-md">
            <span
              style="font-size:18px;"
              class="text-bold"
            >{{ country }}'s top 10 GVC-linked exporting sectors</span>
          </div>
          <div align="right" class="q-px-md" style="margin-top:0px;">
            <i style="font-size:12px;">(US$, % of {{country}}'s sectoral gross exports)</i>
          </div>
          <div class="q-pr-xs">
            <div id="container6" style="border:1px solid grey"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="break"></div>

    <!-- Comparing Thailand to its sub-regional partners -->
    <div
      class="q-py-sm text-bold bg-bar"
      style="width:1000px;margin: 30px auto 20px auto;font-size:22px;border-radius:5px;"
      align="center"
    >
      <span class="text-white">{{ country }} compared to {{fullRegion}} ({{region}})</span>
    </div>

    <div class="q-mt-lg">
      <div class="row">
        <div class="col q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Participation in GVCs
              <span style="font-size:15px;"></span>
            </span>
          </div>

          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in gvcRelianceList"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">GVC related exports - {{region}}</span>
          </div>
          <div align="right" class="q-pr-xl">
            <i style="font-size:12px;">(% of {{country}}'s gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container7"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Backward Linkages -->
    <div class="q-mt-lg">
      <div class="row">
        <div class="col q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Backward linkages
              <span class="relative-position" style="top:-10px;font-size:12px;">6</span>
              (by source region)
              <span style="font-size:15px;"></span>
            </span>
          </div>
          <div align="left" v-if="gvcShare">
            <span
              class="text-bold"
              style="font-size:18px;"
            >Sources of {{ country }}’s imported content used in exports (% of {{ country }}’s gross exports):</span>
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in backSourceRegionList"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>

          <div class="q-mt-md" align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;">
              Sources of {{ region }} imported content used in exports
              <br />
              (% of {{ region }} gross exports)
            </span>
          </div>
          <div class>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in backSourceRegionList2"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">Backward linkages, by source region</span>
          </div>
          <div align="right" class="q-pr-xl">
            <i style="font-size:12px;">(% of {{ country }}'s gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container8" class></div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-mt-lg">
      <div class="row">
        <div class="col q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Backward linkages
              <span class="relative-position" style="top:-10px;font-size:12px;">6</span>
              (by exporting sector
              <span
                class="relative-position"
                style="top:-10px;font-size:12px;"
              >8</span>)
              <span style="font-size:15px;"></span>
            </span>
          </div>
          <div align="left" v-if="gvcShare">
            <span
              class="text-bold"
              style="font-size:18px;"
            >{{ country }}’s use of imported content in exports, by sector (% of {{ country }}’s gross exports):</span>
          </div>
          <div class>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in backSourceSectorList"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>

          <div class="q-mt-md" align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;">
              {{ region }} use of imported content in exports, by sector
              <br />
              (% of {{ region }} gross exports):
            </span>
          </div>
          <!-- SET10A -->
          <div class>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in backSourceSectorList2"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="`${item.name} (${item.value}%)`"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">Backward linkages, by exporting sector</span>
          </div>
          <div align="right" class="q-pr-xl">
            <i style="font-size:12px;">(% of {{ country }}'s gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container9"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="break"></div>

    <!-- Forward Linkages -->
    <div class="q-mt-xl">
      <div class="row">
        <div class="col q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Forward linkages
              <span class="relative-position" style="top:-10px;font-size:12px;">7</span>
              (by importing region)
              <span style="font-size:15px;"></span>
            </span>
          </div>
          <div align="left" v-if="gvcShare">
            <span
              class="text-bold"
              style="font-size:18px;"
            >{{ country }}’s contribution to further export production, by destination (% of {{ country }}’s gross exports):</span>
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in forSourceRegionList"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>

          <div class="q-mt-md" align="left" v-if="gvcShare">
            <span
              class="text-bold"
              style="font-size:18px;"
            >{{ region }} contribution to further export production, by destination (% of {{ region }} gross exports):</span>
          </div>
          <!-- 11A -->
          <div class>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in forSourceRegionList2"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">Forward linkages, by importing region</span>
          </div>
          <div align="right" class="q-pr-xl">
            <i style="font-size:12px;">(% of {{ country }}'s gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container10"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-mt-xl">
      <div class="row">
        <div class="col q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Forward linkages
              <span class="relative-position" style="top:-10px;font-size:12px;">7</span>
              (by exporting sector
              <span
                class="relative-position"
                style="top:-10px;font-size:12px;"
              >8</span>)
              <span style="font-size:15px;"></span>
            </span>
          </div>
          <div align="left" v-if="gvcShare">
            <span
              class="text-bold"
              style="font-size:18px;"
            >{{ country }}’s contribution to further export production, by sector (% of {{ country }}’s gross exports):</span>
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in forSourceSectorList"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>

          <div class="q-mt-md" align="left" v-if="gvcShare">
            <span
              class="text-bold"
              style="font-size:18px;"
            >{{ region }} contribution to further export production, by sector (% of {{ region }} gross exports):</span>
          </div>
          <!-- 12A -->
          <div class>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in forSourceSectorList2"
              :key="index"
            >
              <div class="col-1 relative-position self-start" style="width:30px;padding-top:7px;">
                <div style="border:1px solid black;border-radius:50%;width:10px;height:10px;"></div>
              </div>
              <div class="col self-start">
                <span v-html="`${item.name} (${item.value}%)`"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">Forward linkages, by exporting sector</span>
          </div>
          <div align="right" class="q-pr-xl">
            <i style="font-size:12px;">(% of {{country}}'s gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container11"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="break"></div>

    <!-- Notes: -->
    <div class="q-pa-md" style="width:80%;margin: 150px auto 20px auto">
      <div>
        <div>
          <span class="text-bold text-h6">Notes:</span>
        </div>
        <div class="font-14">
          <div>
            <ul>
              <li style="list-style:decimal">
                Directly consumed: Share of domestic value-added in gross
                exports that is consumed in the importing economy.
              </li>
              <li style="list-style:decimal">
                Used in exports: Share of domestic value-added in
                gross exports used by importing economy to produce exports.
                Higher shares are indicative of deeper GVC integration.
              </li>
              <li style="list-style:decimal">
                Used in domestic consumption: Share of domestic value-added in
                gross exports that returns home via imports and is consumed
                domestically.
              </li>
              <li style="list-style:decimal">
                Double counted exports: Share of intermediate trade flows in
                gross exports that are recorded multiple times from repeated
                border crossings. Higher shares are indicative of deeper GVC
                integration.
              </li>
              <li style="list-style:decimal">
                Imported content: Share of foreign value added in gross exports.
                Higher shares are indicative of deeper GVC integration.
              </li>
              <li
                style="list-style:decimal"
              >Backward linkages: Share of foreign value added in gross exports.</li>
              <li
                style="list-style:decimal"
              >Forward linkages: Share of domestic value-added in gross exports used by importing economy to produce exports.</li>
              <li style="list-style:decimal">
                Sectors are grouped based on ADB ERDI classification. For more details please refer to
                <u>RIVA techinical notes.</u>
              </li>
            </ul>
          </div>
          <div>
            <span class="text-bold text-h6">Abbreviations and acronyms:</span>
          </div>
          <div class="font-14">
            GVC: global value chain
            <br />
            <div>{{ region!='Pacific'?region + ": " + fullRegion: '' }}</div>
            <span>ADB ERDI: Asian Development Bank Development Indicators and Policy Research Division</span>
            <div>MRIO: Multi-regional input output</div>
          </div>

          <div class="q-mt-md">
            <span class="text-bold text-h6">Source:</span>
          </div>
          <div class="font-14">
            <span>
              RIVA, available at
              <u>https://riva.negotiatetrade.org</u>
            </span>
          </div>

          <div class="q-mt-md">
            <span class="text-bold font-14">Disclaimer:</span>
          </div>
          <div style="font-size:12px;">
            <span>ESCAP gratefully acknowledges the use of ADB-MRIO database as underlying data to estimate GVC indicators in RIVA.</span>
          </div>

          <div style="font-size:12px;">
            <span>
              The designations employed and the presentation of the material in
              RIVA do not imply the expression of any opinion whatsoever on the
              part of the Secretariat of the United Nations concerning the legal
              status of any country, territory, city or area or of its
              authorities, or concerning the delimitation of its frontiers or
              boundaries. Opinions, figures and estimates set forth in this
              publication should not necessarily be considered as reflecting the
              views or carrying the endorsement of the United Nations.
            </span>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="isShowShare" persistent>
      <q-card class="relative-position" style="width:400px">
        <q-icon
          class="absolute cursor-pointer z-top"
          style="right:5px;top:5px"
          name="fas fa-times"
          size="16px"
          color="grey-8"
          flat
          v-close-popup
        ></q-icon>
        <q-card-section>
          <div class="q-pb-sm">Share</div>
          <div class="row">
            <div align="center" class="col fb-hover cursor-pointer">
              <ShareNetwork
                network="facebook"
                :url="$q.sessionStorage.getItem('shareLink')"
                hashtags
                title
              >
                <img src="../../public/facebook.png" alt />
                <div align="center">Facebook</div>
              </ShareNetwork>
            </div>
            <div align="center" class="col tw-hover cursor-pointer q-px-lg">
              <ShareNetwork
                network="twitter"
                :url="$q.sessionStorage.getItem('shareLink')"
                title
                description
                quote="The hot reload is so fast it\'s near instant. - Evan You"
                hashtags
              >
                <img src="../../public/twitter.png" alt />
                <div align="center">Twitter</div>
              </ShareNetwork>
            </div>
            <div align="center" class="col link-hover cursor-pointer">
              <ShareNetwork
                network="linkedIn"
                :url="$q.sessionStorage.getItem('shareLink')"
                hashtags
                title
              >
                <img src="../../public/linkedin.png" alt />
                <div align="center">LinkedIn</div>
              </ShareNetwork>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row bg-grey-4 q-pa-sm">
            <div
              class="col"
              style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap"
              id="shareLink"
            >{{ $q.sessionStorage.getItem("shareLink") }}</div>
            <div style="width:50px" class="text-blue cursor-pointer" @click="copyLink()">
              <b>COPY</b>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      fullRegion: "",
      isShowShare: false,
      exp_country: "",
      country: "",
      region: "",
      year: "",
      contentYellowList: [],
      countryOptions: [],

      gvcShare: "",
      gvcRelianceList: [],

      backSourceRegionList: [],
      backSourceRegionList2: [],

      backSourceSectorList: [],
      backSourceSectorList2: [],

      forSourceRegionList: [],
      forSourceRegionList2: [],

      forSourceSectorList: [],
      forSourceSectorList2: [],

      isPrint: false,
      responseSetData: [],
    };
  },
  methods: {
    convertRegion(region) {},
    printBtn() {
      window.print();
    },
    async renderChart(data) {
      //Change text Rest of the Latin American Countries to Rest of the LAC
      const searchRegRex = "/Rest of the Latin American/g";
      const replaceWith = "Rest of the LAC";
      this.chart1(JSON.parse(data.set1));
      this.chart2(JSON.parse(data.set2));
      this.chart3(JSON.parse(data.set3));
      this.chart4(JSON.parse(data.set4), JSON.parse(data.set5));
      this.chart5(JSON.parse(data.set6));
      this.chart6(JSON.parse(data.set7));
      this.chart7(JSON.parse(data.set8));
      this.chart8(JSON.parse(data.set9));
      this.chart9(JSON.parse(data.set10));
      this.chart10(JSON.parse(data.set11));
      this.chart11(JSON.parse(data.set12));
    },
    chart1(set1) {
      Highcharts.chart("container1", {
        chart: {
          type: "pie",
          borderRadius: 5,
          height: 400,
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        legend: {
          padding: 30,
          alignColumns: false,
          width: 350,
        },

        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.percentage:.1f}</b> %",
              distance: -50,
              color: "black",
            },
            showInLegend: true,
            borderWidth: 1,
            size: 230,
          },
        },

        tooltip: {
          formatter: function () {
            return `<b>$${this.point.options.total}</b> , <b>${this.y}%</b>`;
          },
        },

        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "Imported content",
                y: set1.importedContent.ratio,
                total: set1.importedContent.total,
                color: "#FFC000",
              },
              {
                name: "Double counted",
                y: set1.doubleCounted.ratio,
                total: set1.doubleCounted.total,
                color: "#D83964",
              },
              {
                name: "Used in exports",
                y: set1.usedInExportProduction.ratio,
                total: set1.usedInExportProduction.total,
                color: "#ED7D31",
              },
              {
                name: "Used in domestic consumption",
                y: set1.usedInDomesticConsumption.ratio,
                total: set1.usedInDomesticConsumption.total,
                color: "#997300",
              },
              {
                name: "Directly consumed",
                y: set1.directlyConsumed.ratio,
                total: set1.directlyConsumed.total,
                color: "#70AD47",
              },
            ],
          },
        ],
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
      });
    },
    chart2(set2) {
      Highcharts.chart("container2", {
        chart: {
          type: "pie",
          height: 400,
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },

        legend: {
          padding: 30,
          alignColumns: false,
          width: 350,
        },

        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.percentage:.1f}</b> %",
              distance: -50,
            },
            showInLegend: true,
            borderWidth: 1,
            size: 230,
          },
        },

        tooltip: {
          formatter: function () {
            return `<b>$${this.point.options.total}</b> , <b>${this.y}%</b>`;
          },
        },
        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "Imported content",
                y: set2.importedContent.ratio,
                total: set2.importedContent.total,
                color: "#FFC000",
              },
              {
                name: "Double counted",
                y: set2.doubleCounted.ratio,
                total: set2.doubleCounted.total,
                color: "#D83964",
              },
              {
                name: "Used in exports",
                y: set2.usedInExportProduction.ratio,
                total: set2.usedInExportProduction.total,
                color: "#ED7D31",
              },
              {
                name: "Used in domestic consumption",
                y: set2.usedInDomesticConsumption.ratio,
                total: set2.usedInDomesticConsumption.total,
                color: "#997300",
              },
              {
                name: "Directly consumed",
                y: set2.directlyConsumed.ratio,
                total: set2.directlyConsumed.total,
                color: "#70AD47",
              },
            ],
          },
        ],
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
      });
    },
    chart3(set3) {
      Highcharts.chart("container3", {
        chart: {
          type: "pie",
          borderRadius: 5,
          height: 400,
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },

        legend: {
          padding: 30,
          alignColumns: false,
          width: 350,
        },

        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.percentage:.1f}</b> %",
              distance: -50,
            },
            showInLegend: true,
            borderWidth: 1,
            size: 230,
          },
        },
        tooltip: {
          formatter: function () {
            return `<b>$${this.point.options.total}</b> , <b>${this.y}%</b>`;
          },
        },

        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "Imported content",
                y: set3.importedContent.ratio,
                total: set3.importedContent.total,
                color: "#FFC000",
              },
              {
                name: "Double counted",
                y: set3.doubleCounted.ratio,
                total: set3.doubleCounted.total,
                color: "#D83964",
              },
              {
                name: "Used in exports",
                y: set3.usedInExportProduction.ratio,
                total: set3.usedInExportProduction.total,
                color: "#ED7D31",
              },
              {
                name: "Used in domestic consumption",
                y: set3.usedInDomesticConsumption.ratio,
                total: set3.usedInDomesticConsumption.total,
                color: "#997300",
              },
              {
                name: "Directly consumed",
                y: set3.directlyConsumed.ratio,
                total: set3.directlyConsumed.total,
                color: "#70AD47",
              },
            ],
          },
        ],
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
      });
    },
    chart4(set4, set5) {
      let dataSet4 = set4.valueAddTradeBalance;
      let dataSet5 = set5.grossTradeBalance;
      let year = this.$q.sessionStorage.getItem("year");

      let contentYellowList = [
        `In ${year}, ${this.country} registerd a gross trade <span class=''>${
          dataSet5.current > 0 ? "surplus" : "deficit"
        }</span> with the world - an ${
          dataSet5.current > dataSet5[2007] ? "increased" : "decreased"
        }</span> since 2007.`,

        `In ${year} ${
          this.country
        } registered a  Value-added trade <span class=''>${
          dataSet4.current > 0 ? "surplus" : "deficit"
        }</span> with the world - <span class=''>${
          dataSet4.current > dataSet4[2007] ? "an increased" : "a decreased"
        }</span> since 2007.`,

        `Gross trade balance <span class=''>${
          dataSet5.current > dataSet4.current ? "greater" : "lesser"
        }</span> than value-added trade balance in ${year}, indicating <span class=''>${
          dataSet5.current > dataSet4.current ? "high" : "low"
        }</span> imported content embodied in exports.`,

        `Between 2007 and <span class=''>${year}</span>. gross trade balance has improved <span class=''>${
          dataSet5.current -
            dataSet5[2007] -
            (dataSet4.current - dataSet4[2007]) >
          0
            ? "more"
            : "less"
        }</span> than value added trade balance, indicating <span class=''>${
          dataSet5.current -
            dataSet5[2007] -
            (dataSet4.current - dataSet4[2007]) >
          0
            ? "increasing"
            : "decreasing"
        }</span> use of imported content.`,
      ];

      let setData = [];

      if (year == "2007") {
        setData = [
          {
            name: "2007",
            data: [
              set4.valueAddTradeBalance[2007],
              set5.grossTradeBalance[2007],
            ],
            color: "#4472C4",
          },
        ];
      } else {
        setData = [
          {
            name: "2007",
            data: [
              set4.valueAddTradeBalance[2007],
              set5.grossTradeBalance[2007],
            ],
            color: "#4472C4",
          },
          {
            name: year,
            data: [
              set4.valueAddTradeBalance.current,
              set5.grossTradeBalance.current,
            ],
            color: "#ED7D31",
          },
        ];
      }

      this.contentYellowList = contentYellowList;

      Highcharts.chart("container4", {
        chart: {
          type: "column",
          width: 450,
          height: 300,
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },

        xAxis: {
          type: "category",
          categories: ["Value-added trade balance", "Gross trade Balance"],
        },
        yAxis: {
          labels: {
            formatter() {
              return `${this.value}%`;
            },
          },
          title: {
            text: "",
          },
        },
        legend: {
          enabled: true,
        },
        plotOptions: {
          column: {
            // stacking: "normal",
            dataLabels: {
              enabled: true,
              color: "black",
              inside: true,
              format: "{point.y}%",
            },
          },
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
        },

        series: setData,
        exporting: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
      });
    },
    chart5(set6) {
      let setCategories = [];

      let newSetBackward = set6.backward.map((x) => {
        let realName = this.countryOptions.filter(
          (xx) => xx.iso == x.country
        )[0].label;

        let newData = {
          ...x,
          y: Number("-" + x.precent),
          country: realName,
        };

        setCategories.push("");

        return newData;
      });

      newSetBackward.sort((a, b) => Number(b.precent) - Number(a.precent));

      let newSetForward = set6.forward.map((x) => {
        let realName = this.countryOptions.filter(
          (xx) => xx.iso == x.country
        )[0].label;

        let newData = {
          ...x,
          y: x.precent,
          country: realName,
        };

        return newData;
      });

      newSetForward.sort((a, b) => Number(b.precent) - Number(a.precent));

      Highcharts.chart("container5", {
        chart: {
          type: "bar",
          height: 370,
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },

        xAxis: [
          {
            categories: setCategories,
            lineWidth: 0,
            borderWidth: 0,
            opposite: true,
            reversed: false,
          },
        ],
        yAxis: {
          borderWidth: 0,
          gridLineWidth: 0,
          lineWidth: 0,
          title: {
            text: null,
          },
          labels: {
            formatter: function () {
              return Math.abs(this.value) + "%";
            },
          },
        },

        plotOptions: {
          bar: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
              color: "black",
              formatter() {
                return `${this.point.country}, $${
                  this.point.value > 1000
                    ? (this.point.value / 1000).toFixed(2) + "B"
                    : this.point.value.toFixed(2) + "M"
                }, ${this.point.precent.toFixed(2)}%`;
              },
            },
            groupPadding: 0,
            grouping: false,
          },
        },

        tooltip: {
          formatter: function () {
            return (
              "<b>" +
              this.series.name +
              this.point.category +
              "</b><br/>" +
              Highcharts.numberFormat(Math.abs(this.point.y), 1) +
              "%"
            );
          },
        },

        series: [
          {
            name: "Backward linkages (%)",
            data: newSetBackward,
            color: "#4472C4",
            dataLabels: {
              style: {
                fontSize: "9px",
                fontWeight: 500,
              },
              align: "right",
            },
          },
          {
            name: "Forward linkages (%)",
            data: newSetForward,
            color: "#ED7D31",
            dataLabels: {
              style: {
                fontSize: "9px",
                fontWeight: 500,
              },
              align: "left",
            },
          },
        ],

        exporting: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
      });
    },
    chart6(set7) {
      let setCategories = [];

      let newSetBackward = set7.backward.map((x) => {
        let newData = {
          ...x,
          y: Number("-" + x.precent),
        };

        return newData;
      });

      newSetBackward.sort((a, b) => Number(b.precent) - Number(a.precent));

      let newSetForward = set7.forward.map((x) => {
        let newData = {
          ...x,
          y: x.precent,
        };

        setCategories.push("");

        return newData;
      });

      newSetForward.sort((a, b) => Number(b.precent) - Number(a.precent));
      for (const item in newSetForward) {
        newSetForward[item].sector =
          newSetForward[item].sector[0].toUpperCase() +
          newSetForward[item].sector.slice(1);
      }
      for (const item in newSetBackward) {
        newSetBackward[item].sector =
          newSetBackward[item].sector[0].toUpperCase() +
          newSetBackward[item].sector.slice(1);
      }

      let setMaxValue =
        newSetBackward[newSetBackward.length - 1].precent >
        newSetForward[newSetForward.length - 1].precent
          ? newSetBackward[newSetBackward.length - 1].precent
          : newSetForward[newSetForward.length - 1].precent;

      Highcharts.chart("container6", {
        chart: {
          type: "bar",
          height: 370,
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },

        xAxis: [
          {
            categories: setCategories,
            lineWidth: 0,
            borderWidth: 0,
            opposite: true,
            reversed: false,
          },
        ],
        yAxis: {
          borderWidth: 0,
          gridLineWidth: 0,
          lineWidth: 0,
          title: {
            text: null,
          },
          labels: {
            formatter: function () {
              return Math.abs(this.value) + "%";
            },
          },
        },

        plotOptions: {
          bar: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
              color: "black",
              formatter() {
                return `<span >${this.point.sector}, $${
                  this.point.value > 1000
                    ? (this.point.value / 1000).toFixed(2) + "B"
                    : this.point.value.toFixed(2) + "M"
                }, ${this.point.precent}%</span>`;
              },
              allowOverlap: true,
              overflow: "allow",
              crop: false,
            },
            groupPadding: 0,
            grouping: false,
          },
        },

        tooltip: {
          formatter: function () {
            return (
              "<b>" +
              this.series.name +
              this.point.category +
              "</b><br/>" +
              Highcharts.numberFormat(Math.abs(this.point.y), 1) +
              "%"
            );
          },
        },

        series: [
          {
            name: "Backward linkages (%)",
            data: newSetBackward,
            color: "#4472C4",

            dataLabels: {
              style: {
                fontSize: "9px",
                fontWeight: 500,
              },
              align: "right",
            },
          },
          {
            name: "Forward linkages (%)",
            data: newSetForward,
            color: "#ED7D31",

            dataLabels: {
              style: {
                fontSize: "9px",
                fontWeight: 500,
              },
              align: "left",
            },
          },
        ],

        exporting: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
      });
    },
    chart7(set8) {
      let countryList = [];
      // let areaList = [];
      // let regionList = [];

      let newSet8 = [];
      let currentCountry = {};

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set8) {
        let countryName = this.countryOptions.filter((x) => x.iso == coun)[0]
          .label;

        if (coun == this.exp_country) {
          currentCountry = set8[coun];
        }
        if (countryName == "Rest of the Latin American Countries") {
          countryName = "Rest of the LAC";
        }
        set8[coun].country = countryName;

        set8[coun].total = set8[coun].sum.total;
        set8[coun].ratio = set8[coun].sum.ratio;

        newSet8.push(set8[coun]);

        // areaList.push(set8[coun].area);
        // regionList.push(set8[coun].region);
      }

      // ประเทศที่เลือกไว้และเอาไปทำประเทศแรกของกราฟ
      this.gvcShare = currentCountry;

      let tempRegion = newSet8.filter((x) => x.region == currentCountry.region);

      // หาค่าต่ำสุดของ Region
      let lowerRegionData = tempRegion.filter(
        (x) => x.ratio == Math.min(...tempRegion.map((xx) => xx.ratio))
      )[0];

      // หาค่าสูงสุดของ Region
      let highRegionData = tempRegion.filter(
        (x) => x.ratio == Math.max(...tempRegion.map((xx) => xx.ratio))
      )[0];

      let tempArea = newSet8.filter((x) => x.area == currentCountry.area);

      // หาค่าต่ำสุดของ Area
      let lowerAreaData = tempArea.filter(
        (x) => x.ratio == Math.min(...tempArea.map((xx) => xx.ratio))
      )[0];

      // หาค่าสูงสุดของ Area
      let highAreaData = tempArea.filter(
        (x) => x.ratio == Math.max(...tempArea.map((xx) => xx.ratio))
      )[0];

      newSet8.sort((a, b) => Number(b.ratio) - Number(a.ratio));

      let RankingOfTheWorld = [...newSet8];

      RankingOfTheWorld =
        RankingOfTheWorld.filter((x) => x.region == currentCountry.region)
          .map((x) => x.ratio)
          .indexOf(currentCountry.ratio) + 1;

      newSet8.splice(
        newSet8.map((x) => x.country).indexOf(currentCountry.country),
        1
      );

      newSet8.unshift(currentCountry);

      let gvcReliance = [
        `GVC-related export rellance: ${currentCountry.ratio.toFixed(
          0
        )}% of gross exports <br>(${RankingOfTheWorld}<span class="relative-position"
          style="display:inline-block;top:-10px;font-size:12px;">${
            RankingOfTheWorld == 1
              ? "st"
              : RankingOfTheWorld == 2
              ? "nd"
              : RankingOfTheWorld == 3
              ? "rd"
              : "th"
          }</span> largest in ${this.region})`,
        `The least GVC rellance for exports :
        <br>  ${this.region}: ${
          lowerRegionData.country
        } (${lowerRegionData.ratio.toFixed(1)}%)
        <br> Asia-Pacific: ${
          lowerAreaData.country
        } (${lowerAreaData.ratio.toFixed(1)}%)
        <br> World: ${newSet8[newSet8.length - 1].country} (${newSet8[
          newSet8.length - 1
        ].ratio.toFixed(1)}%)`,
        `The hightes GVC rellance for exports :
        <br> ${this.region}: ${
          highRegionData.country
        } (${highRegionData.ratio.toFixed(1)}%)
        <br> Asia-Pacific: ${
          highRegionData.country
        } (${highRegionData.ratio.toFixed(1)}%)
        <br> World: ${newSet8[1].country} (${newSet8[1].ratio.toFixed(1)}%)`,
      ];

      this.gvcRelianceList = gvcReliance;

      let usedInExportRatio = [];
      let importedContentRatio = [];
      let doubleCountedRatio = [];

      let setNewData = [
        ...newSet8.filter((x) => x.region == currentCountry.region),
      ];

      countryList = setNewData.map((x) => x.country);

      usedInExportRatio = setNewData.map((x) => x.usedInExportProduction.ratio);
      importedContentRatio = setNewData.map((x) => x.importedContent.ratio);
      doubleCountedRatio = setNewData.map((x) => x.doubleCounted.ratio);

      Highcharts.chart("container7", {
        chart: {
          type: "column",
          height: 450,
          width: 650,
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90,
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            formatter() {
              return `${this.value}%`;
            },
          },
        },
        legend: {
          enabled: true,
          useHTML: true,
          align: "center",
          layout: "horizontal",
          alignColumns: false,
          width: 550,
          labelFormatter() {
            return `<div class='q-pr-sm q-pb-sm'>${this.name}</div>  `;
          },
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
            name: "Used in export production (forward linkages)",
            data: usedInExportRatio,
            color: "#4080B3",
          },
          {
            name: "Imported content (backward linkages)",
            data: importedContentRatio,
            color: "#D83964",
          },
          {
            name: "Double counted exports from repeated border crossings",
            data: doubleCountedRatio,
            color: "#EB9B38",
          },
        ],
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
      });
    },
    chart8(set9) {
      let countryList = [];
      let newSet9 = [];
      let currentCountry = {};

      let sumAll = {};
      let sumValue = 0;

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set9) {
        let countryName = this.countryOptions.filter((x) => x.iso == coun)[0]
          .label;

        let sumRatio = 0;

        sumValue += set9[coun].total;

        for (const area in set9[coun]) {
          if (area != "total" && area != "country") {
            sumRatio += Number(set9[coun][area].ratio) || 0;

            sumAll[area] = sumAll[area] || 0;

            sumAll[area] += set9[coun][area].value;
          }
        }

        set9[coun].newTotal = sumRatio;

        if (coun == this.exp_country) {
          currentCountry = set9[coun];
        }
        if (countryName == "Rest of the Latin American Countries") {
          countryName = "Rest of the LAC";
        }
        set9[coun].country = countryName;

        newSet9.push(set9[coun]);
      }

      newSet9.sort((a, b) => Number(b.newTotal) - Number(a.newTotal));

      newSet9.splice(
        newSet9.map((x) => x.country).indexOf(currentCountry.country),
        1
      );

      newSet9.unshift(currentCountry);

      let backSourceRegionList = [
        `Asia-Pacific (${currentCountry.asiaPacific.ratio.toFixed(1)}%)`,
        `Europe (${currentCountry.europe.ratio.toFixed(1)}%)`,
        `North America (${currentCountry.northAmerica.ratio.toFixed(1)}%)`,
        `Latin America (${currentCountry.latinAmerica.ratio.toFixed(1)}%)`,
        `Rest of the world (${currentCountry.row.ratio.toFixed(1)}%)`,
        `Total (${
          Number(currentCountry.row.ratio.toFixed(1)) +
          Number(currentCountry.latinAmerica.ratio.toFixed(1)) +
          Number(currentCountry.northAmerica.ratio.toFixed(1)) +
          Number(currentCountry.europe.ratio.toFixed(1)) +
          Number(currentCountry.asiaPacific.ratio.toFixed(1))
        }%)`,
      ];

      this.backSourceRegionList = backSourceRegionList;

      let set9a = JSON.parse(this.responseSetData.set9a);

      let backSourceRegionList2 = [
        `Asia-Pacific (${set9a.asiaPacific.value.toFixed(1)}%)`,
        `Europe (${set9a.europe.value.toFixed(1)}%)`,
        `North America (${set9a.northAmerica.value.toFixed(1)}%)`,
        `Latin America (${set9a.latinAmerica.value.toFixed(1)}%)`,
        `Rest of the world (${set9a.row.value.toFixed(1)}%)`,
        `Total (${
          Number(set9a.row.value.toFixed(1)) +
          Number(set9a.latinAmerica.value.toFixed(1)) +
          Number(set9a.northAmerica.value.toFixed(1)) +
          Number(set9a.europe.value.toFixed(1)) +
          Number(set9a.asiaPacific.value.toFixed(1))
        }%)`,
      ];

      this.backSourceRegionList2 = backSourceRegionList2;

      countryList = newSet9.map((x) => x.country);

      let asiaPacifics = [];
      let europes = [];
      let northAmericas = [];
      let latinAmericas = [];
      let rows = [];

      asiaPacifics = newSet9.map((x) => x.asiaPacific.ratio);
      europes = newSet9.map((x) => x.europe.ratio);
      northAmericas = newSet9.map((x) => x.northAmerica.ratio);
      latinAmericas = newSet9.map((x) => x.latinAmerica.ratio);
      rows = newSet9.map((x) => x.row.ratio);

      Highcharts.chart("container8", {
        chart: {
          type: "column",
          height: 450,
          width: 650,
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90,
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            formatter() {
              return `${this.value}%`;
            },
          },
        },
        legend: {
          enabled: true,
          useHTML: true,
          align: "center",
          layout: "horizontal",
          alignColumns: false,
          width: 630,
          labelFormatter() {
            return `<div class='q-pr-sm q-pb-sm'>${this.name}</div>  `;
          },
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
            name: "Asia-Pacific",
            data: asiaPacifics,
            color: "#4080B3",
          },
          {
            name: "Europe",
            data: europes,
            color: "#D83964",
          },
          {
            name: "North America",
            data: northAmericas,
            color: "#EB9B38",
          },
          {
            name: "Latin America",
            data: latinAmericas,
            color: "#4E9487",
          },
          {
            name: "Rest of the world",
            data: rows,
            color: "#9034AD",
          },
        ],
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
      });
    },
    chart9(set10) {
      let colors = [
        "#4F958B",
        "#8E33AB",
        "#822D3C",
        "#ED9D39",
        "#E05241",
        "#B32E5B",
        "#616FBB",
        "#4152B2",
        "#3C4BA5",
        "#2F65BA",
        "#1A2578",
        "#5EA6EF",
        "#4288E0",
        "#2E64BA",
      ];

      let countryList = [];
      let newSet10 = [];
      let currentCountry = {};

      let sumValue = 0;

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set10) {
        let countryName = this.countryOptions.filter((x) => x.iso == coun)[0]
          .label;

        let sumTotal = 0;
        let sumTotalValue = 0;

        if (coun == this.exp_country) {
          currentCountry = set10[coun];
        }

        for (const sector in set10[coun]) {
          if (sector != "country") {
            sumTotal += Number(set10[coun][sector].ratio);

            sumTotalValue += Number(set10[coun][sector].value);

            sumValue += Number(set10[coun][sector].value);
          }
        }

        set10[coun].total = sumTotal;

        set10[coun].totalValue = sumTotalValue;
        if (countryName == "Rest of the Latin American Countries") {
          countryName = "Rest of the LAC";
        }
        set10[coun].country = countryName;

        newSet10.push(set10[coun]);
      }

      newSet10.sort((a, b) => Number(b.total) - Number(a.total));

      newSet10.splice(
        newSet10.map((x) => x.country).indexOf(currentCountry.country),
        1
      );

      newSet10.unshift(currentCountry);

      let sectorList = [];

      newSet10.forEach((x) => {
        let i = 0;

        for (const sector in x) {
          if (
            sector != "country" &&
            sector != "total" &&
            sector != "totalValue"
          ) {
            let newData = {
              name: sector,
              data: [],
              color: colors[i],
              value2: 0,
            };

            sectorList[i] = sectorList[i] || newData;

            sectorList[i].data.push(x[sector].ratio);

            sectorList[i].value2 += x[sector].value;

            i++;
          }
        }
      });

      let i = 0;

      let currentGrossData = [];

      for (const sector in currentCountry) {
        if (
          sector != "country" &&
          sector != "total" &&
          sector != "totalValue"
        ) {
          let newData = {
            name: sector,
            ratio: 0,
            value: 0,
          };

          currentGrossData[i] = currentGrossData[i] || newData;

          currentGrossData[i].ratio = currentCountry[sector].ratio;

          currentGrossData[i].value = currentCountry[sector].value;

          i++;
        }
      }

      currentGrossData.sort((a, b) => b.ratio - a.ratio);

      let regionGrossData = [...sectorList];

      regionGrossData = regionGrossData
        .map((x) => {
          let newData = {
            ratio: x.data.reduce((a, b) => a + b, 0),
            name: x.name,
            value: (x.value2 / sumValue) * 100,
          };

          return newData;
        })
        .sort((a, b) => Number(b.value) - Number(a.value));

      let backSourceSectorList = [
        `${currentGrossData[0].name} (${currentGrossData[0].ratio.toFixed(
          1
        )}%)`,
        `${currentGrossData[1].name} (${currentGrossData[1].ratio.toFixed(
          1
        )}%)`,
        `${currentGrossData[2].name} (${currentGrossData[2].ratio.toFixed(
          1
        )}%)`,
        `${currentGrossData[3].name} (${currentGrossData[3].ratio.toFixed(
          1
        )}%)`,
        `Total (${
          Number(currentGrossData[3].ratio.toFixed(1)) +
          Number(currentGrossData[2].ratio.toFixed(1)) +
          Number(currentGrossData[1].ratio.toFixed(1)) +
          Number(currentGrossData[0].ratio.toFixed(1))
        }%)`,
      ];

      this.backSourceSectorList = backSourceSectorList;

      let set10a = JSON.parse(this.responseSetData.set10a);
      // console.log(set10a);

      let tempSet10a = [];
      let sumTemp = 0;
      for (const item in set10a) {
        tempSet10a.push({
          name: item,
          value: set10a[item].value,
        });
      }

      tempSet10a = tempSet10a.filter((x) => x.value != undefined);

      tempSet10a = tempSet10a.sort((a, b) => b.value - a.value);

      tempSet10a = tempSet10a.slice(0, 4);
      for (const item in tempSet10a) {
        tempSet10a[item].value = Number(tempSet10a[item].value.toFixed(1));
        sumTemp += Number(tempSet10a[item].value);
      }

      tempSet10a.push({
        name: "Total",
        value: sumTemp.toFixed(1),
      });

      let backSourceSectorList2 = tempSet10a;

      this.backSourceSectorList2 = tempSet10a;

      countryList = newSet10.map((x) => x.country);

      Highcharts.chart("container9", {
        chart: {
          type: "column",
          height: 450,
          width: 650,
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90,
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            formatter() {
              return `${this.value}%`;
            },
          },
        },
        legend: {
          enabled: true,
          useHTML: true,
          align: "center",
          layout: "horizontal",
          alignColumns: false,
          width: 630,
          labelFormatter() {
            return `<div class='q-pr-sm q-pb-sm'>${this.name}</div>  `;
          },
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

        series: sectorList,
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
      });
    },
    chart10(set11) {
      let countryList = [];
      let newSet11 = [];
      let currentCountry = {};

      let sumAll = {};
      let sumValue = 0;

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set11) {
        let countryName = this.countryOptions.filter((x) => x.iso == coun)[0]
          .label;

        let sumRatio = 0;

        sumValue += set11[coun].total;

        for (const area in set11[coun]) {
          if (area != "total" && area != "country") {
            sumRatio += Number(set11[coun][area].ratio) || 0;

            sumAll[area] = sumAll[area] || 0;

            sumAll[area] += set11[coun][area].value;
          }
        }

        set11[coun].newTotal = sumRatio;

        if (coun == this.exp_country) {
          currentCountry = set11[coun];
        }
        if (countryName == "Rest of the Latin American Countries") {
          countryName = "Rest of the LAC";
        }
        set11[coun].country = countryName;

        newSet11.push(set11[coun]);
      }

      newSet11.sort((a, b) => Number(b.newTotal) - Number(a.newTotal));

      newSet11.splice(
        newSet11.map((x) => x.country).indexOf(currentCountry.country),
        1
      );

      newSet11.unshift(currentCountry);

      let forSourceRegionList = [
        `Asia-Pacific (${currentCountry.asiaPacific.ratio.toFixed(1)}%)`,
        `Europe (${currentCountry.europe.ratio.toFixed(1)}%)`,
        `North America (${currentCountry.northAmerica.ratio.toFixed(1)}%)`,
        `Latin America (${currentCountry.latinAmerica.ratio.toFixed(1)}%)`,
        `Rest of the world (${currentCountry.row.ratio.toFixed(1)}%)`,
      ];

      this.forSourceRegionList = forSourceRegionList;

      let temp11a = JSON.parse(this.responseSetData.set11a);

      let forSourceRegionList2 = [
        `Asia-Pacific (${temp11a.asiaPacific.toFixed(1)}%)`,
        `Europe (${temp11a.europe.toFixed(1)}%)`,
        `North America (${temp11a.northAmerica.toFixed(1)}%)`,
        `Latin America (${temp11a.latinAmerica.toFixed(1)}%)`,
        `Rest of the world (${temp11a.row.toFixed(1)}%)`,
      ];

      this.forSourceRegionList2 = forSourceRegionList2;

      countryList = newSet11.map((x) => x.country);

      let asiaPacifics = [];
      let europes = [];
      let northAmericas = [];
      let latinAmericas = [];
      let rows = [];

      asiaPacifics = newSet11.map((x) => x.asiaPacific.ratio);
      europes = newSet11.map((x) => x.europe.ratio);
      northAmericas = newSet11.map((x) => x.northAmerica.ratio);
      latinAmericas = newSet11.map((x) => x.latinAmerica.ratio);
      rows = newSet11.map((x) => x.row.ratio);

      Highcharts.chart("container10", {
        chart: {
          type: "column",
          height: 450,
          width: 650,
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90,
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            formatter() {
              return `${this.value}%`;
            },
          },
        },
        legend: {
          enabled: true,
          useHTML: true,
          align: "center",
          layout: "horizontal",
          alignColumns: false,
          width: 630,
          labelFormatter() {
            return `<div class='q-pr-sm q-pb-sm'>${this.name}</div>  `;
          },
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
            name: "Asia-Pacific",
            data: asiaPacifics,
            color: "#4080B3",
          },
          {
            name: "Europe",
            data: europes,
            color: "#D83964",
          },
          {
            name: "North America",
            data: northAmericas,
            color: "#EB9B38",
          },
          {
            name: "Latin America",
            data: latinAmericas,
            color: "#4E9487",
          },
          {
            name: "Rest of the world",
            data: rows,
            color: "#9034AD",
          },
        ],
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
      });
    },
    chart11(set12) {
      let colors = [
        "#4F958B",
        "#8E33AB",
        "#822D3C",
        "#ED9D39",
        "#E05241",
        "#B32E5B",
        "#616FBB",
        "#4152B2",
        "#3C4BA5",
        "#2F65BA",
        "#1A2578",
        "#5EA6EF",
        "#4288E0",
        "#2E64BA",
      ];

      let countryList = [];
      let newSet12 = [];
      let currentCountry = {};

      let sumValue = 0;

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set12) {
        let countryName = this.countryOptions.filter((x) => x.iso == coun)[0]
          .label;

        let sumTotal = 0;
        let sumTotalValue = 0;

        if (coun == this.exp_country) {
          currentCountry = set12[coun];
        }

        for (const sector in set12[coun]) {
          if (sector != "country") {
            sumTotal += Number(set12[coun][sector].ratio);

            sumTotalValue += Number(set12[coun][sector].value);

            sumValue += Number(set12[coun][sector].value);
          }
        }

        set12[coun].total = sumTotal;

        set12[coun].totalValue = sumTotalValue;
        if (countryName == "Rest of the Latin American Countries") {
          countryName = "Rest of the LAC";
        }
        set12[coun].country = countryName;

        newSet12.push(set12[coun]);
      }

      newSet12.sort((a, b) => Number(b.total) - Number(a.total));

      newSet12.splice(
        newSet12.map((x) => x.country).indexOf(currentCountry.country),
        1
      );

      newSet12.unshift(currentCountry);

      let sectorList = [];

      newSet12.forEach((x) => {
        let i = 0;

        for (const sector in x) {
          if (
            sector != "country" &&
            sector != "total" &&
            sector != "totalValue"
          ) {
            let newData = {
              name: sector,
              data: [],
              color: colors[i],
              value2: 0,
            };

            sectorList[i] = sectorList[i] || newData;

            sectorList[i].data.push(x[sector].ratio);

            sectorList[i].value2 += x[sector].value;

            i++;
          }
        }
      });

      let i = 0;

      let currentGrossData = [];

      for (const sector in currentCountry) {
        if (
          sector != "country" &&
          sector != "total" &&
          sector != "totalValue"
        ) {
          let newData = {
            name: sector,
            ratio: 0,
            value: 0,
          };

          currentGrossData[i] = currentGrossData[i] || newData;

          currentGrossData[i].ratio = currentCountry[sector].ratio;

          currentGrossData[i].value = currentCountry[sector].value;

          i++;
        }
      }

      currentGrossData.sort((a, b) => b.ratio - a.ratio);

      let regionGrossData = [...sectorList];

      regionGrossData = regionGrossData
        .map((x) => {
          let newData = {
            ratio: x.data.reduce((a, b) => a + b, 0),
            name: x.name,
            value: (x.value2 / sumValue) * 100,
          };

          return newData;
        })
        .sort((a, b) => Number(b.value) - Number(a.value));

      let forSourceSectorList = [
        `${currentGrossData[0].name} (${currentGrossData[0].ratio.toFixed(
          1
        )}%)`,
        `${currentGrossData[1].name} (${currentGrossData[1].ratio.toFixed(
          1
        )}%)`,
        `${currentGrossData[2].name} (${currentGrossData[2].ratio.toFixed(
          1
        )}%)`,
        `${currentGrossData[3].name} (${currentGrossData[3].ratio.toFixed(
          1
        )}%)`,
      ];

      this.forSourceSectorList = forSourceSectorList;

      let set12a = JSON.parse(this.responseSetData.set12a);

      let temp12a = [];
      for (const item in set12a) {
        temp12a.push({
          name: item,
          value: set12a[item].value,
        });
      }

      temp12a = temp12a.filter((x) => x.value != undefined);

      temp12a = temp12a.sort((a, b) => b.value - a.value);

      temp12a = temp12a.slice(0, 4);

      let forSourceSectorList2 = temp12a;
      for (const item in forSourceSectorList2) {
        forSourceSectorList2[item].value = Number(
          forSourceSectorList2[item].value
        ).toFixed(1);
      }

      this.forSourceSectorList2 = forSourceSectorList2;

      countryList = newSet12.map((x) => x.country);

      Highcharts.chart("container11", {
        chart: {
          type: "column",
          height: 450,
          width: 650,
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90,
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            formatter() {
              return `${this.value}%`;
            },
          },
        },
        legend: {
          enabled: true,
          useHTML: true,
          align: "center",
          layout: "horizontal",
          alignColumns: false,
          width: 630,
          labelFormatter() {
            return `<div class='q-pr-sm q-pb-sm'>${this.name}</div>  `;
          },
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

        series: sectorList,
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
      });
    },
    copyLink() {
      var range = document.createRange();
      range.selectNode(document.getElementById("shareLink"));
      window.getSelection().removeAllRanges(); // clear current selection
      window.getSelection().addRange(range); // to select text
      document.execCommand("copy");
      window.getSelection().removeAllRanges(); // to deselect
    },
    async loadData() {
      this.exp_country = this.$q.sessionStorage.getItem("expe");
      this.year = this.$q.sessionStorage.getItem("year");

      let countryData = this.countryOptions.filter(
        (x) => x.iso == this.exp_country
      )[0];

      this.country = countryData.label;
      this.region = countryData.region2;
      this.fullRegion = countryData.region;
      // console.log(this.exp_country, this.year);
      if (this.exp_country && this.year) {
        let link =
          "riva.negotiatetrade.org/#/countrybriefs/data" +
          "/" +
          this.exp_country +
          "/" +
          this.year;
        this.$q.sessionStorage.set("shareLink", link);
        this.loadingShow();

        let urllink =
          this.path_api +
          `/get_country_brief.php?exp_country=${this.exp_country}&year=${this.year}`;

        let getData = await Axios.get(urllink);

        this.responseSetData = getData.data[0];

        if (getData.data) {
          this.loadingHide();

          this.renderChart(getData.data[0]);

          setTimeout(() => {
            this.isPrint = true;
          }, 1500);
        }
      }
    },
  },
  async mounted() {
    if (this.$route.params.exp_country && this.$route.params.year) {
      this.$q.sessionStorage.set("expe", this.$route.params.exp_country);
      this.$q.sessionStorage.set("year", this.$route.params.year);
    }
    await this.getCountryList();
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.bg-bar {
  background-image: linear-gradient(to right, #6e6b6b, #a5a1a1);
}

.break {
  break-after: page;
}

.set-p-right {
  padding-right: 0px;
}

@media print {
  body {
    background-color: #fff;
  }

  .set-p-right {
    padding-right: 20px;
  }

  #printSection {
    display: none;
  }

  @page {
    margin: 0mm;
  }
}
</style>
