<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from './modules/user/store';
import { useRouter } from 'vue-router';
import BreadCrumb from './components/BreadCrumb.vue';

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
  <v-app id="inspire">
    <!-- <v-system-bar>
        <v-spacer />
        <v-avatar
          color="#748cab"
          size="55"
          @click.stop="viewProfile(user.id ?? '')"
          class="mb-4"
        >
          <span class="text-h5">{{ user.getInitials() }}</span>
        </v-avatar>
    </v-system-bar>
    <v-navigation-drawer
      color="#1d2d44"
      :width="80"
      style="border-top-right-radius:15px;border-bottom-right-radius:15px"
    >
      <v-row align="center" class="flex-column" style="margin:0!important;">
        <v-col cols="auto" width="100%" class="h-10 pt-6 pb-6 logo" style="border-bottom-right-radius:15px;border-top-right-radius:15px;">
          <v-img
            :width="55"
            aspect-ratio="16/9"
            cover
            class="pb-6 d-block text-center mx-auto"
          ></v-img>
        </v-col>
      </v-row>
      <v-spacer />
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-avatar
            color="#748cab"
            size="55"
            @click.stop="viewProfile(user.id ?? '')"
            class="mb-4"
          >
            <span class="text-h5">{{ user.getInitials() }}</span>
          </v-avatar>
        </v-col>
      </v-row>
    </v-navigation-drawer> -->

    <v-navigation-drawer
      model-value
      color="#1d2d44"
      :width="80"
      style="border-top-right-radius:15px;border-bottom-right-radius:15px"
      rail
    >
      <v-row align="center" class="flex-column" style="margin:0!important;">
        <v-col cols="auto" width="100%" class="h-9 pt-6 pb-6 logo" style="border-bottom-right-radius:15px;border-top-right-radius:15px;">
          <v-img
            :width="55"
            aspect-ratio="16/9"
            cover
            class="pb-6 d-block text-center mx-auto"
          ></v-img>
        </v-col>
      </v-row>
      <template v-slot:append>
        <v-row>
          <v-col align="center">
            <v-divider :thickness="1" color="#FFFFFF"></v-divider>
            <v-avatar
              color="#748cab"
              size="40"
              @click.stop="viewProfile(user.id ?? '')"
              class="mb-4 mt-4"
            >
              <span class="text-h6">{{ user.getInitials() }}</span>
            </v-avatar>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>

    <v-main 
      class="d-flex align-center justify-center" 
      style="min-height:300px; width:100%;"
    >
      <RouterView />
    </v-main>
  </v-app>
</template>
<style>
.drawer-bg {
  background-color:rgb(var(--v-theme-primary));
}
.avatar-bg {
  color:rgb(var(--v-theme-accent));
}
.v-avatar {
  cursor: pointer;
}
.logo {
  background-color: rgb(var(--v-theme-accent));
}
</style>