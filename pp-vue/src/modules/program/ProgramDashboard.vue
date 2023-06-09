<script setup lang="ts">
import { mdiChevronRight, mdiCircleSmall, mdiPlus } from "@mdi/js";
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
        <!-- <template v-if="!invoices">
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="auto">
                <v-img
                    :width="535"
                    aspect-ratio="16/9"
                    cover
                    class="d-block text-center mx-auto mb-12"
                    src="../../../assets/illustration-empty.svg"
                ></v-img>
                <p class="text-h4" align="center">There is nothing here</p>
                <p class="text-h6" align="center">Create an invoice by clicking the <strong>New Invoice</strong> button and get started.</p>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        </template>
        <template v-else>
        <v-row 
            v-for="(item, idx) in invoices"
            :key="item.id"
            class="mb-4 pt-2 pb-2"
            :data-test="`invoice-${idx}`"
            style="background-color:#1F213A;border-radius:25px;color:#FFFFFF"
        >
            <v-col cols="2" style="text-align:center">
            <strong><span style="color:#6F76AD">#</span>{{ item.id }}</strong>
            </v-col>
            <v-col cols="3" style="text-align:left">{{ formatDate(item.paymentDue) }}</v-col>
            <v-col cols="2" style="text-align:left">{{ item.clientName }}</v-col>
            <v-col cols="2" style="text-align:right"><strong>${{ item.total }}</strong></v-col>
            <v-col cols="2" style="text-align:center">
            <v-chip
                :color="statusColor(item.status)"
            ><v-icon start :icon="statusCircle" size="x-large" :color="statusColor(item.status)"></v-icon>{{ item.status }}</v-chip>
            </v-col>
            <v-col cols="1">
            <v-btn
                variant="plain"
                density="compact"
                @click.stop="viewInvoice(item.id)"
                :data-test="`invoice-view-${idx}`"
            ><v-icon :icon="rightArrow" size="x-large" color="#7C5DF9"/></v-btn>
            </v-col>
        </v-row>
        </template> -->
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
