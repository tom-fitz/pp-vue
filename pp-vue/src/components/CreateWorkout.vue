<script setup lang="ts">
import { ref, computed } from 'vue';
import { Day, Program, Workout } from '@/modules/program/Program';
import { useExerciseStore } from '@/modules/exercise/store';

const exerciseStore = useExerciseStore();

const props = defineProps({
    show: { type: Boolean }
});

const emits = defineEmits(['close']);

const dialog = ref(props.show);

const valid = ref(false);

const workout = new Workout();

const search = ref('')

const exItems = computed(() => exerciseStore.exercises);


</script>
<template>
  <v-dialog
        v-model="dialog"
        activator="parent"
        width="auto"
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
            <v-row>
                <v-col class="ma-0 pa-0" align="center">
                    <v-row
                        v-for="(ex) in workout.exercises"
                        :key="ex.position"
                    >
                        <v-col align="center">
                            <v-row>
                                <v-autocomplete
                                    v-model="ex.title"
                                    v-model:search="search"
                                    :value="ex.id"
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
                <v-btn @click="dialog = false">Close</v-btn>
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