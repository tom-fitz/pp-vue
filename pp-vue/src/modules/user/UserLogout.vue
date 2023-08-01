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
    <v-btn 
        block   
        rounded="xl" 
        size="large" 
        color="#7C5DF9" 
        variant="flat" 
        class="text-none"
        @click.stop="logout"
    >Logout</v-btn>
</template>