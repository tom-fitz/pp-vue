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
        <v-card-title class="text-h4">Register</v-card-title>
        <v-form v-model="valid">
            <v-container width="100%">
                <v-row>
                    <v-col cols="12">
                        <span class="input-ph">Email</span>
                        <v-text-field
                            required
                            v-model="user.email"
                            class="pt-4"
                            variant="outlined"
                            data-test="user-email"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <span class="input-ph">Password</span>
                        <v-text-field
                            required
                            v-model="user.password"
                            class="pt-4"
                            variant="outlined"
                            data-test="user-password"
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
                            rounded="xl"
                            size="large"
                            color="#FFFFFF"
                            variant="flat" 
                            class="text-none"
                            style="color:#1F213A!important;"
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