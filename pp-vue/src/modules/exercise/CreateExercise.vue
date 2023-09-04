<script setup lang="ts">
import { useExerciseStore } from './store';
import { Exercise, type IExerciseParams } from './Exercise';
import { computed, ref } from 'vue';
import { QueryCompositeFilterConstraint } from 'firebase/firestore';

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
    console.log("options: ", queryOpts)
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

</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-row><h2 class="ml-4">Create Exercise</h2></v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field 
                            placeholder="Name"
                            v-model="exercise.name"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-select
                            placeholder="Type"
                            :items="typeOpts"
                            v-model="exercise.type"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-select
                            :items="diffOpts"
                            label="Select Difficulty"
                            v-model="exercise.difficulty"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="exercise.equipment"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            v-model="exercise.instructions"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="6">
                <v-row><h2 class="ml-4">Select from Exercises</h2></v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select
                            label="Select Type"
                            :items="typeOpts"
                            v-model="queryOpts.type"
                        ></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-select
                            label="Select Muscle"
                            :items="muscleOpts"
                            v-model="queryOpts.muscle"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            placeholder="Name"
                            v-model="queryOpts.name"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-select
                            label="Select Difficulty"
                            :items="diffOpts"
                            v-model="queryOpts.difficulty"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
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
                    <v-col cols="6">
                        <v-btn
                            block
                            rounded="xl"
                            size="large"
                            color="transparent"
                            variant="flat" 
                            class="text-none"
                            style="border: solid 1px white"
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
                                <!-- <td>{{ item.instructions }}</td> -->
                            </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <pre :v-text="exercise">{{ exercise }}</pre>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>