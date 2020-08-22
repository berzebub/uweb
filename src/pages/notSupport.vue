<template>
  <div style="background-color:#020B3B;height:100vh">
    <div
      class="absolute-center  row items-center"
      style="width:90%;margin:auto"
    >
      <div class="fit q-mb-lg" align="center">
        <q-img
          class="col-12"
          style="max-width:300px"
          src="../../public/logo.png"
        ></q-img>
      </div>

      <div
        style="width:100%;max-width:700px;border:2px solid white;margin:auto"
        class="q-pa-md row items-center justify-center "
      >
        <div class="col-3" align="center">
          <q-icon
            name="fas fa-exclamation-triangle"
            size="60px"
            color="white"
          ></q-icon>
        </div>
        <div class="col" style="font-size:18px">
          <p class="text-white" align="center">
            This website is designed for desktop only
          </p>
          <p class="text-white" align="center">
            (screen resolution more than 1024px)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$q.platform.is.desktop) {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
