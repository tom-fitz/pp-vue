<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from './store';
import UserLogout from '@/modules/user/UserLogout.vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const valid = ref(false);

let snackbar = ref(false);

const currentUser = computed(() => userStore.user).value;

const { user } = storeToRefs(userStore);

const updateUser = () => {
    userStore.updateUser(user.value);
    snackbar.value = true;
};

const timeout = ref(3000);

</script>
<template>
<v-container class="main">
    <v-form v-model="valid" :min-width="600">
        <v-container class="bg-color pa-14" justify="center">
            <v-row>
                <v-col cols="auto">
                    <v-avatar
                        color="accent"
                        size="125"
                    >
                        <span class="text-h3 icon-text">{{ currentUser.getInitials().toUpperCase() }}</span>
                    </v-avatar>
                </v-col>
                <v-col class="pt-12" cols="auto"><span class="text-h3">{{ user.displayName ? user.displayName : '' }}</span></v-col>
                <v-spacer></v-spacer>
                <v-col class="pt-14 pr-12" cols="auto">
                    <UserLogout />
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="6"
                >
                    <span class="input-ph">First name</span><br />
                    <v-text-field
                        v-model="user.firstName"
                        required
                        class="pt-4"
                        variant="outlined"
                    ></v-text-field>
                </v-col>
                <v-col
                cols="6"
                >
                    <span class="input-ph">Last name</span><br />
                    <v-text-field
                        v-model="user.lastName"
                        required
                        class="pt-4"
                        variant="outlined"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="6"
                >
                    <span class="input-ph">Email</span><br />
                    <v-text-field
                        v-model="user.email"
                        required
                        class="pt-4"
                        variant="outlined"
                    ></v-text-field>
                </v-col>
                <v-col
                cols="6"
                >
                    <span class="input-ph">Phone number</span><br />
                    <v-text-field
                        v-model="user.phoneNumber"
                        required
                        class="pt-4"
                        variant="outlined"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-btn
                        block
                        size="large"
                        color="accent"
                        variant="flat" 
                        class="text-none"
                        @click.stop="updateUser()"
                        :loading="userStore.loading"
                    >Update Profile</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ userStore.successMsg }}
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
</v-container>
</template>
<style scoped>
.main {
    max-width: 96% !important;
}
.bg-color {
    background-color:rgb(var(--v-theme-secondary));
}
.icon-text {
    color: rgb(var(--v-theme-surface)) !important;
}
</style>