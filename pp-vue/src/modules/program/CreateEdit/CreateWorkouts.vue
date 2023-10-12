<script setup lang="ts">
import { Day, Program, Week, Workout } from '../Program';
import { useProgramStore } from '../store';
import { useRoute } from 'vue-router';
import { mdiPlus } from '@mdi/js';
import { ref, computed } from 'vue';
import { useUserStore } from '@/modules/user/store';
import CreateWorkout from '@/components/CreateWorkout.vue'

const store = useProgramStore();
const userStore = useUserStore();
userStore.listUsers();

const route = useRoute();

store.getProgramById(route.params['id'].toString());

const program = computed(() => store.programs.find((p: Program) => p.id === route.params['id'].toString()));

const plusIcon = ref(mdiPlus);

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

const dialog = ref(false);

const newWeek = () => {
    const dayNames = [['Sunday','sun'],['Monday','mon'],['Tuesday','tues'],['Wednesday','wed'],['Thursday','thur'],['Friday','fri'],['Saturday','sat']];
    const resp: Day[] = [];
    dayNames.forEach((x: string[], idx: number) => {
        resp.push(new Day(idx, x[0], x[1]))
    });
    program.value.weeks.push(new Week(program.value.weeks.length + 1, resp));
}

const closeDialog = (e) => {
    dialog.value = e;
}

const activeDay = ref({
    weekIdx: 0,
    dayIdx: 0,
}).value;

const setActiveDay = (wIdx: number, dIdx: number) => {
    activeDay.weekIdx = wIdx;
    activeDay.dayIdx = dIdx;
}

const openDialog = (w: number, d: number) => {
    activeDay.weekIdx = w;
    activeDay.dayIdx = d;
    dialog.value = true;
}

const saveWorkout = async (e) => {
    const day = program.value.weeks[activeDay.weekIdx].days[activeDay.dayIdx]
    day.workouts[0] = e;
    day.workouts[0].weekIdx = activeDay.weekIdx;
    day.workouts[0].dayIdx = activeDay.dayIdx
    await store.saveProgram(program.value);
    setActiveDay(0, 0);
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
    <v-row class="mt-0"><v-col><h4 class="mt-0">{{ program.description }}</h4></v-col></v-row>
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
                v-for="wo in day.workouts"
                :key="wo.position"
            >
                    <v-col class="main-body day-border pa-0">
                        <v-card class="day-hover">
                            <code>{{ day }}</code>
                        </v-card>
                        <!-- <template v-if="wo.exercises[0].id !== ''">
                            <v-card class="day-hover">
                                <v-card-title>{{ wo.Name }}</v-card-title>
                            </v-card>
                        </template> -->
                        <!-- <v-expand-transition>
                            <v-card
                                v-if="isHovering"
                                height="100%"
                                class="d-flex transition-fast-in-fast-out day-hover v-card--reveal text-h5 pa-2 justify-center"
                            >
                                <v-btn 
                                    class="add-btn-main" 
                                    :icon="plusIcon" 
                                    @click="openDialog(wIdx, dIdx)"
                                    primary
                                    size="x-small"
                                ></v-btn>
                            </v-card>
                        </v-expand-transition> -->
                        <!-- <v-hover v-slot="{ hover }">
                        <v-card
                            height="100%"
                            class="day-hover pa-2 justify-center { 'on-hover': hover }"
                        >
                            <v-btn 
                                class="add-btn-main { 'show-btn': hover }" 
                                :icon="plusIcon" 
                                @click="openDialog(wIdx, dIdx)"
                                primary
                                size="x-small"
                            ></v-btn>
                        </v-card>
                        </v-hover> -->
                    </v-col>
                
                <!-- workout display -->
            </v-row>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="pl-0">
            <v-btn 
                variant="outlined"
                primary
                @click="newWeek()"
            >Add Week</v-btn>
        </v-col>
    </v-row>
    <CreateWorkout 
        :model-value="dialog" 
        @update:model-value="closeDialog" 
        @update:save-workout="saveWorkout"
    />
</v-container>
</template>
<style scoped>
.v-card {
  transition: filter .4s ease-in-out;
}
.v-card.on-hover {
  filter: brightness(25%);
  background-color: rgba(var(--v-theme-primary), .8) !important;
  text-align: center !important;
  color: rgba(var(--v-theme-surface), .7) !important;
}
.show-btn {
  opacity: 1;
}
.add-btn-main {
  /* background-color: rgba(var(--v-theme-surface), .5) !important; */
  opacity: 0;
  background-color: #fff !important;
  color: #000 !important;
  transition: opacity .4s ease-in-out;
}
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
  max-width: 300px;
}
.v-field__input {
  font-size: 12px !important;
}
</style>