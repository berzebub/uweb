<template>
  <q-page>
    <div align="center" class="q-pa-md bg-grey-7 text-white">
      <span style="font-size:24px;"
        >RIVA Global Value Chain Country Briefs:<br />
        Thailand, 2017</span
      >
    </div>
    <div
      class="q-mt-lg bg-grey-7 q-py-md text-bold"
      style="width:800px;margin: 30px auto;font-size:18px;border-radius:5px;"
      align="center"
    >
      <span
        >Structure of value-added in gross exports1-5 ^ (link to relevant page
        on RIVA)</span
      >
    </div>

    <div class="q-mt-md row">
      <div class="col-4 q-pa-md"><div id="container1"></div></div>
      <div class="col-4 q-pa-md"><div id="container2"></div></div>
      <div class="col-4 q-pa-md"><div id="container3"></div></div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    renderChart() {
      for (let i = 0; i < 3; i++) {
        Highcharts.chart({
          chart: {
            renderTo: "container" + (i + 1),
            type: "pie",
            borderRadius: 5,
            width: 400,
            height: 300
          },
          title: {
            text: ""
          },
          subtitle: {
            text: ""
          },

          accessibility: {
            announceNewData: {
              enabled: true
            },
            point: {
              valueSuffix: "%"
            }
          },

          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: "{point.name}:<br> {point.y:.1f}%"
              }
            }
          },

          tooltip: {
            headerFormat:
              '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat:
              '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
          },

          series: [
            {
              name: "Browsers",
              colorByPoint: true,
              data: [
                {
                  name: "Chrome",
                  y: 62.74,
                  drilldown: "Chrome"
                },
                {
                  name: "Firefox",
                  y: 10.57,
                  drilldown: "Firefox"
                },
                {
                  name: "Internet ",
                  y: 7.23,
                  drilldown: "Internet "
                },
                {
                  name: "Safari",
                  y: 5.58,
                  drilldown: "Safari"
                }
              ]
            }
          ],
          credits: {
            enabled: false
          }
        });
      }
    }
  },
  mounted() {
    this.renderChart();
  }
};
</script>

<style lang="scss" scoped></style>
