<script setup lang="ts">
import { mdiPlus } from "@mdi/js";
import { ref, computed } from 'vue';
import { Program } from "./Program";
import CreateEditProgram from "@/components/CreateEditProgram.vue";
import { useUserStore } from "../user/store";
import { User } from "../user/User";
import { useRouter } from "vue-router";
import { type Headers } from '../../plugins/vuetify';
import { mdiChevronRight } from "@mdi/js";
import { useProgramStore } from "./store";

const programStore = useProgramStore();
const userStore = useUserStore();
const router = useRouter();

programStore.getAllPrograms();
programStore.getProgramTemplates();
userStore.listUsers();

const drawer = ref();

const program = ref(new Program());

const users = computed(() => userStore.userList);

const programs = computed(() => programStore.programs);

const viewUserProfile = (id: string) => {
    if (id === '') {
        return;
    }
    router.push({name: 'user-admin-view', params: {uid: id}});
};

const headers: Headers = [
    [
        {
            title: 'First name',
            key: 'firstName',
            sortable: false,
        },
        {
            title: 'Last name',
            key: 'lastName',
            sortable: false,
        },
        {
            title: 'Email',
            key: 'email',
            sortable: false,
        },
        {
            title: 'Phone number',
            key: 'phoneNumber',
            sortable: false,
        },
        {
            title: '',
            key: 'actions',
            sortable: false,
        }
    ]
];

const programHeaders: Headers = [
    [
        {
            title: 'Program name',
            key: 'name',
            sortable: false,
        },
        {
            title: '',
            key: 'actions',
            sortable: false,
        }
    ]
];

const rightArrow = ref(mdiChevronRight);

const templateSelected = (id: string | any) => {
    program.value = programStore.templates.find((t: Program) => t.id === id) as Program;
}

const createProgram = () => router.push({ name: 'program-create'});

const viewProgram = (id: string) => {
    if (id === '') {
        return;
    }
    router.push({name: 'program-create-workouts', params: {id}});
}

</script>

<template>
    <v-container class="main day-main">
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
                    @click.stop="createProgram()"
                    data-test="program-create-btn"
                    >New Program</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table
                    :items="programs"
                    :headers="programHeaders"
                    :hide-default-footer="true"
                    disable-pagination
                    density="compact"
                >
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.columns.name }}</td>
                            <td class="bg-color">View <v-icon
                                size="small"
                                class="me-2"
                                @click="viewProgram(item.value)"
                            >
                                {{ rightArrow }}
                            </v-icon></td>
                        </tr>
                    </template>
                    <template #bottom></template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="auto" style="border:solid 1px grey;border-radius:5px">
                <v-data-table
                    :items="users"
                    :headers="headers"
                    :hide-default-footer="true"
                    :items-per-page="50"
                    disable-pagination
                    density="compact"
                >
                    <template v-slot:item="{ item }">
                        <tr>
                            <td class="bg-color">{{ item.columns.firstName }}</td>
                            <td class="bg-color">{{ item.columns.lastName }}</td>
                            <td class="bg-color">{{ item.columns.email }}</td>
                            <td class="bg-color">{{ item.columns.phoneNumber }}</td>
                            <td class="bg-color">View <v-icon
                                size="small"
                                class="me-2"
                                @click="viewUserProfile(item.value)"
                            >
                                {{ rightArrow }}
                            </v-icon></td>
                        </tr>
                    </template>
                    <template #bottom></template>
                </v-data-table> 
            </v-col>
        </v-row>
        <v-row></v-row>
    </v-container>
    <v-navigation-drawer
        v-model="drawer"
        temporary
        color="#141625"
        style="border-top-right-radius:15px;border-bottom-right-radius:15px"
        :width="1000"
        class="pa-10"
    >
        <CreateEditProgram 
            :program="(program as Program)"
            :user-list="(userStore.userList as User[])"
            :template-list="(programStore.templates as Program[])"
            @drawer-close="drawer = false"
            @template-selection="templateSelected"
        ></CreateEditProgram>
    </v-navigation-drawer>
</template>
<style>
.main {
    max-width: 96% !important;
}
.day-main {
    background-color:rgb(var(--v-theme-secondary));
    min-height: 80%;
}
</style>
