<template>
  <q-page class="bg" style="overflow:hidden">
    <div class="relative-position" style="height:calc(100vh - 210px)">
      <video id="myVideo" autoplay loop muted>
        <source type="video/webm" src="../../public/bgmov.webm" />
      </video>

      <div style="padding-top:20px;padding-left:20px" class="absolute" v-show="false">
        <div
          style="background-color:rgba(2,11,59,0.8);width:450px;border-radius:5px;"
          class="text-white row"
        >
          <div style="width:100%">
            <div style="height:15px">&nbsp;</div>
            <div style="font-size:28px" align="center">Regional Integration</div>
            <div style="height:15px"></div>
            <div style="font-size:18px;letter-spacing:0.2px" align="center">
              ESCAP DigiSRII provides insights on the
              <br />structure and progress of regional
              <br />integration in
              Asia-Pacific
            </div>
          </div>
          <div align="center" class="col-12 q-pt-md">
            <q-btn
              @click.stop="goToRegional()"
              style="width:180px;background-color:#324195;border:1px solid white"
              label="Get started"
              class="font-content"
              no-caps
            ></q-btn>
          </div>
          <div style="height:15px">&nbsp;</div>
        </div>
      </div>

      <div class="absolute absolute-center" align="center">
        <div
          style="background-color:rgba(44,42,44,0.6);width:600px;border-radius:5px;"
          class="text-white row"
        >
          <div style="width:100%" class="q-pt-md">
            <img src="../../public/logobig.png" width="400px" alt />
            <div style="height:15px">&nbsp;</div>
          </div>
          <div align="center" class="col-12">
            <q-btn
              @click.stop="goToGlobal()"
              style="width:180px;background-color:#000000;border:1px solid #F4B802"
              label="Get started"
              class="font-content"
              no-caps
            ></q-btn>
          </div>
          <div style="height:15px">&nbsp;</div>
        </div>
      </div>

      <div
        class="absolute-bottom"
        style="padding-bottom:20px;padding-right:20px"
        align="right"
        v-show="false"
      >
        <div
          style="background-color:rgba(2,11,59,0.8);width:450px;border-radius:5px;"
          class="text-white row"
        >
          <div class style="width:100%">
            <div style="height:15px">&nbsp;</div>
            <div align="center" style="font-size:28px">Global Value Chains</div>
            <div style="height:15px"></div>
            <div align="center" style="font-size:18px;letter-spacing:0.2px">
              Gain insight into your economy’s participation
              <br />in GVCs. Uncover the sources of intermediate
              <br />inputs
              and destinations of domestic value-added.
            </div>
          </div>
          <div align="center" class="col-12 q-pt-md">
            <q-btn
              @click="goToGlobal()"
              style="width:180px;background-color:#324195;border:1px solid white"
              label="Get started"
              class="font-content"
              no-caps
            ></q-btn>
          </div>

          <div align="center" class="col-6 q-pt-md">
            <q-btn
              @click="goToDownload()"
              style="width:180px;background-color:#324195;border:1px solid white"
              label="Download data"
              class="font-footer"
              no-caps
            ></q-btn>
          </div>
          <div align="center" class="col-6 q-pt-md">
            <q-btn
              @click="goToCountryBriefs()"
              style="width:180px;background-color:#324195;border:1px solid white"
              label="Country briefs"
              class="font-footer"
              no-caps
            ></q-btn>
          </div>

          <div style="height:15px">&nbsp;</div>
        </div>
      </div>
    </div>

    <my-footer class="absolute-bottom"></my-footer>
  </q-page>
</template>

<script>
import myFooter from "../components/footer";
export default {
  components: {
    myFooter,
  },
  methods: {
    goToRegional() {
      this.$router.push("/regional-integration");
    },
    goToGlobal() {
      this.$router.push("/gvc-links");
    },
    goToDownload() {
      this.$router.push("/download");
    },
    goToCountryBriefs() {
      this.$router.push("/countrybriefs");
    },
  },
  mounted() {
    document
      .getElementById("myVideo")
      .addEventListener("contextmenu", (event) => event.preventDefault());
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 115%;
  min-height: 100%;
}
</style>
