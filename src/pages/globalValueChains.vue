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
                to="/gvc-links"
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
    <global-value-chains-header></global-value-chains-header>
    <!-- MENU -->
    <div class="q-pa-md">
      <div class="row q-pb-md">
        <div
          @mouseenter="hoverOnCard(index)"
          @mouseleave="deactiveHoverCard()"
          @click="cardClick(card.router)"
          v-for="(card,index) in cardList1"
          :key="index"
          class="col-4 cursor-pointer q-pa-md"
          align="center"
        >
          <div
            style="padding:30px"
            class="menu-card card-color shadow-5"
            v-show="hoverActiveIndex != index"
          >
            <div align="center" class>
              <q-icon size="76px" name="far fa-user-circle"></q-icon>
            </div>
            <div class="q-pt-lg font-16" align="center">{{card.text}}</div>
          </div>

          <div
            class="q-pa-md menu-card card-hover-color shadow-5"
            v-show="hoverActiveIndex == index"
          >
            <div class="font-20 text-white" align="center">{{card.text}}</div>

            <div class="font-16 text-white q-pt-md">{{ card.hover }}</div>
          </div>
        </div>
      </div>

      <q-separator color="black" />

      <div class="row q-pt-md">
        <div
          v-for="(card,index) in cardList2"
          :key="index"
          class="col-4 cursor-pointer q-pa-md"
          align="center"
          @mouseenter="hoverOnCard2(index)"
          @mouseleave="deactiveHoverCard()"
          @click="cardClick(card.router)"
        >
          <div
            class="menu-card card-color shadow-5"
            style="padding:30px"
            v-show="hoverActiveIndex2 != index"
          >
            <div align="center" class>
              <q-icon size="76px" name="far fa-user-circle"></q-icon>
            </div>
            <div class="q-pt-lg font-16" align="center">{{card.text}}</div>
          </div>

          <div
            class="q-pa-md menu-card card-hover-color shadow-5"
            v-show="hoverActiveIndex2 == index"
          >
            <div class="font-20 text-white" align="center">{{card.text}}</div>

            <div class="font-16 text-white q-pt-md">{{ card.hover }}</div>
          </div>
        </div>
      </div>
    </div>
    <myFooter></myFooter>
  </q-page>
</template>

<script>
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import myFooter from "../components/footer";
export default {
  components: {
    globalValueChainsHeader,
    myFooter,
  },
  data() {
    return {
      hoverActiveIndex: null,
      hoverActiveIndex2: null,
      cardList1: [
        {
          icon: "",
          text: "What about key GVC relationships?",
          hover:
            "Get an overview of key backward and forward linkages for your economy of choice.",
          router: "/gvc-links",
        },
        {
          icon: "",
          text: "What about content of exports",
          hover:
            "Get an overview of value-added export structure for your economy of choice. See how this changes perception of bilateral trade balances",
          router: "/structure-of-value-added",
        },
        {
          icon: "",
          text: "What about participation in GVCs",
          hover:
            "Get an overview of value-added export structure for your economy of choice. See how this changes perception of bilateral trade balances",
          router: "/participation-in-gvcs",
        },
        {
          icon: "",
          text: "What about backward linkages?",
          hover:
            "Find out where imported content used in exports comes from for your economy of choice. Examine this by region and sector. Compare across sub-regional partners ",
          router: "",
        },
        {
          icon: "",
          text: "What about forward linkages?",
          hover:
            "Find out where your economy of choice contributes towards export production. Examine this by region and sector. Compare across sub-regional partners ",
          router: "",
        },
      ],
      cardList2: [
        {
          icon: "",
          text: "Download data",
          hover:
            "Find out where your economy of choice contributes towards export production. Examine this by region and sector. Compare across sub-regional partners ",
          router: "/download",
        },
        {
          icon: "",
          text: "Country briefs",
          hover:
            "Find out where your economy of choice contributes towards export production. Examine this by region and sector. Compare across sub-regional partners ",
          router: "",
        },
      ],
    };
  },
  methods: {
    hoverOnCard(index) {
      this.hoverActiveIndex = index;
    },
    deactiveHoverCard() {
      this.hoverActiveIndex = null;
      this.hoverActiveIndex2 = null;
    },
    hoverOnCard2(index) {
      this.hoverActiveIndex2 = index;
    },
    cardClick(router) {
      console.log(router);
      this.$router.push(router);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../public/bg-global-value.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.menu-card {
  min-width: 270px;
  width: 100%;
  margin: auto;
  height: 227px;
  border-radius: 5px;
}
.card-color {
  background-color: #e5e1e1;
}
.card-hover-color {
  background: #020b3b;
}
</style>