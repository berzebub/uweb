<template>
  <!-- <q-page class="bg relative-position">
    <q-btn to="/" color="white" flat round size="35px" dense icon="home" />
    <div class="absolute-bottom q-pa-md" style="bottom:20px;width:80%;margin:auto;">
      <div style="background-color:#020B3B;border-radius:5px" class="q-py-md">
        <div align="center" class="text-white font-page q-pb-md">Global Value Chains</div>
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
  </q-page>-->

  <q-page>
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
    <!-- MENU -->
    <div class="q-pa-md">
      <div class="row">
        <div class="col-4 q-pa-md" align="center" v-for="i in 50" :key="i">
          <div class="menu-card shadow-5">
            <div align="center" class>
              <q-icon size="76px" name="far fa-user-circle"></q-icon>
            </div>
            <div class="q-pt-lg font-16" align="center">
              What about key GVC
              <br />relationships?
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
  background-image: url("../../public/bg-global-value.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.text-stroke {
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 1px 0 #000;
}
.menu-card {
  min-width: 270px;
  width: 95%;
  margin: auto;
  height: 227px;
  background-color: #e5e1e1;
  padding: 30px;
  border-radius: 5px;
}
.menu-card :hover {
  cursor: pointer;
}
</style>