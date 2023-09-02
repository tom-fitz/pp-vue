<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from './modules/user/store';
import { useRouter } from 'vue-router';

const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const router = useRouter();

const viewProfile = (id: string): void => {
  if (id === '') {
    return;
  }

  router.push({ name: 'user-profile', params: { uid: id } });
}
</script>
<template>
  <v-app id="inspire" style="background-color:#141625;">
    <v-navigation-drawer
      color="#1F213A"
      :width="80"
      style="border-top-right-radius:15px;border-bottom-right-radius:15px"
    >
      <v-row align="center" class="h-100 flex-column" style="margin:0!important;">
        <v-col cols="auto" width="100%" class="h-10 pt-6 pb-6" style="background-color:#7C5DF9;border-bottom-right-radius:15px;border-top-right-radius:15px;">
          <v-img
            :width="55"
            aspect-ratio="16/9"
            cover
            class="pb-6 d-block text-center mx-auto"
          ></v-img>
        </v-col>
        <v-spacer />
        <v-avatar
          :color="'#7C5DF9'"
          size="55"
          @click.stop="viewProfile(user.id ?? '')"
          class="mb-4"
        >
          <span class="text-h5">{{ user.getInitials() }}</span>
        </v-avatar>
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
<style>
.v-avatar {
  cursor: pointer;
}
</style>