<template>
  <q-page class="bg-white q-pb-md" style="width:209mm;">
    <div class="q-pa-md" id="printSection" align="right">
      <q-btn no-caps text-color="white" style="background-color:#2C2F30;">
        <div>
          <q-icon class="q-mr-sm" name="fas fa-print" size="14px"></q-icon>
          <span>print</span>
        </div>
      </q-btn>
      <q-btn
        class="q-mx-md"
        no-caps
        text-color="white"
        style="background-color:#2C2F30;"
      >
        <div>
          <q-icon class="q-mr-sm" name="fas fa-upload" size="14px"></q-icon>
          <span>PDF</span>
        </div>
      </q-btn>
      <q-btn no-caps text-color="white" style="background-color:#2C2F30;">
        <div>
          <q-icon class="q-mr-sm" name="fas fa-share-alt" size="14px"></q-icon>
          <span>Share</span>
        </div>
      </q-btn>
    </div>

    <div align="center" class="q-pa-md text-white bg-bar">
      <span style="font-size:26px;"
        >RIVA Global Value Chain Country Briefs:<br />
        Thailand, {{ year }}</span
      >
    </div>

    <!-- Structure of value-added in gross exports1-5 ^ (link to relevant page
        on RIVA) -->
    <div
      class="q-py-sm text-bold bg-bar"
      style="width:900px;margin: 30px auto 10px auto;font-size:20px;border-radius:5px;"
      align="center"
    >
      <span
        >Structure of value-added in gross exports1-5 ^ (link to relevant page
        on RIVA)</span
      >
    </div>

    <div class="q-mt-sm row  justify-center">
      <div class="col-4 q-pa-xs" align="center">
        <div align="center" class="q-px-md " style="height:80px;">
          <span class="text-h6 text-bold"
            >Structure of value-added in SEA <br />
            exports to world</span
          >
        </div>
        <div align="right" class="q-px-lg">
          <i style="font-size:16px;">($US, % of gross exports)</i>
        </div>
        <div id="container1"></div>
      </div>
      <div class="col-4 q-pa-xs" align="center">
        <div align="center" class="q-px-md " style="height:80px;">
          <span class="text-h6 text-bold"
            >Structure of value-added in Thailand’s <br />
            exports to world
          </span>
        </div>
        <div align="right" class="q-px-lg">
          <i style="font-size:16px;">($US, % of gross exports)</i>
        </div>
        <div id="container2"></div>
      </div>
      <div class="col-4 q-pa-xs" align="center">
        <div align="center" class="q-px-md " style="height:80px;">
          <span class="text-h6 text-bold"
            >Structure of value-added in global exports
          </span>
        </div>
        <div align="right" class="q-px-lg">
          <i style="font-size:16px;">($US, % of gross exports)</i>
        </div>
        <div id="container3"></div>
      </div>
    </div>

    <!-- Value-added and gross trade balance ^ (link to relevant page on
        RIVA) -->
    <div
      class="q-py-sm text-bold bg-bar"
      style="width:1000px;margin: 0px auto 20px auto;font-size:22px;border-radius:5px;"
      align="center"
    >
      <span
        >Value-added and gross trade balance ^ (link to relevant page on
        RIVA)</span
      >
    </div>

    <div class="q-px-xl">
      <div class="row justify-center ">
        <div class="col  q-pa-xs" :class="{ 'bg-red': year == '2007' }">
          <div class="q-pl-xl" v-if="year != '2007'">
            <div
              class="row q-mt-sm"
              style="font-size:18px;"
              v-for="(item, index) in contentYellowList"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5" style="width:500px;">
          <div align="center" class="q-pa-xs">
            <span class="text-h6 text-bold"
              >Gross and value-added trade balance with the world</span
            >
          </div>
          <div align="right" class="q-px-md">
            <i style="font-size:16px;">(% of gross exports)</i>
          </div>
          <div id="container4"></div>
        </div>
      </div>
    </div>

    <!-- Key global value chain relationships6-7 ^ (link to relevant page on
        RIVA) -->
    <div
      class="q-py-sm text-bold bg-bar"
      style="width:1000px;margin: 0px auto 10px auto;font-size:22px;border-radius:5px;"
      align="center"
    >
      <span
        >Key global value chain relationships6-7 ^ (link to relevant page on
        RIVA)</span
      >
    </div>

    <div class="q-mt-sm">
      <div class="row ">
        <div class="col-6 q-pa-sm">
          <div align="center" class="q-px-md">
            <span style="font-size:18px;" class="text-bold">
              Top 10 partner economies that {{ country }} relies on for backward
              and forward linkages
            </span>
          </div>
          <div align="right" class="q-px-md" style="margin-top:-15px;">
            <i style="font-size:16px;">(% of gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container5" style="border:1px solid grey"></div>
          </div>
        </div>
        <div class="col-6 q-pa-sm">
          <div align="center" class="q-px-md">
            <span style="font-size:18px;" class="text-bold">
              Top 10 exporting sectors in {{ country }} that rely on backward
              and forward linkages
            </span>
          </div>
          <div align="right" class="q-px-md" style="margin-top:-15px;">
            <i style="font-size:16px;">(% of gross exports)</i>
          </div>
          <div class="q-pr-md">
            <div id="container6" style="border:1px solid grey"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="break"></div>

    <!-- Comparing Thailand to its sub-regional partners -->
    <div
      class="q-py-sm text-bold bg-bar"
      style="width:1000px;margin: 20px auto;font-size:22px;border-radius:5px;"
      align="center"
    >
      <span>Comparing {{ country }} to its sub-regional partners</span>
    </div>

    <div class="q-mt-md">
      <div class="row">
        <div class="col  q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Participation in GVCs ^ (link to relevant page on RIVA)
            </span>
          </div>
          <div align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;"
              >GVC related trade share for {{ gvcShare.country }}:
              {{ gvcShare.ratio.toFixed(0) }}% of gross exports</span
            >
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in gvcRelianceList"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">
              GVC related trade
            </span>
          </div>
          <div align="right" class="q-px-md">
            <i style="font-size:16px;">(% of gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container7"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Backward Linkages -->
    <div class="q-mt-md">
      <div class="row">
        <div class="col  q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Backward linkages6 (by source region) ^ (link to relevant page on
              RIVA)
            </span>
          </div>
          <div align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;"
              >{{ country }}(% of gross exports):</span
            >
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in backSourceRegionList"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>

          <div class="q-mt-md" align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;"
              >SEA (% of gross exports):</span
            >
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in backSourceRegionList2"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">
              Backward linkages, by source region
            </span>
          </div>
          <div align="right" class="q-px-md">
            <i style="font-size:16px;">(% of gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container8"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-mt-md">
      <div class="row">
        <div class="col  q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Backward linkages6 (by exporting sector8) ^ (link to relevant page
              on RIVA)
            </span>
          </div>
          <div align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;"
              >{{ country }}(% of gross exports):</span
            >
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in backSourceSectorList"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>

          <div class="q-mt-md" align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;"
              >SEA (% of gross exports):</span
            >
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in backSourceSectorList2"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">
              Backward linkages, by exporting sector
            </span>
          </div>
          <div align="right" class="q-px-md">
            <i style="font-size:16px;">(% of gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container9"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="break"></div>

    <!-- Forward Linkages -->
    <div class="q-mt-md">
      <div class="row">
        <div class="col  q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Forward linkages7 (by importing region) ^ (link to relevant page
              on RIVA)
            </span>
          </div>
          <div align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;"
              >{{ country }}(% of gross exports):</span
            >
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in forSourceRegionList"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>

          <div class="q-mt-md" align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;"
              >SEA (% of gross exports):</span
            >
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in forSourceRegionList2"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">
              Forward linkages, by importing region
            </span>
          </div>
          <div align="right" class="q-px-md">
            <i style="font-size:16px;">(% of gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container10"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-mt-md">
      <div class="row">
        <div class="col  q-pl-xl">
          <div align="left">
            <span style="font-size:18px;" class="text-bold text-grey-7">
              Forward linkages7 (by exporting sector8) ^ (link to relevant page
              on RIVA)
            </span>
          </div>
          <div align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;"
              >{{ country }}(% of gross exports):</span
            >
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in forSourceSectorList"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>

          <div class="q-mt-md" align="left" v-if="gvcShare">
            <span class="text-bold" style="font-size:18px;"
              >SEA (% of gross exports):</span
            >
          </div>
          <div>
            <div
              class="row q-mt-xs"
              style="font-size:18px;"
              v-for="(item, index) in forSourceSectorList2"
              :key="index"
            >
              <div
                class="col-1 relative-position self-start "
                style="width:30px;padding-top:7px;"
              >
                <div
                  style="border:1px solid black;border-radius:50%;width:10px;height:10px;"
                ></div>
              </div>
              <div class="col self-start">
                <span v-html="item"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div align="center">
            <span style="font-size:18px;" class="text-bold">
              Forward linkages, by exporting sector
            </span>
          </div>
          <div align="right" class="q-px-md">
            <i style="font-size:16px;">(% of gross exports)</i>
          </div>
          <div class="q-pl-md">
            <div id="container11"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="break"></div>

    <!-- Notes: -->
    <div class="q-pa-md " style="width:80%;margin: 20px auto">
      <div>
        <div>
          <span class="text-bold text-h5">Notes:</span>
        </div>
        <div style="font-size:20px;">
          <div>
            <ul>
              <li style="list-style:decimal">
                Used in consumption: Share of domestic value-added in gross
                exports that is consumed in the importing economy.
              </li>
              <li style="list-style:decimal">
                Used in export production: Share of domestic value-added in
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
              <li style="list-style:decimal">
                Backward linkages: same as ‘Imported content’.
              </li>
              <li style="list-style:decimal">
                Forward linkages: same as ‘Used in export production’.
              </li>
              <li style="list-style:decimal">
                Sectors are grouped based on ADB ERDI classification.
              </li>
            </ul>
          </div>
          <div>
            <span class="text-bold text-h5">Abbreviations and acronyms:</span>
          </div>
          <div class="q-mt-md">
            <span>GVC: global value chain</span>
          </div>
          <div>
            <span>SEA: South-East Asia</span>
          </div>
          <div class="q-my-md">
            <span class="text-bold text-h5">Disclaimer:</span>
          </div>
          <div>
            <span>
              RIVA gratefully acknowledges use of data from the ADB MRIO
              database (currently covering 2007, 2011 and 2017) to analyse
              global value chains.
            </span>
          </div>

          <div class="q-mt-md">
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
  </q-page>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      exp_country: "",
      country: "",
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
      forSourceSectorList2: []
    };
  },
  methods: {
    async renderChart(data) {
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
          width: 350,
          height: 400
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        legend: {
          margin: 0,
          padding: 10,
          alignColumns: true
        },

        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.percentage:.1f}</b> %",
              distance: -50,
              color: "black"
            },
            showInLegend: true,
            borderWidth: 1,
            size: 200
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "imported content",
                y: set1.importedContent.ratio,
                total: set1.importedContent.total,
                color: "#FFC000"
              },
              {
                name: "double counted",
                y: set1.doubleCounted.ratio,
                total: set1.doubleCounted.total,
                color: "#D83964"
              },
              {
                name: "used in export production",
                y: set1.usedInExportProduction.ratio,
                total: set1.usedInExportProduction.total,
                color: "#ED7D31"
              },
              {
                name: "used in domestic consumption",
                y: set1.usedInDomesticConsumption.ratio,
                total: set1.usedInDomesticConsumption.total,
                color: "#997300"
              },
              {
                name: "used in consumption",
                y: set1.directlyConsumed.ratio,
                total: set1.directlyConsumed.total,
                color: "#70AD47"
              }
            ]
          }
        ],
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });
    },
    chart2(set2) {
      Highcharts.chart("container2", {
        chart: {
          type: "pie",
          width: 350,
          height: 400
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },

        legend: {
          margin: 0,
          padding: 10,
          alignColumns: true
        },

        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.percentage:.1f}</b> %",
              distance: -50
            },
            showInLegend: true,
            borderWidth: 1,
            size: 200
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "imported content",
                y: set2.importedContent.ratio,
                total: set2.importedContent.total,
                color: "#FFC000"
              },
              {
                name: "double counted",
                y: set2.doubleCounted.ratio,
                total: set2.doubleCounted.total,
                color: "#D83964"
              },
              {
                name: "used in export production",
                y: set2.usedInExportProduction.ratio,
                total: set2.usedInExportProduction.total,
                color: "#ED7D31"
              },
              {
                name: "used in domestic consumption",
                y: set2.usedInDomesticConsumption.ratio,
                total: set2.usedInDomesticConsumption.total,
                color: "#997300"
              },
              {
                name: "used in consumption",
                y: set2.directlyConsumed.ratio,
                total: set2.directlyConsumed.total,
                color: "#70AD47"
              }
            ]
          }
        ],
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });
    },
    chart3(set3) {
      Highcharts.chart("container3", {
        chart: {
          type: "pie",
          borderRadius: 5,
          width: 350,
          height: 400
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },

        legend: {
          margin: 0,
          padding: 10,
          alignColumns: true
        },

        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.percentage:.1f}</b> %",
              distance: -50
            },
            showInLegend: true,
            borderWidth: 1,
            size: 200
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "imported content",
                y: set3.importedContent.ratio,
                total: set3.importedContent.total,
                color: "#FFC000"
              },
              {
                name: "double counted",
                y: set3.doubleCounted.ratio,
                total: set3.doubleCounted.total,
                color: "#D83964"
              },
              {
                name: "used in export production",
                y: set3.usedInExportProduction.ratio,
                total: set3.usedInExportProduction.total,
                color: "#ED7D31"
              },
              {
                name: "used in domestic consumption",
                y: set3.usedInDomesticConsumption.ratio,
                total: set3.usedInDomesticConsumption.total,
                color: "#997300"
              },
              {
                name: "used in consumption",
                y: set3.directlyConsumed.ratio,
                total: set3.directlyConsumed.total,
                color: "#70AD47"
              }
            ]
          }
        ],
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });
    },
    chart4(set4, set5) {
      let dataSet4 = set4.valueAddTradeBalance;
      let dataSet5 = set5.grossTradeBalance;
      let year = this.$q.sessionStorage.getItem("year");

      let contentYellowList = [
        `Gross trade <span class='text-yellow'>${
          dataSet5.current > 0 ? "surplus" : "deficit"
        }</span> with the world in <span class='text-yellow'>${year}</span>, which has <span class='text-yellow'>${
          dataSet5.current > dataSet5[2007] ? "increased" : "decreased"
        }</span> since 2007.`,

        `Value-added trade <span class='text-yellow'>${
          dataSet4.current > 0 ? "surplus" : "deficit"
        }</span> with the world on <span class='text-yellow'>${year}</span>, which has <span class='text-yellow'>${
          dataSet4.current > dataSet4[2007] ? "increased" : "decreased"
        }</span> since 2007.`,

        `Gross trade balance <span class='text-yellow'>${
          dataSet5.current > dataSet4.current ? "greater" : "lesser"
        }</span> than value-added trade balance in ${year}, indicating <span class='text-yellow'>${
          dataSet5.current > dataSet4.current ? "high" : "low"
        }</span> imported content embodied in exports`,

        `Between 2007 and <span class='text-yellow'>${year}</span>. gross trade balance has improved <span class='text-yellow'>${
          dataSet5.current -
            dataSet5[2007] -
            (dataSet4.current - dataSet4[2007]) >
          0
            ? "more"
            : "less"
        }</span> than value added trade balance, indicating <span class='text-yellow'>${
          dataSet5.current -
            dataSet5[2007] -
            (dataSet4.current - dataSet4[2007]) >
          0
            ? "increasing"
            : "decreasing"
        }</span> use of imported content.`
      ];

      let setData = [];

      if (year == "2007") {
        setData = [
          {
            name: "2007",
            data: [set4.valueAddTradeBalance[2007]],
            color: "#4472C4"
          }
        ];
      } else {
        setData = [
          {
            name: "2007",
            data: [
              set4.valueAddTradeBalance[2007],
              set5.grossTradeBalance[2007]
            ],
            color: "#4472C4"
          },
          {
            name: year,
            data: [
              set4.valueAddTradeBalance.current,
              set5.grossTradeBalance.current
            ],
            color: "#ED7D31"
          }
        ];
      }

      this.contentYellowList = contentYellowList;

      Highcharts.chart("container4", {
        chart: {
          type: "column",
          width: 450,
          height: 300
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },

        xAxis: {
          type: "category",
          categories: ["Value add Trade Balance", "Gross trade Balance"]
        },
        yAxis: {
          labels: {
            formatter() {
              return `${this.value}%`;
            }
          },
          title: {
            text: ""
          }
        },
        legend: {
          enabled: true
        },
        plotOptions: {
          column: {
            // stacking: "normal",
            dataLabels: {
              enabled: true,
              color: "black",
              inside: true
            }
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: setData,
        exporting: {
          enabled: false
        },
        credits: {
          enabled: false
        }
      });
    },
    chart5(set6) {
      let setCategories = [];

      let newSetBackward = set6.backward.map(x => {
        let realName = this.countryOptions.filter(xx => xx.iso == x.country)[0]
          .label;

        let newData = {
          ...x,
          y: Number("-" + x.precent),
          country: realName
        };

        setCategories.push("");

        return newData;
      });

      newSetBackward.sort((a, b) => Number(b.precent) - Number(a.precent));

      let newSetForward = set6.forward.map(x => {
        let realName = this.countryOptions.filter(xx => xx.iso == x.country)[0]
          .label;

        let newData = {
          ...x,
          y: x.precent,
          country: realName
        };

        return newData;
      });

      newSetForward.sort((a, b) => Number(b.precent) - Number(a.precent));

      Highcharts.chart("container5", {
        chart: {
          type: "bar",
          height: 370
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        accessibility: {
          point: {
            valueDescriptionFormat: "{index}. Age {xDescription}, {value}%."
          }
        },
        xAxis: [
          {
            categories: setCategories,
            lineWidth: 0,
            borderWidth: 0,
            opposite: true,
            reversed: false,
            labels: {
              step: 1
            }
          }
        ],
        yAxis: {
          borderWidth: 0,
          gridLineWidth: 0,
          lineWidth: 0,
          title: {
            text: null
          },
          labels: {
            formatter: function() {
              return Math.abs(this.value);
            }
          },
          accessibility: {
            description: "Percentage population",
            rangeDescription: "Range: 0 to 5%"
          }
        },

        plotOptions: {
          bar: {
            groupPadding: 0,
            grouping: false,
            centerInCategory: true,
            dataLabels: {
              enabled: true,
              formatter() {
                return `${this.point.country}, ${this.point.precent}%`;
              }
            }
          }
        },

        tooltip: {
          formatter: function() {
            return (
              "<b>" +
              this.series.name +
              ", age " +
              this.point.category +
              "</b><br/>" +
              "Population: " +
              Highcharts.numberFormat(Math.abs(this.point.y), 1) +
              "%"
            );
          }
        },

        series: [
          {
            name: "Backward linkages (%)",
            data: newSetBackward,
            color: "#4472C4"
          },
          {
            name: "Forward linkages (%)",
            data: newSetForward,
            color: "#ED7D31"
          }
        ],

        exporting: {
          enabled: false
        },
        credits: {
          enabled: false
        }
      });
    },
    chart6(set7) {
      let setCategories = [];

      let newSetBackward = set7.backward.map(x => {
        let newData = {
          ...x,
          y: Number("-" + x.precent)
        };

        return newData;
      });

      newSetBackward.sort((a, b) => Number(b.precent) - Number(a.precent));

      let newSetForward = set7.forward.map(x => {
        let newData = {
          ...x,
          y: x.precent
        };

        setCategories.push("");

        return newData;
      });

      newSetForward.sort((a, b) => Number(b.precent) - Number(a.precent));

      let setMaxValue =
        newSetBackward[newSetBackward.length - 1].precent >
        newSetForward[newSetForward.length - 1].precent
          ? newSetBackward[newSetBackward.length - 1].precent
          : newSetForward[newSetForward.length - 1].precent;

      Highcharts.chart("container6", {
        chart: {
          type: "bar",
          width: null,
          height: 370
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        accessibility: {
          point: {
            valueDescriptionFormat: "{index}. Age {xDescription}, {value}%."
          }
        },
        xAxis: [
          {
            categories: setCategories,
            lineWidth: 0,
            borderWidth: 0,
            opposite: true,
            reversed: false,
            labels: {
              step: 1
            }
          }
        ],
        yAxis: {
          borderWidth: 0,
          gridLineWidth: 0,
          lineWidth: 0,
          title: {
            text: null
          },
          accessibility: {
            description: "Percentage population",
            rangeDescription: "Range: 0 to 5%"
          }
        },

        plotOptions: {
          bar: {
            groupPadding: 0,
            grouping: false,
            dataLabels: {
              enabled: true,
              formatter() {
                return `${this.point.sector}, ${this.point.precent}%`;
              }
            }
          }
        },

        tooltip: {
          formatter: function() {
            return (
              "<b>" +
              this.series.name +
              ", age " +
              this.point.category +
              "</b><br/>" +
              "Population: " +
              Highcharts.numberFormat(Math.abs(this.point.y), 1) +
              "%"
            );
          }
        },

        series: [
          {
            name: "Backward linkages (%)",
            data: newSetBackward,
            color: "#4472C4"
          },
          {
            name: "Forward linkages (%)",
            data: newSetForward,
            color: "#ED7D31"
          }
        ],

        exporting: {
          enabled: false
        },
        credits: {
          enabled: false
        }
      });
    },
    chart7(set8) {
      let countryList = [];
      let areaList = [];
      let regionList = [];

      let newSet8 = [];
      let currentCountry = {};

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set8) {
        let countryName = this.countryOptions.filter(x => x.iso == coun)[0]
          .label;

        if (coun == this.exp_country) {
          currentCountry = set8[coun];
        }

        set8[coun].country = countryName;
        set8[coun].total = set8[coun].sum.total;
        set8[coun].ratio = set8[coun].sum.ratio;

        newSet8.push(set8[coun]);

        areaList.push(set8[coun].area);
        regionList.push(set8[coun].region);
      }

      // ประเทศที่เลือกไว้และเอาไปทำประเทศแรกของกราฟ
      this.gvcShare = currentCountry;

      // เก็บประเถทของ Region
      regionList = [...new Set(regionList)];

      // เก็บประเถทของ Area
      areaList = [...new Set(areaList)];

      let lowerRegionData = [];
      let highRegionData = [];

      regionList.forEach(x => {
        let lowerList = [];
        let highList = [];

        let tempRegion = newSet8
          .filter(xx => xx.region == x)
          .map(xx => {
            let newData = {
              ratio: xx.ratio,
              region: xx.region,
              country: xx.country
            };
            return newData;
          });

        // หาค่าต่ำสุดของ Area
        lowerList = tempRegion.filter(
          xx => xx.ratio == Math.min(...tempRegion.map(xx => xx.ratio))
        )[0];

        // หาค่าสูงสุดของ Area
        highList = tempRegion.filter(
          xx => xx.ratio == Math.max(...tempRegion.map(xx => xx.ratio))
        )[0];

        // เก็บค่าต่ำสุดของแต่ละ Area
        lowerRegionData.push(lowerList);

        // เก็บค่าสูงสุดของแต่ละ Area
        highRegionData.push(highList);
      });

      // หาค่าต่ำที่สุดของทุก Area
      lowerRegionData = lowerRegionData.filter(
        xx => xx.ratio == Math.min(...lowerRegionData.map(xx => xx.ratio))
      )[0];

      // หาค่าสูงที่สุดของทุก Area
      highRegionData = highRegionData.filter(
        xx => xx.ratio == Math.max(...highRegionData.map(xx => xx.ratio))
      )[0];

      let lowerAreaData = [];
      let highAreaData = [];

      // หา Area ของแต่ละประเทศ แล้วทำการแยก ของเป็นแต่ละ Area เพื่อหาค่าต่ำสุดและสูงสุด ของ Area นั้นๆ
      areaList.forEach(x => {
        let lowerList = [];
        let highList = [];

        let tempArea = newSet8
          .filter(xx => xx.area == x)
          .map(xx => {
            let newData = {
              ratio: xx.ratio,
              area: xx.area,
              country: xx.country
            };
            return newData;
          });

        // หาค่าต่ำสุดของ Area
        lowerList = tempArea.filter(
          xx => xx.ratio == Math.min(...tempArea.map(xx => xx.ratio))
        )[0];

        // หาค่าสูงสุดของ Area
        highList = tempArea.filter(
          xx => xx.ratio == Math.max(...tempArea.map(xx => xx.ratio))
        )[0];

        // เก็บค่าต่ำสุดของแต่ละ Area
        lowerAreaData.push(lowerList);

        // เก็บค่าสูงสุดของแต่ละ Area
        highAreaData.push(highList);
      });

      // หาค่าต่ำที่สุดของทุก Area
      lowerAreaData = lowerAreaData.filter(
        xx => xx.ratio == Math.min(...lowerAreaData.map(xx => xx.ratio))
      )[0];

      // หาค่าสูงที่สุดของทุก Area
      highAreaData = highAreaData.filter(
        xx => xx.ratio == Math.max(...highAreaData.map(xx => xx.ratio))
      )[0];

      newSet8.sort((a, b) => Number(b.ratio) - Number(a.ratio));

      newSet8.splice(
        newSet8.map(x => x.country).indexOf(currentCountry.country),
        1
      );

      newSet8.unshift(currentCountry);

      let gvcReliance = [
        `${currentCountry.country} is ranked 3rd for GVC reliance in exports in SEA`,
        `Lowest GVC reliance in exports :
        <br> SEA: Viet Nam PDR (10.2%)
        <br> ${lowerAreaData.area}: ${lowerAreaData.country} (${
          lowerAreaData.ratio
        }%)
        <br> World: ${newSet8[newSet8.length - 1].country} (${newSet8[
          newSet8.length - 1
        ].ratio.toFixed(1)}%)`,
        `Highest GVC reliance in exports:
        <br> ${newSet8[1].region}: ${
          newSet8[1].country
        } (${newSet8[1].ratio.toFixed(1)}%)
        <br> Asia-Pacific: Malaysia (72%)
        <br> World: Germanyx (74%)`
      ];

      this.gvcRelianceList = gvcReliance;

      countryList = newSet8.map(x => x.country);

      let usedInExportRatio = [];
      let importedContentRatio = [];
      let doubleCountedRatio = [];

      usedInExportRatio = newSet8.map(x => x.usedInExportProduction.ratio);
      importedContentRatio = newSet8.map(x => x.importedContent.ratio);
      doubleCountedRatio = newSet8.map(x => x.doubleCounted.ratio);

      Highcharts.chart("container7", {
        chart: {
          type: "column",
          height: 350
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90
          }
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          alignColumns: false,
          width: 100
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
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
            name: "Used in China's export production",
            data: usedInExportRatio,
            color: "#4080B3"
          },
          {
            name: "Imported content (backward linkages)",
            data: importedContentRatio,
            color: "#D83964"
          },
          {
            name: "Double counted exports from repeated border crossings",
            data: doubleCountedRatio,
            color: "#EB9B38"
          }
        ],
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });
    },
    chart8(set9) {
      console.clear();

      let countryList = [];
      let newSet9 = [];
      let currentCountry = {};

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set9) {
        let countryName = this.countryOptions.filter(x => x.iso == coun)[0]
          .label;

        if (coun == this.exp_country) {
          currentCountry = set9[coun];
        }

        set9[coun].country = countryName;

        newSet9.push(set9[coun]);
      }

      newSet9.sort((a, b) => Number(b.total) - Number(a.total));

      newSet9.splice(
        newSet9.map(x => x.country).indexOf(currentCountry.country),
        1
      );

      newSet9.unshift(currentCountry);

      let backSourceRegionList = [
        `Asia-Pacific (a%)`,
        `Europe (b%)`,
        `North America (c%)`,
        `Latin America (d%)`,
        `Rest of the world (e%)`
      ];

      this.backSourceRegionList = backSourceRegionList;

      let backSourceRegionList2 = [
        `Asia-Pacific (p%)`,
        `Europe (q%)`,
        `North America (r%)`,
        `Latin America (s%)`,
        `Rest of the world (t%)`
      ];

      this.backSourceRegionList2 = backSourceRegionList2;

      countryList = newSet9.map(x => x.country);

      let asiaPacifics = [];
      let europes = [];
      let northAmericas = [];
      let latinAmericas = [];
      let rows = [];

      asiaPacifics = newSet9.map(x => x.asiaPacific.ratio);
      europes = newSet9.map(x => x.europe.ratio);
      northAmericas = newSet9.map(x => x.northAmerica.ratio);
      latinAmericas = newSet9.map(x => x.latinAmerica.ratio);
      rows = newSet9.map(x => x.row.ratio);

      Highcharts.chart("container8", {
        chart: {
          type: "column",
          height: 350
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90
          }
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          alignColumns: false,
          width: 100
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
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
            data: asiaPacifics,
            color: "#4080B3"
          },
          {
            name: "Europe",
            data: europes,
            color: "#D83964"
          },
          {
            name: "North America",
            data: northAmericas,
            color: "#EB9B38"
          },
          {
            name: "Latin America",
            data: latinAmericas,
            color: "#4E9487"
          },
          {
            name: "Rest of the world",
            data: rows,
            color: "#9034AD"
          }
        ],
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });
    },
    chart9(set10) {
      console.clear();

      let countryList = [];
      let newSet10 = [];
      let currentCountry = {};

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set10) {
        let countryName = this.countryOptions.filter(x => x.iso == coun)[0]
          .label;

        if (coun == this.exp_country) {
          currentCountry = set10[coun];
        }

        set10[coun].country = countryName;

        newSet10.push(set10[coun]);
      }

      newSet10.sort((a, b) => (a.country > b.country ? 1 : -1));

      newSet10.splice(
        newSet10.map(x => x.country).indexOf(currentCountry.country),
        1
      );

      newSet10.unshift(currentCountry);

      let sectorList = [];

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
        "#2E64BA"
      ];

      let sectors = [
        "Agriculture",
        "Mining",
        "Construction",
        "Utilities",
        "Manufacturing-Low tech",
        "Manufacturing-High and medium tech",
        "Services-Trade and repair",
        "Services-Tourism",
        "Services-Transport",
        "Services-ICT",
        "Services-Property",
        "Services-Financail",
        "Services-Public and welfare",
        "Services-Private household"
      ];

      newSet10.forEach(x => {
        let i = 0;
        for (const sector in x) {
          if (sector != "country") {
            let newData = {
              name: sectors[i],
              data: [],
              color: colors[i]
            };

            sectorList[i] = sectorList[i] || newData;

            sectorList[i].data.push(x[sector].ratio);

            i++;
          }
        }
      });

      let backSourceSectorList = [
        `Manufacturing- high and medium tech (p%)`,
        `Manufacturing- low tech (q%)`,
        `Services- tourism (r%)`,
        `Agriculture (s%)`
      ];

      this.backSourceSectorList = backSourceSectorList;

      let backSourceSectorList2 = [
        `Manufacturing- high and medium tech (p%)`,
        `Manufacturing- low tech (q%)`,
        `Services- tourism (r%)`,
        `Agriculture (s%)`
      ];

      this.backSourceSectorList2 = backSourceSectorList2;

      countryList = newSet10.map(x => x.country);

      let asiaPacifics = [];
      let europes = [];
      let northAmericas = [];
      let latinAmericas = [];
      let rows = [];

      // asiaPacifics = newSet10.map(x => x.asiaPacific.ratio);
      // europes = newSet10.map(x => x.europe.ratio);
      // northAmericas = newSet10.map(x => x.northAmerica.ratio);
      // latinAmericas = newSet10.map(x => x.latinAmerica.ratio);
      // rows = newSet10.map(x => x.row.ratio);

      Highcharts.chart("container9", {
        chart: {
          type: "column",
          height: 350
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90
          }
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          alignColumns: false,
          width: 100
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: false
            }
          }
        },

        series: sectorList,
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });
    },
    chart10(set11) {
      console.clear();

      let countryList = [];
      let newSet11 = [];
      let currentCountry = {};

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set11) {
        let countryName = this.countryOptions.filter(x => x.iso == coun)[0]
          .label;

        if (coun == this.exp_country) {
          currentCountry = set11[coun];
        }

        set11[coun].country = countryName;

        newSet11.push(set11[coun]);
      }

      newSet11.sort((a, b) => Number(b.total) - Number(a.total));

      newSet11.splice(
        newSet11.map(x => x.country).indexOf(currentCountry.country),
        1
      );

      newSet11.unshift(currentCountry);

      let forSourceRegionList = [
        `Asia-Pacific (a%)`,
        `Europe (b%)`,
        `North America (c%)`,
        `Latin America (d%)`,
        `Rest of the world (e%)`
      ];

      this.forSourceRegionList = forSourceRegionList;

      let forSourceRegionList2 = [
        `Asia-Pacific (p%)`,
        `Europe (q%)`,
        `North America (r%)`,
        `Latin America (s%)`,
        `Rest of the world (t%)`
      ];

      this.forSourceRegionList2 = forSourceRegionList2;

      countryList = newSet11.map(x => x.country);

      let asiaPacifics = [];
      let europes = [];
      let northAmericas = [];
      let latinAmericas = [];
      let rows = [];

      asiaPacifics = newSet11.map(x => x.asiaPacific.ratio);
      europes = newSet11.map(x => x.europe.ratio);
      northAmericas = newSet11.map(x => x.northAmerica.ratio);
      latinAmericas = newSet11.map(x => x.latinAmerica.ratio);
      rows = newSet11.map(x => x.row.ratio);

      Highcharts.chart("container10", {
        chart: {
          type: "column",
          height: 350
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90
          }
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          alignColumns: false,
          width: 100
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
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
            data: asiaPacifics,
            color: "#4080B3"
          },
          {
            name: "Europe",
            data: europes,
            color: "#D83964"
          },
          {
            name: "North America",
            data: northAmericas,
            color: "#EB9B38"
          },
          {
            name: "Latin America",
            data: latinAmericas,
            color: "#4E9487"
          },
          {
            name: "Rest of the world",
            data: rows,
            color: "#9034AD"
          }
        ],
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });
    },
    chart11(set12) {
      console.clear();

      let countryList = [];
      let newSet12 = [];
      let currentCountry = {};

      // แยกแต่ละประเทศแล้วจับยัดเป็น Array
      for (const coun in set12) {
        let countryName = this.countryOptions.filter(x => x.iso == coun)[0]
          .label;

        if (coun == this.exp_country) {
          currentCountry = set12[coun];
        }

        set12[coun].country = countryName;

        newSet12.push(set12[coun]);
      }

      newSet12.sort((a, b) => (a.country > b.country ? 1 : -1));

      newSet12.splice(
        newSet12.map(x => x.country).indexOf(currentCountry.country),
        1
      );

      newSet12.unshift(currentCountry);

      let sectorList = [];

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
        "#2E64BA"
      ];

      let sectors = [
        "Agriculture",
        "Mining",
        "Construction",
        "Utilities",
        "Manufacturing-Low tech",
        "Manufacturing-High and medium tech",
        "Services-Trade and repair",
        "Services-Tourism",
        "Services-Transport",
        "Services-ICT",
        "Services-Property",
        "Services-Financail",
        "Services-Public and welfare",
        "Services-Private household"
      ];

      newSet12.forEach(x => {
        let i = 0;
        for (const sector in x) {
          if (sector != "country") {
            let newData = {
              name: sectors[i],
              data: [],
              color: colors[i]
            };

            sectorList[i] = sectorList[i] || newData;

            sectorList[i].data.push(x[sector].ratio);

            i++;
          }
        }
      });

      let forSourceSectorList = [
        `Manufacturing- high and medium tech (p%)`,
        `Manufacturing- low tech (q%)`,
        `Services- tourism (r%)`,
        `Agriculture (s%)`
      ];

      this.forSourceSectorList = forSourceSectorList;

      let forSourceSectorList2 = [
        `Manufacturing- high and medium tech (p%)`,
        `Manufacturing- low tech (q%)`,
        `Services- tourism (r%)`,
        `Agriculture (s%)`
      ];

      this.forSourceSectorList2 = forSourceSectorList2;

      countryList = newSet12.map(x => x.country);

      let asiaPacifics = [];
      let europes = [];
      let northAmericas = [];
      let latinAmericas = [];
      let rows = [];

      // asiaPacifics = newSet12.map(x => x.asiaPacific.ratio);
      // europes = newSet12.map(x => x.europe.ratio);
      // northAmericas = newSet12.map(x => x.northAmerica.ratio);
      // latinAmericas = newSet12.map(x => x.latinAmerica.ratio);
      // rows = newSet12.map(x => x.row.ratio);

      Highcharts.chart("container11", {
        chart: {
          type: "column",
          height: 350
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: countryList,
          labels: {
            enabled: true,
            rotation: -90
          }
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          alignColumns: false,
          width: 100
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: false
            }
          }
        },

        series: sectorList,
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });
    },
    async loadData() {
      this.exp_country = this.$q.sessionStorage.getItem("expe");
      this.year = this.$q.sessionStorage.getItem("year");

      this.country = this.countryOptions.filter(
        x => x.iso == this.exp_country
      )[0].label;

      if (this.exp_country && this.year) {
        this.loadingShow();

        let urllink =
          this.path_api +
          `/get_country_brief.php?exp_country=${this.exp_country}&year=${this.year}`;

        let getData = await Axios.get(urllink);

        if (getData.data) {
          this.loadingHide();

          this.renderChart(getData.data[0]);
        }
      }
    }
  },
  async mounted() {
    await this.getCountryList();
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
.bg-bar {
  background-image: linear-gradient(to right, #6e6b6b, #a5a1a1);
}

.break {
  break-after: page;
}

@media print {
  #printSection {
    display: none;
  }

  @page {
    margin: 0mm;
  }
}
</style>
