<template>
  <q-page class="bg relative-position" style="padding-bottom:100px;">
    <!-- Regional Integration -->
    <q-btn to="/" color="white" flat round size="35px" dense icon="home" />
    <div class="absolute-bottom q-pa-md" style="bottom:120px;width:80%;margin:auto;">
      <div style="background-color:#020B3B;border-radius:5px" class="q-py-md">
        <div align="center" class="text-white font-page q-pb-md">Regional Integration</div>
        <div class="text-white font-content" align="center">
          ESCAP DigiSRII provides insights on the structure and
          <br />progress of regional integration in Asia-Pacific
        </div>
        <div class="q-pt-md">
          <div class="row justify-center">
            <div>
              <q-btn
                label="Get started"
                no-caps
                class="text-white font-content"
                style="width:192px;background-color:#283891;border-radius:10px"
                disable
              ></q-btn>
            </div>
            <div class="q-px-md"></div>
            <div>
              <q-btn
                label="Download data"
                no-caps
                class="text-white font-content"
                style="width:192px;background-color:#283891;border-radius:10px"
                disable
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../public/bg-regional-page1.png");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
</style>