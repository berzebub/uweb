<template>
  <q-page class="container">
    <!-- HEADER BAR -->
    <div class="row q-pa-md">
      <div style="width:80px">
        <q-icon style="color:#283891" name="home" size="65px"></q-icon>
      </div>
      <div class="col self-center">
        <div class="row justify-end">
          <div style="width:200px">
            <span>Exporting economy</span>
            <q-select dense outlined :options="countryList" v-model="countrySelected"></q-select>
          </div>
          <div style="width:20px"></div>
          <div style="width:130px">
            <span>Year</span>
            <q-select v-model="yearSelected" dense outlined :options="yearList"></q-select>
          </div>
        </div>
      </div>
    </div>

    <!-- MENU -->
    <div class="row" style="border:1px solid">
      <div class="col-3 brr q-py-md" align="center">Structure of value added</div>
      <div class="col-3 brr q-py-md" align="center">Participation in GVCs</div>
      <div class="col-3 brr q-py-md" align="center">
        Backward linkages
        <q-icon name="fas fa-caret-down"></q-icon>
        <q-menu fit max-height="200px" style="width:100%" class="brx">
          <q-list>
            <q-item clickable>
              <q-item-section>Menu#1</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Menu#2</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Menu#3</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
      <div class="col-3 q-py-md" align="center">
        Forward linkages
        <q-icon name="fas fa-caret-down"></q-icon>
        <q-menu fit max-height="200px" style="width:100%" class="brx">
          <q-list>
            <q-item clickable>
              <q-item-section>Menu#1</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Menu#2</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Menu#3</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>

    <!-- Select -->

    <div class="row q-py-xl" style="width:50%;min-width:320px;margin:auto">
      <div class="col-6 q-px-md">
        <span>Importing economy</span>
        <q-select dense outlined :options="countryList" v-model="importCountrySelected"></q-select>
      </div>

      <div class="col-6 q-px-md">
        <span>Sector</span>
        <q-select dense outlined :options="sectorOptions" v-model="sectorSelected"></q-select>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      countryList: ["Thailand", "China"],
      countrySelected: "Thailand",
      yearList: [2017, 2018, 2019, 2020],
      yearSelected: 2020,
      importCountrySelected: "Thailand",
      sectorSelected: "All",
      sectorOptions: ["All", "Sector #1", "Sector #2"],
    };
  },
};
</script>

<style lang="scss" scoped>
.brr {
  border-right: 1px solid;
}
</style>