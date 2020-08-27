<template>
  <div class="flex flex-center window-height">
    <!--  -->
    <div>
      <div c-pink class="line" id="arrow-line"></div>
      <div
        c-yellow
        class="line"
        style="transform:rotate(35deg);margin-top:-12px;margin-left:2px;"
        id="arrow-line"
      ></div>
      <div
        c-green
        class="line"
        style="transform:rotate(-35deg);margin-top:18px;margin-left:2px;"
        id="arrow-line"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
};
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  transform-origin: right;
  width: 120px;
  height: 2px;
}

.line::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
}

.line::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%) rotate(-45deg);
}

.line[c-pink],
.line[c-pink]::after {
  background-color: #fe7d77;
}
.line[c-pink]::before {
  background: linear-gradient(
    to bottom right,
    transparent,
    transparent,
    #fe7d77,
    #fe7d77 100%
  );
}

.line[c-green],
.line[c-green]::after {
  background-color: #70ae47;
}
.line[c-green]::before {
  background: linear-gradient(
    to bottom right,
    transparent,
    transparent,
    #70ae47,
    #70ae47 100%
  );
}

.line[c-yellow],
.line[c-yellow]::after {
  background-color: #fec111;
}
.line[c-yellow]::before {
  background: linear-gradient(
    to bottom right,
    transparent,
    transparent,
    #fec111,
    #fec111 100%
  );
}

.line[c-blue],
.line[c-blue]::after {
  background-color: #5a9bd5;
}
.line[c-blue]::before {
  background: linear-gradient(
    to bottom right,
    transparent,
    transparent,
    #5a9bd5,
    #5a9bd5 100%
  );
}

.line[c-purple],
.line[c-purple]::after {
  background-color: #6c2c9c;
}
.line[c-purple]::before {
  background: linear-gradient(
    to bottom right,
    transparent,
    transparent,
    #6c2c9c,
    #6c2c9c 100%
  );
}
</style>