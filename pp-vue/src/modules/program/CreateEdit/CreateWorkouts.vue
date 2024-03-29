<script setup lang="ts">
import { Day, Program, Week, Workout } from '../Program';
import { useProgramStore } from '../store';
import { useRoute } from 'vue-router';
import { mdiPlus } from '@mdi/js';
import { ref, computed } from 'vue';
import { useUserStore } from '@/modules/user/store';
import CreateWorkout from '@/components/CreateWorkout.vue';

const route = useRoute();
const store = useProgramStore();
const programId: string = route.params['id'].toString();
store.getProgramById(programId);
// const program = computed(() => store.programs.find((p: Program) => p.id === programId)).value ?? new Program();
const program: Program = computed(() => store.getById(programId)).value;

const userStore = useUserStore();
userStore.listUsers();

console.log("program: ", program)

const plusIcon = ref(mdiPlus);

const saveProgram = async () => {
    await store.saveProgram(program);
}

const cancelSelection = (workout: Workout, weekIdx: number, dayIdx: number):void => {
    const p = program.weeks[weekIdx].days[dayIdx];
    if (p.workouts.length > 1) {
        p.workouts.splice(workout.position, 1)
    } else {
        p.workouts[workout.position].reset();
    }
}

const dialog = ref(false);
const assignClientDialog = ref(false);

const newWeek = () => {
    const dayNames = [['Sunday','sun'],['Monday','mon'],['Tuesday','tues'],['Wednesday','wed'],['Thursday','thur'],['Friday','fri'],['Saturday','sat']];
    const resp: Day[] = [];
    dayNames.forEach((x: string[], idx: number) => {
        resp.push(new Day(idx, x[0], x[1]))
    });
    program.weeks.push(new Week(program.weeks.length + 1, resp));
}

const closeDialog = (e: any) => {
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

const saveWorkout = async (w: Workout) => {
    const progIds = [...w.programIds, programId]
    w.programIds = progIds;
    await store.saveWorkout(w);
    await store.saveProgram(program);
    setActiveDay(0, 0);
}

const assignPatient = async () => {
    program.uids = [selectedUser.value];
    await store.saveProgram(program);
    assignClientDialog.value = false;
    selectedUser.value = '';
}

const selectedUser = ref();
const valid = ref(false);
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
                accent
                class="mt-2"
                @click="assignClientDialog = true"
            >Assign Patient</v-btn>
        </v-col>
    </v-row>
    <v-row class="mt-0"><v-col><h4 class="mt-0">{{ program.description }}</h4></v-col></v-row>
    <v-row
      v-for="(week, wIdx) in program.weeks"
      :key="wIdx"
    >
        <v-col
            v-for="(day, dIdx) in week.days"
            :key="dIdx"
            class="day-main mt-6"
        >
            <v-row>
                <v-col class="day-border title pt-1 pb-1" align="right">
                    <small all class="ml-2">{{ day.short_title }}</small>
                </v-col>
            </v-row>
            <v-row style="height: 250px">
                <v-col class="day-border day-body pa-0">
                    <div class="pa-4">
                        <h3>{{ day.workout.name }}</h3>
                        <h6>{{ day.workout.warmup }}</h6>
                        <div v-for="(ex) in day.workout.exercises" :key="ex.title">
                            <p>{{ ex.title }}</p>
                            <p>{{ ex.setsXReps }}</p>
                        </div>
                        <h6>{{ day.workout.cooldown }}</h6>
                    </div>
                    <v-row>
                        <v-col class="d-flex justify-center align-center">
                            <v-btn 
                                @click.stop="openDialog(wIdx, dIdx)"
                                variant="outlined"
                                primary
                                size="x-small"
                                class="pl-8 pr-8"
                                :prepend-icon="plusIcon"
                            >{{ day.workout.name !== '' ? 'Edit' : 'Add' }} Workout</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
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
            <v-btn 
                v-if="program.weeks.length > 1"
                variant="outlined"
                secondary
                @click.stop="program.weeks.pop()"
            >Delete Week</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="pl-0">
            <v-btn 
                variant="outlined"
                accent
                @click="newWeek()"
            >Save Program</v-btn>
        </v-col>
    </v-row>
    <CreateWorkout 
        :model-value="dialog"
        :week-idx="activeDay.weekIdx"
        :day-idx="activeDay.dayIdx"
        :workout="program.weeks[activeDay.weekIdx].days[activeDay.dayIdx].workout"
        @update:model-value="closeDialog" 
        @update:save-workout="saveWorkout"
    />
    <v-dialog
        v-model="assignClientDialog"
        activator="parent"
        width="600"
    >
    <v-sheet class="bg-color">
        <v-form v-model="valid" class="ma-6 pa-4" style="min-width:350px;">
            <v-row>
                <v-col class="ma-0 pa-0">
                    <v-select 
                        label="Select client" 
                        :items="userStore.userList"
                        item-value="id"
                        item-title="displayName"
                        v-model="selectedUser"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        @click.stop="assignPatient()"
                        variant="flat"
                        primary
                        block
                    >Assign</v-btn>
                </v-col>
                <v-col>
                    <v-btn
                        @click.stop="assignClientDialog = false"
                        variant="outlined"
                        primary
                        block
                    >Close</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-sheet>
    </v-dialog>
</v-container>
</template>
<style scoped>
.day-body {
    min-height: 250px;
}
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
  background-color: rgba(var(--v-theme-surface), .5) !important;
  opacity: 0;
  background-color: #fff !important;
  color: #000 !important;
  transition: opacity .4s ease-in-out;
}
.day-hover {
    background-color: rgba(var(--v-theme-primary), .8) !important;
    text-align: center !important;
    color: rgba(var(--v-theme-surface), .7) !important;
    min-height: 225px;
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