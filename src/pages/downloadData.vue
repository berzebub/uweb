<template>
  <q-page class="bg-white">
    <!-- NOTE : Menu bar Header -->
    <q-toolbar class="text-primary q-pa-sm shadow-1">
      <div class="col q-px-md">
        <q-btn class="color4" flat round size="35px" dense icon="home" to="/" />
      </div>
      <q-space />
      <div class="col q-pr-md" align="right">
        <span class="font-header text-black">Download Data</span>
      </div>
    </q-toolbar>

    <!-- NOTE : Selected List -->
    <div class="q-pa-md q-mt-lg" v-if="!isModify">
      <!-- Indicator -->
      <div class="row q-mt-lg justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Indicator</span>
          </div>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected Indicator (Max 5 indicators)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in indicatorList"
                :key="index"
              >{{ item.label }}</div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Indicator', 'indicator')"
          ></q-btn>
        </div>
      </div>
      <!-- Exporting economy -->
      <div class="row q-mt-md justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <span class="font-content">Exporting economy</span>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected exporting economy (Max 5 economies)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in exportList"
                :key="index"
              >{{ item.label }}</div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Exporting economy', 'exportting')"
          ></q-btn>
        </div>
      </div>

      <!-- Importing economy -->
      <div class="row q-mt-lg justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <span class="font-content">Importing economy</span>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected importing economy (Max 5 economies)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in importingList"
                :key="index"
              >{{ item.label }}</div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Importing economy', 'importing')"
          ></q-btn>
        </div>
      </div>

      <!-- Source economy (For FVA only) -->
      <div class="row q-mt-lg justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <div>
            <span class="font-content">
              Source economy
              <br />(For FVA only)
            </span>
          </div>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4 relative-position">
              <span>Selected Source economy (Max 5 economies)</span>
              <span
                class="absolute-right flex flex-center q-pr-md"
                align="right"
              >Back_link_sector only</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in sourceList"
                :key="index"
              >{{ item.label }}</div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Source economy', 'source')"
          ></q-btn>
        </div>
      </div>

      <!-- Sector -->
      <div class="row q-mt-lg justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Sector</span>
          </div>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected Sector(s) (Max 5 sectors)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in sectorList"
                :key="index"
              >{{ item.label }}</div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Sector', 'sector')"
          ></q-btn>
        </div>
      </div>

      <!-- Year -->
      <div class="row q-mt-lg justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Year</span>
          </div>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected Year(s)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in yearList"
                :key="index"
              >{{ item.label }}</div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Year', 'year')"
          ></q-btn>
        </div>
      </div>

      <div class="q-my-xl row justify-center" style="padding-bottom:70px;" align="center">
        <div class="q-pr-md">
          <q-btn
            class="font-content"
            outline
            label="Clear All"
            no-caps
            style="width:200px;border-radius:10px;"
            @click="clearAllData()"
          ></q-btn>
        </div>
        <div class="q-pl-md">
          <q-btn
            class="bg4 font-content"
            label="Download"
            no-caps
            style="width:200px;border-radius:10px;"
          ></q-btn>
        </div>
      </div>
    </div>

    <!-- NOTE : Modify -->
    <div class="q-pa-md" v-if="isModify">
      <div class="row justify-center">
        <!-- Modify Type -->
        <div class="col-11 q-pa-sm">
          <span class="font-graph">{{ modifyContent }}</span>
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
                  v-for="(item, index) in modifyDataList"
                  :key="index"
                  style="padding:7px;border-bottom:1px solid #EDEDED"
                  @click="activeIndividual(item)"
                >{{ item.label }}</div>
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
            <span>{{ modifySelectDraftText }}</span>
            <q-space />
            <span @click="clearAllSelectedData()" class="text-underline cursor-pointer">clear all</span>
          </div>
          <q-scroll-area visible style="height: 200px;">
            <div
              class="row border-bottom q-pa-sm"
              :class="index % 2 == 1 ? 'bg11' : null"
              v-for="(item, index) in modifyDraftList"
              :key="index"
            >
              <div>{{ item.label }}</div>
              <q-space />
              <div class="q-pr-sm">
                <span class="text-underline cursor-pointer" @click="clearSelectData(item) ">clear</span>
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

    <q-dialog v-model="isShowExceededQuotaDialog">
      <q-card style="width:400px;">
        <div class="bg4 q-py-sm" align="center" style="font-size:20px">Exceeded Quota</div>
        <q-card-section class="q-py-lg">
          <div align="center" style="font-size:16px">{{ errorExceededQuotaMessage }}</div>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-lg">
          <q-btn class="bg4 font-content" style="width:150px" v-close-popup label="ok"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Axios from "axios";
import sectorJson from "../../public/sector.json";

export default {
  data() {
    return {
      countryOptions: "",
      errorExceededQuotaMessage: "",
      sectorOptions: "",
      isModify: false,
      modifyType: "",
      modifyContent: "",
      modifySelectFormText: "",
      modifySelectDraftText: "",

      dataIndicatorList: [
        {
          label: "Gross exports used in importer's comsumption (Imp_cons)",
          index: 0,
        },
        {
          label: "Gross exports used in importer’s export production (Imp_exp)",
          index: 1,
        },
        {
          label:
            "Gross exports that return home and used in the exporter’s domestic consumption (Dom_cons)",
          index: 2,
        },
        {
          label:
            "Double counted exports from repeated border crossings (Double)",
          index: 3,
        },
        {
          label: "Imported content in gross exports (Imp_cont)",
          index: 4,
        },
        {
          label: "Domestic value-added trade balance (DVA_tradebalance)",
          index: 5,
        },
        {
          label: "Gross trade balance (Gross_tradebalance)",
          index: 6,
        },
        {
          label: "GVC participation",
          index: 7,
        },
        {
          label: "Backward linkages, all source countries (Back_link_country)",
          index: 8,
        },
        {
          label: "Backward linkages, all exporting sectors (Back_link_sector)",
          index: 9,
        },
        {
          label:
            "Forward linkages, all importing countries (Forward_link_country)",
          index: 10,
        },
        {
          label:
            "Forward linkages, all exporting sectors (Forward_link_sector)",
          index: 11,
        },
        {
          label: "Gross exports (Gross_exports)",
          index: 12,
        },
      ],
      dataYearList: [],

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
      isShowExceededQuotaDialog: false,
    };
  },
  methods: {
    clearAllData() {
      this.exportList = [];
      this.importingList = [];
      this.indicatorList = [];
      this.sourceList = [];
      this.yearList = [];
      this.sectorList = [];
    },
    saveData() {
      if (this.modifyType == "exportting") {
        this.exportList = [...this.modifyDraftList];
      } else if (this.modifyType == "importing") {
        this.importingList = [...this.modifyDraftList];
      } else if (this.modifyType == "source") {
        this.sourceList = [...this.modifyDraftList];
      } else if (this.modifyType == "sector") {
        this.sectorList = [...this.modifyDraftList];
      } else if (this.modifyType == "indicator") {
        this.indicatorList = [...this.modifyDraftList];
      } else {
        this.yearList = [...this.modifyDraftList];
      }
      this.isModify = false;
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
      this.modifySelectDataList.forEach((element) => {
        let findIndex = this.modifyDataList.findIndex(
          (x) => x.index == element.index
        );
        this.modifyDataList.splice(findIndex, 1);

        this.modifyDraftList.push(element);
      });
      this.modifySelectDataList = [];
    },
    clearAllSelectedData() {
      this.modifyDraftList = [];

      let _this = this;
      function getCountry() {
        let temp = [];
        _this.countryOptions.forEach((element) => {
          temp.push({
            index: Number(element.index),
            label: element.label + " -- " + element.iso,
          });
        });
        return temp;
      }
      if (this.modifyType == "exportting") {
        this.modifyDataList = getCountry();
      } else if (this.modifyType == "importing") {
        this.modifyDataList = getCountry();
      } else if (this.modifyType == "source") {
        this.modifyDataList = getCountry();
      } else if (this.modifyType == "sector") {
        let finalData = [];
        sectorJson.forEach((element) => {
          finalData.push({
            ...element,
            index: element.id,
            label: element.name,
          });
        });
        this.modifyDataList = finalData;
      } else if (this.modifyType == "indicator") {
        this.modifyDataList = [...this.dataIndicatorList];
      } else {
        this.modifyDataList = [...this.dataYearList];
      }
    },
    clearSelectData(item) {
      let findIndex = this.modifyDraftList.findIndex(
        (x) => x.index == item.index
      );
      this.modifyDraftList.splice(findIndex, 1);

      this.modifyDataList.push(item);

      this.modifyDataList.sort((a, b) => a.index - b.index);
    },
    editModify(name, type) {
      let _this = this;
      function getCountry() {
        let temp = [];
        _this.countryOptions.forEach((element) => {
          temp.push({
            index: Number(element.index),
            label: element.label + " -- " + element.iso,
          });
        });
        return temp;
      }
      this.modifyContent = name;

      this.modifyType = type;

      if (type == "exportting") {
        this.modifyDraftList = [...this.exportList];
        this.modifyDataList = getCountry();

        this.modifySelectFormText = "Select from Individual Contries:";
        this.modifySelectDraftText = "Selected exporting economy";
      } else if (type == "importing") {
        this.modifyDraftList = [...this.importingList];
        this.modifyDataList = getCountry();
        this.modifySelectFormText = "Select from Individual Contries:";
        this.modifySelectDraftText = "Selected importing economy";
      } else if (type == "source") {
        this.modifyDraftList = [...this.sourceList];
        this.modifyDataList = getCountry();

        this.modifySelectFormText = "Select from Individual Contries:";
        this.modifySelectDraftText = "Selected source economy";
      } else if (type == "sector") {
        this.modifyDraftList = [...this.sectorList];
        let finalData = [];
        sectorJson.forEach((element) => {
          finalData.push({
            ...element,
            index: element.id,
            label: element.name,
          });
        });
        this.modifyDataList = finalData;
        this.modifySelectFormText = "Select from sector";
        this.modifySelectDraftText = "Selected sector(s)";
      } else if (type == "indicator") {
        this.modifyDraftList = [...this.indicatorList];
        this.modifyDataList = [...this.dataIndicatorList];
        this.modifySelectFormText = "indicator";
        this.modifySelectDraftText = "Selected indicator";
      } else {
        this.modifyDraftList = [...this.yearList];
        this.modifyDataList = [...this.dataYearList];

        this.modifySelectFormText = "year";
        this.modifySelectDraftText = "Selected Year(s)";
      }

      this.isModify = true;
    },
    getYear() {
      let url = "https://thaiawesomedev.com";
    },
  },
  mounted() {
    this.getSectorList();
    this.getCountryList();
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
