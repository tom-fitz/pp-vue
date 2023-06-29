<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from './store';
const store = useUserStore();
const router = useRouter();
const logout = () => {
    store.signOutUser(store.user);
    router.push('/login')
}
</script>
<template>
    <v-btn @click.stop="logout">Logout</v-btn>
</template>