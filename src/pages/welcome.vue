<template>
  <q-page class="bg">
    <!-- <q-parallax class="brx">
      <template v-slot:media>
        <video poster="https://cdn.quasar.dev/img/polina.jpg" autoplay loop muted>
          <source type="video/webm" src="https://cdn.quasar.dev/img/polina.webm" />
        </video>
      </template>
    </q-parallax>-->

    <video id="myVideo" autoplay loop muted>
      <source type="video/webm" src="../../public/vdo.webm" />
    </video>

    <div style="padding-top:20px;padding-left:20px">
      <q-btn
        @click="goToRegional()"
        style="background-color:#020B3B"
        class="text-white q-pa-md"
        no-caps
      >
        <div>
          <span style="font-size:28px">Regional Integration</span>
          <div style="height:15px"></div>
          <div style="font-size:18px;letter-spacing:0.2px">
            ESCAP DigiSRII provides insights on the
            <br />structure and progress of regional
            <br />integration in Asia-Pacific
          </div>
        </div>
      </q-btn>
    </div>

    <div style="height:20px"></div>
    <div class="absolute-bottom" style="padding-bottom:110px;padding-right:20px" align="right">
      <q-btn
        @click="goToGlobal()"
        style="background-color:#020B3B"
        class="text-white q-pa-md"
        no-caps
      >
        <div>
          <span style="font-size:28px">Global Value Chains</span>
          <div style="height:15px"></div>
          <div style="font-size:18px;letter-spacing:0.2px">
            Gain insight into your economy’s
            <br />participation in GVCs. Uncover sources
            <br />of intermediate inputs and destinations
            <br />of domestic value-added
          </div>
        </div>
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
  background-image: url("../../public/bg-world.jpg");
  background-size: cover;
  background-position: center;
}
#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
</style>