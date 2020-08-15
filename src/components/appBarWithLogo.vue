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
      yearSelected: 2020,
      countryOptions: ["Thailand", "China"],
      countrySelected: "Thailand",
    };
  },
  methods: {
    selectCountry() {
      this.$emit("countrySelected", this.countrySelected);
    },
    selectYear() {
      this.$emit("yearSelected", this.yearSelected);
    },
  },
  mounted() {
    this.$emit("countrySelected", this.countrySelected);
    this.$emit("yearSelected", this.yearSelected);
  },
};
</script>

<style scoped>
</style>