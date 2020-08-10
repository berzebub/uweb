<template>
  <!-- Selection -->
  <div class="row q-py-xl" style="width:50%;min-width:320px;margin:auto">
    <div class="col-6 q-px-md">
      <span>Importing economy</span>
      <q-select
        @click="selectCountry()"
        dense
        outlined
        :options="countryList"
        v-model="countrySelected"
      ></q-select>
    </div>

    <div class="col-6 q-px-md">
      <span>Sector</span>
      <q-select
        @click="selectSector()"
        dense
        outlined
        :options="sectorOptions"
        v-model="sectorSelected"
      ></q-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countryList: ["Thailand", "China"],
      countrySelected: "Thailand",
      sectorOptions: ["All", "Sector #1", "Sector #2"],
      sectorSelected: "All",
    };
  },
  methods: {
    selectCountry() {
      this.$emit("countrySelected", this.countrySelected);
    },
    selectSector() {
      this.$emit("sectorSelected", this.sectorSelected);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>