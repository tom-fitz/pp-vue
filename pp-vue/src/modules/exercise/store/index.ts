import { defineStore } from "pinia";
import type { Exercise, IExerciseParams } from "../Exercise";
import api from "../api";

export const useExerciseStore = defineStore('exerciseStore', {
    state: () => ({
        loading: false,
        errorMsg: {} as unknown,
        successMsg: '',
        exercises: [] as Exercise[]
    }),
    getters: {},
    actions: {
        async getExercises (options: IExerciseParams): Promise<void> {
            this.loading = true;
            try {
                const exercises = await api.getExercises(options);
                this.exercises = [...exercises];
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
        }
    },
});