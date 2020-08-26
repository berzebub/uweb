<template>
  <div class="bg-white q-py-sm">
    <q-toolbar class>
      <q-btn v-if="!isShowLogo" to="/" class="color4" flat round size="35px" dense icon="home" />
      <q-img
        @click="$router.push('/')"
        style="max-width:300px;width:100%"
        v-else
        class="cursor-pointer"
        src="../../public/logoAppbar.png"
      ></q-img>
      <q-space></q-space>
      <div class="row q-py-sm">
        <div>
          Exporting economy
          <q-select
            style="width:240px"
            dense
            :options="countryOptions"
            v-model="countrySelected"
            outlined
            emit-value
            map-options
            @input="selectCountry()"
          ></q-select>
        </div>
        <div class="q-pl-lg">
          Year
          <q-select
            style="width:144px"
            dense
            :options="yearOptions"
            v-model="yearSelected"
            @input="selectYear()"
            outlined
          ></q-select>
        </div>
      </div>
    </q-toolbar>
  </div>
</template>

<script>
import json from "../../public/country_list.json";
import Axios from "axios";
export default {
  props: {
    isShowLogo: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      yearOptions: [],
      yearSelected: "",
      countryOptions: [],
      countrySelected: "",
    };
  },
  methods: {
    selectCountry() {
      let countrySelected = this.countryOptions.filter(
        (x) => x.value == this.countrySelected
      )[0];

      this.$q.localStorage.set("cid", this.countrySelected);

      console.log(countrySelected);

      this.$emit("countrySelected", {
        name: countrySelected.label,
        region: countrySelected.region,
        iso: countrySelected.iso,
      });
    },
    selectYear() {
      this.$emit("yearSelected", this.yearSelected);
      this.$q.localStorage.set("yid", this.yearSelected);
    },
    async loadYear() {
      this.getCountryList();

      let url = "https://api.winner-english.com/u_api/get_year_active.php";

      let getYear = await Axios.get(url);

      this.yearOptions = getYear.data;
      this.yearSelected = this.$q.localStorage.has("yid")
        ? this.$q.localStorage.getItem("yid")
        : this.yearOptions[0];

      this.selectCountry();
      this.selectYear();
    },
  },

  mounted() {
    this.loadYear();
  },
};
</script>

<style scoped>
</style>