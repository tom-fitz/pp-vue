<script setup lang="ts">
import { useUserStore } from './store';
import { useRoute } from 'vue-router';

const userStore = useUserStore();

const route = useRoute();

const uid = route.params['uid'].toString();

const user = userStore.setCurrentUser(uid);

</script>
<template><div></div></template>