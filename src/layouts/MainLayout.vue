<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="relative-position">
      <router-view class="container shadow-10" />

      <div class="absolute-bottom footer-bg container">
        <div style="height:55px;background-color:rgba(0,0,0,0.45);border-bottom:2px solid white">
          <div class="row q-pr-lg justify-end items-center fit">
            <div style="width:90px" align="right">
              <img style="width:32px" src="../../public/fb-ico.png" alt />
            </div>
            <div style="width:90px" align="right">
              <img style="width:32px" src="../../public/twitter-ico.png" alt />
            </div>
            <div style="width:90px" align="right">
              <img style="width:32px" src="../../public/linkin-ico.png" alt />
            </div>
          </div>
        </div>
        <q-toolbar
          style="border-bottom:1px solid white"
          class="q-px-sm q-pb-sm q-pt-sm items-center"
        >
          <div class="q-mx-lg cursor-pointer" @click="toUnescap()" style="max-width:180px">
            <q-img style="width:162px" src="../../public/logo.png"></q-img>
          </div>
          <div class="q-mx-lg cursor-pointer" @click="toFealac()" style="max-width:180px">
            <q-img style="width:162px" src="../../public/fealac.png"></q-img>
          </div>
          <q-space />
          <div class="row full-width" align="right">
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
                  <span>
                    <q-tooltip content-class="bg-indigo">
                      <span class="text-subtitle1">ESCAP Trade, Investment and Innovation Division</span>
                    </q-tooltip>ESCAP TIID
                  </span>
                </div>
                <div
                  @click="toTradeEtoolsPolicy()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>
                    <q-tooltip content-class="bg-indigo" style="font-size:14px">
                      <span class="text-subtitle1">ESCAP Trade Policy and Integration</span>
                    </q-tooltip>ESCAP TPI
                  </span>
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
        <div class="flex items-center" style="min-height:90px;background-color:rgba(0,0,0,0.45)">
          <div class="row text-white q-py-sm" style="padding-left:35px">
            <div class="col-6">
              <div class="font-footer">CONTACT US</div>
              <div style="font-size:12px">
                The Trade, Investment and Innovation Division of the United Nations Economic
                and Social Commission for Asia and the Pacific, located in Bangkok, Thailand. For questions, please contact us at escap-xxx@un.org or visit www.unescap.org
              </div>
            </div>
            <div class="col-6">
              <div class="font-footer">DESCLAIMER</div>
              <div style="font-size:12px">
                This portal is currently in a testing-phase and is best viewed on desktop devices in
                modern web browsers such as Firefox and Chrome with JavaScript enabled.
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-dialog v-model="isShowAboutDialog">
        <q-card style="width:100%;min-width:750px;border-radius:15px">
          <q-card-section>
            <div class="bg-white q-pa-md" style="border-radius:10px;" align="center">
              <div>
                <p class="font-graph">About</p>
                <div style="width:90%;border-bottom:2px solid #283891"></div>
                <div style="height:20px"></div>
                <span
                  class="font-content"
                >This online data visualization and distribution platform has been developed with a focus on understanding global value chain linkages between Asia-Pacific and Latin American economies, in addition to more broadly understanding value-chain linkages between economies around the world.</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="isShowTermOfUseDialog">
        <q-card style="width:100%;min-width:750px;border-radius:15px">
          <q-card-section>
            <div
              class="row justify-center items-center bg-white q-pa-md"
              style="border-radius:10px;"
              align="center"
            >
              <div>
                <p class="font-graph">Terms of use</p>
                <div style="width:90%;border-bottom:2px solid #283891"></div>
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
    toFealac() {
      window.open("https://www.fealac.org/new/m/index.do");
    },
    toUnescap() {
      window.open("https://www.unescap.org");
    },
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
      window.open("https://unescap.org/our-work/trade-investment-innovation");
    },
    toTradeEtools() {
      window.open("https://artnet.unescap.org/databases");
    },
    toTradeEtoolsPolicy() {
      window.open(
        "https://www.unescap.org/our-work/trade-investment-innovation/trade-policy"
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
.footer-bg {
  background-image: url("../../public/footer.png");
  background-size: inherit;
  background-position: bottom;
}
</style>
