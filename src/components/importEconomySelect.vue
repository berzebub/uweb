<template>
  <!-- Selection -->
  <div class="row q-py-xl" style="width:50%;min-width:320px;margin:auto">
    <div class="col-6 q-px-md">
      <span>Importing economy</span>
      <q-select
        @click="selectCountry()"
        dense
        outlined
        :options="countryOptions"
        v-model="countrySelected"
        emit-value
        map-options
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
        emit-value
        map-options
      ></q-select>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      countryOptions: [],
      countrySelected: "China",
      sectorOptions: ["All", "Sector #1", "Sector #2"],
      sectorSelected: "All",
    };
  },
  methods: {
    selectCountry() {
      let countryName = this.countryOptions.filter(
        (x) => x.value == this.countrySelected
      )[0].label;
      this.$emit("countrySelected", countryName);
    },
    selectSector() {
      this.$emit("sectorSelected", this.sectorSelected);
    },
    async getSector() {
      let url = "http://localhost/u_api/get_sector.php";
      let sectorData = await Axios.get(url);
      let tempSector = [];
      sectorData.data.forEach((element) => {
        let data = {
          label: element.name,
          value: element.id,
        };
        tempSector.push(data);
      });
      // ต้อง sort ไหม
      // tempSector = tempSector.sort((a,b) => a.label > b.label ? 1 : -1);

      this.sectorOptions = tempSector;
      this.sectorSelected = tempSector[0].value;
    },
  },
  mounted() {
    this.getCountryList();
    this.selectCountry();
    this.getSector();
  },
};
</script>

<style lang="scss" scoped>
</style>