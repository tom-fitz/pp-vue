<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from './store';
import { mdiLogout } from '@mdi/js';
import { ref } from 'vue';
const store = useUserStore();
const router = useRouter();
const logout = () => {
    store.signOutUser(store.user);
    router.push('/login')
};
const logoutIcon = ref(mdiLogout);
</script>
<template>
    <v-btn 
        block
        size="large" 
        color="surface" 
        variant="outlined" 
        class="text-none"
        @click.stop="logout"
        :prepend-icon="logoutIcon"
    >Logout</v-btn>
</template>