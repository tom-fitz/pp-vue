<script setup lang="ts">
import { useExerciseStore } from './store';
import { Exercise, type IExerciseParams } from './Exercise';
import { computed, ref } from 'vue';

const store = useExerciseStore();

const exercise = ref(new Exercise());

const queryOpts: IExerciseParams = ref({
    type: "",
    name: "",
    muscle: "",
    difficulty: ""
}).value;

const typeOpts: string[] = [
    'cardio',
    'olympic_weightlifting',
    'plyometrics',
    'powerlifting',
    'strength',
    'stretching',
    'strongman'
];

const muscleOpts: string[] = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps'
];

const diffOpts: string[] = [
    'beginner',
    'intermediate',
    'expert'
];

const queryExercise = () => {
    store.getExercises(queryOpts);
};

const exercises = computed(() => store.exercises);

const setExercise = (idx: number) => {
    exercise.value = store.exercises[idx];
}

const resetQuery = () => {
    queryOpts.name = "";
    queryOpts.type = "";
    queryOpts.difficulty = "";
    queryOpts.muscle = "";
}

const createExercise = () => {
    store.createExercise(exercise.value)
};
const cancelCreateEx = () => {
    exercise.value = new Exercise();
};

</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-row><h2 class="ml-4">Update Exercise</h2></v-row>
                <v-row>
                    <v-col cols="12" class="pb-0">
                        <v-text-field 
                            placeholder="Name"
                            v-model="exercise.name"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="pt-0 pb-0">
                        <v-select
                            label="Select Type"
                            :items="typeOpts"
                            v-model="exercise.type"
                            density="compact"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="pt-0 pb-0">
                        <v-select
                            :items="diffOpts"
                            label="Select Difficulty"
                            v-model="exercise.difficulty"
                            density="compact"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="pt-0 pb-0">
                        <v-text-field
                            placeholder="Equipment"
                            v-model="exercise.equipment"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="pt-0 pb-0">
                        <v-textarea
                            placeholder="Instructions..."
                            v-model="exercise.instructions"
                            density="compact"
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="pt-0 pb-0">
                        <v-text-field
                            v-model="exercise.videoUri"
                            placeholder="Video URL"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" class="pt-0">
                        <v-btn
                            block
                            rounded="xl"
                            size="large"
                            color="#1F213A"
                            variant="flat" 
                            class="text-none"
                            @click.stop="createExercise()"
                            data-test="invoice-item-add"
                            :loading="store.loading"
                        >Update Exercise</v-btn>
                    </v-col>
                    <v-col cols="6" class="pt-0">
                        <v-btn
                            block
                            rounded="xl"
                            size="large"
                            color="transparent"
                            variant="flat" 
                            class="text-none"
                            style="border: solid 1px #93949B"
                            @click.stop="cancelCreateEx()"
                            data-test="invoice-item-add"
                        >Cancel</v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="6">
                <v-row><h2 class="ml-4">Select from Exercises</h2></v-row>
                <v-row>
                    <v-col cols="6" class="pb-0">
                        <v-select
                            label="Select Type"
                            :items="typeOpts"
                            v-model="queryOpts.type"
                            density="compact"
                        ></v-select>
                    </v-col>
                    <v-col cols="6" class="pb-0">
                        <v-select
                            label="Select Muscle"
                            :items="muscleOpts"
                            v-model="queryOpts.muscle"
                            density="compact"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" class="pt-0 pb-0">
                        <v-text-field
                            placeholder="Name"
                            v-model="queryOpts.name"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pt-0 pb-0">
                        <v-select
                            label="Select Difficulty"
                            :items="diffOpts"
                            v-model="queryOpts.difficulty"
                            density="compact"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" class="pt-0">
                        <v-btn
                            block
                            rounded="xl"
                            size="large"
                            color="#1F213A"
                            variant="flat" 
                            class="text-none"
                            @click.stop="queryExercise()"
                            data-test="invoice-item-add"
                            :loading="store.loading"
                        >Find Exercise</v-btn>
                    </v-col>
                    <v-col cols="6" class="pt-0">
                        <v-btn
                            block
                            rounded="xl"
                            size="large"
                            color="transparent"
                            variant="flat" 
                            class="text-none"
                            style="border: solid 1px #93949B"
                            @click.stop="resetQuery()"
                            data-test="invoice-item-add"
                        >Reset</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-table
                            fixed-header
                            height="300px"
                            style="background-color:transparent !important; border: solid 1px #93949B"
                        >
                            <thead>
                            <tr>
                                <th class="text-left" style="background-color: #141625;">
                                Name
                                </th>
                                <th class="text-left" style="background-color: #141625;">
                                Type
                                </th>
                                <th class="text-left" style="background-color: #141625;">
                                Difficulty
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(item, idx) in exercises"
                                :key="item.name"
                                @click.stop="setExercise(idx)"
                                style="cursor: pointer !important"
                            >
                                <td>{{ item.name }}</td>
                                <td>{{ item.type }}</td>
                                <td>{{ item.difficulty }}</td>
                            </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
                <template v-if="exercise.id && exercise.id !== ''">
                    <v-row>
                        <v-col cols="12">
                            <pre :v-text="exercise">{{ exercise }}</pre>
                        </v-col>
                    </v-row>
                </template>
            </v-col>
        </v-row>
    </v-container>
</template>