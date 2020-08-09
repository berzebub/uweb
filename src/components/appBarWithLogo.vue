<template>
  <div class="bg-white">
    <q-toolbar>
      <q-btn flat icon="home" size="25px"></q-btn>
      <q-space></q-space>
      <div class="row q-py-sm">
        <div>
          Exporting economy
          <q-select dense :options="countryOptions" v-model="countrySelected" outlined></q-select>
        </div>
        <div class="q-pl-lg">
          Year
          <q-select dense :options="yearOptions" v-model="yearSelected" outlined></q-select>
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