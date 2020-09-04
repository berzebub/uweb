<template>
  <div>
    <!--  -->
    <div class="backward-box q-pa-md">
      <div class="graph-position">
        <div class="relative-position" v-for="(item,index) in data" :key="index">
          <div
            :class="{'backward-line-pink':index == 0,'backward-line-yellow':index == 1,'backward-line-green':index == 2,'backward-line-blue':index == 3,'backward-line-purple':index == 4}"
          >
            <div class="border-circle">
              <div
                :class="{'color-circle-pink':index == 0,'color-circle-yellow':index == 1,'color-circle-green':index == 2,'color-circle-blue':index == 3,'color-circle-purple':index == 4}"
                class
                :style="{width:item.valuepx + 'px',height:item.valuepx + 'px'}"
              ></div>
              <div class="sub-data relative-position">
                <div>{{item.sector}}</div>
                <div>{{item.precent}}%</div>
                <div>${{item.value}}</div>

                <div class="sub-line-1">
                  <div
                    class="sub-color-circle"
                    :style="{width:item.val1px + 'px',height:item.val1px + 'px'}"
                  ></div>
                  <span class="sub-text">{{item.exp_country1}} ({{item.val1}})</span>
                </div>
                <div class="sub-line-2">
                  <div
                    class="sub-color-circle"
                    :style="{width:item.val2px + 'px',height:item.val2px + 'px'}"
                  ></div>
                  <span class="sub-text">{{item.exp_country2}} ({{item.val2}})</span>
                </div>
                <div class="sub-line-3">
                  <div
                    class="sub-color-circle"
                    :style="{width:item.val3px + 'px',height:item.val3px + 'px'}"
                  ></div>
                  <span class="sub-text">{{item.exp_country3}} ({{item.val3}})</span>
                </div>
                <div class="sub-line-4">
                  <div
                    class="sub-color-circle"
                    :style="{width:item.val4px + 'px',height:item.val4px + 'px'}"
                  ></div>
                  <span class="sub-text">{{item.exp_country4}} ({{item.val4}})</span>
                </div>
                <div class="sub-line-5">
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
.backward-box {
  position: relative;
  width: 400px;
  height: 800px;
  background-color: #fff;

  .graph-position {
    position: absolute;
    right: 95px;
    top: 50%;
    transform: translate(0%, -50%);

    // Line Two Yellow ----------------------------------------
    .backward-line-pink {
      position: absolute;
      transform-origin: right;
      width: 120px;
      height: 2px;
      background-color: #fe7d77;

      .border-circle {
        position: relative;
        width: 25px;
        height: 25px;
        top: 50%;
        left: 0px;
        transform: translate(-100%, -50%);
        border-radius: 50%;

        .color-circle-pink {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #fe7d77;
        }

        // Sub Data
        .sub-data {
          color: #fe7d77;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          width: 100px;
          left: -15px;
          top: 50%;
          transform: translate(-100%, -50%);

          .sub-line-1 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(60deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fe7d77;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fe7d77;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -10px;
              top: 30px;
              transform: translate(-100%, 0%) rotate(-60deg);
            }
          }

          .sub-line-2 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(30deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fe7d77;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fe7d77;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -20px;
              top: 15px;
              transform: translate(-100%, 0%) rotate(-30deg);
            }
          }
          .sub-line-3 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(0deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fe7d77;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fe7d77;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -27px;
              top: 50%;
              transform: translate(-100%, -50%) rotate(0deg);
            }
          }
          .sub-line-4 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-30deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fe7d77;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fe7d77;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -20px;
              top: -30px;
              transform: translate(-100%, 0%) rotate(30deg);
            }
          }
          .sub-line-5 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-60deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fe7d77;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fe7d77;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -10px;
              top: -45px;
              transform: translate(-100%, 0%) rotate(60deg);
            }
          }
        }
      }
    }

    .backward-line-pink::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #fe7d77;
    }

    // Line Two Yellow ----------------------------------------
    .backward-line-yellow {
      position: absolute;
      transform-origin: right;
      width: 120px;
      height: 2px;
      background-color: #fec111;
      transform: rotate(35deg);
      margin-top: -15px;
      margin-left: 2px;

      .border-circle {
        position: relative;
        width: 30px;
        height: 30px;
        top: 50%;
        left: 0px;
        transform: translate(-100%, -50%);
        border-radius: 50%;

        .color-circle-yellow {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #fec111;
        }

        // Sub Data
        .sub-data {
          color: #fec111;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          width: 100px;
          left: 0px;
          top: 10px;
          transform: translate(-100%, -80%) rotate(-35deg);

          .sub-line-1 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(60deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fec111;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fec111;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -10px;
              top: 30px;
              transform: translate(-100%, 0%) rotate(-60deg);
            }
          }

          .sub-line-2 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(30deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fec111;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fec111;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -20px;
              top: 15px;
              transform: translate(-100%, 0%) rotate(-30deg);
            }
          }
          .sub-line-3 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(0deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fec111;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fec111;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -27px;
              top: 50%;
              transform: translate(-100%, -50%) rotate(0deg);
            }
          }
          .sub-line-4 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-30deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fec111;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fec111;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -20px;
              top: -30px;
              transform: translate(-100%, 0%) rotate(30deg);
            }
          }
          .sub-line-5 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-60deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #fec111;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #fec111;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -10px;
              top: -45px;
              transform: translate(-100%, 0%) rotate(60deg);
            }
          }
        }
      }
    }

    .backward-line-yellow::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #fec111;
    }

    // Line Three Green ----------------------------------------
    .backward-line-green {
      position: absolute;
      transform-origin: right;
      width: 120px;
      height: 2px;
      background-color: #70ae47;
      transform: rotate(-35deg);
      margin-top: 15px;
      margin-left: 2px;

      .border-circle {
        position: relative;
        width: 25px;
        height: 25px;
        top: 50%;
        left: 0px;
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
          left: -5px;
          top: 7px;
          transform: translate(-100%, 0%) rotate(35deg);

          .sub-line-1 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(60deg);
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
              left: -10px;
              top: 30px;
              transform: translate(-100%, 0%) rotate(-60deg);
            }
          }

          .sub-line-2 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(30deg);
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
              left: -20px;
              top: 15px;
              transform: translate(-100%, 0%) rotate(-30deg);
            }
          }
          .sub-line-3 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(0deg);
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
              transform: translate(-100%, -50%) rotate(0deg);
            }
          }
          .sub-line-4 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-30deg);
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
              left: -20px;
              top: -30px;
              transform: translate(-100%, 0%) rotate(30deg);
            }
          }
          .sub-line-5 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-60deg);
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
              left: -10px;
              top: -45px;
              transform: translate(-100%, 0%) rotate(60deg);
            }
          }
        }
      }
    }

    .backward-line-green::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(70%, -50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #70ae47;
    }

    // Line Four Blue ----------------------------------------
    .backward-line-blue {
      position: absolute;
      transform-origin: right;
      width: 120px;
      height: 2px;
      background-color: #5a9bd5;
      transform: rotate(80deg);
      margin-top: -25px;
      margin-left: 12px;

      .border-circle {
        position: relative;
        width: 25px;
        height: 25px;
        top: 50%;
        left: 0px;
        transform: translate(-100%, -50%);
        border-radius: 50%;

        .color-circle-blue {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #5a9bd5;
        }

        // Sub Data
        .sub-data {
          color: #5a9bd5;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          width: 100px;
          left: -10px;
          top: 10px;
          transform: translate(-120%, -100%) rotate(-80deg);

          .sub-line-1 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(60deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #5a9bd5;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #5a9bd5;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -10px;
              top: 30px;
              transform: translate(-100%, 0%) rotate(-60deg);
            }
          }

          .sub-line-2 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(30deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #5a9bd5;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #5a9bd5;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -20px;
              top: 15px;
              transform: translate(-100%, 0%) rotate(-30deg);
            }
          }
          .sub-line-3 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(0deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #5a9bd5;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #5a9bd5;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -27px;
              top: 50%;
              transform: translate(-100%, -50%) rotate(0deg);
            }
          }
          .sub-line-4 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-30deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #5a9bd5;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #5a9bd5;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -20px;
              top: -30px;
              transform: translate(-100%, 0%) rotate(30deg);
            }
          }
          .sub-line-5 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-60deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #5a9bd5;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #5a9bd5;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -10px;
              top: -45px;
              transform: translate(-100%, 0%) rotate(60deg);
            }
          }
        }
      }
    }

    .backward-line-blue::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(70%, -50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #5a9bd5;
    }

    // Line Five Purple ----------------------------------------
    .backward-line-purple {
      position: absolute;
      transform-origin: right;
      width: 120px;
      height: 2px;
      background-color: #6c2c9c;
      transform: rotate(-80deg);
      margin-top: 25px;
      margin-left: 12px;

      .border-circle {
        position: relative;
        width: 25px;
        height: 25px;
        top: 50%;
        left: 0px;
        transform: translate(-100%, -50%);
        border-radius: 50%;

        .color-circle-purple {
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #6c2c9c;
        }

        // Sub Data
        .sub-data {
          color: #6c2c9c;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          width: 100px;
          left: -10px;
          top: -10px;
          transform: translate(-120%, 45%) rotate(80deg);

          .sub-line-1 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(60deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #6c2c9c;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #6c2c9c;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -10px;
              top: 30px;
              transform: translate(-100%, 0%) rotate(-60deg);
            }
          }

          .sub-line-2 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(30deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #6c2c9c;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #6c2c9c;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -20px;
              top: 15px;
              transform: translate(-100%, 0%) rotate(-30deg);
            }
          }
          .sub-line-3 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(0deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #6c2c9c;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #6c2c9c;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -27px;
              top: 50%;
              transform: translate(-100%, -50%) rotate(0deg);
            }
          }
          .sub-line-4 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-30deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #6c2c9c;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #6c2c9c;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -20px;
              top: -30px;
              transform: translate(-100%, 0%) rotate(30deg);
            }
          }
          .sub-line-5 {
            position: absolute;
            left: -10%;
            top: 50%;
            transform: translate(-100%, -100%) rotate(-60deg);
            transform-origin: right;
            width: 50px;
            height: 2px;
            background-color: #6c2c9c;

            .sub-color-circle {
              position: relative;
              border-radius: 50%;
              top: 50%;
              left: 0;
              transform: translate(-100%, -50%);
              background-color: #6c2c9c;
            }

            .sub-text {
              position: absolute;
              white-space: nowrap;
              left: -10px;
              top: -45px;
              transform: translate(-100%, 0%) rotate(60deg);
            }
          }
        }
      }
    }
  }

  .backward-line-purple::before {
    content: "";
    position: absolute;
    width: 7px;
    height: 7px;
    top: 50%;
    right: 0;
    transform: translate(70%, -50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 7px;
    border-color: transparent transparent transparent #6c2c9c;
  }
}
</style>