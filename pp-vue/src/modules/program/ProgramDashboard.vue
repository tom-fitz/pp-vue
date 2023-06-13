<script setup lang="ts">
import { mdiPlus } from "@mdi/js";
import { ref } from 'vue';
import { Program } from "./Program";
import CreateEditProgram from "@/components/CreateEditProgram.vue";
import { useUserStore } from "../user/store";
import { User } from "../user/User";

const userStore = useUserStore();

userStore.listUsers();

const drawer = ref();

const program = ref(new Program());
</script>

<template>
    <v-card elevation="0" color="transparent">
        <v-row>
            <v-col cols="auto">
                <v-card-title class="text-h3">Program Dashboard</v-card-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
                <v-btn
                    :prepend-icon="mdiPlus"
                    block
                    rounded="xl" 
                    size="large" 
                    color="#7C5DF9" 
                    variant="flat" 
                    class="text-none"
                    @click.stop="drawer = !drawer"
                    data-test="invoice-create-btn"
                    >New Program</v-btn>
            </v-col>
        </v-row>
    </v-card>
    <v-navigation-drawer
        v-model="drawer"
        temporary
        color="#141625"
        style="border-top-right-radius:15px;border-bottom-right-radius:15px"
        :width="1000"
        class="pa-10"
    >
        <CreateEditProgram :program="(program as Program)" :user-list="(userStore.userList as User[])" @drawer-close="drawer = false"></CreateEditProgram>
    </v-navigation-drawer>
</template>
