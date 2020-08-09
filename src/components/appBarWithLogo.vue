<template>
  <div class="bg-white q-py-sm">
    <q-toolbar class>
      <q-btn class="color4" flat round size="35px" dense icon="home" />
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
          ></q-select>
        </div>
        <div class="q-pl-lg">
          Year
          <q-select
            style="width:144px"
            dense
            :options="yearOptions"
            v-model="yearSelected"
            outlined
          ></q-select>
        </div>
      </div>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yearOptions: [2017, 2018, 2019, 2020],
      yearSelected: 2020,
      countryOptions: ["Thailand", "China"],
      countrySelected: "Thailand",
    };
  },
};
</script>

<style scoped>
</style>