<template>
  <q-page style="width:209mm;">
    <div class=" q-pa-md" align="right">
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
        Thailand, 2017</span
      >
    </div>
    <div
      class="q-mt-lg  q-py-md text-bold bg-bar"
      style="width:1000px;margin: 30px auto;font-size:22px;border-radius:5px;"
      align="center"
    >
      <span
        >Structure of value-added in gross exports1-5 ^ (link to relevant page
        on RIVA)</span
      >
    </div>

    <div class="q-mt-md row ">
      <div class="col-4 q-pa-xs" align="center">
        <div align="center" class="q-pa-md " style="height:85px;">
          <span class="text-h6 text-bold"
            >Structure of value-added in SEA <br />
            exports to world</span
          >
        </div>
        <div align="right" class="q-px-lg">
          <i style="font-size:16px;">($US, % of gross exports)</i>
        </div>
        <div id="container1" class="q-mt-sm"></div>
      </div>
      <div class="col-4 q-pa-xs" align="center">
        <div align="center" class="q-pa-md " style="height:85px;">
          <span class="text-h6 text-bold"
            >Structure of value-added in Thailand’s <br />
            exports to world
          </span>
        </div>
        <div align="right" class="q-px-lg">
          <i style="font-size:16px;">($US, % of gross exports)</i>
        </div>
        <div id="container2" class="q-mt-sm"></div>
      </div>
      <div class="col-4 q-pa-xs" align="center">
        <div align="center" class="q-pa-md " style="height:85px;">
          <span class="text-h6 text-bold"
            >Structure of value-added in global exports
          </span>
        </div>
        <div align="right" class="q-px-lg">
          <i style="font-size:16px;">($US, % of gross exports)</i>
        </div>
        <div id="container3" class="q-mt-sm"></div>
      </div>
    </div>

    <div
      class="q-mt-lg  q-py-md text-bold bg-bar"
      style="width:1000px;margin: 30px auto;font-size:22px;border-radius:5px;"
      align="center"
    >
      <span
        >Value-added and gross trade balance ^ (link to relevant page on
        RIVA)</span
      >
    </div>
  </q-page>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      exp_country: "",
      year: ""
    };
  },
  methods: {
    async renderChart(data) {
      console.clear();

      this.chart1(JSON.parse(data.set1));
      this.chart2(JSON.parse(data.set2));
      this.chart3(JSON.parse(data.set3));
    },
    chart1(data) {
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
                y: data.importedContent.ratio,
                total: data.importedContent.total,
                color: "#FFC000"
              },
              {
                name: "double counted",
                y: data.doubleCounted.ratio,
                total: data.doubleCounted.total,
                color: "#ED7D31"
              },
              {
                name: "used in export production",
                y: data.usedInExportProduction.ratio,
                total: data.usedInExportProduction.total,
                color: "#ED7D31"
              },
              {
                name: "used in domestic consumption",
                y: data.usedInDomesticConsumption.ratio,
                total: data.usedInDomesticConsumption.total,
                color: "#997300"
              },
              {
                name: "used in consumption",
                y: data.directlyConsumed.ratio,
                total: data.directlyConsumed.total,
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
    chart2(data) {
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
                y: data.importedContent.ratio,
                total: data.importedContent.total,
                color: "#FFC000"
              },
              {
                name: "double counted",
                y: data.doubleCounted.ratio,
                total: data.doubleCounted.total,
                color: "#ED7D31"
              },
              {
                name: "used in export production",
                y: data.usedInExportProduction.ratio,
                total: data.usedInExportProduction.total,
                color: "#ED7D31"
              },
              {
                name: "used in domestic consumption",
                y: data.usedInDomesticConsumption.ratio,
                total: data.usedInDomesticConsumption.total,
                color: "#997300"
              },
              {
                name: "used in consumption",
                y: data.directlyConsumed.ratio,
                total: data.directlyConsumed.total,
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
    chart3(data) {
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
                y: data.importedContent.ratio,
                total: data.importedContent.total,
                color: "#FFC000"
              },
              {
                name: "double counted",
                y: data.doubleCounted.ratio,
                total: data.doubleCounted.total,
                color: "#ED7D31"
              },
              {
                name: "used in export production",
                y: data.usedInExportProduction.ratio,
                total: data.usedInExportProduction.total,
                color: "#ED7D31"
              },
              {
                name: "used in domestic consumption",
                y: data.usedInDomesticConsumption.ratio,
                total: data.usedInDomesticConsumption.total,
                color: "#997300"
              },
              {
                name: "used in consumption",
                y: data.directlyConsumed.ratio,
                total: data.directlyConsumed.total,
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
    async loadData() {
      this.exp_country = this.$q.sessionStorage.getItem("expe");
      this.year = this.$q.sessionStorage.getItem("year");

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
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
.bg-bar {
  background-image: linear-gradient(to right, #6e6b6b, #a5a1a1);
}
</style>
