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
    await store.loginUser(user.value);
    snackbar.value = true;
    router.push({ name: 'program-dashboard' })
}

const timeout = ref(3000)

</script>
<template>
    <v-card color="transparent" elevation="0" width="800">
        <v-card-title class="text-h4">Login</v-card-title>
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
                        <h6>New User? <router-link to="/register">Register here</router-link>.</h6>
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