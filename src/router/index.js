import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import VueRouter from "vue-router";
import routes from "./routes";
import JsonCSV from 'vue-json-csv'
var VueScrollTo = require("vue-scrollto");

Vue.use(VueScrollTo);
Vue.use(VueRouter);
Vue.use(HighchartsVue);
Vue.component('downloadCsv', JsonCSV)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
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
    return {};
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
          index: element.id
        };
        tempOptions.push(data);
      });
      tempOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

      this.countryOptions = tempOptions;

      if (!this.$q.sessionStorage.has("cid")) {
        this.countrySelected = ""
      } else {
        this.countrySelected = this.$q.sessionStorage.getItem("cid");
      }

      if (!this.$q.sessionStorage.has("impEcId")) {
        this.importingEconomy = tempOptions[1].value;
      } else {
        this.importingEconomy = this.$q.sessionStorage.getItem("impEcId");
      }

      if (!this.$q.sessionStorage.has("sourcEcId")) {
        this.sourceEconomy = ""
      } else {
        this.sourceEconomy = this.$q.sessionStorage.getItem("sourcEcId");
      }
    },
    getSectorList() {
      // secId = sector id
      let tempOptions = [];
      sectorJson.forEach(element => {
        let data = {
          label: element.name,
          value: element.id
        };
        tempOptions.push(data);
      });
      this.sectorOptions = tempOptions;
      if (!this.$q.sessionStorage.has("secId")) {
        this.sectorSelected = ""
      } else {
        this.sectorSelected = this.$q.sessionStorage.getItem("secId");
      }
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
