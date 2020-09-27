<template>
  <div class="relative-position" style="height:500px;border:1px solid">
    <div
      align="center"
      style="font-size:18px"
      class="q-pt-md"
    >What happens to {{exportCountry}}'s exports to {{ importCountry }}?</div>
    <div align="center" class="absolute-center flex flex-center font-content" style="width:540px">
      <img style="width:50px" src="../../public/images/alert.png" alt />Graph unavailable due to negligible export values
    </div>
  </div>
</template>

<script>
export default {
  props: ["exportCountry", "importCountry"],
};
</script>

<style lang="scss" scoped>
</style>