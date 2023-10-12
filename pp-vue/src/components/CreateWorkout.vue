<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Day, Program, Workout } from '@/modules/program/Program';
import { useExerciseStore } from '@/modules/exercise/store';
import { mdiPlus } from '@mdi/js';

const exerciseStore = useExerciseStore();

const props = defineProps({ 
    modelValue: {
        type: Boolean,
        required: true,
    }
});
const emits = defineEmits(['update:modelValue', 'update:saveWorkout']);

const valid = ref(false);

const workout: Workout = ref(new Workout());

const close = () => { 
    emits('update:modelValue', false); 
    workout.value = new Workout() 
}


const exItems = computed(() => exerciseStore.exercises);

const saveWorkout = () => {
    // validation goes here
    emits('update:saveWorkout', workout);
    emits('update:modelValue', false);
    close();
};

const plusIcon = ref(mdiPlus);

const addExercise = () => workout.value.exercise.push(new Exercise());

const search = ref('');
const select = ref();

const exerciseLookup = (e: string) => {
    const query = {
        name: e,
    }
    exerciseStore.getExercises(query);
}

watch(search, (val, prevVal) => {
  if (val && val !== prevVal && val !== select.value) {
    exerciseLookup(val);
  }
});

</script>
<template>
  <v-dialog
        :model-value="modelValue"
        width="auto"
        persistent
      >
      <v-sheet  class="bg-color">
      <v-form v-model="valid" class="ma-6 pa-4" style="min-width:350px;">
            <v-row>
                <v-col class="ma-0 pa-0">
                    <v-text-field
                        v-model="workout.name"
                        variant="underlined"
                        placeholder="title (optional)"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="ma-0 pa-0">
                    <v-text-field
                        v-model="workout.warmup"
                        variant="underlined"
                        placeholder="add warmup"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row
                v-for="(ex) in workout.exercises"
                :key="ex.position"
            >
                <v-col class="mt-0 mb-0 ml-5 mr-5 pa-0" align="center">
                    <v-row>
                        <v-autocomplete
                            v-model="ex.title"
                            v-model:search="search"
                            :value="title"
                            :loading="exerciseStore.loading"
                            :items="exItems"
                            item-title="name"
                            hide-no-data
                            hide-details
                            label="Exercise Title"
                            style="whitespace:nowrap;overflow:hidden;"
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
            <v-row>
                <v-col class="pa-0 ma-0">
                    <v-btn 
                        block 
                        variant="outlined"
                        :prepend-icon="plusIcon"
                        @click="addExercise"
                        size="x-small"
                        class="mt-0"
                    >Add Exercise</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-text-field
                    v-model="workout.cooldown"
                    variant="underlined"
                    placeholder="add cooldown"
                ></v-text-field>
            </v-row>
            <v-row>
                <v-btn 
                    class="mr-2" 
                    @click="saveWorkout()"
                    variant="outlined"
                    primary
                >Save Workout</v-btn>
                <v-btn 
                    @click="close()"
                    variant="outlined"
                    primary
                >Close</v-btn>
            </v-row>
        </v-form>
        </v-sheet>
      </v-dialog>
</template>
<style>
.bg-color {
    background-color: rgb(var(--v-theme-secondary))
}
</style>