import { Program } from '../Program'
import { defineStore } from 'pinia'
import api from '../api'

export const Get = {
    GetPrograms: 'getPrograms'
}

export const useProgramStore = defineStore("programStore", {
    state: () => ({
        errorMsg: {} as unknown,
        successMsg: '',
        loading: false,
        programs: [] as Program[]
    }),
    getters: {
        [Get.GetPrograms]: (state) => state.programs,
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
    }
});