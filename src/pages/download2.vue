<template>
  <q-page>
    <global-value-chains-header :isShowTinaLink="false" :isDisableShare="false"></global-value-chains-header>
    <div class="row">
      <!-- indicator -->
      <div style="width:235px" class>
        <img style="width:100%" class="full-height" src="../../public/download-side.png" alt />
      </div>
      <div class="col q-pa-lg" style="background-color:#E5E1E1">
        <div style="width:90%;max-width:1200px; margin:auto;">
          <p align="center" class="font-24">Download data</p>
          <p>
            Query and download detailed data on value-added trade indicators for
            your economies, sectors and years of interest. Please make your
            desired selection from the menus below.
          </p>
        </div>

        <div
          class="bg-white q-py-lg q-px-xl rounded-borders"
          style="width:90%;max-width:1200px; margin:auto;"
        >
          <div>
            <q-select
              v-model="indicator"
              :options="indicatorList"
              label="indicator (select one)"
              emit-value
              map-options
              @input="resetDownloadState()"
            />
          </div>
          <!-- exporting country -->
          <div>
            <q-select
              v-model="exporting"
              :options="countryList"
              label="Exporting economy"
              multiple
              emit-value
              map-options
              use-chips
              @input="resetDownloadState()"
            />
          </div>
          <!-- importing country -->
          <div>
            <q-select
              v-show="indicator != 'Forward_link_country'"
              v-model="importing"
              :options="countryList"
              label="Importing economy"
              multiple
              emit-value
              map-options
              use-chips
              @input="resetDownloadState()"
            />
          </div>
          <!-- Sector -->
          <div>
            <q-select
              v-show="
                indicator != 'Back_link_sector' &&
                  indicator != 'Forward_link_sector'
              "
              v-model="sector"
              :options="sectorList"
              label="Exporting sector"
              multiple
              emit-value
              map-options
              use-chips
              @input="resetDownloadState()"
            />
          </div>
          <!-- Source country -->
          <div>
            <q-select
              v-show="indicator == 'Back_link_sector'"
              v-model="source"
              :options="countryList"
              label="Source economy"
              multiple
              emit-value
              map-options
              use-chips
              @input="resetDownloadState()"
            />
          </div>
          <!-- year -->
          <div>
            <q-select
              @input="resetDownloadState()"
              v-model="year"
              use-chips
              :options="yearList"
              label="Year"
              multiple
            />
          </div>
          <div class="row q-mt-md">
            <div class="col-12 row justify-center q-col-gutter-md" align="center">
              <div>
                <q-btn label="Clear All" outline no-caps style="width:150px;" @click="clearBtn()" />
              </div>
              <div>
                <download-csv
                  v-if="isShowDownloadBtn"
                  class="bg-secondary text-white cursor-pointer"
                  style="width:150px;border-radius:3px;height:35px;line-height:35px;"
                  :data="downloadData"
                  ref="downloadData"
                  @click="test()"
                >Download Data</download-csv>

                <q-btn
                  v-else
                  label="Generate"
                  no-caps
                  style="width:150px;background-color:#2C2F30;"
                  class="text-white"
                  @click="runBtn()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </q-page>
</template>

<script>
import Axios from "axios";
import countryJson from "../../public/country_list.json";
import sectorJson from "../../public/sector.json";
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import myFooter from "../components/footer";
export default {
  components: {
    myFooter,
    globalValueChainsHeader,
  },
  data() {
    return {
      indicator: "Imp_cons",
      indicatorList: [
        {
          value: "Imp_cons",
          label: "Gross exports used in importer's consumption (Imp_cons)",
        },
        {
          value: "Imp_exp",
          label:
            "Grooss exports used in importer's export production (Imp_exp)",
        },
        {
          value: "Dom_cons",
          label:
            "Grooss exports that return home and used in the exporter's domestic consumption (Dom_cons)",
        },
        {
          value: "Double",
          label:
            "Double counted exports from repeated border crossing (Double)",
        },
        {
          value: "Imp_cont",
          label: "Imported content in gross exports (Imp_cont)",
        },
        {
          value: "DVA_tradebalance",
          label: "Domestice value-added trade balance (DVA_tradebalance)",
        },
        {
          value: "DVA_tradebalance_$",
          label: "Domestice value-added trade balance (DVA_tradebalance_$)",
        },
        {
          value: "Gross_tradebalance",
          label: "Gross trade balance (Gross_tradebalance)",
        },
        {
          value: "Gross_tradebalance_$",
          label: "Gross trade balance (Gross_tradebalance_$)",
        },
        {
          value: "GVC_participation",
          label: "GVC participation",
        },
        {
          value: "GVC_participation_$",
          label: "GVC participation_$",
        },
        {
          value: "Back_link_country",
          label: "Backward linkages, all source countries (Back_link_country)",
        },
        {
          value: "Back_link_sector",
          label: "Backward linkages, all exporting sectors (Back_link_sector)",
        },
        {
          value: "Forward_link_country",
          label:
            "Forward linkages, all importing countries (Forward_link_country)",
        },
        {
          value: "Forward_link_sector",
          label:
            "Forward linkages, all exporting sectors (Forward_link_sector)",
        },
        {
          value: "Gross_exports",
          label: "Gross exports",
        },
      ],
      countryList: [],
      source: null,
      exporting: null,
      importing: null,
      sector: null,
      sectorList: [],
      year: null,
      yearList: [],
      isShowDownloadBtn: false,
      downloadData: null,
    };
  },
  methods: {
    test() {
      console.log("123123");
    },
    resetDownloadState() {
      this.isShowDownloadBtn = false;
    },
    loadCountryList() {
      this.countryList = [];
      countryJson.forEach((data) => {
        let tempCountryList = {
          value: data.iso,
          label: data.name,
        };
        this.countryList.push(tempCountryList);
      });
      this.countryList.sort((a, b) => (a.label < b.label ? -1 : 1));
    },
    loadSectorList() {
      this.sectorList = [];
      sectorJson.forEach((data) => {
        let tempSectorList = {
          value: data.id,
          label: data.name,
        };
        this.sectorList.push(tempSectorList);
      });
    },
    async loadYearList() {
      this.yearList = [];
      let url = "https://api.winner-english.com/u_api/get_year_active.php";
      let data = await Axios.get(url);
      data.data.forEach((x) => {
        this.yearList.push(x);
      });
    },
    clearBtn() {
      this.exporting = null;
      this.importing = null;
      this.sector = null;
      this.year = null;
      this.indicator = "Imp_cons";
      this.isShowDownloadBtn = false;
    },
    async runBtn() {
      let _this = this;
      function validateInput() {
        if (
          !_this.exporting ||
          !_this.importing ||
          !_this.sectorList ||
          !_this.year
        ) {
          if (!_this.exporting) {
            _this.$q.notify({
              message: "Please add an exporting economy",
              color: "red",
              position: "top",
            });
          }
          if (!_this.importing) {
            _this.$q.notify({
              message: "Please add an importing economy",
              color: "red",
              position: "top",
            });
          }
          if (!_this.sector) {
            _this.$q.notify({
              message: "Please add a sector",
              color: "red",
              position: "top",
            });
          }
          if (!_this.year) {
            _this.$q.notify({
              message: "Please add a year",
              color: "red",
              position: "top",
            });
          }
          return;
        }
      }

      if (this.indicator == "Back_link_sector") {
        if (!this.source) {
          this.$q.notify({
            message: "Please add an source economy",
            color: "red",
            position: "top",
          });
        }
        validateInput();
      } else {
        validateInput();
      }

      let obj;
      if (
        !(
          this.indicator == "Back_link_sector" ||
          this.indicator == "Forward_link_country" ||
          this.indicator == "Forward_link_sector"
        )
      ) {
        this.sector.sort();
        obj = {
          exporting: this.exporting,
          importing: this.importing,
          sector: this.sector,
          year: this.year,
        };
      } else if (this.indicator == "Back_link_sector") {
        obj = {
          exporting: this.exporting,
          importing: this.importing,
          source: this.source,
          year: this.year,
        };
      } else if (this.indicator == "Forward_link_country") {
        obj = {
          exporting: this.exporting,
          sector: this.sector,
          year: this.year,
        };
      } else if (this.indicator == "Forward_link_sector") {
        obj = {
          exporting: this.exporting,
          importing: this.importing,
          year: this.year,
        };
      }

      let url = "";
      if (this.indicator == "Imp_cons") {
        url = "https://api.winner-english.com/u_api/indicator_imp_cons2.php";
      } else if (this.indicator == "Imp_exp") {
        url = "https://api.winner-english.com/u_api/indicator_imp_exp2.php";
      } else if (this.indicator == "Dom_cons") {
        url = "https://api.winner-english.com/u_api/indicator_dom_cons2.php";
      } else if (this.indicator == "Double") {
        url = "https://api.winner-english.com/u_api/indicator_double2.php";
      } else if (this.indicator == "Imp_cont") {
        url = "https://api.winner-english.com/u_api/indicator_imp_cont2.php";
      } else if (this.indicator == "DVA_tradebalance") {
        url =
          "https://api.winner-english.com/u_api/indicator_dva_tradebalance2.php";
      } else if (this.indicator == "DVA_tradebalance_$") {
        url =
          "https://api.winner-english.com/u_api/indicator_dva_tradebalance_m.php";
      } else if (this.indicator == "Gross_tradebalance") {
        url =
          "https://api.winner-english.com/u_api/indicator_gross_tradebalance2.php";
      } else if (this.indicator == "Gross_tradebalance_$") {
        url =
          "https://api.winner-english.com/u_api/indicator_gross_tradebalance_m.php";
      } else if (this.indicator == "GVC_participation") {
        url =
          "https://api.winner-english.com/u_api/indicator_gvc_participation2.php";
      } else if (this.indicator == "GVC_participation_$") {
        url =
          "https://api.winner-english.com/u_api/indicator_gvc_participation_m.php";
      } else if (this.indicator == "Back_link_country") {
        url =
          "https://api.winner-english.com/u_api/indicator_back_link_country2.php";
      } else if (this.indicator == "Back_link_sector") {
        url =
          "https://api.winner-english.com/u_api/indicator_back_link_sector2.php";
      } else if (this.indicator == "Forward_link_country") {
        url =
          "https://api.winner-english.com/u_api/indicator_forward_link_country2.php";
      } else if (this.indicator == "Forward_link_sector") {
        url =
          "https://api.winner-english.com/u_api/indicator_forward_link_sector2.php";
      } else if (this.indicator == "Forward_link_sector") {
        url =
          "https://api.winner-english.com/u_api/indicator_forward_link_sector2.php";
      } else if (this.indicator == "Gross_exports") {
        url =
          "https://api.winner-english.com/u_api/indicator_gross_exports2.php";
      }
      let data = await Axios.post(url, obj);

      this.downloadData = data.data;
      this.isShowDownloadBtn = true;
    },
  },
  mounted() {
    this.$q.sessionStorage.set(
      "shareLink",
      "unescap.thaiawesomedev.com/download"
    );
    this.loadYearList();
    this.loadCountryList();
    this.loadSectorList();
  },
};
</script>

<style scoped></style>
