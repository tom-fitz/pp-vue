<script setup lang="ts">
import { useUserStore } from '../user/store';
import { useRoute } from 'vue-router';
import { mdiChevronRight, mdiCircleSmall } from "@mdi/js";
import { ref, onMounted, computed } from 'vue';
import { useProgramStore } from './store';
import { type Headers } from '../../plugins/vuetify';
import {Program, DayCompletion} from './Program';
import YouTube from 'vue3-youtube';
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

const userStore = useUserStore();

const programStore = useProgramStore();

onMounted(() => {
    const route = useRoute();
    const uid = route.params.uid.toString();
    programStore.getProgramsByUID(uid);
});

const programs = computed(() => programStore.programs);

programs.value.forEach((p: Program) => p.daysCompleted = setDaysCompleted(p))

const headers: Headers = [
    [
        {
            title: 'Daily at home',
            key: 'name',
            sortable: false,
        },
        {
            title: 'Target',
            key: 'target',
            sortable: false,
        },
        {
            title: 'Sets X Reps',
            key: 'setsXReps',
            sortable: false,
        },
        {
            title: 'Load',
            key: 'load',
            sortable: false,
        },
        {
            title: 'Reference Video',
            key: 'videoUri',
            sortable: false,
        }
    ]
];


const rightArrow = ref(mdiChevronRight);

const logger = (val: any) => console.log("val: ", val);

const setDaysCompleted = (program: Program): DayCompletion[] => {
    const completedArr: DayCompletion[] = [];
    if (program.duration) {
        for (let x = 1; x <= program.duration; x++) {
            const item = new DayCompletion(`WK${x}`, 0, x);
            completedArr.push(item);
        }
        program.daysCompleted = [...completedArr];
    }
    return completedArr;
}

const dialog = ref(false);

const parseVideoId = (url: string): string => {
    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?.*v=|shorts\/)|youtu\.be\/)([\w-]{11})$/;
    const match = url.match(urlRegex) ?? '';
    return match[1];
}

</script>
<template>
    <v-row>
        <v-col cols="auto" class="pt-4 pb-4 pl-8"><h2>Current Programs</h2></v-col>
    </v-row>
    <v-expansion-panels class="my-4">
      <v-expansion-panel
        v-for="(item, idx) in programs"
        :key="idx"
        class="ml-8 mt-2 mr-4 transparent"
        style="background-color: transparent !important; border: 1px solid #1F213A;"
        elevation="0"
      >
        <v-expansion-panel-title>
            <template v-slot:default="{}">
            <v-row no-gutters>
                <v-col cols="4" class="d-flex justify-start">
                {{ item.name }}
                </v-col>
            </v-row>
            </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <template v-if="item.description !== ''">
                <v-row>
                    <v-col cols="4">{{ item.description }}</v-col>
                    <v-col 
                        cols="1"
                        v-for="(com, index) in item.daysCompleted"
                        :key="index"
                    >
                        <v-text-field 
                            class="ma-0 pa-0" 
                            type="number" 
                            v-model="com.days"
                            :label="com.title"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </template>
            <v-data-table
                :items="item.exercises"
                :headers="headers"
                :hide-default-footer="true"
                :items-per-page="15"
                disable-pagination
                density="compact"
            >
                <template v-slot:[`column.name`]="{}">
                    {{ item.name }}
                </template>
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="bg-color">{{ item.columns.name }}</td>
                        <td class="bg-color">{{ item.columns.target }}</td>
                        <td class="bg-color">{{ item.columns.setsXReps }}</td>
                        <td class="bg-color">{{ item.columns.load }}</td>
                        <td class="bg-color"><v-btn 
                            v-if="item.columns.videoUri && item.columns.videoUri !== ''" 
                            elevation="0" 
                            @click="dialog = !dialog" 
                            :append-icon="rightArrow"
                            >Watch</v-btn>
                        </td>
                        <v-dialog
                            v-model="dialog"
                            fullscreen
                        >
                            <v-btn color="primary" block @click="dialog = !dialog">Close</v-btn>
                            <LiteYouTubeEmbed
                                :id="parseVideoId(item.columns.videoUri)"
                                :title="item.columns.name"
                            />
                            <!-- <YouTube
                                :src="item.columns.videoUri"
                                ref="youtube"
                            ></YouTube> -->
                            <v-btn color="primary" block @click="dialog = !dialog">Close</v-btn>
                        </v-dialog>
                        <!-- <VideoDialog 
                            :dialog="dialog" 
                            :video-uri="item.columns.videoUri" 
                            @dialog-close="dialog = false"
                        ></VideoDialog> -->
                    </tr>
                </template>
                <template #bottom></template>
            </v-data-table>
        </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<style>
.bg-color {
    background-color: transparent;
}
</style>