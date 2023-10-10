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

const valid = ref(false);
</script>
<template>
<v-container class="bg-color main">
    <v-row><h2>{{ program.name }}</h2></v-row>
    <v-row><h4>{{ program.description }}</h4></v-row>
    <v-row
      v-for="(week) in program.weeks"
      :key="week.position"
    >
        <v-col
            v-for="(day) in week.days"
            :key="day.position"
            class="day-main"
        >
            <v-row><small all class="ml-2">{{ day.short_title }}</small></v-row>
            <v-row
                v-for="(wo) in day.workouts"
                :key="wo.position"
            >
                <v-col>
                    <!-- <v-form v-model="valid">
                        <v-row>
                            <v-text-field
                                v-model="wo.name"
                                variant="underlined"
                                placeholder="title (optional)"
                            ></v-text-field>
                        </v-row>
                        <V-row>
                            <v-text-field
                                v-model="wo.warmup"
                                variant="underlined"
                                placeholder="add warmup"
                            ></v-text-field>
                        </V-row>
                        <v-row>
                            <v-col>
                                <v-row
                                    v-for="(ex) in wo.exercises"
                                    :key="ex.position"
                                >
                                    <v-col style="">
                                        <v-row>
                                            <v-autocomplete
                                                v-model="ex.title"
                                                v-model:search="search"
                                                :value="ex.id"
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
                                        <v-row>
                                            <v-text-field
                                                v-model="ex.setsXReps"
                                                varient="underlined"
                                                placeholder="add sets x reps"
                                            ></v-text-field>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-text-field
                                v-model="wo.cooldown"
                                variant="underlined"
                                placeholder="add cooldown"
                            ></v-text-field>
                        </v-row>
                    </v-form> -->
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</v-container>
</template>
<style>
.main {
    max-width: 96% !important;
}
.day-main {
    background-color:rgb(var(--v-theme-surface));
    min-height: 225px;
}
.bg-color {
    background-color:rgb(var(--v-theme-secondary));
}
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