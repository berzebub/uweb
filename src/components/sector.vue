<template>
  <!-- Selection -->

  <div class="q-px-md q-py-lg" style="width:500px;margin:auto">
    <span>Sector</span>
    <q-select
      @input="selectSector()"
      dense
      outlined
      :options="sectorOptions"
      v-model="sectorSelected"
      emit-value
      map-options
    ></q-select>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      sectorOptions: [],
      sectorSelected: "",
    };
  },
  methods: {
    selectSector() {
      let sectorName = this.sectorOptions.filter(
        (x) => x.value == this.sectorSelected
      )[0].label;
      this.$q.localStorage.set("secId", this.sectorSelected);
      this.$emit("sectorSelected", this.sectorSelected);
    },
  },
  mounted() {
    this.getSectorList();
  },
};
</script>

<style lang="scss" scoped>
</style>