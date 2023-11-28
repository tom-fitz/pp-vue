<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from './modules/user/store';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';
import { mdiClipboard, mdiWeight } from '@mdi/js';
import { ref } from 'vue'

const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const router = useRouter();
const route = useRoute();


const viewProfile = (id: string): void => {
  if (id === '') {
    return;
  }

  router.push({ name: 'user-profile', params: { uid: id } });
}

const currDay = moment().format('dddd');
const currDayDisplay = moment().format('MMMM Do YYYY');

const programIcon = ref(mdiClipboard);

const exerIcon = ref(mdiWeight);

const navItems = ref([
  {
    color: 'surface',
    toolTip: 'Programs',
    icon: programIcon,
    toName: 'program-dashboard',
    id: 0,
  },
  {
    color: 'surface',
    toolTip: 'Exercises',
    icon: exerIcon,
    toName: 'program-exercise',
    id: 1,
  }
]);

const routeRequest = (to: string) => {
  if (to === '') {
    return;
  }
  router.push({name: to});
}

const excludeList: Array<string> = ['program-create','login','register'];

const excludeMainNav: Array<string> = ['login','register']

console.log("route name: ", route.name)

</script>
<template>
  <v-app id="inspire">
    <template v-if="!excludeList.some((name: string) => name === route.name)">
    <v-navigation-drawer
      model-value
      color="primary"
      rail
      permanent
    >
      <v-img
        aspect-ratio="1/1"
        cover
        :width="350"
        src="../src/assets/pp_icon.png"
      ></v-img>
      <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.id"
        @click.stop="routeRequest(item.toName)"
      >
        <v-icon :color="item.color">{{ item.icon }}</v-icon>
        <v-tooltip activator="parent" location="end">{{ item.toolTip }}</v-tooltip>
      </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-row>
          <v-col align="center">
            <v-divider :thickness="2" color="surface"></v-divider>
            <v-avatar
              color="accent"
              size="40"
              @click.stop="viewProfile(user.id ?? '')"
              class="mb-4 mt-4"
            >
              <span class="text-h7 icon-text">{{ user.getInitials() }}</span>
            </v-avatar>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>
    </template>
    <template v-if="!excludeList.some((name: string) => name === route.name)">
      <v-navigation-drawer permanent color="secondary">
        <v-row class="ma-0">
          <v-col class="mt-8 mb-0 pl-8 pb-0 d-flex justify-left align-left">
            <h4 class="menu-header">{{ currDay }}</h4>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col class="ma-0 pa-0 pl-8 d-flex justify-left align-left">
            <h3 class="menu-header">{{ currDayDisplay }}</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pl-8 pr-8">
            <v-divider :thickness="2" color="surface"></v-divider>
          </v-col>
        </v-row>
      </v-navigation-drawer>
    </template>

    <v-main 
      class="d-flex align-center justify-center" 
      style="min-height:300px; width:100%;"
    >
      <RouterView />
    </v-main>
  </v-app>
</template>
<style>
.menu-header {
  color: rgb(var(--v-theme-surface))
}
.initial-text {
  color: (rgb(var(--v-theme-surface)))
}
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
.icon-text {
    color: rgb(var(--v-theme-surface)) !important;
}
</style>