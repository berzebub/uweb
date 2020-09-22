<template>
  <div>
    <q-page>
      <global-value-chains-header></global-value-chains-header>

      <global-value-chains-menu :activeMenu="4"></global-value-chains-menu>

      <!-- DROPDOWN SELECTION -->
      <div class="bg12" style="height:290px">
        <div class="row q-pt-md justify-center">
          <div class="col-3 q-px-md">
            <div>Exporting economy</div>
            <div>
              <q-select
                bg-color="white"
                v-model="exportingSelected"
                dense
                :options="exportingOptions"
                outlined
              >
                <template v-slot:selected-item="props">
                  <q-img :src="props.opt.flag" width="30px" />
                  <span class="q-mx-sm">{{props.opt.label}}</span>
                </template>
              </q-select>
            </div>
          </div>
          <div class="col-3 q-px-md">
            <div>Year</div>
            <div>
              <q-select
                outlined
                bg-color="white"
                v-model="yearSelected"
                dense
                :options="exportingOptions"
              ></q-select>
            </div>
          </div>
        </div>

        <div class="row q-pt-md justify-center">
          <div class="col-3 q-px-md">
            <div>Importing economy</div>
            <div>
              <q-select
                bg-color="white"
                v-model="importingSelected"
                dense
                :options="exportingOptions"
                outlined
              >
                <template v-slot:selected-item="props">
                  <q-img :src="props.opt.flag" width="30px" />
                  <span class="q-mx-sm">{{props.opt.label}}</span>
                </template>
              </q-select>
            </div>
          </div>
          <div class="col-3 q-px-md">
            <div>Source economy</div>
            <div>
              <q-select
                bg-color="white"
                v-model="sectorSelected"
                dense
                :options="exportingOptions"
                outlined
              ></q-select>
            </div>
          </div>
        </div>

        <div class="q-pt-md row justify-center">
          <div class="col-3 q-px-md" align="center">
            <q-btn no-caps style="background-color:#2C2F30" class="text-white fit font-20">
              select by Exporting
              <br />sector
            </q-btn>
          </div>
          <div class="col-3 q-px-md">
            <q-btn no-caps style="background-color:#2C2F30" class="text-white fit font-20">
              select by Source
              <br />economy
            </q-btn>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="row">
        <div class="col-3 full-height">
          <q-img class src="../../public/images/image-56.png"></q-img>
        </div>
        <div class="col q-py-lg" style="background-color:#E5E1E1">
          <p align="center" class="font-24">Why does GVC participation matter?</p>
          <div align="center" class="q-px-lg">
            <p
              align="left"
            >GVC participation matters for development. GVCs support efficient production and technology diffusion, and access to capital and inputs thereby increasing productivity and income growth, and reducing poverty.</p>
            <p
              align="left"
            >In addition, recent developments in digital technology are set to support integration of SMEs into GVCs, further amplifying sustainable outcomes from participation.</p>
          </div>
        </div>
      </div>
      <!-- GRAPH -->
      <!-- <div style="height:30px"></div>
    <div style="width:90%;margin:auto;max-width:1200px">
      <div align="center" class="q-pa-lg" v-if="!isChart">
        <q-spinner-pie color="primary" size="100px" />
      </div>
      <div v-show="isChart">
        <div id="container1"></div>
      </div>
      </div>-->
      <!-- FOOTER -->
      <my-footer></my-footer>
    </q-page>
  </div>
</template>

<script>
// new
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import myFooter from "../components/footer";
export default {
  components: {
    globalValueChainsHeader,
    globalValueChainsMenu,
    myFooter,
  },
  data() {
    return {
      // NEW
      exportingOptions: [
        {
          label: "Argentina",
          value: "ARG",
          flag:
            "https://www.iconfinder.com/data/icons/ensign-11/512/16_Ensign_Flag_Nation_Argentina-512.png",
        },

        {
          label: "United State",
          value: "USA",
          flag:
            "https://www.iconfinder.com/data/icons/ensign-11/512/274_Ensign_Flag_Nation_states-512.png",
        },
      ],
      exportingSelected: "",
      yearSelected: "",
      importingSelected: "",
      sectorSelected: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>