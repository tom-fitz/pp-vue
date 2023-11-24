<script setup lang="ts">
import router from '@/router';
import { User } from './User';
import { useUserStore } from './store';
import { ref } from 'vue';

const store = useUserStore();

const user = ref(new User());

const valid = ref(false);

const register = async () => {
    await store.registerUser(user.value)
    if (store.user.isAdmin) {
        router.push({ name: 'program-dashboard' })
    } else {
        router.push({ name: 'program-list' })
    }
};
</script>
<template>
    <v-card color="transparent" elevation="0" width="800">
        <v-img height="200" fit src="../../../src/assets/full_logo.png"></v-img>
        <v-card-title class="text-h5">Register</v-card-title>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col class="mb-0 pb-0" cols="12">
                        <v-text-field
                            required
                            v-model="user.email"
                            class="pt-4"
                            variant="outlined"
                            placeholder="Email"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="mt-0 pt-0" cols="12">
                        <v-text-field
                            required
                            v-model="user.password"
                            class="pt-4"
                            variant="outlined"
                            placeholder="Password"
                            type="password"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-0">
                    <v-col cols="auto">
                        <h6>Already registered? <router-link to="/login">Login here</router-link>.</h6>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="auto">
                        <v-btn
                            block
                            size="large"
                            color="accent"
                            variant="flat" 
                            @click.stop="register()"
                            data-test="user-login"
                            :loading="store.loading"
                        >Register</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>