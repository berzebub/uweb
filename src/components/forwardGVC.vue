<template>
  <div>
    <!-- Forward Graph GVC -->
    <div class="forward-box q-pa-md">
      <div class="graph-position">
        <div class="relative-position" v-for="(item,index) in data" :key="index">
          <div
            :class="{'forward-line-grey':index == 0,'forward-line-orange':index == 1,'forward-line-brown':index == 2,'forward-line-green':index == 3,'forward-line-purple':index == 4}"
          >
            <div class="border-circle">
              <div
                :class="{'color-circle-grey':index == 0,'color-circle-orange':index == 1,'color-circle-brown':index == 2,'color-circle-green':index == 3,'color-circle-purple':index == 4}"
                class
                :style="{width:item.valuepx + 'px',height:item.valuepx + 'px'}"
              ></div>
              <div class="sub-data relative-position">
                <div>{{item.sector}}</div>
                <div>{{item.precent}}%</div>
                <div>${{item.value}}</div>

                <div class="sub-line-1">
                  <div class="sub-circle">
                    <div
                      class="sub-color-circle"
                      :style="{width:item.val1px + 'px',height:item.val1px + 'px'}"
                    ></div>
                    <span class="sub-text">{{item.exp_country1}} ({{item.val1}})</span>
                  </div>
                </div>
                <div class="sub-line-2">
                  <div class="sub-circle">
                    <div
                      class="sub-color-circle"
                      :style="{width:item.val2px + 'px',height:item.val2px + 'px'}"
                    ></div>
                    <span class="sub-text">{{item.exp_country2}} ({{item.val2}})</span>
                  </div>
                </div>
                <div class="sub-line-3">
                  <div class="sub-circle">
                    <div
                      class="sub-color-circle"
                      :style="{width:item.val3px + 'px',height:item.val3px + 'px'}"
                    ></div>
                    <span class="sub-text">{{item.exp_country3}} ({{item.val3}})</span>
                  </div>
                </div>
                <div class="sub-line-4">
                  <div class="sub-circle">
                    <div
                      class="sub-color-circle"
                      :style="{width:item.val4px + 'px',height:item.val4px + 'px'}"
                    ></div>
                    <span class="sub-text">{{item.exp_country4}} ({{item.val4}})</span>
                  </div>
                </div>
                <div class="sub-line-5">
                  <div class="sub-circle">
                    <div
                      class="sub-color-circle"
                      :style="{width:item.val5px + 'px',height:item.val5px + 'px'}"
                    ></div>
                    <span class="sub-text">{{item.exp_country5}} ({{item.val5}})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.forward-box {
  position: relative;
  width: 400px;
  height: 800px;
  background-color: #fff;

  .graph-position {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translate(0%, -50%);

    // Start -------------- Line Grey --------------
    .forward-line-grey {
      position: absolute;
      transform-origin: left;
      width: 120px;
      height: 2px;
      background-color: #ababab;

      .border-circle {
        position: relative;
        width: 25px;
        height: 25px;
        top: 50%;
        right: -150px;
        transform: translate(-100%, -50%);
        border-radius: 50%;

        .color-circle-grey {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #ababab;
        }

        // Sub Data
        .sub-data {
          color: #ababab;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          width: 100px;
          left: 140px;
          top: 50%;
          transform: translate(-100%, -50%);

          .sub-line-1 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ababab;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ababab;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 5px;
                top: -45px;
                transform: translate(-120%, 0%) rotate(-120deg);
              }
            }
          }

          .sub-line-2 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ababab;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ababab;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 0%;
                top: -30px;
                transform: translate(-135%, 0%) rotate(-150deg);
              }
            }
          }

          .sub-line-3 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(180deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ababab;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ababab;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: -27px;
                top: 50%;
                transform: translate(-100%, -50%) rotate(-180deg);
              }
            }
          }

          .sub-line-4 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ababab;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ababab;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 0%;
                top: 15px;
                transform: translate(-135%, 0%) rotate(150deg);
              }
            }
          }

          .sub-line-5 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ababab;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ababab;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 0px;
                top: 35px;
                transform: translate(-120%, 0%) rotate(120deg);
              }
            }
          }
        }
      }
    }

    .forward-line-grey::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #ababab;
    }
    // End -------------- Line Grey --------------

    // Start -------------- Line Orange --------------
    .forward-line-orange {
      position: absolute;
      transform-origin: left;
      width: 120px;
      height: 2px;
      background-color: #ff920f;
      transform: rotate(-35deg);
      margin-top: -15px;
      margin-left: 2px;

      .border-circle {
        position: relative;
        width: 25px;
        height: 25px;
        top: 50%;
        right: -150px;
        transform: translate(-100%, -50%);
        border-radius: 50%;

        .color-circle-orange {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #ff920f;
        }

        // Sub Data
        .sub-data {
          color: #ff920f;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          width: 100px;
          left: 145px;
          top: 5px;
          transform: translate(-100%, -50%) rotate(35deg);

          .sub-line-1 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ff920f;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ff920f;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 5px;
                top: -45px;
                transform: translate(-120%, 0%) rotate(-120deg);
              }
            }
          }

          .sub-line-2 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ff920f;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ff920f;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 0%;
                top: -30px;
                transform: translate(-135%, 0%) rotate(-150deg);
              }
            }
          }

          .sub-line-3 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(180deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ff920f;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ff920f;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: -27px;
                top: 50%;
                transform: translate(-100%, -50%) rotate(-180deg);
              }
            }
          }

          .sub-line-4 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ff920f;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ff920f;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 0%;
                top: 15px;
                transform: translate(-135%, 0%) rotate(150deg);
              }
            }
          }

          .sub-line-5 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #ff920f;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ff920f;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 0px;
                top: 35px;
                transform: translate(-120%, 0%) rotate(120deg);
              }
            }
          }
        }
      }
    }

    .forward-line-orange::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #ff920f;
    }
    // End -------------- Line Orange --------------

    // Start -------------- Line Brown --------------
    .forward-line-brown {
      position: absolute;
      transform-origin: left;
      width: 120px;
      height: 2px;
      background-color: #965213;
      transform: rotate(35deg);
      margin-top: 15px;
      margin-left: 2px;

      .border-circle {
        position: relative;
        width: 25px;
        height: 25px;
        top: 50%;
        right: -150px;
        transform: translate(-100%, -50%);
        border-radius: 50%;

        .color-circle-brown {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #965213;
        }

        // Sub Data
        .sub-data {
          color: #965213;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          width: 100px;
          left: 144px;
          top: 20px;
          transform: translate(-100%, -50%) rotate(-35deg);

          .sub-line-1 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #965213;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #965213;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 0px;
                top: -40px;
                transform: translate(-120%, 0%) rotate(-120deg);
              }
            }
          }

          .sub-line-2 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #965213;

            .sub-circle {
              position: relative;
              width: 17px;
              height: 17px;
              top: 50%;
              right: 0px;
              transform: translate(-100%, -50%);
              border-radius: 50%;
              border: 1px solid#f00;

              .sub-color-circle {
                position: absolute;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #965213;
              }

              .sub-text {
                position: absolute;
                white-space: nowrap;
                left: 0%;
                top: -30px;
                transform: translate(-135%, 0%) rotate(-150deg);
              }
            }
          }

          .sub-line-3 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(180deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #965213;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #965213;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -27px;
              top: 50%;
              transform: translate(-100%, -50%) rotate(-180deg);
            }
          }

          .sub-line-4 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #965213;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #965213;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: 0%;
              top: 15px;
              transform: translate(-135%, 0%) rotate(150deg);
            }
          }

          .sub-line-5 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #965213;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #965213;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -0px;
              top: 35px;
              transform: translate(-120%, 0%) rotate(120deg);
            }
          }
        }
      }
    }

    .forward-line-brown::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #965213;
    }
    // End -------------- Line Brown --------------

    // Start -------------- Line Green --------------
    .forward-line-green {
      position: absolute;
      transform-origin: left;
      width: 120px;
      height: 2px;
      background-color: #70ae47;
      transform: rotate(80deg);
      margin-top: 25px;
      margin-left: -7px;

      .border-circle {
        position: relative;
        width: 25px;
        height: 25px;
        top: 50%;
        right: -150px;
        transform: translate(-100%, -50%);
        border-radius: 50%;

        .color-circle-green {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #70ae47;
        }

        // Sub Data
        .sub-data {
          color: #70ae47;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          width: 100px;
          left: 150px;
          top: 59px;
          transform: translate(-100%, -100%) rotate(-80deg);

          .sub-line-1 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #70ae47;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #70ae47;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -0px;
              top: -45px;
              transform: translate(-120%, 0%) rotate(-120deg);
            }
          }

          .sub-line-2 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #70ae47;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #70ae47;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: 0%;
              top: -30px;
              transform: translate(-135%, 0%) rotate(-150deg);
            }
          }

          .sub-line-3 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(180deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #70ae47;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #70ae47;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -27px;
              top: 50%;
              transform: translate(-100%, -50%) rotate(-180deg);
            }
          }

          .sub-line-4 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #70ae47;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #70ae47;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -0px;
              top: 15px;
              transform: translate(-135%, 0%) rotate(150deg);
            }
          }

          .sub-line-5 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #70ae47;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #70ae47;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -0px;
              top: 30px;
              transform: translate(-120%, 0%) rotate(120deg);
            }
          }
        }
      }
    }

    .forward-line-green::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #70ae47;
    }
    // End -------------- Line Green --------------

    // Start -------------- Line purple --------------
    .forward-line-purple {
      position: absolute;
      transform-origin: left;
      width: 120px;
      height: 2px;
      background-color: #702fa0;
      transform: rotate(-80deg);
      margin-top: -25px;
      margin-left: -7px;

      .border-circle {
        position: relative;
        width: 25px;
        height: 25px;
        top: 50%;
        right: -150px;
        transform: translate(-100%, -50%);
        border-radius: 50%;

        .color-circle-purple {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #702fa0;
        }

        // Sub Data
        .sub-data {
          color: #702fa0;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          width: 100px;
          left: 152px;
          top: 20px;
          transform: translate(-100%, -100%) rotate(80deg);

          .sub-line-1 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #702fa0;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #702fa0;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -0px;
              top: -45px;
              transform: translate(-120%, 0%) rotate(-120deg);
            }
          }

          .sub-line-2 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #702fa0;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #702fa0;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: 0%;
              top: -30px;
              transform: translate(-135%, 0%) rotate(-150deg);
            }
          }

          .sub-line-3 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(180deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #702fa0;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #702fa0;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -27px;
              top: 50%;
              transform: translate(-100%, -50%) rotate(-180deg);
            }
          }

          .sub-line-4 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-150deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #702fa0;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #702fa0;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -0px;
              top: 15px;
              transform: translate(-135%, 0%) rotate(150deg);
            }
          }

          .sub-line-5 {
            position: absolute;
            left: 100%;
            top: 28px;
            transform: translate(-100%, -100%) rotate(-120deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #702fa0;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #702fa0;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -0px;
              top: 30px;
              transform: translate(-120%, 0%) rotate(120deg);
            }
          }
        }
      }
    }

    .forward-line-purple::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #702fa0;
    }
    // End -------------- Line purple --------------
  }
}
</style>