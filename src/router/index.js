import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import VueRouter from "vue-router";
import routes from "./routes";
import JsonCSV from "vue-json-csv";
import CountryFlag from "vue-country-flag";

import VueFlags from "@growthbunker/vueflags";
import VueSocialSharing from "vue-social-sharing";
var VueScrollTo = require("vue-scrollto");

Vue.use(VueScrollTo);
Vue.use(VueRouter);
Vue.use(HighchartsVue);
Vue.component("downloadCsv", JsonCSV);
Vue.component("country-flag", CountryFlag);
Vue.use(VueSocialSharing);
Vue.use(VueFlags, {
  // Specify the path of the folder where the flags are stored.
  iconPath: "../flags"
});
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
import countryJson from "../../public/country_list.json";
import sectorJson from "../../public/sector.json";

Vue.mixin({
  data() {
    return {
      path_api: "https://riva.negotiatetrade.org/u_api",
      // path_api: "https://api.winner-english.com/u_api",
      exportAvailable: [
        "AUS",
        "BTN",
        "BRN",
        "KHM",
        "JFI",
        "HKG",
        "IND",
        "IDN",
        "JPN",
        "KAZ",
        "KGZ",
        "LAO",
        "MYS",
        "MDV",
        "MNG",
        "NPL",
        "PAK",
        "PHL",
        "CHN",
        "RUS",
        "SGP",
        "THA",
        "TUR",
        "VNM"
      ],
      exportingGraphOptions: {
        buttons: {
          contextButton: {
            menuItems: [
              "downloadPNG",
              "downloadJPEG",
              "separator",
              "downloadCSV",
              "downloadXLS"
            ]
          }
        },
        width: "1280px",
        chartOptions: {
          legend: {
            width: 180,
            itemStyle: {
              fontSize: "7px",
              fontWeight: "medium",
              fontFamily: "roboto",
              color: "#00000"
            }
          },
          title: {
            style: { fontSize: "12px" }
          },
          subtitle: {
            style: { fontSize: "8px" }
          }
        }
      }
    };
  },

  methods: {
    getCountryList() {
      let tempOptions = [];

      // CID = country id
      // impEc = Importing economy id
      countryJson.forEach(element => {
        let data = {
          label: element.name,
          value: element.id,
          region: element.region,
          iso: element.iso,
          index: element.id,
          code: element.code,
          region2: element.region2
        };
        tempOptions.push(data);
      });
      tempOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

      this.countryOptions = tempOptions;
      // this.countrySelected = ""
      // this.importingEconomy = ""
      // this.sourceEconomy = ""
    },
    getSectorList() {
      let tempOptions = [];
      sectorJson.forEach(element => {
        let data = {
          label: element.name,
          value: element.id
        };
        tempOptions.push(data);
      });
      this.sectorOptions = tempOptions;
      this.sectorSelected = "";
    },
    notifyGreen(message) {
      this.$q.notify({
        message: message,
        color: "green",
        position: "top",
        timeout: "2500"
      });
    },
    loadingShow() {
      this.$q.loading.show({
        delay: 400
      });
    },
    loadingHide() {
      this.$q.loading.hide();
    },
    checkPlatform() {
      if (this.$q.platform.is.mobile) {
        this.$router.push("/not-support");
      }
    }
  }
});
