<script setup lang="ts">
import { useUserStore } from '../user/store';
import { useRoute } from 'vue-router';
import { mdiChevronRight, mdiCircleSmall } from "@mdi/js";
import { ref, onMounted, computed } from 'vue';
import { useProgramStore } from './store';

const userStore = useUserStore();

const programStore = useProgramStore();

onMounted(() => {
    const route = useRoute();
    const uid = route.params.uid.toString();
    programStore.getProgramsByUID(uid);
});

const programs = computed(() => programStore.programs);


const rightArrow = ref(mdiChevronRight);

const trip = ref({
        name: '',
        location: null,
        start: null,
        end: null,
})

// const statusCircle = ref(mdiCircleSmall);

</script>
<template>
    <v-row>
        <v-col cols="auto" class="pt-4 pb-4 pl-8"><h2>Current Programs</h2></v-col>
    </v-row>
    <v-expansion-panels class="my-4">
      <v-expansion-panel
        v-for="(item, idx) in programs"
        :key="idx"
      >
        <v-expansion-panel-title>
            <template v-slot:default="{}">
            <v-row no-gutters>
                <v-col cols="4" class="d-flex justify-start">
                {{ item.name }}
                </v-col>
                <!-- <v-col
                cols="8"
                class="text-grey"
                >
                <v-fade-transition leave-absolute>
                    <span
                    v-if="expanded"
                    key="0"
                    >
                    Enter a name for the trip
                    </span>
                    <span
                    v-else
                    key="1"
                    >
                    {{ `Hello ${+1}` }}
                    </span>
                </v-fade-transition>
                </v-col> -->
            </v-row>
            </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-row>
                <v-col cols="2">{{ item.name }}</v-col>
                <v-col cols="2">{{ 'Target' }}</v-col>
                <v-col cols="2">{{ 'Sets X Reps' }}</v-col>
                <v-col cols="2">{{ 'Load' }}</v-col>
                <v-col cols="2">{{ 'Reference Video' }}</v-col>
                <v-col cols="2">{{ item.completionTitle }}</v-col>
            </v-row>
            <template v-if="item.description !== ''">
                <v-row>
                    <v-col cols="10">{{ item.description }}</v-col>
                    <v-col cols="2">{{ 'Weekly input goes here:' }}</v-col>
                </v-row>
            </template>
            <v-row
                v-for="(ex, i) in item.exercises"
                :key="i"
            >
                <v-col cols="2">{{ ex.name }}</v-col>
                <v-col cols="2">{{ ex.target }}</v-col>
                <v-col cols="2">{{ ex.setsXReps }}</v-col>
                <v-col cols="2">{{ ex.load }}</v-col>
                <v-col cols="2">{{ ex.videoUri }}</v-col>
            </v-row>
        </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>