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
export default {
  props: {
    isShowLogo: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      yearOptions: [2017, 2018, 2019, 2020],
      yearSelected: this.$q.localStorage.has("yid")
        ? this.$q.localStorage.getItem("yid")
        : 2020,
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

      this.$emit("countrySelected", {
        name: countrySelected.label,
        region: countrySelected.region,
      });
    },
    selectYear() {
      this.$emit("yearSelected", this.yearSelected);
      this.$q.localStorage.set("yid", this.yearSelected);
    },
  },
  mounted() {
    this.getCountryList();
    this.selectCountry();
    this.selectYear();
  },
};
</script>

<style scoped>
</style>