<template>
  <q-page class="bg-white">
    <!-- NOTE : Menu bar Header -->
    <q-toolbar class="text-primary q-pa-sm shadow-1">
      <div class="col q-px-md">
        <q-btn class="color4" flat round size="35px" dense icon="home" to="/" />
      </div>
      <q-space />
      <div class="col" align="center">
        <span class="font-header text-black">Download Data</span>
      </div>
    </q-toolbar>

    <!-- NOTE : Selected List -->
    <div class="q-pa-md q-mt-lg" v-if="!isModify">
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
          <q-scroll-area visible style="height: 200px;" class>
            <div
              class="border-bottom q-pa-sm"
              :class="index % 2 == 1 ? 'bg11' : null"
              v-for="(item,index) in indicatorList"
              :key="index"
            >{{item}}</div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Indicator','indicator')"
          ></q-btn>
        </div>
      </div>
      <!-- Exporting economy -->
      <div class="row q-mt-md justify-center">
        <div class="col-3 self-center q-pa-md" align="center">
          <span class="font-content">Exporting economy</span>
        </div>
        <div class="col-6 border" style="max-width: 400px;">
          <div class="q-pa-sm bg4">
            <span>Selected exporting economy</span>
          </div>
          <q-scroll-area visible style="height: 200px;" class>
            <div
              class="border-bottom q-pa-sm"
              :class="index % 2 == 1 ? 'bg11' : null"
              v-for="(item,index) in exportList"
              :key="index"
            >{{item}}</div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Exporting economy','exportting')"
          ></q-btn>
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
          <q-scroll-area visible style="height: 200px;" class>
            <div
              class="border-bottom q-pa-sm"
              :class="index % 2 == 1 ? 'bg11' : null"
              v-for="(item,index) in importingList"
              :key="index"
            >{{item}}</div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Importing economy','importing')"
          ></q-btn>
        </div>
      </div>

      <!-- Source economy (For FVA only) -->
      <div class="row q-mt-lg justify-center">
        <div class="col-3 self-center q-pa-md" align="center">
          <div>
            <span class="font-content">
              Source economy
              <br />(For FVA only)
            </span>
          </div>
        </div>
        <div class="col-6 border" style="max-width: 400px;">
          <div class="q-pa-sm bg4">
            <span>Selected Source economy (For FVA only)</span>
          </div>
          <q-scroll-area visible style="height: 200px;" class>
            <div
              class="border-bottom q-pa-sm"
              :class="index % 2 == 1 ? 'bg11' : null"
              v-for="(item,index) in sourceList"
              :key="index"
            >{{item}}</div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Source economy','source')"
          ></q-btn>
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
          <q-scroll-area visible style="height: 200px;" class>
            <div
              class="border-bottom q-pa-sm"
              :class="index % 2 == 1 ? 'bg11' : null"
              v-for="(item,index) in sectorList"
              :key="index"
            >{{item}}</div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Sector','sector')"
          ></q-btn>
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
          <q-scroll-area visible style="height: 200px;" class>
            <div
              class="border-bottom q-pa-sm"
              :class="index % 2 == 1 ? 'bg11' : null"
              v-for="(item,index) in yearList"
              :key="index"
            >{{item}}</div>
          </q-scroll-area>
        </div>

        <div class="col-3 self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Year','year')"
          ></q-btn>
        </div>
      </div>

      <div class="q-my-xl" style="padding-bottom:70px;" align="center">
        <q-btn
          class="bg4 font-content"
          label="Download"
          no-caps
          style="width:200px;border-radius:10px;"
        ></q-btn>
      </div>
    </div>

    <!-- NOTE : Modify -->
    <div class="q-pa-md" v-if="isModify">
      <div class="row justify-center">
        <!-- Modify Type -->
        <div class="col-11 q-pa-sm">
          <span class="font-graph">{{modifyContent}}</span>
        </div>
        <div class="col-5">
          <!-- Select Form -->
          <q-expansion-item
            class="bg4"
            header-class="q-pa-sm"
            dense
            dense-toggle
            expand-separato
            default-opened
            :label="modifySelectFormText"
          >
            <q-card class="border text-black">
              <q-scroll-area visible style="height: 200px;" class>
                <div
                  v-ripple
                  class="relative-position cursor-pointer"
                  :class="modifySelectDataList.includes(item) ? 'bg4' : null"
                  align="left"
                  v-for="(item,index) in modifyDataList"
                  :key="index"
                  style="padding:7px;"
                  @click="activeIndividual(item)"
                >{{item}}</div>
              </q-scroll-area>
            </q-card>
          </q-expansion-item>
        </div>

        <!-- Click Data to Draft -->
        <div class="col-1 self-center" style="width:70px;" align="center">
          <q-btn @click="clickDataToDraft()" label=">" dense class="bg4 q-px-sm"></q-btn>
        </div>

        <!-- Select Draft Data -->
        <div class="col-5 border">
          <div class="bg4 row" style="padding:10px;">
            <span>{{modifySelectDraftText}}</span>
            <q-space />
            <span @click="modifyDraftList = []" class="text-underline cursor-pointer">clear all</span>
          </div>
          <q-scroll-area visible style="height: 200px;">
            <div
              class="row border-bottom q-pa-sm"
              :class="index % 2 == 1 ? 'bg11' : null"
              v-for="(item,index) in modifyDraftList"
              :key="index"
            >
              <div>{{item}}</div>
              <q-space />
              <div class="q-pr-sm">
                <span
                  class="text-underline cursor-pointer"
                  @click="modifyDraftList.splice(modifyDraftList.indexOf(item),1)"
                >clear</span>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>

      <div class="q-pa-md q-mt-xl" align="center">
        <q-btn
          label="Cancel"
          style="width:200px;border-radius:10px;"
          outline
          class="q-mx-md font-content"
          no-caps
          @click="isModify = false"
        ></q-btn>
        <q-btn
          label="Save"
          style="width:200px;border-radius:10px;"
          class="q-mx-md font-content bg4"
          no-caps
          @click="saveData()"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      isModify: false,
      modifyType: "",
      modifyContent: "",
      modifySelectFormText: "",
      modifySelectDraftText: "",

      dataContriesList: [
        "Afghanistan -- AFG",
        "Albania -- ALB",
        "Andorra -- AND",
        "Angola -- AGO",
        "Anguila -- AIA",
        "Aruba -- ABW",
        "Australia -- AUS",
      ],
      dataSectorList: [
        "01 -- agriculture hunting forestry and fishing",
        "02 -- mining and quarrying",
        "03 -- food beverages and tabacco",
        "04 -- textiles and textile products",
        "05 -- leather leather products and footwear",
        "06 -- wood and products of wood and cork",
        "07 -- pulp paper paper products printing and publishing",
        "08 -- coke refined petroleum and nuclear fuel",
        "09 -- chemicals and chemical products",
      ],
      dataIndicatorList: [
        "Gross exports used in importer's comsumption (Imp_cons)",
        "Gross exports used in importer’s export production (Imp_exp) ",
        "Gross exports that return home and used in the exporter’s domestic consumption (Dom_cons)",
        "Double counted exports from repeated border crossings (Double)",
        "Imported content in gross exports (Imp_cont)",
        "Domestic value-added trade balance (DVA_tradebalance)",
        "Gross trade balance (Gross_tradebalance)",
        "GVC participation",
        "Backward linkages, all source countries (Back_link_country)",
        "Backward linkages, all exporting sectors (Back_link_sector)",
        "Forward linkages, all importing countries (Forward_link_country",
        "Forward linkages, all exporting sectors (Forward_link_sector)",
        "Gross exports (Gross_exports)",
      ],
      dataYearList: [
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
      ],

      modifyDataList: [],
      modifyDraftList: [],

      exportList: [],
      importingList: [],
      sourceList: [],
      sectorList: [],
      yearList: [],
      indicatorList: [],

      modifySelectDataList: [],
      modifySelectCountryList: [],
    };
  },
  methods: {
    saveData() {
      if (this.modifyType == "exportting") {
        this.exportList = this.modifyDraftList;
      } else if (this.modifyType == "importing") {
        this.importingList = this.modifyDraftList;
      } else if (this.modifyType == "source") {
        this.sourceList = this.modifyDraftList;
      } else if (this.modifyType == "sector") {
        this.sectorList = this.modifyDraftList;
      } else if (this.modifyType == "indicator") {
        this.indicatorList = this.modifyDraftList;
      } else {
        this.yearList = this.modifyDraftList;
      }

      this.notifyGreen("บันทึกข้อมูลแล้ว");
    },

    activeIndividual(val) {
      if (this.modifySelectDataList.includes(val)) {
        this.modifySelectDataList.splice(
          this.modifySelectDataList.indexOf(val),
          1
        );
      } else {
        this.modifySelectDataList.push(val);
      }
    },
    clickDataToDraft() {
      let temp = this.modifyDraftList;

      temp.push(...this.modifySelectDataList);

      temp = [...new Set(temp)];

      this.modifyDraftList = temp;

      this.modifySelectDataList = [];
    },
    editModify(name, type) {
      this.modifyContent = name;

      this.modifyType = type;

      if (type == "exportting") {
        this.modifyDraftList = this.exportList;
        this.modifyDataList = this.dataContriesList;

        this.modifySelectFormText = "Select from Individual Contries:";
        this.modifySelectDraftText = "Selected exporting economy";
      } else if (type == "importing") {
        this.modifyDraftList = this.importingList;
        this.modifyDataList = this.dataContriesList;

        this.modifySelectFormText = "Select from Individual Contries:";
        this.modifySelectDraftText = "Selected importing economy";
      } else if (type == "source") {
        this.modifyDraftList = this.sourceList;
        this.modifyDataList = this.dataContriesList;

        this.modifySelectFormText = "Select from Individual Contries:";
        this.modifySelectDraftText = "Selected source economy";
      } else if (type == "sector") {
        this.modifyDraftList = this.sectorList;
        this.modifyDataList = this.dataSectorList;

        this.modifySelectFormText = "Select from sector";
        this.modifySelectDraftText = "Selected sector(s)";
      } else if (type == "indicator") {
        this.modifyDraftList = this.indicatorList;
        this.modifyDataList = this.dataIndicatorList;

        this.modifySelectFormText = "indicator";
        this.modifySelectDraftText = "Selected indicator";
      } else {
        this.modifyDraftList = this.yearList;
        this.modifyDataList = this.dataYearList;

        this.modifySelectFormText = "year";
        this.modifySelectDraftText = "Selected Year(s)";
      }

      this.isModify = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid;
}

.border-bottom {
  border-bottom: 1px solid;
}

.text-underline {
  text-decoration: underline;
}
</style>
