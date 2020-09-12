<template>
  <div style="width:500px; margin:auto;">
    <!-- indicator -->
    <div>
      <q-select
        v-model="indicator"
        :options="indicatorList"
        label="indicator"
        emit-value
        map-options
      />
    </div>
    <!-- exporting country -->
    <div>
      <q-select
        v-model="exporting"
        :options="countryList"
        label="Exporting Country"
        multiple
        emit-value
        map-options
      />
    </div>
    <!-- importing country -->
    <div>
      <q-select
        v-model="importing"
        :options="countryList"
        label="Importing Country"
        multiple
        emit-value
        map-options
      />
    </div>
    <!-- Sector -->
    <div>
      <q-select
        v-model="sector"
        :options="sectorList"
        label="Sector"
        multiple
        emit-value
        map-options
      />
    </div>
    <!-- year -->
    <div>
      <q-select v-model="year" :options="yearList" label="Year" multiple />
    </div>
    <div class="row q-mt-md">
      <div class="col-6" align="center">
        <q-btn label="Clear All" glossy style="width:150px;" @click="clearBtn()" />
      </div>
      <div class="col-6" align="center">
        <q-btn label="Download" glossy style="width:150px;" color="secondary" @click="runBtn()" />
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import countryJson from "../../public/country_list.json";
import sectorJson from "../../public/sector.json";
export default {
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
      ],
      countryList: [],
      exporting: null,
      importing: null,
      sector: null,
      sectorList: [],
      year: null,
      yearList: [],
    };
  },
  methods: {
    loadCountryList() {
      this.countryList = [];
      countryJson.forEach((data) => {
        let tempCountryList = {
          value: data.iso,
          label: data.name,
        };
        this.countryList.push(tempCountryList);
      });
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
    },
    async runBtn() {
      let obj = {
        exporting: this.exporting,
        importing: this.importing,
        sector: this.sector,
        year: this.year,
      };
      obj = {
        exporting: "test2",
      };
      console.log(obj);
      if (this.indicator == "Imp_cons") {
        let url =
          "https://api.winner-english.com/u_api/indicator_imp_cons2.php";
        let data = await Axios.post(url, obj);
        console.log(data.data);
      }
    },
  },
  mounted() {
    this.loadYearList();
    this.loadCountryList();
    this.loadSectorList();
  },
};
</script>

<style scoped>
</style>