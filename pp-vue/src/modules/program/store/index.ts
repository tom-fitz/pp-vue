import { Program } from '../Program'
import { defineStore } from 'pinia'
import api from '../api'

export const useProgramStore = defineStore("programStore", {
    state: () => ({
        errorMsg: {} as unknown,
        successMsg: '',
        loading: false,
        programs: [] as Program[]
    }),
    getters: {
        getPrograms: (state) => state.programs,
    },
    actions: {
        async createProgram (program: Program): Promise<void> {
            this.loading = true;
            try {
                await api.createProgram(program)
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
        },
        async getProgramsByUID (uid: string): Promise<void> {
            this.loading = true;
            try {
                const programs = await api.getProgramsByUID(uid);
                this.programs = [...programs];
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
        }
    }
});