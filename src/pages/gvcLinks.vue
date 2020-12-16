<template>
  <q-page style="background-color:white">
    <global-value-chains-header
      :isShowTinaLink="true"
      :isDisableShare="isDisableShare"
    ></global-value-chains-header>
    <!-- MENU -->
    <global-value-chains-menu :activeMenu="0"></global-value-chains-menu>

    <div class="row justify-center bg12 q-pt-md q-pb-lg">
      <div class="col-6 row">
        <div class="col q-px-md">
          <span>Exporting economy</span>
          <q-select
            v-model="exp_country"
            :options="exp_optionsShow"
            outlined
            bg-color="white"
            dense
            use-input
            fill-input
            hide-selected
            @filter="filterCountry"
            @input="selectedExpCountry"
          >
            <template v-slot:prepend v-if="overviewCountry">
              <gb-flag
                v-if="overviewCountry.code"
                :code="overviewCountry.code"
                size="small"
              />
            </template>

            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section avatar>
                  <gb-flag
                    v-if="scope.opt.code"
                    :code="scope.opt.code"
                    size="small"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                  <q-item-label caption>
                    {{ scope.opt.description }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <div class="col q-px-md">
          <span>Year</span>
          <q-select
            v-model="year"
            :options="yearOptions"
            outlined
            bg-color="white"
            emit-value
            map-options
            dense
            @input="selectedYear"
          ></q-select>
        </div>
      </div>
    </div>

    <div v-if="exp_country && year">
      <div class="row justify-center q-pa-md">
        <div
          class="col-12 row font-content"
          style="width:900px;"
          align="center"
        >
          <div class="col q-pr-lg">
            <q-btn
              class="bg-white q-py-md fit"
              v-scroll-to="'#pageOverview'"
              outline
              no-caps
              style="border-radius:0px;"
            >
              <span class="font-content">Overview</span>
            </q-btn>
          </div>
          <div class="col q-mx-lg q-px-lg">
            <q-btn
              v-scroll-to="'#pageSector'"
              class="bg-white q-py-md fit"
              outline
              no-caps
              style="border-radius:0px;"
            >
              <span class="font-content" no-caps>By exporting sector</span>
            </q-btn>
          </div>
          <div class="col q-pl-lg">
            <q-btn
              v-scroll-to="'#pageEconomy'"
              class="bg-white q-py-md fit"
              outline
              no-caps
              style="border-radius:0px;"
            >
              <span class="font-content">By partner economy</span>
            </q-btn>
          </div>
        </div>
      </div>

      <q-separator class="no-margin bg-grey-5 shadow-1" id="pageOverview" />

      <div align="center" class="q-pa-lg" v-if="!isGraphGVC">
        <q-spinner-pie color="primary" size="100px" />
      </div>

      <div class="q-pa-md" v-else>
        <div align="center" class="q-my-lg">
          <span class="font-title"
            >{{ overviewCountry.label }}'s key GVC relationships: Overview</span
          >
        </div>

        <div class="q-mt-xl">
          <div class="row justify-center">
            <div class="col-10">
              <p class="font-content">
                {{ overviewCountry.label }}’s GVC exports amount to
                {{ graphGVC.total_percent }}% (${{
                  graphGVC.total_value > 1000
                    ? (graphGVC.total_value / 1000).toFixed(2) + " billion"
                    : graphGVC.total_value + " millon"
                }}) of its gross exports in {{ year }}
              </p>
              <p class="font-content">
                Imported content comprising
                <span class="c-blue">
                  {{ graphGVC.import_percent }}% (${{
                    graphGVC.import_value > 1000
                      ? (graphGVC.import_value / 1000).toFixed(2) + " billion"
                      : graphGVC.import_value + " millon"
                  }}
                  )
                </span>
                of gross exports
              </p>
              <p class="font-content">
                Export of intermediates used in further export production
                comprising
                <span class="c-red">
                  {{ graphGVC.export_percent }}% (${{
                    graphGVC.export_value > 1000
                      ? (graphGVC.export_value / 1000).toFixed(2) + " billion"
                      : graphGVC.export_value + " millon"
                  }})
                </span>
                of gross exports
              </p>
            </div>

            <div class="col-10 row q-mt-xl">
              <!-- Imported Content  -->
              <div class="col row font-content" align="center">
                <div class="col-12 self-start c-blue">
                  <div class="text-bold">
                    Imported content used in exports
                    <br />(Backward linkages)
                  </div>

                  <div class="q-mt-sm" align="center">
                    Share: {{ graphGVC.import_percent }}% of gross exports
                    <br />
                    Value: ${{
                      graphGVC.import_value > 1000
                        ? (graphGVC.import_value / 1000).toFixed(2) + " billion"
                        : graphGVC.import_value + " millon"
                    }}
                  </div>
                </div>
              </div>
              <!-- Export Content  -->
              <div class="col font-content" align="center">
                <div class="col-12 self-start c-red">
                  <div class="text-bold">
                    <span>Export of intermediates used in</span>
                    <br />
                    <span class="text-no-wrap"
                      >export production (Forward linkages)</span
                    >
                  </div>

                  <div class="q-mt-sm" align="center">
                    <span
                      >Share: {{ graphGVC.export_percent }}% of gross
                      exports</span
                    >
                    <br />
                    <span>
                      Value: ${{
                        graphGVC.export_value > 1000
                          ? (graphGVC.export_value / 1000).toFixed(2) +
                            " billion"
                          : graphGVC.export_value + " millon"
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-10 row q-pb-md">
              <div
                class="col self-center relative-position"
                style="height:200px;"
              >
                <div class>
                  <q-img
                    v-if="graphGVC.export_value < graphGVC.import_value"
                    width="100%"
                    class="absolute-center"
                    :src="require('../../public/arrow/arrow-blue-big.png')"
                  ></q-img>
                  <q-img
                    v-if="graphGVC.export_value > graphGVC.import_value"
                    width="100%"
                    class="absolute-center"
                    :src="require('../../public/arrow/arrow-blue-small.png')"
                  ></q-img>
                  <!-- graphGVC.import_value -->
                </div>
              </div>

              <!-- Country Content -->
              <div
                class="col-3 self-center"
                align="center"
                style="width:270px;"
              >
                <div class>
                  <gb-flag
                    v-if="overviewCountry.code"
                    :code="overviewCountry.code"
                    height="100px"
                  />
                </div>
                <div class="relative-position">
                  <span class="font-title">
                    {{ overviewCountry.label }}
                  </span>
                </div>
              </div>

              <div
                class="col self-center relative-position"
                style="height:200px;"
              >
                <div class>
                  <q-img
                    v-if="graphGVC.import_value < graphGVC.export_value"
                    width="100%"
                    class="absolute-center"
                    :src="require('../../public/arrow/arrow-red-big.png')"
                  ></q-img>
                  <q-img
                    v-if="graphGVC.import_value > graphGVC.export_value"
                    width="100%"
                    class="absolute-center"
                    :src="require('../../public/arrow/arrow-red-small.png')"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-separator class="no-margin bg-grey-5 shadow-1" id="pageSector" />

      <div align="center" class="q-pa-lg" v-if="!isGraphGVCSector">
        <q-spinner-pie color="primary" size="100px" />
      </div>

      <div class="q-pa-md" v-else>
        <div align="center" class="q-my-lg">
          <span class="font-title"
            >key GVC relationships: by exporting sector</span
          >
        </div>

        <div class="row justify-center">
          <div class="col-10 row">
            <div class="col q-pa-md">
              <div class="c-blue font-footer">
                <span class="font-content text-bold">Backward linkages</span>
                <br />
                <span class="text-bold">Sector</span>
                <br />
                <span>
                  Share of foreign value-added in sectoral gross exports (%)
                </span>
                <br />
                <span>Foreign value-added ($)</span>
              </div>
            </div>

            <!-- Country Content -->
            <div class="col-3 self-center" align="center"></div>
            <div class="col q-pa-md">
              <div class="c-red font-footer">
                <span class="font-content text-bold">Forward linkages</span>
                <br />
                <span class="text-bold">Sector</span>
                <br />
                <span>
                  Share of contribution to partner exports, in sectoral gross
                  exports (%)
                </span>
                <br />
                <span>Contribution to partner exports ($)</span>
              </div>
            </div>
          </div>

          <div class="col-10 row q-py-xl">
            <div class="col q-py-lg" style="height:560px;">
              <div
                class="relative-position"
                style="height:460px;"
                v-if="backwardSectorLinkToggle"
              >
                <div
                  class="cursor-pointer"
                  @click="highchartBackwardSector(item)"
                  :class="index != 2 ? 'absolute' : 'graph-arrow-center'"
                  :style="[
                    index == 0 ? { top: '0px', zIndex: '100' } : {},
                    index == 1 ? { top: '95px', zIndex: '300' } : {},
                    index == 2 ? { zIndex: '500' } : {},
                    index == 3 ? { bottom: '95px', zIndex: '300' } : {},
                    index == 4 ? { bottom: '0px', zIndex: '100' } : {}
                  ]"
                  style="right:0;"
                  v-for="(item, index) in graphBackwardGVCSector"
                  :key="index"
                  @mouseenter="hoverSector(index, 'backwardSector')"
                  @mouseleave="outHoverSector(index, 'backwardSector')"
                >
                  <q-img
                    v-if="backwardSectorHover != index"
                    width="500px"
                    :src="
                      require('../../public/arrow/blue-graph-' +
                        (index + 1) +
                        '.png')
                    "
                  >
                    <span
                      :class="{
                        absolute: index == 0 || index == 1 || index == 2,
                        'absolute-bottom-left': index == 3 || index == 4
                      }"
                      :style="[
                        index == 0 ? { top: '7%' } : {},
                        index == 1 ? { top: '11%' } : {},
                        index == 2 ? { top: '22%' } : {},
                        index == 3 ? { bottom: '11%' } : {},
                        index == 4 ? { bottom: '7%' } : {}
                      ]"
                      style="left:10%;"
                    >
                      <div class="text-white">{{ item.sector }}</div>
                      <div class="text-white">
                        {{ item.precent }}% , ${{
                          item.value > 1000
                            ? (item.value / 1000).toFixed(2) + "B"
                            : item.value + "M"
                        }}
                      </div>
                    </span>
                  </q-img>

                  <q-img
                    v-if="backwardSectorHover == index"
                    width="500px"
                    :src="
                      require('../../public/arrow/blue-graph-' +
                        (index + 1) +
                        'a.png')
                    "
                  >
                    <span
                      :class="{
                        absolute: index == 0 || index == 1 || index == 2,
                        'absolute-bottom-left': index == 3 || index == 4
                      }"
                      :style="[
                        index == 0 ? { top: '7%' } : {},
                        index == 1 ? { top: '11%' } : {},
                        index == 2 ? { top: '22%' } : {},
                        index == 3 ? { bottom: '11%' } : {},
                        index == 4 ? { bottom: '7%' } : {}
                      ]"
                      style="left:10%;"
                    >
                      <div class="text-white">{{ item.sector }}</div>
                      <div class="text-white">
                        {{ item.precent }}% , ${{
                          item.value > 1000
                            ? (item.value / 1000).toFixed(2) + "B"
                            : item.value + "M"
                        }}
                      </div>
                    </span>
                  </q-img>
                </div>
              </div>

              <div v-show="!backwardSectorLinkToggle">
                <div
                  style="border:1px solid;border-radius:10px;"
                  class="q-pa-md"
                >
                  <div id="backwardSector"></div>
                </div>

                <div class="q-mt-md" align="center">
                  <q-btn
                    style="width:160px;"
                    outline
                    label="Back to main chart"
                    no-caps
                    @click="
                      backwardSectorLinkToggle = !backwardSectorLinkToggle
                    "
                  ></q-btn>
                </div>
              </div>
            </div>
            <!-- Country Content -->
            <div class="col-3 self-center" style="width:200px;" align="center">
              <div>
                <gb-flag
                  v-if="overviewCountry.code"
                  :code="overviewCountry.code"
                  height="100px"
                />
              </div>
              <div class="relative-position">
                <span class="font-title">{{ overviewCountry.label }}</span>
              </div>
            </div>
            <div class="col q-py-lg" style="height:560px;">
              <div
                class="relative-position"
                style="height:460px;"
                v-if="forwardSectorLinkToggle"
              >
                <div
                  class="cursor-pointer"
                  @click="highchartForwardSector(item)"
                  :class="index != 2 ? 'absolute' : 'graph-arrow-center'"
                  :style="[
                    index == 0 ? { top: '0px', zIndex: '100' } : {},
                    index == 1 ? { top: '95px', zIndex: '300' } : {},
                    index == 2 ? { zIndex: '500' } : {},
                    index == 3 ? { bottom: '95px', zIndex: '300' } : {},
                    index == 4 ? { bottom: '0px', zIndex: '100' } : {}
                  ]"
                  style="left:0;"
                  v-for="(item, index) in graphForwardGVCSector"
                  :key="index"
                  @mouseenter="hoverSector(index, 'forwardSector')"
                  @mouseleave="outHoverSector(index, 'forwardSector')"
                >
                  <q-img
                    v-if="forwardSectorHover != index"
                    width="500px"
                    :src="
                      require('../../public/arrow/red-graph-' +
                        (index + 1) +
                        '.png')
                    "
                  >
                    <span
                      :class="{
                        absolute: index == 0 || index == 1 || index == 2,
                        'absolute-bottom-right': index == 3 || index == 4
                      }"
                      :style="[
                        index == 0 ? { top: '7%' } : {},
                        index == 1 ? { top: '11%' } : {},
                        index == 2 ? { top: '22%' } : {},
                        index == 3 ? { bottom: '11%' } : {},
                        index == 4 ? { bottom: '7%' } : {}
                      ]"
                      style="right:10%;direction: rtl;"
                    >
                      <div class="text-white">{{ item.sector }}</div>
                      <div class="text-white">
                        {{ item.precent }}% ,${{
                          item.value > 1000
                            ? (item.value / 1000).toFixed(2) + "B"
                            : item.value + "M"
                        }}
                      </div>
                    </span>
                  </q-img>

                  <q-img
                    v-if="forwardSectorHover == index"
                    width="500px"
                    :src="
                      require('../../public/arrow/red-graph-' +
                        (index + 1) +
                        'a.png')
                    "
                  >
                    <span
                      :class="{
                        absolute: index == 0 || index == 1 || index == 2,
                        'absolute-bottom-right': index == 3 || index == 4
                      }"
                      :style="[
                        index == 0 ? { top: '7%' } : {},
                        index == 1 ? { top: '11%' } : {},
                        index == 2 ? { top: '22%' } : {},
                        index == 3 ? { bottom: '11%' } : {},
                        index == 4 ? { bottom: '7%' } : {}
                      ]"
                      style="right:10%;direction: rtl;"
                    >
                      <div class="text-white">{{ item.sector }}</div>
                      <div class="text-white">
                        {{ item.precent }}% , ${{
                          item.value > 1000
                            ? (item.value / 1000).toFixed(2) + "B"
                            : item.value + "M"
                        }}
                      </div>
                    </span>
                  </q-img>
                </div>
              </div>

              <div v-show="!forwardSectorLinkToggle">
                <div
                  style="border:1px solid;border-radius:10px;"
                  class="q-pa-md"
                >
                  <div id="forwardSector"></div>
                </div>

                <div class="q-mt-md" align="center">
                  <q-btn
                    style="width:160px;"
                    outline
                    label="Back to main chart"
                    no-caps
                    @click="forwardSectorLinkToggle = !forwardSectorLinkToggle"
                  ></q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-separator class="no-margin bg-grey-5 shadow-1" id="pageEconomy" />

      <div align="center" class="q-pa-lg" v-if="!isGraphGVCEconomy">
        <q-spinner-pie color="primary" size="100px" />
      </div>

      <div class="q-pa-md" v-else>
        <div align="center" class="q-my-lg">
          <span class="font-title"
            >key GVC relationships: by partner economy</span
          >
        </div>

        <div class="row justify-center">
          <div class="col-10 row">
            <div class="col q-pa-md">
              <div class="c-blue font-footer">
                <span class="font-content text-bold">Backward linkages</span>
                <br />
                <span class="text-bold">Source economy</span>
                <br />
                <span>Share of foreign value-added in gross exports (%)</span>
                <br />
                <span>Foreign value-added ($)</span>
              </div>
            </div>
            <!-- Country Content -->
            <div class="col-3 self-center" align="center"></div>
            <div class="col q-pa-md">
              <div class="c-red font-footer">
                <span class="font-content text-bold">Forward linkages</span>
                <br />
                <span class="text-bold">Improting economy</span>
                <br />
                <span>
                  Share of contribution to partner exports, in gross exports (%)
                </span>
                <br />
                <span>Contribution to partner exports ($)</span>
              </div>
            </div>
          </div>

          <div class="col-10 row q-py-xl">
            <div class="col q-py-lg" style="height:560px;">
              <div
                class="relative-position"
                style="height:460px;"
                v-if="backwardEconomyLinkToggle"
              >
                <div
                  class="cursor-pointer"
                  @click="highchartBackwardEconomy(item)"
                  :class="index != 2 ? 'absolute' : 'graph-arrow-center'"
                  :style="[
                    index == 0 ? { top: '0px', zIndex: '100' } : {},
                    index == 1 ? { top: '95px', zIndex: '300' } : {},
                    index == 2 ? { zIndex: '500' } : {},
                    index == 3 ? { bottom: '95px', zIndex: '300' } : {},
                    index == 4 ? { bottom: '0px', zIndex: '100' } : {}
                  ]"
                  style="right:0;"
                  v-for="(item, index) in graphBackwardGVCEconomy"
                  :key="index"
                  @mouseenter="hoverSector(index, 'backwardEconomy')"
                  @mouseleave="outHoverSector(index, 'backwardEconomy')"
                >
                  <q-img
                    v-if="backwardEconomyHover != index"
                    width="500px"
                    :src="
                      require('../../public/arrow/blue-graph-' +
                        (index + 1) +
                        '.png')
                    "
                  >
                    <span
                      :class="{
                        absolute: index == 0 || index == 1 || index == 2,
                        'absolute-bottom-left': index == 3 || index == 4
                      }"
                      :style="[
                        index == 0 ? { top: '7%' } : {},
                        index == 1 ? { top: '11%' } : {},
                        index == 2 ? { top: '22%' } : {},
                        index == 3 ? { bottom: '11%' } : {},
                        index == 4 ? { bottom: '7%' } : {}
                      ]"
                      style="left:10%;"
                    >
                      <div class="text-white">{{ item.fullName }}</div>
                      <div class="text-white">
                        {{ item.precent }}% , ${{
                          item.value > 1000
                            ? (item.value / 1000).toFixed(2) + "B"
                            : item.value + "M"
                        }}
                      </div>
                    </span>
                  </q-img>

                  <q-img
                    v-if="backwardEconomyHover == index"
                    width="500px"
                    :src="
                      require('../../public/arrow/blue-graph-' +
                        (index + 1) +
                        'a.png')
                    "
                  >
                    <span
                      :class="{
                        absolute: index == 0 || index == 1 || index == 2,
                        'absolute-bottom-left': index == 3 || index == 4
                      }"
                      :style="[
                        index == 0 ? { top: '7%' } : {},
                        index == 1 ? { top: '11%' } : {},
                        index == 2 ? { top: '22%' } : {},
                        index == 3 ? { bottom: '11%' } : {},
                        index == 4 ? { bottom: '7%' } : {}
                      ]"
                      style="left:10%;"
                    >
                      <div class="text-white">{{ item.fullName }}</div>
                      <div class="text-white">
                        {{ item.precent }}% , ${{
                          item.value > 1000
                            ? (item.value / 1000).toFixed(2) + "B"
                            : item.value + "M"
                        }}
                      </div>
                    </span>
                  </q-img>
                </div>
              </div>

              <div v-show="!backwardEconomyLinkToggle">
                <div
                  style="border:1px solid;border-radius:10px;"
                  class="q-pa-md"
                >
                  <div id="backwardEconomy"></div>
                </div>

                <div class="q-mt-md" align="center">
                  <q-btn
                    style="width:160px;"
                    outline
                    label="Back to main chart"
                    no-caps
                    @click="
                      backwardEconomyLinkToggle = !backwardEconomyLinkToggle
                    "
                  ></q-btn>
                </div>
              </div>
            </div>
            <!-- Country Content -->
            <div class="col-3 self-center" style="width:200px;" align="center">
              <div>
                <gb-flag
                  v-if="overviewCountry.code"
                  :code="overviewCountry.code"
                  height="100px"
                />
              </div>
              <div class="relative-position">
                <span class="font-title">{{ overviewCountry.label }}</span>
              </div>
            </div>
            <div class="col q-py-lg" style="height:560px;">
              <div
                class="relative-position"
                style="height:460px;"
                v-show="forwardEconomyLinkToggle"
              >
                <div
                  class="cursor-pointer"
                  @click="highchartForwardEconomy(item)"
                  :class="index != 2 ? 'absolute' : 'graph-arrow-center'"
                  :style="[
                    index == 0 ? { top: '0px', zIndex: '100' } : {},
                    index == 1 ? { top: '95px', zIndex: '300' } : {},
                    index == 2 ? { zIndex: '500' } : {},
                    index == 3 ? { bottom: '95px', zIndex: '300' } : {},
                    index == 4 ? { bottom: '0px', zIndex: '100' } : {}
                  ]"
                  style="left:0;"
                  v-for="(item, index) in graphForwardGVCEconomy"
                  :key="index"
                  @mouseenter="hoverSector(index, 'forwardEconomy')"
                  @mouseleave="outHoverSector(index, 'forwardEconomy')"
                >
                  <q-img
                    v-if="forwardEconomyHover != index"
                    width="500px"
                    :src="
                      require('../../public/arrow/red-graph-' +
                        (index + 1) +
                        '.png')
                    "
                  >
                    <span
                      :class="{
                        absolute: index == 0 || index == 1 || index == 2,
                        'absolute-bottom-right': index == 3 || index == 4
                      }"
                      :style="[
                        index == 0 ? { top: '7%' } : {},
                        index == 1 ? { top: '11%' } : {},
                        index == 2 ? { top: '22%' } : {},
                        index == 3 ? { bottom: '11%' } : {},
                        index == 4 ? { bottom: '7%' } : {}
                      ]"
                      style="right:10%;direction: rtl;"
                    >
                      <div class="text-white">{{ item.fullName }}</div>
                      <div class="text-white">
                        {{ item.precent }}% , ${{
                          item.value > 1000
                            ? (item.value / 1000).toFixed(2) + "B"
                            : item.value + "M"
                        }}
                      </div>
                    </span>
                  </q-img>

                  <q-img
                    v-if="forwardEconomyHover == index"
                    width="500px"
                    :src="
                      require('../../public/arrow/red-graph-' +
                        (index + 1) +
                        'a.png')
                    "
                  >
                    <span
                      :class="{
                        absolute: index == 0 || index == 1 || index == 2,
                        'absolute-bottom-right': index == 3 || index == 4
                      }"
                      :style="[
                        index == 0 ? { top: '7%' } : {},
                        index == 1 ? { top: '11%' } : {},
                        index == 2 ? { top: '22%' } : {},
                        index == 3 ? { bottom: '11%' } : {},
                        index == 4 ? { bottom: '7%' } : {}
                      ]"
                      style="right:10%;direction: rtl;"
                    >
                      <div class="text-white">{{ item.fullName }}</div>
                      <div class="text-white">
                        {{ item.precent }}% , ${{
                          item.value > 1000
                            ? (item.value / 1000).toFixed(2) + "B"
                            : item.value + "M"
                        }}
                      </div>
                    </span>
                  </q-img>
                </div>
              </div>

              <div v-show="!forwardEconomyLinkToggle" class>
                <div
                  style="border:1px solid;border-radius:10px;"
                  class="q-pa-md"
                >
                  <div id="forwardEconomy"></div>
                </div>

                <div class="q-mt-md" align="center">
                  <q-btn
                    style="width:160px;"
                    outline
                    label="Back to main chart"
                    no-caps
                    @click="
                      forwardEconomyLinkToggle = !forwardEconomyLinkToggle
                    "
                  ></q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <data-waiting
        text="Please choose exporting economy and year 
from the drop down menus above"
      ></data-waiting>
    </div>

    <footer-menu></footer-menu>
  </q-page>
</template>

<script>
import backwardGraphGvc from "../components/backwardGVC.vue";
import forwardGraphGvc from "../components/forwardGVC.vue";
import appBar from "../components/appBarWithLogo";
import Axios from "axios";

// NEW
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import footerMenu from "../components/footer";
import dataWaiting from "../components/dataWaiting.vue";

let CancelToken = Axios.CancelToken;
let source = CancelToken.source();
let cancelGraph1;
let cancelGraph2;
let cancelGraph3;
let cancelGraph4;
let cancelGraph5;
let cancelGraph6;
let cancelGraph7;

export default {
  components: {
    appBar,
    backwardGraphGvc,
    forwardGraphGvc,
    globalValueChainsHeader,
    globalValueChainsMenu,
    footerMenu,
    dataWaiting
  },
  data() {
    return {
      isDisableShare: true,
      countryOptions: [],

      exp_optionsShow: [],

      exp_country: "",

      yearOptions: [],
      year: "",

      backwardSectorHover: null,
      forwardSectorHover: null,

      backwardEconomyHover: null,
      forwardEconomyHover: null,

      graphGVC: {},

      graphBackwardGVCSector: [],
      graphForwardGVCSector: [],

      graphBackwardGVCEconomy: [],
      graphForwardGVCEconomy: [],

      isGraphGVC: false,
      isGraphGVCSector: false,
      isGraphGVCEconomy: false,

      isShowContent: false,

      backwardSectorLinkToggle: true,
      forwardSectorLinkToggle: true,

      backwardEconomyLinkToggle: true,
      forwardEconomyLinkToggle: true
    };
  },

  computed: {
    overviewCountry() {
      if (this.exp_country) {
        let res = this.countryOptions.filter(
          x => x.value == this.exp_country.value
        )[0];

        return res;
      }
    }
  },
  methods: {
    hoverSector(index, type) {
      if (type == "backwardSector") {
        this.backwardSectorHover = index;
      }

      if (type == "forwardSector") {
        this.forwardSectorHover = index;
      }

      if (type == "backwardEconomy") {
        this.backwardEconomyHover = index;
      }

      if (type == "forwardEconomy") {
        this.forwardEconomyHover = index;
      }
    },
    outHoverSector(index, type) {
      if (type == "backwardSector") {
        this.backwardSectorHover = null;
      }

      if (type == "forwardSector") {
        this.forwardSectorHover = null;
      }

      if (type == "backwardEconomy") {
        this.backwardEconomyHover = null;
      }

      if (type == "forwardEconomy") {
        this.forwardEconomyHover = null;
      }
    },
    filterCountry(val, update) {
      update(async () => {
        this.exp_optionsShow = this.countryOptions.filter(
          x => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },
    selectedExpCountry() {
      this.$q.sessionStorage.set("expe", this.exp_country.iso);

      this.backwardSectorLinkToggle = true;
      this.forwardSectorLinkToggle = true;
      this.backwardEconomyLinkToggle = true;
      this.forwardEconomyLinkToggle = true;

      if (this.validateSelected()) {
        this.renderGraph();
      }
    },
    selectedYear() {
      this.$q.sessionStorage.set("year", this.year);

      this.backwardSectorLinkToggle = true;
      this.forwardSectorLinkToggle = true;
      this.backwardEconomyLinkToggle = true;
      this.forwardEconomyLinkToggle = true;

      if (this.validateSelected()) {
        this.renderGraph();
      }
    },

    validateSelected() {
      if (this.exp_country != "" && this.year != "") {
        this.isDisableShare = false;
        return true;
      } else {
        false;
      }
    },

    renderGraph() {
      this.loadGVCGraph();
      this.loadGVCGraphSector();
      this.loadGVCGraphEconomy();

      let link =
        "https://riva.negotiatetrade.org/#/gvc-links" +
        "/" +
        this.exp_country.iso +
        "/" +
        this.year;
      this.$q.sessionStorage.set("shareLink", link);

      // this.$router.push("/gvc-links/" + this.exp_country.iso + "/" + this.year);
    },

    // ------------------------- END -------------------------

    toInvolvement() {
      this.$router.push("/involvement");
      // cselec  = country and year that user selected
      this.$q.sessionStorage.set("cselec", this.exp_country);
    },

    async loadGVCGraph() {
      this.isGraphGVC = false;

      let urlLink =
        this.path_api +
        `/cal_gvc_title.php?country=${this.exp_country.iso}&year=${this.year}`;

      let formatData = {
        total_percent: 0,
        total_value: 0,
        import_percent: 0,
        import_value: 0,
        export_percent: 0,
        export_value: 0
      };

      if (cancelGraph1 !== undefined) {
        cancelGraph1();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph1 = c;
        })
      });

      this.graphGVC = getData.data == "" ? formatData : getData.data;

      this.isGraphGVC = true;
    },

    async loadGVCGraphSector() {
      this.isGraphGVCSector = false;

      let urlLink =
        this.path_api +
        `/cal_gvc_graph1.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      if (cancelGraph2 !== undefined) {
        cancelGraph2();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph2 = c;
        })
      });

      getData = [...getData.data];

      this.graphBackwardGVCSector = getData.slice(0, 5);
      this.graphForwardGVCSector = getData.slice(5, 10);

      this.isGraphGVCSector = true;
    },

    async loadGVCGraphEconomy() {
      this.isGraphGVCEconomy = false;

      let urlLink =
        this.path_api +
        `/cal_gvc_graph2.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      if (cancelGraph3 !== undefined) {
        cancelGraph3();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph3 = c;
        })
      });

      getData = [...getData.data];

      getData.forEach(x => {
        let newCountry = this.countryOptions.filter(
          xx => xx.iso == x.country
        )[0].label;

        x.fullName = newCountry;
      });

      this.graphBackwardGVCEconomy = getData.slice(0, 5);
      this.graphForwardGVCEconomy = getData.slice(5, 10);

      this.isGraphGVCEconomy = true;
    },

    async highchartBackwardSector(val) {
      let urlLink = this.path_api + `/cal_gvc_graph1a.php`;

      if (cancelGraph4 !== undefined) {
        cancelGraph4();
      }

      let getData = await Axios.post(urlLink, {
        exporting: this.exp_country.iso,
        sector: val.sector,
        year: this.year,
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph4 = c;
        })
      });

      getData = getData.data;

      let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];

      getData.forEach((x, index) => {
        let newCountry = this.countryOptions.filter(
          xx => xx.iso == x.country
        )[0].label;

        let newVal = x.val.toFixed(0);

        x.color = setColor[index];
        x.name = newCountry;
        x.y = Number(newVal);
      });

      this.backwardSectorLinkToggle = false;

      Highcharts.chart("backwardSector", {
        chart: {
          type: "column"
        },
        title: {
          text: val.sector
        },
        subtitle: {
          text: `${val.precent}%, ${val.value}M`
        },

        exporting: {
          enabled: false
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          categories: ["", "", "", "", ""]
        },
        yAxis: {
          title: {
            text: "Foreign value-added ($)"
          }
        },
        legend: {
          symbolRadius: 0
        },
        plotOptions: {
          column: {
            groupPadding: 0.05,
            pointPadding: 0.25
          },
          series: {
            borderWidth: 0,

            dataLabels: {
              enabled: true,
              format: "${point.y}M"
            }
          }
        },

        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b> ${point.y}M</b>'
        },
        credits: {
          enabled: false
        },

        series: [
          {
            data: [getData[0]],
            color: getData[0].color,
            name: getData[0].country
          },
          {
            data: [getData[1]],
            color: getData[1].color,
            name: getData[1].country
          },
          {
            data: [getData[2]],
            color: getData[2].color,
            name: getData[2].country
          },
          {
            data: [getData[3]],
            color: getData[3].color,
            name: getData[3].country
          },
          {
            data: [getData[4]],
            color: getData[4].color,
            name: getData[4].country
          }
        ]
      });
    },

    async highchartForwardSector(val) {
      let urlLink = this.path_api + `/cal_gvc_graph1b.php`;

      if (cancelGraph5 !== undefined) {
        cancelGraph5();
      }

      let getData = await Axios.post(urlLink, {
        exporting: this.exp_country.iso,
        sector: val.sector,
        year: this.year,
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph5 = c;
        })
      });

      getData = getData.data;

      let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];

      getData.forEach((x, index) => {
        let newCountry = this.countryOptions.filter(
          xx => xx.iso == x.country
        )[0].label;

        let newVal = x.val.toFixed(0);

        x.color = setColor[index];
        x.name = newCountry;
        x.y = Number(newVal);
      });

      this.forwardSectorLinkToggle = false;

      Highcharts.chart("forwardSector", {
        chart: {
          type: "column"
        },
        title: {
          text: val.sector
        },
        subtitle: {
          text: `${val.precent}%, ${val.value}M`
        },

        exporting: {
          enabled: false
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          categories: ["", "", "", "", ""]
        },
        yAxis: {
          title: {
            text: "Contribution to partner exports ($)"
          }
        },
        legend: {
          symbolRadius: 0
        },
        plotOptions: {
          column: {
            groupPadding: 0.05,
            pointPadding: 0.25
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "${point.y}M"
            }
          }
        },

        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b> ${point.y}M</b>'
        },
        credits: {
          enabled: false
        },

        series: [
          {
            data: [getData[0]],
            color: getData[0].color,
            name: getData[0].country
          },
          {
            data: [getData[1]],
            color: getData[1].color,
            name: getData[1].country
          },
          {
            data: [getData[2]],
            color: getData[2].color,
            name: getData[2].country
          },
          {
            data: [getData[3]],
            color: getData[3].color,
            name: getData[3].country
          },
          {
            data: [getData[4]],
            color: getData[4].color,
            name: getData[4].country
          }
        ]
      });
    },

    async highchartBackwardEconomy(val) {
      let urlLink = this.path_api + `/cal_gvc_graph2a.php`;

      if (cancelGraph6 !== undefined) {
        cancelGraph6();
      }

      let getData = await Axios.post(urlLink, {
        exporting: this.exp_country.iso,
        sourcing: val.country,
        year: this.year,
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph6 = c;
        })
      });

      getData = getData.data;

      let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];

      getData.forEach((x, index) => {
        let newVal = x.val.toFixed(0);

        x.color = setColor[index];
        x.name = x.sector;
        x.y = Number(newVal);
      });

      this.backwardEconomyLinkToggle = false;

      Highcharts.chart("backwardEconomy", {
        chart: {
          type: "column"
        },
        title: {
          text: val.fullName
        },
        subtitle: {
          text: `${val.precent}%, ${val.value}M`
        },

        exporting: {
          enabled: false
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          categories: ["", "", "", "", ""]
        },
        yAxis: {
          title: {
            text: "Foreign value-added ($)"
          }
        },
        legend: {
          symbolRadius: 0
        },
        plotOptions: {
          column: {
            groupPadding: 0.05,
            pointPadding: 0.25
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "${point.y}M"
            }
          }
        },

        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b> ${point.y}M</b>'
        },
        credits: {
          enabled: false
        },

        series: [
          {
            data: [getData[0]],
            color: getData[0].color,
            name: getData[0].sector
          },
          {
            data: [getData[1]],
            color: getData[1].color,
            name: getData[1].sector
          },
          {
            data: [getData[2]],
            color: getData[2].color,
            name: getData[2].sector
          },
          {
            data: [getData[3]],
            color: getData[3].color,
            name: getData[3].sector
          },
          {
            data: [getData[4]],
            color: getData[4].color,
            name: getData[4].sector
          }
        ]
      });
    },

    async highchartForwardEconomy(val) {
      console.log(val);
      let urlLink = this.path_api + `/cal_gvc_graph2b.php`;

      if (cancelGraph7 !== undefined) {
        cancelGraph7();
      }

      let getData = await Axios.post(urlLink, {
        exporting: this.exp_country.iso,
        sourcing: val.country,
        year: this.year,
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph7 = c;
        })
      });

      getData = getData.data;

      let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];

      getData.forEach((x, index) => {
        let newVal = x.val.toFixed(0);

        x.color = setColor[index];
        x.name = x.sector;
        x.y = Number(newVal);
      });

      this.forwardEconomyLinkToggle = false;

      Highcharts.chart("forwardEconomy", {
        chart: {
          type: "column"
        },
        title: {
          text: val.fullName
        },
        subtitle: {
          text: `${val.precent}%, ${val.value}M`
        },

        exporting: {
          enabled: false
        },

        xAxis: {
          categories: ["", "", "", "", ""]
        },
        yAxis: {
          title: {
            text: "Contribution to partner exports ($)"
          }
        },
        legend: {
          symbolRadius: 0
        },
        plotOptions: {
          column: {
            groupPadding: 0.05,
            pointPadding: 0.25
          },
          series: {
            dataLabels: {
              enabled: true,
              format: "${point.y}M"
            }
          }
        },
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b> ${point.y}M</b>'
        },
        credits: {
          enabled: false
        },

        series: [
          {
            data: [getData[0]],
            color: getData[0].color,
            name: getData[0].sector
          },
          {
            data: [getData[1]],
            color: getData[1].color,
            name: getData[1].sector
          },
          {
            data: [getData[2]],
            color: getData[2].color,
            name: getData[2].sector
          },
          {
            data: [getData[3]],
            color: getData[3].color,
            name: getData[3].sector
          },
          {
            data: [getData[4]],
            color: getData[4].color,
            name: getData[4].sector
          }
        ]
      });
    },

    async getYear() {
      let url = this.path_api + "/get_year_active.php";
      let data = await Axios.get(url);
      let temp = [];
      data.data.forEach(element => {
        temp.push({ value: Number(element), label: element });
      });
      this.yearOptions = temp;
    }
  },

  async mounted() {
    // Check Session and Params Year
    this.$q.sessionStorage.remove("shareLink");
    await this.getCountryList();
    await this.getYear();

    if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
      this.year = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.getItem("year");
    }

    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      this.exp_country = this.$route.params.expe
        ? this.countryOptions.filter(x => x.iso == this.$route.params.expe)[0]
        : this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("expe")
          )[0];

      this.exp_optionsShow = this.countryOptions;
    }

    if (this.validateSelected()) {
      this.renderGraph();
    }

    // this.checkPlatform();
  },
  beforeDestroy() {
    if (cancelGraph1 !== undefined) {
      cancelGraph1();
    }

    if (cancelGraph2 !== undefined) {
      cancelGraph2();
    }

    if (cancelGraph3 !== undefined) {
      cancelGraph3();
    }

    if (cancelGraph4 !== undefined) {
      cancelGraph4();
    }

    if (cancelGraph5 !== undefined) {
      cancelGraph5();
    }

    if (cancelGraph6 !== undefined) {
      cancelGraph6();
    }

    if (cancelGraph7 !== undefined) {
      cancelGraph7();
    }
  }
};
</script>

<style lang="scss" scoped>
.box-border {
  border: 1px solid;
}

.c-blue {
  color: #283891;
}

.c-red {
  color: #8d273d;
}

// Graph left

.graph-arrow-center {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  -moz-transform: translate(0%, -50%);
  -webkit-transform: translate(0%, -50%);
  -o-transform: translate(0%, -50%);
}
</style>
