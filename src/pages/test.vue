<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <q-btn ref="testGetApi" @click="testGetApi()" label="testGetApi"></q-btn>
  </q-page>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    async testGetApi() {
      console.log("123123");
      // let indicator = [];

      // let url =
      //   "https://thaiawesomedev.com/u_api/indicator_imp_cons.php?imp_country=CHN&exp_country=THA&year=2017&sector=0";
      // console.time("timestart");
      // for (let i = 0; i < 2000; i++) {
      //   let data = await Axios.get(url);
      //   indicator.push(data.data);
      // }
      // console.timeEnd("timestart");
    },
  },
  mounted() {
    this.$refs.testGetApi.click();
  },
};
</script>

<style lang="scss" scoped>
</style>