<template>
  <q-page class="bg">
    <div class="absolute-center">
      <q-btn @click="goToRegional()" class="text-indigo-12 bg-white" no-caps>
        <div>Regional Integration</div>
        <div>ESCAP DigiSRII provies insights on the structure and progress of regional integration in Asia-Pacific</div>
      </q-btn>

      <div style="height:20px"></div>
      <q-btn @click="goToGlobal()" class="text-indigo-12 bg-white" no-caps>
        <div>Global Value Chains</div>
        <div>Gain insight into your economy's participation in GVCs. Uncover sources of intermediate inputs and destinations of domestic value-added</div>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  methods: {
    goToRegional() {
      this.$router.push("/regional-integration");
    },
    goToGlobal() {
      this.$router.push("/global-value-chains");
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../public/bg2-1.jpg");
  background-size: cover;
  background-position: center;
}
</style>