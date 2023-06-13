<script setup lang="ts">
import { useUserStore } from '../user/store';
import { useRoute } from 'vue-router';
// import { mdiChevronRight, mdiCircleSmall } from "@mdi/js";
import { ref, onMounted, computed } from 'vue';
import { useProgramStore } from './store';

const userStore = useUserStore();

const programStore = useProgramStore();

onMounted(() => {
    const route = useRoute();
    const uid = route.params.uid.toString();
    programStore.getProgramsByUID(uid);
});

const programs = computed(() => programStore.programs);


// const rightArrow = ref(mdiChevronRight)

// const statusCircle = ref(mdiCircleSmall);

</script>
<template>
    <v-row 
        v-for="(item, idx) in programs"
        :key="item.id"
        class="mb-4 pt-2 pb-2"
        :data-test="`invoice-${idx}`"
        style="background-color:#1F213A;border-radius:25px;color:#FFFFFF"
    >
        <v-col cols="2" style="text-align:center">
        <strong>{{ item.name }}</strong>
        </v-col>
        <v-col cols="3" style="text-align:left">{{ `# of exercises: ${item.exercises.length}` }}</v-col>
        <!-- <v-col cols="2" style="text-align:left">{{ item.clientName }}</v-col>
        <v-col cols="2" style="text-align:right"><strong>${{ item.total }}</strong></v-col>
        <v-col cols="2" style="text-align:center">
        <v-chip
            :color="statusColor(item.status)"
        ><v-icon start :icon="statusCircle" size="x-large" :color="statusColor(item.status)"></v-icon>{{ item.status }}</v-chip>
        </v-col>
        <v-col cols="1">
        <v-btn
            variant="plain"
            density="compact"
            @click.stop="viewInvoice(item.id)"
            :data-test="`invoice-view-${idx}`"
        ><v-icon :icon="rightArrow" size="x-large" color="#7C5DF9"/></v-btn>
        </v-col> -->
    </v-row>
</template>