<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="relative-position">
      <router-view class="container shadow-10" />

      <div style="background-color:#020B3B;" class="container q-py-md absolute-bottom">
        <q-toolbar class="q-px-sm items-center">
          <div class="q-mx-lg" style="max-width:180px">
            <q-img style="width:162px" src="../../public/logo.png"></q-img>
          </div>
          <div class="q-mx-lg" style="max-width:180px">
            <q-img style="width:162px" src="../../public/fealac.png"></q-img>
          </div>
          <q-space />
          <div class="row full-width" align="right">
            <div class="col-12 q-col-gutter-md text-white" align="right">
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-twitter"
                @click="twitterLink()"
              ></q-icon>
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-facebook-f"
                @click="facebookLink()"
              ></q-icon>
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-youtube"
                @click="youtubeLink()"
              ></q-icon>
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-instagram"
                @click="instragramLink()"
              ></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-flickr" @click="flickrLink()"></q-icon>
              <q-icon
                class="cursor-pointer"
                size="30px"
                name="fab fa-invision"
                @click="linkedinLink()"
              ></q-icon>
            </div>
            <div class="col-12 q-py-sm q-px-md">
              <q-separator color="white"></q-separator>
            </div>
            <div class="col-12 q-px-md">
              <div class="row justify-between">
                <div class="text-white" @click="showAboutDialog()" style="text-decoration:none;">
                  <span class="cursor-pointer">About</span>
                </div>
                <div
                  to="/"
                  @click="toTradeEtools()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>Trade-etools</span>
                </div>
                <div
                  @click="toEscapTrade()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>ESCAP Trade</span>
                </div>
                <div
                  @click="toTradeEtoolsPolicy()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>ESCAP Trade Policy</span>
                </div>
                <div
                  @click="showTermOfUseDialog()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>Terms of use</span>
                </div>
              </div>
            </div>
          </div>
        </q-toolbar>
      </div>

      <q-dialog v-model="isShowAboutDialog">
        <q-card style="width:100%;min-width:750px;border-radius:30px">
          <q-card-section>
            <div
              class="row justify-center items-center bg-white q-pa-md text-h3"
              style="border-radius:10px;"
              align="center"
            >
              <div>
                <p class="font-graph">About</p>
                <div style="width:50%;border-bottom:2px solid #283891"></div>
                <p
                  class="font-content q-pt-md"
                >This online data visualization and distribution platform has been developed – with financial support from the Forum for East Asia-Latin America Cooperation and raw data provided by the Asian Development Bank from their Multi-Regional Input-Output database – with a focus on understanding global value chain linkages between Asia-Pacific and Latin American economies, in addition to more broadly understanding value-chain linkages between economies around the world.</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="isShowTermOfUseDialog">
        <q-card style="width:100%;min-width:750px;border-radius:30px">
          <q-card-section>
            <div
              class="row justify-center items-center bg-white q-pa-md text-h3"
              style="border-radius:10px;"
              align="center"
            >
              <div>
                <p class="font-graph">Terms of use</p>
                <div style="width:50%;border-bottom:2px solid #283891"></div>
                <p
                  class="font-content q-pt-md"
                  align="left"
                >All users may publish information taken directly or derived from the platform, on the condition that:</p>
                <ul class="font-content" align="left">
                  <li>The platform is acknowledged, cited as ESCAP-FEALAC Global Value Chain Portal, accessed (month year), available at https://</li>
                  <li>Any conclusions or analyses based on the data and visualizations provided are accompanied by a disclaimer stating that they are the responsibility of the authors and do not necessarily represent the opinion of the United Nations.</li>
                  <li>Any re-dissemination by third parties of the data based on data downloads which goes beyond the purpose of publication of analytical work must be approved by the United Nations Secretariat prior to such re-dissemination.</li>
                </ul>
                <div class="font-content" align="left">
                  Requests can be sent to:
                  <br />Trade, Investment and Innovation Division,
                  <br />United Nations ESCAP, Email: escap-tiid@un.org
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  data() {
    return {
      isShowAboutDialog: false,
      isShowTermOfUseDialog: false,
    };
  },
  methods: {
    showAboutDialog() {
      this.isShowAboutDialog = true;
    },
    showTermOfUseDialog() {
      this.isShowTermOfUseDialog = true;
    },
    twitterLink() {
      window.open("https://twitter.com/unescap", "_blank");
    },
    facebookLink() {
      window.open("https://www.facebook.com/UNESCAP", "_blank");
    },
    youtubeLink() {
      window.open("https://www.youtube.com/user/unescap", "_blank");
    },
    instragramLink() {
      window.open("https://www.instagram.com/unitednationsescap/", "_blank");
    },
    flickrLink() {
      window.open("https://www.flickr.com/photos/unitednationsescap", "_blank");
    },
    linkedinLink() {
      window.open(
        "https://www.linkedin.com/company/united-nations-escap/",
        "_blank"
      );
    },
    toEscapTrade() {
      window.open("https://artnet.unescap.org/databases", "_blank");
    },
    toTradeEtools() {
      window.open(
        "https://www.unescap.org/our-work/trade-investment-innovation",
        "_blank"
      );
    },
    toTradeEtoolsPolicy() {
      window.open(
        "https://www.unescap.org/our-work/trade-investment-innovation",
        "_blank"
      );
    },
  },
  mounted() {
    this.checkPlatform();
  },
};
</script>

<style >
.brx {
  border: 1px solid red;
}
</style>
