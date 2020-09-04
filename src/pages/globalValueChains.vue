<template>
  <q-page class="bg relative-position" style="padding-bottom:100px;">
    <!-- Global value chains -->
    <div class="absolute-bottom q-pa-md" style="bottom:120px;width:80%;margin:auto;">
      <div style="background-color:#020B3B;border-radius:5px" class="q-py-md">
        <div align="center" class="text-white font-graph">Global Value Chains</div>
        <div class="text-white font-content" align="center">
          Gain insight into your economy’s participation in GVCs. Uncover sources of
          <br />intermediate inputs and destinations of domestic value-added
        </div>
        <div class="q-pt-md">
          <div class="row justify-center">
            <div>
              <q-btn
                to="/getStarted"
                label="Get started"
                no-caps
                class="text-white font-content"
                style="width:192px;background-color:#283891;border-radius:10px"
              ></q-btn>
            </div>

            <div class="q-px-lg">
              <q-btn
                to="/download"
                label="Download data"
                no-caps
                class="text-white font-content"
                style="width:192px;background-color:#283891;border-radius:10px"
              ></q-btn>
            </div>

            <div>
              <q-btn
                to="/countrybriefs"
                label="Country briefs"
                no-caps
                class="text-white font-content"
                style="width:192px;background-color:#283891;border-radius:10px"
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
  background-image: url("../../public/bg-global-page.png");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
</style>