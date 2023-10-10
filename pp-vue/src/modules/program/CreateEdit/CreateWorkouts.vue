<script setup lang="ts">
import { Day, Program, Week, Workout } from '../Program';
import { useProgramStore } from '../store';
import { useRoute } from 'vue-router';
import { mdiPlus } from '@mdi/js';
import { ref, computed, watch } from 'vue';
import { useUserStore } from '@/modules/user/store';
import { useExerciseStore } from '@/modules/exercise/store';
import { Exercise } from '@/modules/exercise/Exercise';
import CreateWorkout from '@/components/CreateWorkout.vue'

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

const dialog = ref(false);

const newWeek = () => {
    const dayNames = [['Sunday','sun'],['Monday','mon'],['Tuesday','tues'],['Wednesday','wed'],['Thursday','thur'],['Friday','fri'],['Saturday','sat']];
    const resp: Day[] = [];
    dayNames.forEach((x: string[], idx: number) => {
        resp.push(new Day(idx, x[0], x[1]))
    });
    program.value.weeks.push(new Week(program.value.weeks.length + 1, resp));
}

</script>
<template>
<v-container class="bg-color main pa-10">
    <v-row>
        <v-col>
            <h2 class="">{{ program.name }}</h2>
        </v-col>
        <v-spacer></v-spacer>
        <v-col align="right">
            <v-btn 
                variant="outlined"
                primary
                class="mt-2"
            >Assign Patient</v-btn>
        </v-col>
    </v-row>
    <v-row><v-col><h4 class="">{{ program.description }}</h4></v-col></v-row>
    <v-row
      v-for="(week) in program.weeks"
      :key="week.position"
    >
        <v-col
            v-for="(day) in week.days"
            :key="day.position"
            class="day-main mt-6"
        >
            <v-row>
                <v-col class="day-border title pt-1 pb-1" align="right">
                    <small all class="ml-2">{{ day.short_title }}</small>
                </v-col>
            </v-row>
            <v-row
                v-for="(wo) in day.workouts"
                :key="wo.position"
            >
                <v-hover v-slot="{ isHovering, props }">
                    <v-col class="main-body day-border pa-0" v-bind="props">
                        <v-expand-transition>
                            <v-card
                                v-if="isHovering"
                                height="100%"
                                class="d-flex transition-fast-in-fast-out day-hover v-card--reveal text-h5 pa-2 justify-center"
                            >
                                <!-- <v-icon
                                    size="x-large"
                                    class="add-icon"
                                    @click="open()"
                                >{{ plusIcon }}</v-icon> -->
                                <v-btn :prepend-icon="plusIcon" primary><CreateWorkout :show="dialog" /></v-btn>
                                
                            </v-card>
                        </v-expand-transition>
                    </v-col>
                </v-hover>
            </v-row>
        </v-col>
    </v-row>
    <v-row>
        <v-btn 
            variant="outlined"
            primary
            @click="newWeek()"
        >Add Week</v-btn>
    </v-row>
    
</v-container>
</template>
<style>
.day-hover {
    background-color: rgba(var(--v-theme-primary), .8) !important;
    text-align: center !important;
    color: rgba(var(--v-theme-surface), .7) !important;
}
.day-border {
    border: solid .5px rgba(var(--v-theme-surface), .3)
}
.main {
    max-width: 96% !important;
}
.main-body {
    min-height: 225px;
}
.day-main {
    background-color:rgb(var(--v-theme-secondary));
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