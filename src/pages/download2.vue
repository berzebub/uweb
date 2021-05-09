<template>
  <q-page>
    <global-value-chains-header :isShowTinaLink="false" :isDisableShare="false"></global-value-chains-header>
    <div class="row">
      <!-- indicator -->
      <div style="width:235px" class>
        <img style="width:100%" class="full-height" src="../../public/download-side.png" alt />
      </div>
      <div class="col q-pa-lg" style="background-color:#E5E1E1">
        <div style="width:90%;max-width:1200px; margin:auto;">
          <p align="center" class="font-24">Download data</p>
          <p>
            Query and download detailed data on value-added trade indicators for
            your economies, sectors and years of interest. Please make your
            desired selection from the menus below.
          </p>
        </div>

        <div
          class="bg-white q-pb-lg rounded-borders"
          style="width:90%;max-width:1200px; margin:auto;"
        >
          <!-- //header name and logout -->
          <div
            class="row q-mb-md"
            style="height:40px;background-color:#2C2F30;color:white; line-height:40px; border-radius:5px 5px 0px 0px;"
          >
            <div class="col q-px-lg" align="left" style="  text-decoration: underline;">{{ email }}</div>
            <div class="col q-px-lg" align="right">
              <q-icon name="fas fa-sign-out-alt" size="sm" />
            </div>
          </div>

          <!-- menu open save and economy group -->
          <div class="row">
            <div class="col q-pl-lg" align="left">
              <q-icon
                name="fas fa-folder-open"
                size="md"
                class="cursor-pointer"
                @click="isShowQueryList = true"
              />
              <q-icon
                name="fas fa-save"
                size="md"
                class="q-px-lg cursor-pointer"
                @click="isEditQuery = false,query = '',isShowSaveQuery = true,queryIndexTemp = ''"
              />
            </div>
            <div align="right" class="q-px-lg q-pb-sm col">
              <q-btn
                @click="isShowEconomyGroupDialog = true"
                label="Economy group"
                style="width:150px;background-color:#2C2F30;color:white"
                no-caps
              ></q-btn>
            </div>
          </div>

          <hr />
          <div class="q-px-lg">
            <div>
              <q-select
                v-model="indicator"
                :options="indicatorList"
                label="indicator (select one)"
                emit-value
                map-options
                @input="resetDownloadState()"
              />
            </div>

            <!-- exporting country -->
            <div>
              <q-select
                v-model="exporting"
                :options="countryList"
                label="Exporting economy"
                multiple
                emit-value
                map-options
                use-chips
                @input="resetDownloadState()"
              />
            </div>
            <!-- importing country -->
            <div>
              <q-select
                v-show="indicator != 'Forward_link_country'"
                v-model="importing"
                :options="countryList"
                label="Importing economy"
                multiple
                emit-value
                map-options
                use-chips
                @input="resetDownloadState()"
              />
            </div>
            <!-- Sector -->
            <div>
              <q-select
                v-show="
                indicator != 'Back_link_sector' &&
                  indicator != 'Forward_link_sector'
              "
                v-model="sector"
                :options="sectorList"
                label="Exporting sector"
                multiple
                emit-value
                map-options
                use-chips
                @input="resetDownloadState()"
              />
            </div>
            <!-- Source country -->
            <div>
              <q-select
                v-show="indicator == 'Back_link_sector'"
                v-model="source"
                :options="countryList"
                label="Source economy"
                multiple
                emit-value
                map-options
                use-chips
                @input="resetDownloadState()"
              />
            </div>
            <!-- year -->
            <div>
              <q-select
                @input="resetDownloadState()"
                v-model="year"
                use-chips
                :options="yearList"
                label="Year"
                multiple
              />
            </div>
            <div class="row q-mt-md">
              <div class="col-12 row justify-center q-col-gutter-md" align="center">
                <div>
                  <q-btn
                    label="Clear All"
                    outline
                    no-caps
                    style="width:150px;"
                    @click="clearBtn()"
                  />
                </div>
                <div>
                  <download-csv
                    v-if="isShowDownloadBtn"
                    class="bg-secondary text-white cursor-pointer"
                    style="width:150px;border-radius:3px;height:35px;line-height:35px;"
                    :data="downloadData"
                    ref="downloadData"
                    @click="test()"
                  >Download Data</download-csv>

                  <q-btn
                    v-else
                    label="Generate"
                    no-caps
                    style="width:150px;background-color:#2C2F30;"
                    class="text-white"
                    @click="runBtn()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Dialog -->
    <q-dialog v-model="isLogin" persistent>
      <q-card style="width:450px; height:370px; ">
        <div style="background-color:#2C2F30" class="q-pa-sm" align="center">
          <img src="../assets/logodialog.png" alt />
        </div>
        <div class="q-pa-md" align="center">Please log in to access the download data page</div>
        <div class="q-px-lg">
          <q-form @submit="signIn()">
            <div>
              <q-input
                outlined
                v-model="login.email"
                label="Email"
                dense
                type="email"
                :rules="[val => !!val]"
                ref="password"
                hide-bottom-space
              />
            </div>
            <div class="q-pt-md q-pb-sm">
              <q-input
                v-model="login.password"
                dense
                label="Password"
                outlined
                :type="isPwd ? 'password' : 'text'"
                hide-bottom-space
                :rules="[val => !!val]"
                ref="password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div style="text-decoration:underline" align="right">Forgot password?</div>
            <div>
              <q-btn
                type="submit"
                label="Log in"
                style="width:400px;background-color:#2C2F30;color:white"
                no-caps
                class="q-mt-md"
              ></q-btn>
            </div>
            <div align="center" class="q-pt-lg">
              Not a Riva member?
              <span
                style="color:#2381B8;text-decoration:underline"
                @click="isSignUp = true,isLogin = false"
                class="cursor-pointer"
              >Sign up for a free account</span>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

    <!-- Sign up dialog -->
    <q-dialog v-model="isSignUp" persistent>
      <q-card style="width:450px; ">
        <div style="background-color:#2C2F30" class="q-pa-sm" align="center">
          <img src="../assets/logodialog.png" alt />
        </div>

        <q-form @submit="register()">
          <div class="q-px-lg q-py-lg">
            <div>
              <q-input
                hide-bottom-space
                :rules="[val => !!val]"
                ref="email"
                outlined
                v-model="signUp.email"
                label="Email"
                dense
                type="email"
              />
            </div>
            <div class="q-pt-md q-pb-sm">
              <q-input
                hide-bottom-space
                :rules="[val => !!val]"
                ref="password"
                v-model="signUp.password"
                dense
                label="Password"
                type="password"
                outlined
              ></q-input>
            </div>
            <div class="q-pt-md q-pb-sm">
              <q-input
                hide-bottom-space
                type="password"
                :rules="[val => val == signUp.password]"
                ref="confirm"
                v-model="signUp.confirmPassword"
                dense
                label="Confirm password"
                outlined
              ></q-input>
            </div>
            <div class="q-pt-md q-pb-sm">
              <q-select
                :rules="[val => val != '--- Please Select ---']"
                ref="country"
                outlined
                label="Country"
                dense
                map-options
                emit-value
                v-model="signUp.country"
                :options="countryAllList"
                hide-bottom-space
              ></q-select>
            </div>

            <div class="q-pt-md q-pb-sm">
              <q-select
                hide-bottom-space
                :rules="[val => val != '--- Please Select ---']"
                ref="organization"
                outlined
                label="Organization"
                dense
                map-options
                emit-value
                v-model="signUp.Organization"
                :options="organizationOptions"
              ></q-select>
            </div>

            <div class="q-pt-md">
              <q-checkbox v-model="signUp.isSubscribe" label="Subscribe for lastest updates"></q-checkbox>
            </div>

            <div>
              <q-btn
                label="Sign up"
                style="width:400px;background-color:#2C2F30;color:white"
                no-caps
                class="q-mt-md"
                type="submit"
              ></q-btn>
            </div>
            <div align="center" class="q-pt-lg">
              Not a Riva member?
              <span
                style="color:#2381B8;text-decoration:underline"
                @click="isSignUp = false,isLogin = true"
                class="cursor-pointer"
              >Sign in</span>
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
    <!-- Economy Group Table Dialog -->
    <q-dialog v-model="isShowEconomyGroupDialog" persistent>
      <q-card style="width:650px">
        <q-card-section>
          <q-toolbar>
            <span style="font-size:20px">Economy group</span>
            <q-space />
            <q-btn
              v-close-popup
              @click="
                (isAddNewGroupDialog = true),
                  (groupSelected = []),
                  (groupName = ''),
                  (isEditGroup = false)
              "
              label="New group"
              class="text-white"
              no-caps
              style="width:150px;background-color:#2C2F30"
            ></q-btn>
          </q-toolbar>
        </q-card-section>
        <div class="q-px-md">
          <q-separator color="black" spaced="-5px"></q-separator>
        </div>
        <q-card-section>
          <div class="row bg-grey-8 q-pa-xs text-white">
            <div style="width:150px" class="q-pl-md">Economy group</div>
            <div class="col">Economy</div>
            <div align="center" style="width:50px">
              <q-icon size="xs" name="fas fa-trash-alt"></q-icon>
            </div>
            <div align="center" style="width:50px">
              <q-icon size="xs" name="fas fa-edit"></q-icon>
            </div>
          </div>

          <div
            class="row bg-grey-4 q-pa-xs text-black"
            v-for="(item, index) in tempGroup"
            :key="index"
          >
            <div style="width:150px" class="q-pl-md">{{ item.label }}</div>
            <div class="col">{{ item.value.join(", ") }}</div>
            <div align="center" style="width:50px">
              <q-icon
                size="xs"
                class="cursor-pointer"
                name="fas fa-trash-alt"
                @click="deleteGroup(index)"
              ></q-icon>
            </div>
            <div align="center" style="width:50px">
              <q-icon
                size="xs"
                v-close-popup
                @click="editGroup(item, index)"
                class="cursor-pointer"
                name="fas fa-edit"
              ></q-icon>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            v-close-popup
            label="Close"
            no-caps
            style="width:150px;background-color:#2C2F30;color:white"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- add new group dialog -->
    <q-dialog v-model="isAddNewGroupDialog" persistent>
      <q-card style="width:650px">
        <q-card-section>
          <q-toolbar>
            <span style="font-size:20px">
              <span v-if="isEditGroup">Edit</span>
              <span v-else>New</span> Economy group
            </span>
            <q-space />
          </q-toolbar>
        </q-card-section>
        <div class="q-px-md">
          <q-separator color="black" spaced="-5px"></q-separator>
        </div>
        <q-card-section>
          <div class="row items-end">
            <div style="width:65px">Name</div>
            <q-input
              hide-bottom-space
              autofocus
              ref="groupName"
              class="col"
              dense
              :rules="[val => !!val]"
              v-model.trim="groupName"
            ></q-input>
          </div>
          <div class="row items-end">
            <div style="width:65px">Economy</div>
            <q-select
              hide-bottom-space
              ref="groupSelected"
              :rules="[val => val.length >= 1]"
              map-options
              emit-value
              use-chips
              multiple
              :options="countryList.filter(x => typeof x.value != 'object')"
              autofocus
              class="col"
              dense
              v-model="groupSelected"
            ></q-select>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            @click="isShowEconomyGroupDialog = true"
            v-close-popup
            label="Cancel"
            no-caps
            style="width:150px;color:black"
            outline
          ></q-btn>
          <q-btn
            @click="addEconomyGroup()"
            label="Save"
            no-caps
            style="width:150px;background-color:#2C2F30;color:white"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <my-footer></my-footer>

    <q-dialog v-model="isShowQueryList">
      <q-card style="min-width:500px;width:100%">
        <q-toolbar class="no-padding" style="background-color:#2C2F30;color:white;">
          <q-toolbar-title>
            <div class="q-pl-md">Open query</div>
          </q-toolbar-title>
          <q-space></q-space>

          <q-btn icon="fas fa-times" v-close-popup flat></q-btn>
        </q-toolbar>
        <q-card-section class="no-padding">
          <!-- <div class="q-px-md q-py-md">
            Query name
            <q-input v-model="query" label="Query name" dense outlined></q-input>
          </div>-->

          <div
            v-for="(item,index) in queryList"
            :key="index"
            class="row items-center q-px-md q-py-sm"
            :class="index %2 != 0 ? 'bg-grey-3' : null"
          >
            <div class="col">{{ item }}</div>
            <div style="width:70px">
              <q-btn icon="fas fa-trash-alt" @click="deleteQuery(index)" flat></q-btn>
            </div>
            <div style="width:70px">
              <q-btn icon="fas fa-edit" @click="editQuery(index)" flat></q-btn>
            </div>
          </div>

          <div v-if="queryList.length == 0" class="q-pa-md">No Query Found</div>
        </q-card-section>

        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            label="Load"
            text-color="white"
            @click="loadQuery()"
            no-caps
            style="width:200px;background-color:#2C2F30"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isShowSaveQuery">
      <q-card style="width:500px">
        <q-toolbar class="no-padding" style="background-color:#2C2F30;color:white;">
          <q-toolbar-title>
            <div class="q-pl-md">
              <span v-if="isEditQuery">Edit query</span>
              <span v-else>Save query</span>
            </div>
          </q-toolbar-title>
          <q-space></q-space>

          <q-btn icon="fas fa-times" v-close-popup flat></q-btn>
        </q-toolbar>
        <q-card-section class="no-padding">
          <div class="q-px-md q-py-md">
            Query name
            <q-input v-model="query" label="Query name" dense outlined></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            label="Save"
            text-color="white"
            @click="saveQuery()"
            no-caps
            style="width:200px;background-color:#2C2F30"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Axios from "axios";
import countryJson from "../../public/country_list.json";
import countryAll from "../assets/country.json";
import sectorJson from "../../public/sector.json";
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import myFooter from "../components/footer";
export default {
  components: {
    myFooter,
    globalValueChainsHeader,
  },
  data() {
    return {
      queryIndexTemp: "",
      isEditQuery: false,
      query: "",
      queryList: [],
      isShowQueryList: false,
      isShowSaveQuery: false,
      email: "",
      organizationOptions: [
        "Academic",
        "Government",
        "International Organisation",
        "NGO",
        "Private sector",
        "Think tank",
      ],
      isLogin: false, //เปิดปิด login dialog
      login: {
        email: "",
        password: "",
      },
      signUp: {
        email: "",
        password: "",
        confirmPassword: "",
        country: "--- Please Select ---",
        Organization: "--- Please Select ---",
        isSubscribe: false,
      },
      isPwd: true,
      isSignUp: false, //เปิดปิด Sign up dialog
      countryAllList: [],
      isEditGroup: false,
      groupSelected: [],
      groupName: "",
      isAddNewGroupDialog: false,
      isShowEconomyGroupDialog: false,
      indicator: "Imp_cons",
      indicatorList: [
        {
          value: "Imp_cons",
          label: "Gross exports used in importer's consumption (Imp_cons)",
        },
        {
          value: "Imp_exp",
          label:
            "Grooss exports used in importer's export production (Imp_exp)",
        },
        {
          value: "Dom_cons",
          label:
            "Grooss exports that return home and used in the exporter's domestic consumption (Dom_cons)",
        },
        {
          value: "Double",
          label:
            "Double counted exports from repeated border crossing (Double)",
        },
        {
          value: "Imp_cont",
          label: "Imported content in gross exports (Imp_cont)",
        },
        {
          value: "DVA_tradebalance",
          label: "Domestice value-added trade balance (DVA_tradebalance)",
        },
        {
          value: "DVA_tradebalance_$",
          label: "Domestice value-added trade balance (DVA_tradebalance_$)",
        },
        {
          value: "Gross_tradebalance",
          label: "Gross trade balance (Gross_tradebalance)",
        },
        {
          value: "Gross_tradebalance_$",
          label: "Gross trade balance (Gross_tradebalance_$)",
        },
        {
          value: "GVC_participation",
          label: "GVC participation",
        },
        {
          value: "GVC_participation_$",
          label: "GVC participation_$",
        },
        {
          value: "Back_link_country",
          label: "Backward linkages, all source countries (Back_link_country)",
        },
        {
          value: "Back_link_sector",
          label: "Backward linkages, all exporting sectors (Back_link_sector)",
        },
        {
          value: "Forward_link_country",
          label:
            "Forward linkages, all importing countries (Forward_link_country)",
        },
        {
          value: "Forward_link_sector",
          label:
            "Forward linkages, all exporting sectors (Forward_link_sector)",
        },
        {
          value: "Gross_exports",
          label: "Gross exports",
        },
      ],
      countryList: [],
      source: null,
      exporting: [],
      importing: [],
      sector: null,
      sectorList: [],
      year: null,
      yearList: [],
      isShowDownloadBtn: false,
      downloadData: null,
      tempGroup: [],
      tempIndex: null,
    };
  },
  methods: {
    deleteGroup(index) {
      this.tempGroup.splice(index, 1);
      this.exporting = [];
      this.importing = [];
      this.countryList = this.countryList.filter(
        (x) => typeof x.value != "object"
      );

      this.countryList = [...this.tempGroup, ...this.countryList];
    },
    editGroup(item, index) {
      this.isEditGroup = true;
      this.groupName = item.label;
      this.groupSelected = item.value;
      this.isAddNewGroupDialog = true;
      this.tempIndex = index;
    },
    addEconomyGroup() {
      this.$refs.groupName.validate();
      this.$refs.groupSelected.validate();

      if (this.$refs.groupName.hasError || this.$refs.groupSelected.hasError)
        return;

      if (this.isEditGroup) {
        this.tempGroup[this.tempIndex].label = this.groupName;
        this.tempGroup[this.tempIndex].value = this.groupSelected;
        this.tempIndex = null;
        this.countryList = this.countryList.filter(
          (x) => typeof x.value != "object"
        );

        this.countryList = [...this.tempGroup, ...this.countryList];
        this.isAddNewGroupDialog = false;
        this.exporting = [];
        this.importing = [];
      } else {
        // add group
        this.countryList.unshift({
          label: this.groupName,
          value: this.groupSelected,
        });

        this.tempGroup.push({
          label: this.groupName,
          value: this.groupSelected,
        });
        this.isAddNewGroupDialog = false;
      }

      (this.isAddNewGroupDialog = false),
        (this.isShowEconomyGroupDialog = true);
    },
    resetDownloadState() {
      this.isShowDownloadBtn = false;
    },
    loadCountryList() {
      this.countryList = [];
      countryJson.forEach((data) => {
        let tempCountryList = {
          value: data.iso,
          label: data.name,
        };
        this.countryList.push(tempCountryList);
      });
      this.countryList.sort((a, b) => (a.label < b.label ? -1 : 1));

      this.countryAllList = [];
      countryAll.forEach((data) => {
        let temp = {
          value: data.iso,
          label: data.Country,
        };
        this.countryAllList.push(temp);
      });
    },
    loadSectorList() {
      this.sectorList = [];
      sectorJson.forEach((data) => {
        let tempSectorList = {
          value: data.id,
          label: data.Country,
        };
        this.sectorList.push(tempSectorList);
      });
    },
    async loadYearList() {
      this.yearList = [];
      let url = this.path_api + "/get_year_active.php";
      let data = await Axios.get(url);
      data.data.forEach((x) => {
        this.yearList.push(x);
      });
    },
    clearBtn() {
      this.exporting = null;
      this.importing = null;
      this.sector = null;
      this.year = null;
      this.indicator = "Imp_cons";
      this.isShowDownloadBtn = false;
    },
    async runBtn() {
      // exporting group
      let getGroup = this.exporting.filter((x) => typeof x == "object");
      let tempGroup = [];
      getGroup.forEach((element) => {
        element.forEach((x) => tempGroup.push(x));
      });

      let filterExporting = this.exporting.filter((x) => typeof x != "object");
      let finalGroup = [...tempGroup, ...filterExporting];

      finalGroup = [...new Set(finalGroup)];

      let exportingGroup = finalGroup.filter((x) => x);

      // importing economy group
      let getImportGroup = this.importing.filter((x) => typeof x == "object");
      let tempImportGroup = [];
      getImportGroup.forEach((element) => {
        element.forEach((x) => tempImportGroup.push(x));
      });

      let filterImporting = this.importing.filter((x) => typeof x != "object");
      let finalImportGroup = [...tempImportGroup, ...filterImporting];
      finalImportGroup = [...new Set(finalImportGroup)];

      let importingGroup = finalImportGroup.filter((x) => x);

      let _this = this;
      function validateInput() {
        if (
          !_this.exporting ||
          !_this.importing ||
          !_this.sectorList ||
          !_this.year
        ) {
          if (!_this.exporting) {
            _this.$q.notify({
              message: "Please add an exporting economy",
              color: "red",
              position: "top",
            });
          }
          if (!_this.importing) {
            _this.$q.notify({
              message: "Please add an importing economy",
              color: "red",
              position: "top",
            });
          }
          if (!_this.sector) {
            _this.$q.notify({
              message: "Please add a sector",
              color: "red",
              position: "top",
            });
          }
          if (!_this.year) {
            _this.$q.notify({
              message: "Please add a year",
              color: "red",
              position: "top",
            });
          }
          return;
        }
      }

      if (this.indicator == "Back_link_sector") {
        if (!this.source) {
          this.$q.notify({
            message: "Please add an source economy",
            color: "red",
            position: "top",
          });
        }
        validateInput();
      } else {
        validateInput();
      }
      this.loadingShow();
      let obj;
      if (
        !(
          this.indicator == "Back_link_sector" ||
          this.indicator == "Forward_link_country" ||
          this.indicator == "Forward_link_sector"
        )
      ) {
        this.sector.sort();
        obj = {
          exporting: exportingGroup,
          importing: importingGroup,
          sector: this.sector,
          year: this.year,
        };
      } else if (this.indicator == "Back_link_sector") {
        obj = {
          exporting: exportingGroup,
          importing: importingGroup,
          source: this.source,
          year: this.year,
        };
      } else if (this.indicator == "Forward_link_country") {
        obj = {
          exporting: exportingGroup,
          sector: this.sector,
          year: this.year,
        };
      } else if (this.indicator == "Forward_link_sector") {
        obj = {
          exporting: exportingGroup,
          importing: importingGroup,
          year: this.year,
        };
      }

      let url = "";
      if (this.indicator == "Imp_cons") {
        url = this.path_api + "/indicator_imp_cons2.php";
      } else if (this.indicator == "Imp_exp") {
        url = this.path_api + "/indicator_imp_exp2.php";
      } else if (this.indicator == "Dom_cons") {
        url = this.path_api + "/indicator_dom_cons2.php";
      } else if (this.indicator == "Double") {
        url = this.path_api + "/indicator_double2.php";
      } else if (this.indicator == "Imp_cont") {
        url = this.path_api + "/indicator_imp_cont2.php";
      } else if (this.indicator == "DVA_tradebalance") {
        url = this.path_api + "/indicator_dva_tradebalance2.php";
      } else if (this.indicator == "DVA_tradebalance_$") {
        url = this.path_api + "/indicator_dva_tradebalance_m.php";
      } else if (this.indicator == "Gross_tradebalance") {
        url = this.path_api + "/indicator_gross_tradebalance2.php";
      } else if (this.indicator == "Gross_tradebalance_$") {
        url = this.path_api + "/indicator_gross_tradebalance_m.php";
      } else if (this.indicator == "GVC_participation") {
        url = this.path_api + "/indicator_gvc_participation2.php";
      } else if (this.indicator == "GVC_participation_$") {
        url = this.path_api + "/indicator_gvc_participation_m.php";
      } else if (this.indicator == "Back_link_country") {
        url = this.path_api + "/indicator_back_link_country2.php";
      } else if (this.indicator == "Back_link_sector") {
        url = this.path_api + "/indicator_back_link_sector2.php";
      } else if (this.indicator == "Forward_link_country") {
        url = this.path_api + "/indicator_forward_link_country2.php";
      } else if (this.indicator == "Forward_link_sector") {
        url = this.path_api + "/indicator_forward_link_sector2.php";
      } else if (this.indicator == "Forward_link_sector") {
        url = this.path_api + "/indicator_forward_link_sector2.php";
      } else if (this.indicator == "Gross_exports") {
        url = this.path_api + "/indicator_gross_exports2.php";
      }
      let data = await Axios.post(url, obj);

      this.downloadData = data.data;

      this.loadingHide();
      this.isShowDownloadBtn = true;
    },

    async getEmail(id) {
      const url = this.path_api2 + "/getEmail.php?id=" + id;
      const result = await Axios.get(url);

      this.email = result.data[0].email;
      this.queryList = JSON.parse(result.data[0].query);
    },

    async signIn() {
      this.loadingShow();
      const url = this.path_api2 + "/signIn.php";
      const obj = {
        email: this.login.email,
        password: this.login.password,
      };
      let data = await Axios.post(url, obj);

      if (data.data == 0) {
        // Failed Login
        this.$q.notify({
          message: "Incorrect email address or password",
          color: "red",
        });
      } else {
        // Success Login
        this.$q.sessionStorage.set("uid", data.data[0].id);
        this.getEmail(data.data[0].id);
        this.isLogin = false;
      }

      this.loadingHide();
    },

    async register() {
      this.loadingShow();
      const url = this.path_api2 + "/signup.php";
      const obj = {
        email: this.signUp.email,
        password: this.signUp.password,
        country: this.signUp.country,
        organization: this.signUp.Organization,
        isSubscribe: this.signUp.isSubscribe,
      };
      let data = await Axios.post(url, obj);

      if (data.data == 0) {
        this.$q.notify({
          message: "This email has already been taken.",
          color: "red",
        });
      }

      this.loadingHide();
    },
    deleteQuery(index) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete the query?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.queryList.splice(index, 1);
          this.$q.notify({
            message: "Query Deleted",
            color: "teal",
          });
          this.updateQueryToDb();
        });
    },
    saveQuery() {
      if (this.isEditQuery) {
        this.queryList[this.queryIndexTemp] = this.query;
        this.queryList.push("");
        this.queryList.pop();
        this.$q.notify({
          message: "Query Updated",
          color: "teal",
        });
        this.isShowSaveQuery = false;
        this.updateQueryToDb();
      } else {
        this.queryList.push(this.query);
        this.query = "";
        this.isShowSaveQuery = false;
        this.$q.notify({
          message: "Query Added",
          color: "teal",
        });
        this.updateQueryToDb();
      }
    },
    editQuery(index) {
      this.queryIndexTemp = index;
      this.query = this.queryList[index];
      this.isShowSaveQuery = true;
      this.isEditQuery = true;
    },
    loadQuery() {},
    async updateQueryToDb() {
      this.loadingShow();
      const url = this.path_api2 + "/update_query.php";
      const obj = {
        uid: this.$q.sessionStorage.getItem("uid"),
        query: JSON.stringify(this.queryList),
      };
      let data = await Axios.post(url, obj);

      console.log(data.data);

      this.loadingHide();
    },
  },
  mounted() {
    if (!this.$q.sessionStorage.has("uid")) {
      this.isLogin = true;
    } else {
      this.getEmail(this.$q.sessionStorage.getItem("uid"));
    }
    this.$q.sessionStorage.set("shareLink", "riva.negotiatetrade.org/download");
    this.loadYearList();
    this.loadCountryList();
    this.loadSectorList();
  },
};
</script>

<style scoped></style>
