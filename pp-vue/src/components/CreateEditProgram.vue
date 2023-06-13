<script setup lang="ts">
import { Program } from '@/modules/program/Program';
import { ref, type PropType } from 'vue'
import { useProgramStore } from '@/modules/program/store';
import { User } from '@/modules/user/User';

const programStore = useProgramStore();

const valid = ref(false);

const emit = defineEmits(['drawerClose']);

const props = defineProps({
    program: { type: Object as PropType<Program>, required: true },
    userList: { type: Array as PropType<User[]>, required: true },
    isEdit: { type: Boolean },
});

const program = ref(props.program).value;

const createProgram = () => {
    program.create();
    programStore.createProgram(program);
    emit('drawerClose');
}

</script>
<template>
    <v-card color="transparent" elevation="0">
        <v-card-title class="text-h4">New Program</v-card-title>
        <v-form v-model="valid" :min-width="600">
            <v-container justify="center">
                <v-row>
                    <v-col
                    cols="6"
                    >
                        <span class="input-ph">Name</span><br />
                        <v-text-field
                            v-model="program.name"
                            required
                            class="pt-4"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <span class="input-ph">Who is it for?</span><br />
                        <v-select
                            v-model="program.uid"
                            label="Select User"
                            :items="props.userList"
                            item-value="id"
                            item-title="email"
                            required
                            class="pt-4"
                            dense
                        >
                        </v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                    cols="6"
                    >
                        <span class="input-ph">Completion title</span><br />
                        <v-text-field
                            v-model="program.completionTitle"
                            required
                            class="pt-4"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="6"
                    >
                        <span class="input-ph">Duration (weeks)</span><br />
                        <v-text-field
                            v-model="program.duration"
                            required
                            class="pt-4"
                            variant="outlined"
                            type="number"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <span class="input-ph">Description</span><br />
                        <v-text-field
                            v-model="program.description"
                            required
                            class="pt-4"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-card-subtitle class="text-h6 pt-8" style="color:#7C5DF9!important"><strong>Exercises</strong></v-card-subtitle>
                </v-row>
                <v-row
                    v-for="(item, idx) in program.exercises"
                    :key="idx"
                >
                    <v-card color="transparent" elevation="0" width="100%" class="ex-card pa-4 ma-4">
                        <v-row>
                            <v-col cols="11">
                                <v-row>
                                    <v-col cols="3">
                                        <span>Exercise Name</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span>Target</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span>Sets X Reps</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span>Load</span>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">
                                        <v-text-field
                                            v-model="item.name"
                                            variant="outlined"
                                            type="string"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field
                                            v-model="item.target"
                                            variant="outlined"
                                            type="string"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field
                                            v-model="item.setsXReps"
                                            variant="outlined"
                                            type="string"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field
                                            v-model="item.load"
                                            variant="outlined"
                                            type="string"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <span>Video URL</span>
                                    </v-col>
                                    <v-col cols="6">
                                        <span>Notes</span>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="item.videoUri"
                                            variant="outlined"
                                            type="string"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="item.notes"
                                            variant="outlined"
                                            type="string"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>                      
                            </v-col>
                            <v-col cols="1" align="center" justify="center">
                                <v-btn
                                    block
                                    rounded="xl"
                                    size="large"
                                    color="#7C5DF9"
                                    variant="flat" 
                                    class="text-none"
                                    :disabled="idx === 0"
                                    @click.stop="program.removeExercise(idx)"
                                >X</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn
                        block
                        rounded="xl"
                        size="large"
                        color="#1F213A"
                        variant="flat" 
                        class="text-none"
                        @click.stop="program.addExercise()"
                        data-test="invoice-item-add"
                        >+ Add New Exercise</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-btn
                        block
                        rounded="xl"
                        size="large"
                        color="#1F213A"
                        variant="flat" 
                        class="text-none"
                        @click.stop="createProgram()"
                        >+ Add New Program</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>
<style scoped>
.ex-card {
    border: 1px solid #4c4c52 !important;
}

.input-ph {
    padding-top: 5px;
    margin-bottom: 55px;
}
</style>