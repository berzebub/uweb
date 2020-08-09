<template>
  <q-page class="bg-white">
    <!-- NOTE : Menu bar Header -->
    <q-toolbar class="text-primary q-pa-sm shadow-1">
      <div class="col q-px-md">
        <q-btn class="color4" flat round size="35px" dense icon="home" to="/" />
      </div>
      <q-space />
      <div class="col" align="center">
        <span class="font-header text-black">Country Briefs</span>
      </div>
    </q-toolbar>

    <div class="row justify-center q-pb-xl q-mt-xl">
      <div class="col-3 q-pa-sm" style="width:250px">
        <span class="font-content">Exporting economy</span>
        <q-select outlined dense v-model="country" :options="countryOptions"></q-select>
      </div>
      <div class="col-2 q-pa-sm" style="width:150px">
        <span class="font-content">Year</span>
        <q-select outlined dense v-model="year" :options="yearOptions"></q-select>
      </div>

      <div class="col-12 q-mt-lg q-pt-sm q-pb-xl" align="center">
        <q-btn
          class="bg4 font-content q-mb-xl"
          label="Download"
          no-caps
          style="width:200px;border-radius:10px;"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      country: "Thailand",
      countryOptions: ["Thailand", "China"],

      year: "2017",
      yearOptions: ["2017", "2018", "2019"],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>