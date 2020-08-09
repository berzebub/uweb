<template>
  <q-page class="container bg-white">
    <!-- NOTE : Menu bar Header -->
    <q-toolbar class="text-primary q-pa-sm shadow-1">
      <div class="col q-px-md">
        <q-btn class="color4" flat round size="35px" dense icon="home" />
      </div>
      <q-space />
      <div class="col" align="center">
        <span class="font-header">Download Data</span>
      </div>
    </q-toolbar>

    <!-- NOTE : Selected List -->
    <div class="q-pa-md q-mt-lg" v-if="!isModify">
      <!-- Exporting economy -->
      <div class="row q-mt-md justify-center">
        <div class="col-3 self-center q-pa-md" align="center">
          <span class="font-content">Exporting economy</span>
        </div>
        <div class="col-6 border" style="max-width: 400px;">
          <div class="q-pa-sm bg4">
            <span>Selected exporting economy</span>
          </div>
          <q-scroll-area visible style="height: 200px;" class="">
            <div
              class="border-bottom q-pa-sm"
              :class="n % 2 == 0 ? 'bg11' : null"
              v-for="n in 10"
              :key="n"
            >
              Lorem ipsum
            </div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn class="bg4 q-px-sm" rounded label="Modify" no-caps></q-btn>
        </div>
      </div>

      <!-- Importing economy -->
      <div class="row q-mt-lg justify-center">
        <div class="col-3 self-center q-pa-md" align="center">
          <span class="font-content">Importing economy</span>
        </div>
        <div class="col-6 border" style="max-width: 400px;">
          <div class="q-pa-sm bg4">
            <span>Selected importing economy</span>
          </div>
          <q-scroll-area visible style="height: 200px;" class="">
            <div
              class="border-bottom q-pa-sm"
              :class="n % 2 == 0 ? 'bg11' : null"
              v-for="n in 10"
              :key="n"
            >
              Lorem ipsum
            </div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn class="bg4 q-px-sm" rounded label="Modify" no-caps></q-btn>
        </div>
      </div>

      <!-- Source economy (For FVA only) -->
      <div class="row q-mt-lg justify-center">
        <div class="col-3 self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Source economy<br />(For FVA only)</span>
          </div>
        </div>
        <div class="col-6 border" style="max-width: 400px;">
          <div class="q-pa-sm bg4">
            <span>Selected Source economy (For FVA only)</span>
          </div>
          <q-scroll-area visible style="height: 200px;" class="">
            <div
              class="border-bottom q-pa-sm"
              :class="n % 2 == 0 ? 'bg11' : null"
              v-for="n in 10"
              :key="n"
            >
              Lorem ipsum
            </div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn class="bg4 q-px-sm" rounded label="Modify" no-caps></q-btn>
        </div>
      </div>

      <!-- Sector -->
      <div class="row q-mt-lg justify-center">
        <div class="col-3 self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Sector</span>
          </div>
        </div>
        <div class="col-6 border" style="max-width: 400px;">
          <div class="q-pa-sm bg4">
            <span>Selected Sector(s)</span>
          </div>
          <q-scroll-area visible style="height: 200px;" class="">
            <div
              class="border-bottom q-pa-sm"
              :class="n % 2 == 0 ? 'bg11' : null"
              v-for="n in 10"
              :key="n"
            >
              Lorem ipsum
            </div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn class="bg4 q-px-sm" rounded label="Modify" no-caps></q-btn>
        </div>
      </div>

      <!-- Year -->
      <div class="row q-mt-lg justify-center">
        <div class="col-3 self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Year</span>
          </div>
        </div>
        <div class="col-6 border" style="max-width: 400px;">
          <div class="q-pa-sm bg4">
            <span>Selected Year(s)</span>
          </div>
          <q-scroll-area visible style="height: 200px;" class="">
            <div
              class="border-bottom q-pa-sm"
              :class="n % 2 == 0 ? 'bg11' : null"
              v-for="n in 10"
              :key="n"
            >
              Lorem ipsum
            </div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn class="bg4 q-px-sm" rounded label="Modify" no-caps></q-btn>
        </div>
      </div>

      <!-- Indicator -->
      <div class="row q-mt-lg justify-center">
        <div class="col-3 self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Indicator</span>
          </div>
        </div>
        <div class="col-6 border" style="max-width: 400px;">
          <div class="q-pa-sm bg4">
            <span>Selected Indicator</span>
          </div>
          <q-scroll-area visible style="height: 200px;" class="">
            <div
              class="border-bottom q-pa-sm"
              :class="n % 2 == 0 ? 'bg11' : null"
              v-for="n in 10"
              :key="n"
            >
              Lorem ipsum
            </div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn class="bg4 q-px-sm" rounded label="Modify" no-caps></q-btn>
        </div>
      </div>

      <div class="q-my-xl" align="center">
        <q-btn
          class="bg4"
          label="Download"
          style="width:170px;border-radius:10px;"
        ></q-btn>
      </div>
    </div>

    <!-- NOTE : Modify -->
    <div class="q-pa-md q-mt-lg brx" v-if="isModify">
      <div class="row">
        <div class="col-12">
          <span class="font-graph">
            Exporting economy
          </span>
        </div>
        <div class="col brx"></div>

        <div class="col-1 brx" style="width:70px;" align="center">
          5
        </div>

        <div class="col brx"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      isModify: true
    };
  }
};
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid;
}

.border-bottom {
  border-bottom: 1px solid;
}
</style>
