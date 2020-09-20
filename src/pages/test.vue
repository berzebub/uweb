<template>
  <q-page class="container bg-white">
    <q-select @input="(val) => changeFlag(val)" outlined v-model="model" :options="options"  >
        <template v-slot:prepend>
          <q-img style="width:30px" :src="activeFlag"></q-img>
          <!-- <img style="width:30px" :src="activeFlag" alt=""> -->
        </template>
      </q-select>
  </q-page>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      model : "Argentina",
      activeFlag : "https://teerapornclinic.com/wp-content/uploads/2017/07/usa-flag.jpg",
      options : [
        {
          value : "Argentina",
          label : "Argentina",
          flag : "https://teerapornclinic.com/wp-content/uploads/2017/07/usa-flag.jpg"
        },
        {
          value : "Australia",
          label : "Australia",
          flag : "https://static.dezeen.com/uploads/2020/06/mississippi-state-flag-design-dezeen-2364-hero.jpg"
        }
      ]
    };
  },
  methods: {
   changeFlag(val){
     console.log(val);
     this.activeFlag = val.flag
   }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>