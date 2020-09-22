<template>
  <div style="background-color:#404040;height:88px">
    <div class="row items-center fit">
      <div
        v-ripple
        @click="toGVC()"
        :class="{'text-yellow' : activeMenu == 0}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >Key GVC relationships</div>
      <div
        v-ripple
        @click="toStructure()"
        :class="{'text-yellow' : activeMenu == 1}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >Structure of value added</div>
      <div
        v-ripple
        @click="toParticipation()"
        :class="{'text-yellow' : activeMenu == 2}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >Participation of GVCs</div>
      <div
        v-ripple
        @click="toBackward()"
        :class="{'text-yellow' : activeMenu == 3}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >Backward linkages</div>
      <div
        v-ripple
        @click="toForward()"
        :class="{'text-yellow' : activeMenu == 4}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >Forward linkages</div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            activeMenu: {
                type: Number,
                default: 0
            },
        },
        methods: {
            toGVC() {
                this.$router.push("/gvc-links")
            },
            toStructure(){
                 this.$router.push("/structure-of-value-added")
            },
            toParticipation(){
                 this.$router.push("/participation-in-gvcs")
            },
            toBackward(){
                //  this.$router.push("/gvc-links")
            },
            toForward(){
                //  this.$router.push("/gvc-links")
            }
        },
        
    }
</script>

<style lang="scss" scoped>
</style>