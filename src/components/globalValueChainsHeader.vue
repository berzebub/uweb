<template>
  <div class="bg flex flex-center" style="height:390px">
    <q-btn
      class="absolute"
      style="top:0px;left:0px"
      to="/"
      color="white"
      flat
      round
      size="35px"
      dense
      icon="home"
    />
    <div class="row justify-center">
      <div
        class="text-white col-12 text-stroke"
        align="center"
        style="font-size:48px"
      >Global Value Chains</div>
      <div align="center" class="text-stroke text-white font-graph q-pt-lg">
        Gain insight into your economy’s participation in GVCs. Uncover sources of
        <br />intermediate inputs and destinations of domestic value-added
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../public/bg-global-value.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>