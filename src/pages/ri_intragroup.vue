<template>
  <div class="container shadow-2">
    <ri-header :menu="1"></ri-header>
    <div class="row " style="color:#757575">
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16"><b>Economies</b></div>
        <div>
          Select economies to create a group (minimum 3) or choose a
          pre-selected group
        </div>
        <div>
          <q-select
            :options="countryOptions"
            v-model="input.parter"
            multiple
            use-chips
            stack-label
            dense
            style="width:90%"
          />
        </div>
        <br />
        <div class="font-16"><b>Period</b></div>
        <div style="width: 250px;" class="row">
          <div class="col-6">
            <div>Start</div>
            <div>
              <q-select
                dense
                :options="year"
                v-model="input.startYear"
                style="width:80px;"
              />
            </div>
          </div>
          <div class="col-6">
            <div>End</div>
            <div>
              <q-select
                dense
                :options="year"
                v-model="input.endYear"
                style="width:80px;"
              />
            </div>
          </div>
        </div>
        <br />
        <div class="font-16"><b>Integration type</b></div>
        <br />
        <div class="row">
          <div class="col-6" align="center">
            <div
              :class="input.type == 'A' ? 'btnGreen' : 'btnGrey'"
              @click="changeA()"
              class="cursor-pointer"
            >
              Sustainable Integration
            </div>
          </div>
          <div class="col-6" align="center">
            <div
              :class="input.type == 'B' ? 'btnGreen' : 'btnGrey'"
              @click="changeB()"
              class="cursor-pointer"
            >
              Conventional Integration
            </div>
          </div>
        </div>
        <br />
        <div align="center">
          <div class="btnOutGreen cursor-pointer">Start</div>
        </div>
      </div>
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16" v-show="input.type == 'A'">
          <b>Sustainable Integration Indicators</b>
        </div>
        <div class="font-16" v-show="input.type == 'B'">
          <b>Conventional Integration Indicators</b>
        </div>
        <div class="font-12">
          Click on any dimension to reveal included indicators
        </div>
        <div>
          <q-select
            dense
            v-model="showDim"
            style="width:90%"
            :options="dimensionList"
            emit-value
            map-options
            @input="showIndicator()"
          />
        </div>
        <div>
          <ul>
            <li v-for="(item, index) in indicatorShow" :key="index">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";
import Axios from "axios";
export default {
  components: {
    riHeader,
    myFooter
  },
  data() {
    return {
      countryOptions: [],
      input: {
        partner: [],
        startYear: "",
        endYear: "",
        type: "A"
      },
      showDim: "",
      year: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
      dimensionList: [],
      indicatorList: [],
      indicatorShow: []
    };
  },
  methods: {
    changeA() {
      this.input.type = "A";
      this.showIndicator();
    },
    changeB() {
      this.input.type = "B";
      this.showIndicator();
    },
    async loadDimension() {
      this.dimensionList = [];
      let url = this.path_api2 + "/ri_showdimension.php";
      let res = await axios.get(url);
      for (let i = 0; i < res.data.length; i++) {
        let temp = {
          value: res.data[i].id,
          label: res.data[i].name
        };
        this.dimensionList.push(temp);
      }
      this.showDim = this.dimensionList[0].value;
    },
    async loadIndicator() {
      this.indicatorList = [];
      let url = this.path_api2 + "/ri_showindicator.php";
      let res = await axios.get(url);
      this.indicatorList = res.data;
      this.showIndicator();
    },
    showIndicator() {
      this.indicatorShow = [];
      this.indicatorShow = this.indicatorList.filter(
        x => x.type == this.input.type && x.dimensionId == this.showDim
      );
    }
  },
  async mounted() {
    await this.getCountryList();
    await this.loadDimension();
    await this.loadIndicator();
  }
};
</script>

<style lang="scss" scoped>
.btnGreen {
  text-align: center;
  border-radius: 5px;
  width: 220px;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: #2d9687;
}
.btnGrey {
  text-align: center;
  border-radius: 5px;
  width: 220px;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: #757575;
}
.btnOutGreen {
  width: 220px;
  height: 45px;
  border: 3px solid #2d9687;
  border-radius: 5px;
  line-height: 45px;
  font-size: 18px;
  text-align: center;
}
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
</style>
