<template>
  <v-app id="inspire" style="background-color:#141625;">
    <v-navigation-drawer
      color="#1F213A"
      :width="80"
      style="border-top-right-radius:15px;border-bottom-right-radius:15px"
    >
      <v-row class="h-100 flex-column" style="margin:0!important;">
        <v-col cols="auto" :width="80" class="align-items-center pt-6 pb-6" style="background-color:#7C5DF9;border-bottom-right-radius:15px;border-top-right-radius:15px;">
          <v-img
            :width="35"
            aspect-ratio="16/9"
            cover
            class="d-block text-center mx-auto"
            src="../assets/logo.svg"
          ></v-img>
        </v-col>
        <v-spacer />
        <!-- <v-col cols="auto" style="text-align:center">
          <SvgIcon type="mdi" :path="avatarPath" color="white" cover></SvgIcon>
        </v-col>
        <v-col cols="auto">
          <v-img
            :width="46"
            aspect-ratio="16/9"
            cover
            style="border-radius:50%"
            class="d-block text-center mx-auto"
            src="../assets/image-avatar.jpg"
          ></v-img>
        </v-col> -->
      </v-row>
    </v-navigation-drawer>

    <v-container style="margin-top:100px;max-width:90%">
      <v-row justify="center">
        <v-col cols="12">
          <v-sheet
            rounded="lg"
            width="90%"
            color="transparent"
          >
            <RouterView />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
// import { defineComponent } from 'vue'

// export default defineComponent({
//   name: 'App',

//   data () {
//     return {
//       //
//     }
//   },
// })
</script>
