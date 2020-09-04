<template>
  <div class="bg-white q-py-sm">
    <q-toolbar class>
      <q-btn to="/" class="color4" flat round size="35px" dense icon="home" />
      <!-- <q-img
        @click="$router.push('/')"
        style="max-width:300px;width:100%"
        v-else
        class="cursor-pointer"
        src="../../public/logoAppbar.png"
      ></q-img>-->
      <!-- <q-btn v-else class="color4" flat round size="35px" dense icon="home" to="/" /> -->
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
            @input="selectData()"
          ></q-select>
        </div>
        <div class="q-pl-lg">
          Year
          <q-select
            style="width:144px"
            dense
            :options="yearOptions"
            v-model="yearSelected"
            @input="selectData()"
            outlined
          ></q-select>
        </div>
      </div>
    </q-toolbar>
  </div>
</template>

<script>
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
    selectData() {
      let countrySelected = this.countryOptions.filter(
        (x) => x.value == this.countrySelected
      )[0];

      this.$emit("countrySelected", {
        name: countrySelected.label,
        region: countrySelected.region,
        iso: countrySelected.iso,
        year: this.yearSelected,
      });
    },
    async loadYear() {
      this.getCountryList();

      let url = "https://api.winner-english.com/u_api/get_year_active.php";

      let getYear = await Axios.get(url);

      this.yearOptions = getYear.data;
      this.yearSelected = this.$q.sessionStorage.has("yid")
        ? this.$q.sessionStorage.getItem("yid")
        : "";
    },
  },

  created() {
    this.loadYear();
  },
};
</script>

<style scoped>
</style>