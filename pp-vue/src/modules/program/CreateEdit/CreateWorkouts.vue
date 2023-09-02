<script setup lang="ts">
import { Program } from '../Program';
import { useProgramStore } from '../store';
import { useRoute } from 'vue-router';
import { mdiPlus } from '@mdi/js';
import { ref } from 'vue';

const store = useProgramStore();
const route = useRoute();

console.log(route.params['id'].toString());

store.getProgramById(route.params['id'].toString())

const program: Program = store.programs.find((p: Program) => p.id === route.params['id'].toString()) ?? new Program();

const week: string[] = ['sun','mon','tues','wed','thur','fri','sat'];

const plusIcon = ref(mdiPlus);

const activeCol = ref({ index: -1, width: '160' });

const setActiveCol = (index: number) => {
    activeCol.value = { index, width: '215' }
}
</script>
<template>
    <v-container class="ma-0 pa-0">
        <v-row><h2>{{ program.name }}</h2></v-row>
        <v-row><h4>{{ program.description }}</h4></v-row>
        <v-row>
            <v-col
                v-for="(day, idx) in week"
                :key="idx"
                cols="auto"
                ma-12
                class="pa-4"
            >
                <v-row><small all class="ml-2">{{ day }}</small></v-row>
                <v-row>
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card
                            :min-width="idx === activeCol.index ? activeCol.width : '150'"
                            min-height="300"
                            v-bind="props"
                        >
                            <v-card-title></v-card-title>

                            <v-overlay
                                :model-value="isHovering"
                                contained
                                scrim="#7C5DF9"
                                class="align-top pt-6 justify-center ma-0"
                            >
                                <!-- <v-row>
                                    <v-col cols="auto">
                                        <v-btn 
                                            variant="flat" 
                                            block
                                            class="pa-2"
                                        ><v-icon large >{{ plusIcon }}</v-icon></v-btn>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-btn 
                                            variant="flat" 
                                            block
                                            class="pa-2"
                                        ><v-icon large >{{ plusIcon }}</v-icon></v-btn>
                                    </v-col>
                                </v-row> -->
                                <v-btn 
                                    variant="flat" 
                                    block
                                    class="pa-2"
                                    @click.stop="setActiveCol(idx)"
                                ><v-icon large >{{ plusIcon }}</v-icon></v-btn>
                            </v-overlay>
                        </v-card>  
                    </v-hover>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>