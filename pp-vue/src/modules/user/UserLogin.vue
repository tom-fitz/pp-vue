<script setup lang="ts">
import { ref } from 'vue';
import { User } from '../user/User';
import { useUserStore } from './store';
import { useRouter } from 'vue-router';

const store = useUserStore();

const user = ref(new User())

const valid = ref(false);

const router = useRouter();

let snackbar = ref(false);


const login = async () => {
    const uid = await store.loginUser(user.value);
    await store.setCurrentUser(uid);
    snackbar.value = true;
    if (store.user.isAdmin) {
        router.push({ name: 'program-dashboard'})
    } else {
        router.push({ name: 'program-list', params: { uid: uid } })
    }
}

const timeout = ref(3000)

</script>
<template>
    <v-card class="mt-0 pt-0" color="transparent" elevation="0" width="800">
        <v-img height="200" fit src="../../../src/assets/full_logo.png"></v-img>
        <v-card-title class="text-h5">Login</v-card-title>
        <v-form v-model="valid" :width="400">
            <v-container>
                <v-row>
                    <v-col class="mb-0 pb-0" cols="12">
                        <v-text-field
                            required
                            v-model="user.email"
                            class="pt-4"
                            variant="outlined"
                            data-test="user-email"
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
                            data-test="user-password"
                            type="password"
                            placeholder="Password"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-0">
                    <v-col cols="auto">
                        <h6>New User? <router-link to="/register">Register here</router-link>.</h6>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="auto">
                        <v-btn
                            block
                            size="large"
                            color="accent"
                            variant="flat"
                            @click.stop="login()"
                            data-test="user-login"
                            :loading="store.loading"
                        >Login</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ store.successMsg }}

      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>