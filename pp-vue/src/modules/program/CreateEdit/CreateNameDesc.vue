<script setup lang="ts">
import { useProgramStore } from '../store';
import { ref } from 'vue';
import { Program } from '../Program'
import { useRouter } from 'vue-router';
const store = useProgramStore();
const router = useRouter();

const initProgram: Program = new Program();

const program = ref(initProgram.create());

const createSaveProgram = async () => {
    const id = await store.createProgramFS(program.value);
    console.log("comp id: ", id);
    router.push({ name: 'program-create-workouts', params: { id }})
};

const cancel = () => router.push({ name: 'program-dashboard' });
</script>
<template>
    <v-container>
        <v-card color="transparent" elevation="0">
            <v-card-title class="text-h4" color="accent">Create New Program</v-card-title>
            <span class="input-ph">Name</span>
            <v-text-field
                v-model="program.name"
                required
                class="pt-4"
                variant="outlined"
            ></v-text-field>
            <span class="input-ph">Description (optional)</span>
            <v-textarea
                v-model="program.description"
                class="pt-4"
                variant="outlined"
            ></v-textarea>
            <v-card-actions>
                <v-btn
                    variant="outlined"
                    primary
                    color="accent"
                    @click.stop="createSaveProgram()"
                >Save &amp; Add workouts</v-btn>

                <v-btn color="surface" @click.stop="cancel()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<style scoped>
.input-ph {
    padding-top: 5px;
    margin-bottom: 55px;
}
</style>