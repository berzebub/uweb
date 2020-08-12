<template>
  <q-page class="bg-white">
    <app-bar></app-bar>
    <p
      class="font-page q-py-md"
      align="center"
    >Let’s look at Thailand’s involvement in global value chains in 2017</p>

    <div class="row q-px-md">
      <!-- col1 -->
      <div class="col-3 q-px-sm">
        <div class="bdrs fit q-pa-md fit relative-position">
          <p align="center" class="text-weight-bold font-content">What about content of exports?</p>
          <p
            class="font-content"
          >Get an overview of value-added structure of Thailand’s exports. Compare across sub-regional partners. See how this changes perception of bilateral trade balances.</p>
          <div class="q-py-lg">
            <div class="absolute-bottom" style="width:190px;margin:auto;bottom:10px" align="center">
              <q-btn to="/structure-of-value-added" label="Let's go!" class="bg4 fit" no-caps></q-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- col2 -->
      <div class="col-3 q-px-sm">
        <div class="bdrs fit q-pa-md relative-position">
          <p align="center" class="text-weight-bold font-content">What about participation in GVCs?</p>
          <p
            class="font-content"
          >Get an overview of Thailand’s GVC related trade. Compare across sub-regional partners</p>
          <div class="q-py-lg">
            <div class="absolute-bottom" style="width:190px;margin:auto;bottom:10px" align="center">
              <q-btn to="/participation-in-gvcs" label="Let's go!" class="bg4 fit" no-caps></q-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- col3 -->
      <div class="col-3 q-px-sm">
        <div class="bdrs fit q-pa-md relative-position">
          <p align="center" class="text-weight-bold font-content">What about backward linkages?</p>

          <p
            class="font-content"
          >Find out where Thailand’s imported content comes from. Examine this by region and sector. Compare across sub-regional partners.</p>
          <div class="q-py-lg">
            <div class="absolute-bottom" style="width:190px;margin:auto;bottom:10px" align="center">
              <q-btn to="/backward-linkages-by-region" label="Let's go!" class="bg4 fit" no-caps></q-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- col4 -->
      <div class="col-3 q-px-sm">
        <div class="bdrs fit q-pa-md relative-position">
          <p align="center" class="text-weight-bold font-content">What about forward linkages?</p>
          <p
            class="font-content"
          >Find out where Thailand contributes towards export production. Examine this by region and sector. Compare across sub-regional partners.</p>
          <div class="q-py-lg">
            <div class="absolute-bottom" style="width:190px;margin:auto;bottom:10px" align="center">
              <q-btn to="/forward-linkages-by-region" label="Let's go!" class="bg4 fit" no-caps></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
export default {
  components: {
    appBar,
  },
};
</script>

<style>
.bdrs {
  border-radius: 5px;
  border: 1px solid;
}
</style>