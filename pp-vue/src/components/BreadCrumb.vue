<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';


const route = useRoute();

const breadCrumbs = computed(() => {
    if (typeof route.meta.breadCrumb === "function") {
        return route.meta.breadCrumb.call(this, route);
      }
      return route.meta.breadCrumb;
})

</script>
<template>
    <v-breadcrumbs :items="breadCrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.to"
          class="text-subtitle-2 crumb-item"
          :disabled="item.disabled"
          exact
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
</template>