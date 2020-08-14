<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <app-bar @countrySelected="(val) => displayCountry = val " :isShowLogo="true" class="shadow-2"></app-bar>

    <div class="relative-position q-my-md">
      <p class="font-page" align="center">{{ displayCountry }}'s key GVC relationships</p>
      <q-btn
        to="/involvement"
        no-caps
        class="bg4 absolute"
        style="right:10px;top:0px;width:190px"
        label="Continue"
      ></q-btn>
    </div>

    <div class="font-content q-px-xl q-pt-md">
      <p>
        Thailand’s GVC exports amount to
        <span class="text-red">33% ($85 billion)</span> of its gross exports in 2017
      </p>
      <p>
        Imported content comprising
        <span class="text-red">26% ($67 billion)</span> of gross exports
      </p>
      <p>
        Export of intermediates used in further export production comprising
        <span
          class="text-red"
        >7% ($18 billion)</span> of gross exports
      </p>

      <!-- <div style="width:100%;margin:auto" class="q-py-md relative-position brx" align="center">
        <div class="row items-center justify-center">
          <div class style="width:320px">
            <div class="color1">
              <b>
                Imported content used in exports
                (Backward linkages)
              </b>
              <br />Share: 26% of gross exports
              Value: $65 billion
            </div>
            <div style="border-radius:50%;width:100px;height:100px" class="bg1"></div>
          </div>

          <div class="brx row col">
            <div>
              <q-img style="width:150px" src="../../public/arrow-right-red.png"></q-img>
            </div>
            <div class="q-px-md" style="font-size:36px">{{ displayCountry }}</div>
            <div>
              <q-img style="width:150px" src="../../public/arrow-right-green.png"></q-img>
            </div>
          </div>

          <div style="width:320px">
            <div class="color2">
              <b>
                Export of intermediates used in
                export production
                (Forward linkages)
              </b>
              <br />Share: 7% of gross exports
              Value: $18 billion
            </div>
            <div style="border-radius:50%;width:60px;height:60px" class="bg2"></div>
          </div>
        </div>
      </div>-->

      <div style="max-width:1000px;margin:auto" class>
        <div class="row items-start justify-center">
          <div class style="width:300px" align="center">
            <div class="color1">
              <b>
                Imported content used in exports
                (Backward linkages)
              </b>
              <br />Share: 26% of gross exports
              Value: $65 billion
            </div>
          </div>
          <div class="col"></div>
          <div class style="width:300px" align="center">
            <div class="color2">
              <b>
                Export of intermediates used in
                export production
                (Forward linkages)
              </b>
              <br />Share: 7% of gross exports
              Value: $18 billion
            </div>
          </div>
        </div>

        <div class="row items-end justify-center">
          <div style="width:300px;" align="center" class="relative-position">
            <div style="border-radius:50%;width:100px;height:100px" class="bg1"></div>
            <div class="absolute-right" style="right :-80px;top:30px">
              <q-img style="width:150px" src="../../public/arrow-right-red.png"></q-img>
            </div>
          </div>
          <div class="col" align="center">
            <div class="relative-position" style="top:-12px">
              <p style="font-size:36px">{{ displayCountry }}</p>
            </div>
          </div>
          <div style="width:300px" class="relative-position" align="center">
            <div class="absolute-right" style="left :-320px;top:30px">
              <q-img style="width:150px" src="../../public/arrow-right-green.png"></q-img>
            </div>
            <div style="border-radius:50%;width:100px;height:100px" class="bg2"></div>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="row q-pa-md">
      <div class="col-5">
        <div class="color4">
          <b>Backward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of foreign value-added in sectoral gross exports (%)
          Foreign value-added (billions)
        </p>
      </div>
      <div class="col-5 offset-2">
        <div class="color4">
          <b>Forward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of contribution to partner exports, in sectoral gross exports (%)
          Contribution to partner exports (billions)
        </p>
      </div>
    </div>

    <p class="font-graph q-py-md" align="center">key GVC relationships byt sector</p>

    <div align="center">
      <q-img style="width:90%;max-width:900px" src="../../public/getStarted2.png"></q-img>
    </div>
    <div style="height:20px"></div>
    <hr />
    <div style="height:20px"></div>

    <!-- *********** -->
    <p class="font-graph q-py-md" align="center">key GVC relationships by economy</p>

    <div class="row q-pa-md">
      <div class="col-5">
        <div class="color4">
          <b>Backward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of foreign value-added in sectoral gross exports (%)
          Foreign value-added (billions)
        </p>
      </div>
      <div class="col-5 offset-2">
        <div class="color4">
          <b>Forward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of contribution to partner exports, in sectoral gross exports (%)
          Contribution to partner exports (billions)
        </p>
      </div>
    </div>
    <div align="center">
      <q-img style="width:90%;max-width:900px" src="../../public/getStarted2.png"></q-img>
    </div>
    <div style="height:20px"></div>
    <div class="q-px-md" align="right">
      <q-btn to="/involvement" no-caps class="bg4" style="width:190px" label="Continue"></q-btn>
    </div>
    <hr />
    <div style="height:20px"></div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import Axios from "axios";
export default {
  components: {
    appBar,
  },
  data() {
    return {
      displayCountry: "",
    };
  },
  methods: {
    countrySelected(val) {
      this.displayCountry = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>