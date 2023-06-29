<script setup lang="ts">
import YouTube from 'vue3-youtube';
import { ref } from 'vue';

const props = defineProps({
    videoUri: { type: String, required: true },
    dialog: { type: Boolean, required: true }
});

const emits = defineEmits(['dialogClose']);

const dialogCtrl = ref(props.dialog).value;

console.log("val: ", props.dialog);

const closeDialog = () => {
    dialogCtrl == false;
    emits('dialogClose');
}

</script>
<template>
    <v-dialog
        v-model="dialogCtrl"
        :scrim="false"
        transition="dialog-bottom-transition"
    >
    <p>{{  'Test:' + props.dialog }}</p>
        <!-- <YouTube
            :src="videoUri"
        ></YouTube> -->
        <v-btn color="primary" block @click="closeDialog()">Close Dialog</v-btn>
    </v-dialog>
</template>