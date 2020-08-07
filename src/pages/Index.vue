<template>
  <q-page class>
    <!-- Regional Integration -->
    <div class="row q-pa-sm bg-white">
      <div class="col-3" style="width:300px;">
        <q-img :src="require('../../public/images/1.png')"></q-img>
      </div>
      <div class="col row q-px-lg q-py-md">
        <div class="col-12">
          <span class="text-h4 text-bold">Regional Integration</span>
          <div class="q-mt-xs" style="font-size:18px;">
            <span>ESCAP DigiSRII provides insights on the structure</span>
            <br />
            <span>and progress of regional integration in Asia-Pacific</span>
          </div>
        </div>
        <div class="col-12 self-end">
          <q-btn
            class="bg4 text-white q-mr-md q-py-xs"
            style="border-radius:10px;width:200px;"
            label="Get started"
            no-caps
          ></q-btn>
          <q-btn
            class="bg4 text-white q-mr-md q-py-xs"
            style="border-radius:10px;width:200px;"
            label="Download data"
            no-caps
          ></q-btn>
        </div>
      </div>
    </div>

    <!-- Global value chains -->
    <div class="row q-pa-sm bg-white" style="margin-top:10px;">
      <div class="col-3" style="width:300px;">
        <q-img :src="require('../../public/images/2.png')"></q-img>
      </div>
      <div class="col row q-px-lg q-py-md">
        <div class="col-12">
          <span class="text-h4 text-bold">Global value chains</span>
          <div class="q-mt-xs" style="font-size:18px;">
            <span>Gain insight into your economy’s participation in GVCs.</span>
            <br />
            <span>Uncover the sources of intermediate inputs and the</span>
            <br />
            <span>destinations of domestic value-added.</span>
          </div>
        </div>
        <div class="col-12 self-end">
          <q-btn
            class="bg4 text-white q-mr-md q-py-xs"
            style="border-radius:10px;width:200px;"
            label="Get started"
            no-caps
          ></q-btn>
          <q-btn
            class="bg4 text-white q-mr-md q-py-xs"
            style="border-radius:10px;width:200px;"
            label="Download data"
            no-caps
          ></q-btn>
          <q-btn
            class="bg4 text-white q-mr-md q-py-xs"
            style="border-radius:10px;width:200px;"
            label="Country briefs"
            no-caps
          ></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
};
</script>



