<template>
  <div style="background-color:#020B3B;height:100vh">
    <div class="absolute-center row items-center" style="width:90%;margin:auto">
      <div
        style="width:100%;max-width:700px;border:2px solid white;margin:auto"
        class="q-pa-md row items-center justify-center"
      >
        <div class="col" style="font-size:18px">
          <p class="text-white" align="center">This website is designed for desktop only.</p>
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
  },
};
</script>

<style lang="scss" scoped></style>
