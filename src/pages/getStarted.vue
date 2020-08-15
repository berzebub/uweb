<template>
  <q-page class="container bg-white" style="padding-bottom:100px">
    <app-bar
      @countrySelected="(val) => displayCountry = val "
      @yearSelected="(val) => displayYear = val "
      :isShowLogo="true"
      class="shadow-2"
    ></app-bar>

    <div class="relative-position q-my-md">
      <p class="font-page" align="center">{{ displayCountry }}'s key GVC relationships</p>
      <q-btn
        to="/involvement"
        no-caps
        class="bg4 absolute font-content"
        style="right:10px;top:0px;border-radius:10px;width:200px;"
        label="Continue"
      ></q-btn>
    </div>

    <!-- Country's key GVC relationships -->
    <div class="font-content q-px-xl q-pt-md" style="width:90%; margin:auto; max-width:1200px;">
      <p>
        <b>
          {{ displayCountry }}’s GVC exports amount to
          <span class="text-red">33% ($85 billion)</span>
          of its gross exports in {{displayYear}}
        </b>
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

      <div style="height:50px;"></div>
      <div style="max-width:1000px;margin:auto" class>
        <div class="row items-start justify-center">
          <div class style="width:300px" align="center">
            <div class="color1">
              <b>
                Imported content used in exports
                (Backward linkages)
              </b>
              <br />Share: 26% of gross exports
              <br />Value: $65 billion
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
              <br />Value: $18 billion
            </div>
          </div>
        </div>

        <div>
          <table style="width:840px;margin:auto;">
            <tr>
              <td style="width:120px;">
                <div style="border-radius:50%;width:100px;height:100px" class="bg1"></div>
              </td>
              <td align="center" style="width:160px;">
                <q-img style="width:150px" src="../../public/arrow-right-red.png"></q-img>
              </td>
              <td style="font-size:24px; width:290px;" align="center">{{ displayCountry }}</td>
              <td align="center" style="width:160px;">
                <q-img style="width:150px" src="../../public/arrow-right-green.png"></q-img>
              </td>
              <td style="width:120px;">
                <div style="border-radius:50%;width:50px;height:50px;" class="bg2"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div style="height:50px;"></div>
    <hr />

    <!-- Key GVC relationships by sector -->
    <div style="height:20px;"></div>
    <p class="font-graph q-py-md" align="center">key GVC relationships by sector</p>
    <div class="row q-pa-md" style="width:90%; margin:auto; max-width:1200px;">
      <div class="col-5">
        <div class="color4 font-content">
          <b>Backward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of foreign value-added in sectoral gross exports (%)
          <br />Foreign value-added (billions)
        </p>
      </div>
      <div class="col-5 offset-2">
        <div class="color4 font-content">
          <b>Forward linkages</b>
        </div>
        <span class="no-padding">
          <b>Sector</b>
        </span>
        <p>
          Share of contribution to partner exports, in sectoral gross exports (%)
          <br />Contribution to partner exports (billions)
        </p>
      </div>
    </div>
    <div class="row items-center" style="width:1100px;margin:auto;">
      <div>
        <q-img src="../../public/images/getStarted01.jpg" style="width:450px;"></q-img>
      </div>
      <div
        align="center"
        class="font-graph"
        style="width:120px; left: 15px;position:relative; top:-10px;"
      >{{ displayCountry }}</div>
      <div>
        <q-img src="../../public/images/getStarted02.jpg" style="width:450px;"></q-img>
      </div>
    </div>

    <div style="height:50px"></div>
    <hr />
    <div style="height:20px"></div>

    <!-- Key GVC relationships by economy -->
    <p class="font-graph q-py-md" align="center">key GVC relationships by economy</p>

    <div class="row q-pa-md" style="width:90%; margin:auto; max-width:1200px;">
      <div class="col-5">
        <div class="color4 font-content">
          <b>Backward linkages</b>
        </div>
        <span class="no-padding">
          <b>Source economy</b>
        </span>
        <p>
          Share of foreign value-added in sectoral gross exports (%)
          <br />Foreign value-added (billions)
        </p>
      </div>
      <div class="col-5 offset-2">
        <div class="color4 font-content">
          <b>Forward linkages</b>
        </div>
        <span class="no-padding">
          <b>Importing economy</b>
        </span>
        <p>
          Share of contribution to partner exports, in sectoral gross exports (%)
          <br />Contribution to partner exports (billions)
        </p>
      </div>
    </div>

    <div class="row items-center" style="width:1100px;margin:auto;">
      <div>
        <q-img src="../../public/images/getStarted03.jpg" style="width:450px;"></q-img>
      </div>
      <div
        align="center"
        class="font-graph"
        style="width:120px; left: 15px;position:relative; top:-10px;"
      >{{ displayCountry }}</div>
      <div>
        <q-img src="../../public/images/getStarted04.jpg" style="width:450px;"></q-img>
      </div>
    </div>

    <div style="height:20px"></div>
    <div class="q-px-md" align="right">
      <q-btn
        to="/involvement"
        no-caps
        class="bg4 font-content"
        style="border-radius:10px;width:200px;"
        label="Continue"
      ></q-btn>
    </div>

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
      displayYear: "",
    };
  },
  methods: {
    // countrySelected(val) {
    //   this.displayCountry = val;
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>