<script setup lang="ts">
import { Program, Workout } from '../Program';
import { useProgramStore } from '../store';
import { useRoute } from 'vue-router';
import { mdiPlus } from '@mdi/js';
import { ref, computed, watch } from 'vue';
import { useUserStore } from '@/modules/user/store';
import { useExerciseStore } from '@/modules/exercise/store';
import { Exercise } from '@/modules/exercise/Exercise';

const store = useProgramStore();
const userStore = useUserStore();
const exerciseStore = useExerciseStore();
userStore.listUsers();

const route = useRoute();

const userList = computed(() => userStore.userList);

store.getProgramById(route.params['id'].toString());

const program = computed(() => store.programs.find((p: Program) => p.id === route.params['id'].toString()) ?? new Program().create());

const plusIcon = ref(mdiPlus);

const activeCol = ref({ index: -1, width: '160' });

const setActiveCol = (index: number) => {
    activeCol.value = { index, width: '215' }
}

const exerciseLookup = (e: string) => {
    const query = {
        name: e,
    }
    exerciseStore.getExercises(query);
}

const exItems = computed(() => exerciseStore.exercises);

const search = ref('')

const select = ref();

const addExercise = (wIdx: number, weekIdx: number, dayIdx: number): void => {
    program.value.weeks[weekIdx].days[dayIdx].workouts[wIdx].exercises.push(new Exercise());
}

// const saveWorkout = async (w: Workout) => {
//     // await store.saveProgram(program.value);
//     const wid = await store.saveWorkout(w);
//     program.value.
// }

const saveProgram = async () => {
    await store.saveProgram(program.value);
}

const cancelSelection = (workout: Workout, weekIdx: number, dayIdx: number):void => {
    const p = program.value.weeks[weekIdx].days[dayIdx];
    if (p.workouts.length > 1) {
        p.workouts.splice(workout.position, 1)
    } else {
        p.workouts[workout.position].reset();
    }

    activeCol.value = { index: -1, width: '160' };
}

watch(search, (val, prevVal) => {
  if (val && val !== prevVal && val !== select.value) {
    exerciseLookup(val);
  }
});
</script>
<template>
    <v-container class="ma-0 pa-0">
        <v-row><h2>{{ program.name }}</h2></v-row>
        <v-row>
            <v-col><h4>{{ program.description }}</h4></v-col>
            <v-spacer />
            <v-col>
                <v-select
                    v-model="program.uid"
                    label="Assign to User"
                    :items="userList"
                    item-value="id"
                    item-title="email"
                    required
                    class=""
                    dense
                ></v-select>
            </v-col>
        </v-row>
        <v-row 
            v-for="(week, wIdx) in program.weeks"
            :key="week.position"
        >
            <v-col
                v-for="(day, idx) in week.days"
                :key="day.position"
                cols="auto"
                ma-12
            >
                <v-row><small all class="ml-2">{{ day.short_title }}</small></v-row>
                <v-row>
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card
                            :width="idx === activeCol.index ? activeCol.width : '150'"
                            min-height="330"
                            v-bind="props"
                        >
                            <template v-if="activeCol.index !== idx">
                                <v-overlay
                                    :model-value="isHovering"
                                    contained
                                    scrim="#7C5DF9"
                                    class="align-top pt-6 justify-center ma-0"
                                >
                                    <v-btn 
                                        variant="flat" 
                                        block
                                        class="pa-2"
                                        @click.stop="setActiveCol(idx)"
                                    ><v-icon large >{{ plusIcon }}</v-icon></v-btn>
                                </v-overlay>
                            </template>
                            <template v-else>
                                <div
                                    class="ma-0"
                                    v-for="(w, workIdx) in day.workouts"
                                    :key="w.position"
                                >
                                    <v-row class="mt-0 pa-0">
                                        <v-text-field
                                            v-model="w.name"
                                            placeholder="Title"
                                            class="ma-0"
                                            density="compact"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row class="mt-0 mb-0">
                                        <v-textarea 
                                            v-model="w.warmup"
                                            rows="1"
                                            placeholder="Warmup.." 
                                            class="ma-0 pa-0"
                                            density="compact"
                                        ></v-textarea>
                                    </v-row>
                                    <div 
                                        class="mt-0 mb-0 pa-0" 
                                        v-for="(e) in w.exercises"
                                        :key="e.position"
                                    >
                                        <v-row class="mt-0 mb-0">
                                            <v-autocomplete
                                                v-model="e.title"
                                                v-model:search="search"
                                                :value="e.id"
                                                :loading="exerciseStore.loading"
                                                :items="exItems"
                                                item-title="name"
                                                class="truncate"
                                                density="compact"
                                                hide-no-data
                                                hide-details
                                                label="Exercise Title"
                                                style="max-width: 300px;whitespace:nowrap;overflow:hidden;"
                                            >
                                            </v-autocomplete>
                                        </v-row>
                                        <v-row class="mt-2">
                                            <v-textarea 
                                                v-model="e.description"
                                                rows="2"
                                                placeholder="Sets, reps, tempo, weight, etc.."
                                                class="ma-0 pa-0"
                                                density="compact"
                                            ></v-textarea>
                                        </v-row>
                                    </div>
                                    <v-row class="mt-0">
                                        <v-col cols="12" class="pt-0 pb-0">
                                            <v-btn
                                                block
                                                rounded="xs"
                                                size="x-small"
                                                color="transparent"
                                                variant="flat" 
                                                class="text-none"
                                                style="border: solid 1px #93949B"
                                                @click.stop="program.weeks[wIdx].days[idx].workouts[workIdx].exercises.push(new Exercise())"
                                            >+ Add Exercise</v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row class="">
                                        <v-textarea 
                                            v-model="w.cooldown"
                                            rows="1"
                                            placeholder="Cooldown.."
                                            class="ma-0 pa-0"
                                            density="compact"
                                        ></v-textarea>
                                    </v-row>
                                    <v-row class="mb-1 mt-0">
                                        <v-col cols="6" class="pt-0 pr-0 pb-0">
                                            <v-btn
                                            block
                                            rounded="xs"
                                            size="x-small"
                                            color="#1F213A"
                                            variant="flat" 
                                            class="text-none"
                                            @click.stop="saveProgram()"
                                            >Save</v-btn>
                                        </v-col>
                                        <v-col cols="6" class="pt-0 pl-0 pb-0">
                                            <v-btn
                                            block
                                            rounded="xs"
                                            size="x-small"
                                            color="transparent"
                                            variant="flat" 
                                            class="text-none"
                                            style="border: solid 1px #93949B"
                                            @click.stop="cancelSelection(w, wIdx, idx)"
                                            >Cancel</v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                            </template>
                        </v-card>  
                    </v-hover>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<style>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px; /* Adjust the max-width as needed */
}
.v-field__input {
  font-size: 12px !important;
}
</style>